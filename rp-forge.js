/* World Forge RP Creator Edition v0.3 — deterministic browser-only generator. */
(function(root,factory){const api=factory();if(typeof module!=="undefined"&&module.exports)module.exports=api;root.RPForge=api;})(typeof globalThis!=="undefined"?globalThis:this,function(){
"use strict";
const trim=(v,max=180)=>String(v??"").trim().replace(/\s+/g," ").slice(0,max);
const slug=s=>trim(s).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"world";
const archetypes={
  civic:["Council Office","Community Clinic","Transport Authority"],
  noir:["Dockside Union","Private Investigation Bureau","Night Market"],
  frontier:["Settlement Council","Trading Cooperative","Ranger Service"]
};
function create(input){
 if(!input||typeof input!=="object")throw Error("An RP brief is required.");
 const name=trim(input.name,80),premise=trim(input.premise,800),setting=trim(input.setting||"noir",24).toLowerCase();
 if(name.length<3||premise.length<12)throw Error("Enter a world name (3+ characters) and premise (12+ characters).");
 if(!archetypes[setting])throw Error("Choose civic, noir or frontier.");
 const districts=[{id:"district-1",name:"Old Quarter",purpose:"Public services, civic debate, and community meetings"},{id:"district-2",name:"Commerce Row",purpose:"Shops, logistics and licensed businesses"},{id:"district-3",name:"Harbour Edge",purpose:"Industrial work, transport and contested development"}];
 const factions=archetypes[setting].map((n,i)=>({id:"faction-"+(i+1),name:n,goal:["Keep services reliable","Expand influence through negotiated deals","Expose a disputed public decision"][i],district_id:districts[i].id}));
 const characters=[{id:"npc-1",name:"Morgan Vale",role:"Dispatcher",faction_id:factions[0].id,personality:"Calm and procedural",boundaries:["Never reveal private player information","Never execute moderation actions"]},{id:"npc-2",name:"Ari Quinn",role:"Local journalist",faction_id:factions[1].id,personality:"Curious and careful",boundaries:["No claims about real people","No privileged staff information"]},{id:"npc-3",name:"Riley Moss",role:"Community organiser",faction_id:factions[2].id,personality:"Pragmatic and fair",boundaries:["No automatic rewards or bans","Keep all activities fictional"]}];
 const missions=[{id:"mission-1",title:"The Missing Permit",type:"investigation",district_id:districts[0].id,npc_id:"npc-1",hook:"A permit is missing before a public event.",objectives:["Interview the dispatcher","Check the public noticeboard","Present findings to the council"],review_status:"draft"},{id:"mission-2",title:"Deliveries at Dawn",type:"logistics",district_id:districts[1].id,npc_id:"npc-2",hook:"A delivery schedule conflicts with a town celebration.",objectives:["Meet the coordinator","Plan a safe route","Report the completed delivery"],review_status:"draft"},{id:"mission-3",title:"The Harbour Hearing",type:"negotiation",district_id:districts[2].id,npc_id:"npc-3",hook:"Residents dispute a redevelopment proposal.",objectives:["Collect community perspectives","Prepare a proposal","Attend a moderated hearing"],review_status:"draft"}];
 const result={schema_version:"0.3.0",id:slug(name),name,premise,setting,compatibility:"Platform-neutral fictional RP design; NOT GTA VI integration",status:"draft",districts,factions,characters,missions,governance:{publication_requires_human_approval:true,automated_bans:false,automated_payments:false,player_data_included:false},meta:{generator:"deterministic-browser",generated_at:null}};
 const issues=validate(result);if(issues.length)throw Error(issues.join("; "));return result;
}
function validate(p){
 const errors=[];if(!p||typeof p!=="object")return ["Pack must be an object"];
 if(p.schema_version!=="0.3.0")errors.push("Unsupported schema version");
 if(typeof p.name!=="string"||p.name.length<3)errors.push("Invalid name");
 if(typeof p.premise!=="string"||p.premise.length<12)errors.push("Invalid premise");
 if(p.status!=="draft")errors.push("Outputs must begin as draft");
 const maps={};for(const key of ["districts","factions","characters","missions"]){if(!Array.isArray(p[key])||p[key].length===0){errors.push("Missing "+key);continue;}maps[key]=new Set();for(const item of p[key]){if(!item||typeof item.id!=="string"||maps[key].has(item.id))errors.push("Duplicate or missing "+key+" id");else maps[key].add(item.id);}}
 for(const f of p.factions||[])if(!maps.districts?.has(f.district_id))errors.push("Faction references unknown district");
 for(const c of p.characters||[])if(!maps.factions?.has(c.faction_id))errors.push("Character references unknown faction");
 for(const m of p.missions||[]){if(!maps.districts?.has(m.district_id)||!maps.characters?.has(m.npc_id))errors.push("Mission references unknown record");if(m.review_status!=="draft")errors.push("Mission must be draft");}
 if(p.governance?.publication_requires_human_approval!==true||p.governance?.automated_bans!==false||p.governance?.automated_payments!==false)errors.push("Unsafe governance settings");
 return errors;
}
function markdown(p){const errors=validate(p);if(errors.length)throw Error(errors.join("; "));
 const section=(title,items,format)=>"## "+title+"\n\n"+items.map(format).join("\n")+"\n";
 return "# "+p.name+" — RP World Pack\n\n"+p.premise+"\n\n**Status:** draft; human approval required.\n\n"+section("Districts",p.districts,x=>"- **"+x.name+"**: "+x.purpose)+section("Factions",p.factions,x=>"- **"+x.name+"**: "+x.goal)+section("NPCs",p.characters,x=>"- **"+x.name+"** ("+x.role+"): "+x.personality)+section("Mission Seeds",p.missions,x=>"- **"+x.title+"**: "+x.hook+" Objectives: "+x.objectives.join("; "))+ "\nIndependent, platform-neutral creative material. No Rockstar affiliation or GTA VI compatibility claimed.\n";}
return {create,validate,markdown};
});
