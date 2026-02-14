// =======================
// SUPABASE CONFIG
// =======================
const SUPABASE_URL = "https://pxtpsugbuunjzurdvzkc.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4dHBzdWdidXVuanp1cmR2emtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NDY4OTIsImV4cCI6MjA4NjEyMjg5Mn0.VXRKe2AXSiv8vRxfoPDyBl9McRmkYDVUBcRN2Jy6q5g";

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: "Bearer " + SUPABASE_KEY,
  "Content-Type": "application/json"
};

const home = document.getElementById("home");
const admin = document.getElementById("admin");
const participant = document.getElementById("participant");
const eventsDiv = document.getElementById("events");
const eventSelect = document.getElementById("eventSelect");
const eventName = document.getElementById("eventName");
const userName = document.getElementById("userName");

function openAdmin(){
  home.classList.add("hidden");
  admin.classList.remove("hidden");
  loadEvents();
}
function generateQR(){
document.getElementById("qr").innerHTML="";
new QRCode(document.getElementById("qr"), window.location.href);
}
function openParticipant(){
home.classList.add("hidden");
participant.classList.remove("hidden");
loadEvents();
generateQR();
}
function goHome(){
  location.reload();
}

/* renamed to avoid browser conflict */
async function addEvent(){

  const name = eventName.value.trim();

  if(!name){
    alert("Enter event name");
    return;
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/events`,{
    method:"POST",
    headers,
    body: JSON.stringify({ name })
  });

  if(!res.ok){
    const err = await res.text();
    console.log(err);
    alert(err);
    return;
  }

  eventName.value = "";
  loadEvents();
}

async function loadEvents(){

  const res = await fetch(`${SUPABASE_URL}/rest/v1/events?select=*`,{
    headers
  });

  const data = await res.json();

  eventsDiv.innerHTML = "";
  eventSelect.innerHTML = "";

  data.forEach(e=>{
    eventsDiv.innerHTML += `<div onclick="loadParticipants(${e.id})">${e.name}</div>`;
    eventSelect.innerHTML += `<option value="${e.id}">${e.name}</option>`;
  });
}

async function joinEvent(){

  const name = userName.value.trim();
  const event_id = eventSelect.value;

  if(!name){
    alert("Enter your name");
    return;
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/participants`,{
    method:"POST",
    headers,
    body: JSON.stringify({ name, event_id })
  });

  if(!res.ok){
    const err = await res.text();
    console.log(err);
    alert(err);
    return;
  }

  alert("Joined successfully!");
  userName.value = "";
}
const participantsDiv = document.getElementById("participants");

async function loadParticipants(eventId){

const res = await fetch(`${SUPABASE_URL}/rest/v1/participants?event_id=eq.${eventId}&select=*`,{headers});
const data = await res.json();

participantsDiv.innerHTML="";

data.forEach(p=>{
participantsDiv.innerHTML += `<div>${p.name}</div>`;
  
});
}
async function downloadCertificate(){

const { jsPDF } = window.jspdf;

const name = userName.value || "Participant";
const eventText = eventSelect.options[eventSelect.selectedIndex].text;

const doc = new jsPDF();

doc.setFontSize(22);
doc.text("Certificate of Participation", 60, 40);

doc.setFontSize(14);
doc.text(`This certifies that`, 80, 70);
doc.text(name, 80, 85);
doc.text(`successfully participated in`, 60, 100);
doc.text(eventText, 80, 115);

doc.text("EventTrax", 90, 150);

doc.save("certificate.pdf");
}
function downloadCertificate(){

const { jsPDF } = window.jspdf;

const name = document.getElementById("userName").value || "Participant";
const eventSelect = document.getElementById("eventSelect");
const eventText = eventSelect.options[eventSelect.selectedIndex].text;

const doc = new jsPDF();

doc.setFontSize(22);
doc.text("Certificate of Participation", 50, 40);

doc.setFontSize(14);
doc.text("This certifies that", 70, 70);
doc.text(name, 70, 85);
doc.text("has successfully participated in", 45, 100);
doc.text(eventText, 70, 115);

doc.text("EventTrax", 80, 150);

doc.save("certificate.pdf");

}





