// =======================
// SUPABASE CONFIG
// =======================
const SUPABASE_URL = "https://pxtpsugbuunjzurdvzkc.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4dHBzdWdidXVuanp1cmR2emtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NDY4OTIsImV4cCI6MjA4NjEyMjg5Mn0.VXRKe2AXSiv8vRxfoPDyBl9McRmkYDVUBcRN2Jy6q5g";


const headers = {
apikey: SUPABASE_KEY,
Authorization: "Bearer " + SUPABASE_KEY,
"Content-Type":"application/json"
};

const home=document.getElementById("home");
const admin=document.getElementById("admin");
const participant=document.getElementById("participant");
const eventsDiv=document.getElementById("events");
const eventSelect=document.getElementById("eventSelect");

function openAdmin(){
home.classList.add("hidden");
admin.classList.remove("hidden");
loadEvents();
}

function openParticipant(){
home.classList.add("hidden");
participant.classList.remove("hidden");
loadEvents();
}

function goHome(){
location.reload();
}

/* ================= EVENTS ================= */

async function createEvent(){
const name=document.getElementById("eventName").value.trim();
if(!name)return alert("Enter event");

await fetch(`${SUPABASE_URL}/rest/v1/events`,{
method:"POST",
headers,
body:JSON.stringify({ name })
});

document.getElementById("eventName").value="";
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

/* ================= PARTICIPANT ================= */

async function joinEvent(){

const name=document.getElementById("userName").value.trim();
const event_id=eventSelect.value;

if(!name)return alert("Enter name");

await fetch(`${SUPABASE_URL}/rest/v1/participants`,{
method:"POST",
headers,
body:JSON.stringify({ name,event_id })
});

alert("Joined!");
document.getElementById("userName").value="";
}

/* ================= FEEDBACK ================= */

async function submitFeedback(){

const name=document.getElementById("fbName").value.trim();
const text=document.getElementById("fbText").value.trim();
const rating=document.getElementById("fbRating").value;

if(!name||!text)return alert("Fill feedback");

await fetch(`${SUPABASE_URL}/rest/v1/feedback`,{
method:"POST",
headers,
body:JSON.stringify({ name,text,rating })
});

alert("Feedback submitted");
}

/* ================= CERTIFICATE ================= */

function downloadCertificate(){
alert("Certificate download demo");
}









