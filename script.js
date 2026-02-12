import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://pxtpsugbuunjzurdvzkc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4dHBzdWdidXVuanp1cmR2emtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NDY4OTIsImV4cCI6MjA4NjEyMjg5Mn0.VXRKe2AXSiv8vRxfoPDyBl9McRmkYDVUBcRN2Jy6q5g";

const supabase = createClient(supabaseUrl, supabaseKey);

window.showAdmin = () => {
home.style.display="none";
admin.style.display="block";
loadEvents();
};

window.showParticipant = () => {
home.style.display="none";
participant.style.display="block";
loadEventsDropdown();
};

window.goHome = () => {
location.reload();
};

window.createEvent = async () => {
const name=document.getElementById("eventName").value;

await supabase.from("events").insert([{name}]);

loadEvents();
};

async function loadEvents(){
const {data}=await supabase.from("events").select();
events.innerHTML="";
data.forEach(e=>{
events.innerHTML+=`<p>${e.name}</p>`;
});
}

async function loadEventsDropdown(){
const {data}=await supabase.from("events").select();
eventSelect.innerHTML="";
data.forEach(e=>{
eventSelect.innerHTML+=`<option value="${e.id}">${e.name}</option>`;
});
}

window.joinEvent = async ()=>{
const name=document.getElementById("participantName").value;
const event_id=document.getElementById("eventSelect").value;

await supabase.from("participants").insert([{name,event_id}]);

alert("Joined Successfully");
};

