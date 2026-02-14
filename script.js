const SUPABASE_URL="https://pxtpsugbuunjzurdvzkc.supabase.co";
const SUPABASE_KEY="PASTE_ANON_KEYeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4dHBzdWdidXVuanp1cmR2emtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NDY4OTIsImV4cCI6MjA4NjEyMjg5Mn0.VXRKe2AXSiv8vRxfoPDyBl9McRmkYDVUBcRN2Jy6q5g";

const headers={
apikey:SUPABASE_KEY,
Authorization:"Bearer "+SUPABASE_KEY,
"Content-Type":"application/json"
};

const home=document.getElementById("home");
const admin=document.getElementById("admin");
const participant=document.getElementById("participant");
const eventsDiv=document.getElementById("events");
const eventSelect=document.getElementById("eventSelect");
const feedbackBox=document.getElementById("feedbackBox");
const stats=document.getElementById("stats");

let eventEnded=false;

function openAdmin(){
home.classList.add("hidden");
admin.classList.remove("hidden");
loadEvents();
loadStats();
}

function openParticipant(){
home.classList.add("hidden");
participant.classList.remove("hidden");
loadEvents();

document.getElementById("qr").innerHTML="";
new QRCode(document.getElementById("qr"), location.href);
}

function goHome(){location.reload();}

async function createEvent(){
const name=eventName.value;
if(!name)return alert("Enter event");

await fetch(`${SUPABASE_URL}/rest/v1/events`,{
method:"POST",
headers,
body:JSON.stringify({name,status:"LIVE"})
});

eventName.value="";
loadEvents();
}

async function loadEvents(){
const res=await fetch(`${SUPABASE_URL}/rest/v1/events?select=*`,{headers});
const data=await res.json();

eventsDiv.innerHTML="";
eventSelect.innerHTML="";

data.forEach(e=>{
eventsDiv.innerHTML+=`<div>${e.name}</div>`;
eventSelect.innerHTML+=`<option value="${e.id}">${e.name}</option>`;
});
}

async function joinEvent(){
await fetch(`${SUPABASE_URL}/rest/v1/participants`,{
method:"POST",
headers,
body:JSON.stringify({
name:userName.value,
email:userEmail.value,
event_id:eventSelect.value
})
});

alert("Joined!");
}

async function endEvent(){
eventEnded=true;
feedbackBox.classList.remove("hidden");
alert("Event Ended");
}

async function sendFeedback(){
await fetch(`${SUPABASE_URL}/rest/v1/feedback`,{
method:"POST",
headers,
body:JSON.stringify({
rating:rating.value,
comment:comment.value
})
});
alert("Feedback Saved");
}

function downloadCert(){
const text=`Certificate of Participation\n\n${userName.value}`;
const blob=new Blob([text]);
const a=document.createElement("a");
a.href=URL.createObjectURL(blob);
a.download="certificate.txt";
a.click();
}

async function loadStats(){
const p=await fetch(`${SUPABASE_URL}/rest/v1/participants?select=*`,{headers});
const f=await fetch(`${SUPABASE_URL}/rest/v1/feedback?select=*`,{headers});
stats.innerHTML=`Participants: ${(await p.json()).length}<br>Feedback: ${(await f.json()).length}`;
}

