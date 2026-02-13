const SUPABASE_URL="https://pxtpsugbuunjzurdvzkc.supabase.co";
const SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4dHBzdWdidXVuanp1cmR2emtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NDY4OTIsImV4cCI6MjA4NjEyMjg5Mn0.VXRKe2AXSiv8vRxfoPDyBl9McRmkYDVUBcRN2Jy6q5g";

const headers={
apikey:SUPABASE_KEY,
Authorization:"Bearer "+SUPABASE_KEY,
"Content-Type":"application/json"
};

function openAdmin(){
landing.classList.add("hidden");
dashboard.classList.remove("hidden");
loadEvents();
loadParticipants();
}

function openParticipant(){
landing.classList.add("hidden");
participantPage.classList.remove("hidden");
loadEvents();
qr.innerHTML="";
new QRCode(qr,location.href);
}

function logout(){location.reload()}

function showSection(id){
document.querySelectorAll(".section").forEach(s=>s.classList.add("hidden"));
document.getElementById(id).classList.remove("hidden");
}

async function createEvent(){
const name=eventName.value;
if(!name)return alert("Enter event");

await fetch(`${SUPABASE_URL}/rest/v1/events`,{
method:"POST",
headers,
body:JSON.stringify({name})
});

eventName.value="";
loadEvents();
}

async function loadEvents(){
const r=await fetch(`${SUPABASE_URL}/rest/v1/events?select=*`,{headers});
const data=await r.json();

eventList.innerHTML="";
eventSelect.innerHTML="";
totalEvents.innerText=data.length;

data.forEach(e=>{
eventList.innerHTML+=`<div class="event">${e.name}</div>`;
eventSelect.innerHTML+=`<option value="${e.id}">${e.name}</option>`;
});
}

async function joinEvent(){
const name=participantName.value;
const event_id=eventSelect.value;

await fetch(`${SUPABASE_URL}/rest/v1/participants`,{
method:"POST",
headers,
body:JSON.stringify({name,event_id})
});

alert("Joined");
}

async function loadParticipants(){
const r=await fetch(`${SUPABASE_URL}/rest/v1/participants?select=*`,{headers});
const data=await r.json();

participantList.innerHTML="";
totalParticipants.innerText=data.length;

data.forEach(p=>{
participantList.innerHTML+=`<div class="event">${p.name}</div>`;
});
}


