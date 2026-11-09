"use strict";
document.addEventListener("DOMContentLoaded",()=>{
 let pack=null;const byId=id=>document.getElementById(id);
 const status=(t,error=false)=>{byId("rpStatus").textContent=t;byId("rpStatus").style.color=error?"#ff7b7b":"#8ac7ff"};
 const save=(filename,type,body)=>{const url=URL.createObjectURL(new Blob([body],{type}));const a=document.createElement("a");a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),0)};
 byId("rpGenerate").addEventListener("click",()=>{try{pack=RPForge.create({name:byId("rpName").value,premise:byId("rpPremise").value,setting:byId("rpSetting").value});byId("rpPreview").textContent=RPForge.markdown(pack);status("Draft generated and schema validated.");}catch(e){pack=null;byId("rpPreview").textContent="Correct the brief to continue.";status(e.message,true)}byId("rpJson").disabled=!pack;byId("rpMarkdown").disabled=!pack;});
 byId("rpJson").addEventListener("click",()=>{if(pack)save(pack.id+"-rp-pack.json","application/json",JSON.stringify(pack,null,2)+"\n")});
 byId("rpMarkdown").addEventListener("click",()=>{if(pack)save(pack.id+"-rp-pack.md","text/markdown",RPForge.markdown(pack))});
});