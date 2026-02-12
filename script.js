const SUPABASE_URL="https://pxtpsugbuunjzurdvzkc.supabase.co";
const SUPABASE_KEY="sb_publishable_BOHqCxkzsVWChq-zAc4Q3Q_ED0khzHW";

import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm").then(m=>{

const supabase=m.createClient(SUPABASE_URL,SUPABASE_KEY);

window.showAdmin=()=>{
role.classList.add("hidden");
admin.classList.remove("hidden");
loadEvents();
}

window.showParticipant=()=>{
role.classList.add("hidden");
participant.classList.remove("hidden");
loadPublic();
}

window.back=()=>{
location.reload();
}

window.createEvent=async()=>{
let name=eventName.value;
if(!name)return alert("Enter name");

await supabase.from("events").insert([{name}]);

eventName.value="";
loadEvents();
}

async function loadEvents(){

let {data}=await supabase.from("events").select("*");

events.innerHTML="";

data.forEach(e=>{
let d=document.createElement("div");
d.innerText=e.name;
d.onclick=()=>makeQR(e.id);
events.appendChild(d);
});
}

function makeQR(id){
qr.innerHTML="";
new QRCode(qr,{
text:location.href+"?event="+id,
width:200,
height:200
});
}

async function loadPublic(){

let {data}=await supabase.from("events").select("*");

eventList.innerHTML="";

data.forEach(e=>{
let b=document.createElement("button");
b.innerText=e.name;
b.onclick=()=>window.current=e.id;
eventList.appendChild(b);
});
}

window.joinEvent=async()=>{
if(!window.current)return alert("Select event");

let name=pname.value;

if(!name)return alert("Enter name");

await supabase.from("participants").insert([{name,event_id:window.current}]);

alert("Joined!");
pname.value="";
}

});
