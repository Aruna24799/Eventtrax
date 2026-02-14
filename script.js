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

const home = document.getElementById("home");
const admin = document.getElementById("admin");
const participant = document.getElementById("participant");
const eventsDiv = document.getElementById("events");
const eventSelect = document.getElementById("eventSelect");

let joinedEvent = "";

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

async function createNewEvent(){
const name = document.getElementById("eventName").value;
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

const r = await fetch(`${SUPABASE_URL}/rest/v1/events?select=*`,{headers});
const data = await r.json();

eventsDiv.innerHTML="";
eventSelect.innerHTML="";

data.forEach(e=>{
eventsDiv.innerHTML += `<div>${e.name}</div>`;
eventSelect.innerHTML += `<option value="${e.id}">${e.name}</option>`;
});
}

async function joinEvent(){

const name = document.getElementById("userName").value;
const event_id = eventSelect.value;

if(!name) return alert("Enter name");

joinedEvent = eventSelect.options[eventSelect.selectedIndex].text;

await fetch(`${SUPABASE_URL}/rest/v1/participants`,{
method:"POST",
headers,
body:JSON.stringify({name,event_id})
});

alert("Joined!");

}

async function submitFeedback(){

const feedback = document.getElementById("feedbackText").value;
const rating = document.getElementById("rating").value;

if(!feedback) return alert("Enter feedback");

await fetch(`${SUPABASE_URL}/rest/v1/feedback`,{
method:"POST",
headers,
body:JSON.stringify({feedback,rating})
});

alert("Feedback saved");
}

function downloadCertificate(){

const { jsPDF } = window.jspdf;

const name = document.getElementById("userName").value;

const pdf = new jsPDF();

pdf.text("Certificate of Participation",50,40);
pdf.text(`Name: ${name}`,50,60);
pdf.text(`Event: ${joinedEvent}`,50,80);

pdf.save("certificate.pdf");
}








