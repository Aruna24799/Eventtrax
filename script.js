const events=[];

function showAdmin(){
document.getElementById("role-screen").style.display="none";
document.getElementById("admin-screen").style.display="block";

generateQR();
}

function showParticipant(){
document.getElementById("role-screen").style.display="none";
document.getElementById("participant-screen").style.display="block";
renderEvents();
}

function createEvent(){
let name=document.getElementById("eventName").value;
if(!name)return alert("Enter event");

events.push(name);
document.getElementById("eventName").value="";
renderAdmin();
}

function renderAdmin(){
let html="";
events.forEach(e=>{
html+=`<div class="event">${e}</div>`;
});
document.getElementById("events").innerHTML=html;
}

function renderEvents(){
let html="";
events.forEach(e=>{
html+=`<div class="event">${e}</div>`;
});
document.getElementById("eventList").innerHTML=html;
}

function joinEvent(){
let n=document.getElementById("pname").value;
let e=document.getElementById("pemail").value;

if(!n||!e)return alert("Fill fields");

alert("Joined successfully!");
}

function generateQR(){
document.getElementById("qr").innerHTML="";
new QRCode(document.getElementById("qr"),{
text:window.location.href,
width:180,
height:180
});
}
