import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
"https://pxtpsugbuunjzurdvzkc.supabase.co",
"sb_publishable_BOHqCxkzsVWChq-zAc4Q3Q_ED0khzHW"
);

let currentEvent=null;

window.showAdmin=()=>{
role-screen.classList.add("hidden");
admin-screen.classList.remove("hidden");
loadAdmin();
}

window.showParticipant=()=>{
role-screen.classList.add("hidden");
participant-screen.classList.remove("hidden");
loadPublic();
}

window.createEvent=async()=>{
const name=eventName.value.trim();
if(!name)return alert("Enter event");

await supabase.from("events").insert([{name}]);
eventName.value="";
loadAdmin();
}

async function loadAdmin(){
const {data}=await supabase.from("events").select("*").order("id",{ascending:false});
events.innerHTML="";
data.forEach(e=>{
events.innerHTML+=`<div class="event">${e.name}</div>`;
});
}

async function loadPublic(){
const {data}=await supabase.from("events").select("*");
eventList.innerHTML="";
data.forEach(e=>{
eventList.innerHTML+=`<div class="event" onclick="pick(${e.id})">${e.name}</div>`;
});
}

window.pick=id=>currentEvent=id;

window.joinEvent=async()=>{
if(!currentEvent)return alert("Select event");
if(!pname.value||!pemail.value)return alert("Fill all");

await supabase.from("participants").insert([{
name:pname.value,
email:pemail.value,
event_id:currentEvent
}]);

alert("Joined!");
pname.value="";
pemail.value="";
}
