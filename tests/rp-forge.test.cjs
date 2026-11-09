const assert=require("node:assert/strict");const {test}=require("node:test");const forge=require("../rp-forge.js");
const brief={name:"Harbour Lights",premise:"A coastal city negotiates power and civic reform.",setting:"noir"};
test("generates valid linked RP world pack",()=>{const p=forge.create(brief);assert.equal(forge.validate(p).length,0);assert.equal(p.missions.length,3);assert.equal(p.characters.length,3);assert.equal(p.governance.publication_requires_human_approval,true);});
test("rejects missing or short brief",()=>{assert.throws(()=>forge.create({name:"A",premise:"x"}));});
test("rejects unsupported theme",()=>{assert.throws(()=>forge.create({...brief,setting:"unknown"}));});
test("detects tampering and missing references",()=>{const p=forge.create(brief);p.missions[0].npc_id="ghost";assert.ok(forge.validate(p).length>0);});
test("exports structured human-readable markdown",()=>{const p=forge.create(brief);const m=forge.markdown(p);assert.match(m,/Mission Seeds/);assert.match(m,/human approval/);});
test("deterministic outputs",()=>{assert.deepEqual(forge.create(brief),forge.create(brief));});
