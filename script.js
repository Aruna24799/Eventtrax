// =======================
// SUPABASE CONFIG
// =======================
const SUPABASE_URL = "https://pxtpsugbuunjzurdvzkc.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4dHBzdWdidXVuanp1cmR2emtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NDY4OTIsImV4cCI6MjA4NjEyMjg5Mn0.VXRKe2AXSiv8vRxfoPDyBl9McRmkYDVUBcRN2Jy6q5g";

const headers={
apikey:SUPABASE_KEY,
Authorization:`Bearer ${SUPABASE_KEY}`,
"Content-Type":"application/json"
};

function show(id){
document.querySelectorAll(".screen").forEach(s=>s.classList.add("hidden"));
document.getElementById(id).classList.remove("hidden");
}

function openAdmin(){show("admin");loadEvents();}
function openParticipant(){show("participant");loadEvents();}
function goHome(){show("home");}

async function createEvent(){
const name=document.getElementById("eventName").value;
if(!name) return alert("Enter event");

await fetch(`${SUPABASE_URL}/rest/v1/events`,{
method:"POST",
headers,
body:JSON.stringify({name})
});

document.getElementById("eventName").value="";
loadEvents();
}

async function loadEvents(){
const r=await fetch(`${SUPABASE_URL}/rest/v1/events?select=*`,{headers});
const data=await r.json();

events.innerHTML="";
eventSelect.innerHTML="";

data.forEach(e=>{
events.innerHTML+=`<div>${e.name}</div>`;
eventSelect.innerHTML+=`<option value="${e.id}">${e.name}</option>`;
});
}

async function joinEvent(){
const name=nameInput.value;
const event_id=eventSelect.value;

await fetch(`${SUPABASE_URL}/rest/v1/participants`,{
method:"POST",
headers,
body:JSON.stringify({name,event_id})
});

alert("Joined");
}

async function submitFeedback(){
const name=participantName.value;
const text=feedbackText.value;
const ratingVal=rating.value;

await fetch(`${SUPABASE_URL}/rest/v1/feedback`,{
method:"POST",
headers,
body:JSON.stringify({name,text,rating:ratingVal})
});

alert("Feedback sent");
}

function downloadCertificate(){
const {jsPDF}=window.jspdf;
const doc=new jsPDF();
doc.text(`Certificate for ${nameInput.value}`,20,40);
doc.save("certificate.pdf");
}










