const SUPABASE_URL = "sb_publishable_BOHqCxkzsVWChq-zAc4Q3Q_ED0khzHW";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4dHBzdWdidXVuanp1cmR2emtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NDY4OTIsImV4cCI6MjA4NjEyMjg5Mn0.VXRKe2AXSiv8vRxfoPDyBl9McRmkYDVUBcRN2Jy6q5g";

const headers = {
"apikey": SUPABASE_KEY,
"Authorization":"Bearer "+SUPABASE_KEY,
"Content-Type":"application/json"
};

function showAdmin(){
document.getElementById("home").classList.add("hidden");
document.getElementById("adminPage").classList.remove("hidden");
loadEvents();
}

function showParticipant(){
document.getElementById("home").classList.add("hidden");
document.getElementById("participantPage").classList.remove("hidden");
loadEvents();
}

document.getElementById("qr").innerHTML="";
new QRCode(document.getElementById("qr"), window.location.href);
}

function goHome(){
location.reload();
}

async function createEvent(){

const name=document.getElementById("eventName").value;
if(!name)return alert("Enter event");

await fetch(`${SUPABASE_URL}/rest/v1/events`,{
method:"POST",
headers,
body:JSON.stringify({name})
});

document.getElementById("eventName").value="";
loadEvents();
}

async function loadEvents(){

const res=await fetch(`${SUPABASE_URL}/rest/v1/events?select=*`,{headers});
const data=await res.json();

eventList.innerHTML="";
eventSelect.innerHTML="";

data.forEach(e=>{
eventList.innerHTML+=`<div>${e.name}</div>`;
eventSelect.innerHTML+=`<option value="${e.id}">${e.name}</option>`;
});
}

async function joinEvent(){

const name=document.getElementById("participantName").value;
const event_id=document.getElementById("eventSelect").value;

if(!name)return alert("Enter name");

await fetch(`${SUPABASE_URL}/rest/v1/participants`,{
method:"POST",
headers,
body:JSON.stringify({name,event_id})
});

alert("Joined!");
participantName.value="";
}

