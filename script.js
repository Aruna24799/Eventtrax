const URL="https://pxtpsugbuunjzurdvzkc.supabase.co";
const KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4dHBzdWdidXVuanp1cmR2emtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NDY4OTIsImV4cCI6MjA4NjEyMjg5Mn0.VXRKe2AXSiv8vRxfoPDyBl9McRmkYDVUBcRN2Jy6q5g";

const headers={
apikey:KEY,
Authorization:`Bearer ${KEY}`,
"Content-Type":"application/json"
};

function admin(){
home.style.display="none";
adminDiv.style.display="block";
load();
}

function participant(){
home.style.display="none";
participantDiv.style.display="block";
load();
}

async function createEvent(){
let name=eventName.value;

await fetch(`${URL}/rest/v1/events`,{
method:"POST",
headers,
body:JSON.stringify({name})
});

load();
}

async function load(){
let r=await fetch(`${URL}/rest/v1/events`,{headers});
let d=await r.json();

events.innerHTML="";
eventSelect.innerHTML="";

d.forEach(e=>{
events.innerHTML+=`<p>${e.name}</p>`;
eventSelect.innerHTML+=`<option value="${e.id}">${e.name}</option>`;
});
}

async function join(){
await fetch(`${URL}/rest/v1/participants`,{
method:"POST",
headers,
body:JSON.stringify({
name:userName.value,
event_id:eventSelect.value
})
});

alert("Joined");
}
