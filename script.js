const { createClient } = supabase;

const client = createClient(
"https://pxtpsugbuunjzurdvzkc.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4dHBzdWdidXVuanp1cmR2emtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NDY4OTIsImV4cCI6MjA4NjEyMjg5Mn0.VXRKe2AXSiv8vRxfoPDyBl9McRmkYDVUBcRN2Jy6q5g"
);

const email = document.getElementById("email");
const password = document.getElementById("password");
const eventName = document.getElementById("eventName");
const events = document.getElementById("events");
const username = document.getElementById("username");

document.getElementById("loginBtn").addEventListener("click", login);
document.getElementById("signupBtn").addEventListener("click", signup);
document.getElementById("createEventBtn").addEventListener("click", createEvent);
document.getElementById("joinBtn").addEventListener("click", joinEvent);

async function signup(){
await client.auth.signUp({
email: email.value,
password: password.value
});
alert("Signup success");
}

async function login(){
await client.auth.signInWithPassword({
email: email.value,
password: password.value
});
alert("Login success");
loadEvents();
}

async function createEvent(){

await client.from("events").insert({
name: eventName.value
});

eventName.value="";
loadEvents();
}

async function loadEvents(){

const { data } = await client.from("events").select("*");

events.innerHTML="";

data.forEach(e=>{
events.innerHTML += `<option value="${e.id}">${e.name}</option>`;
});
}

async function joinEvent(){

await client.from("participants").insert({
name: username.value,
event_id: events.value
});

alert("Joined event");
}const { createClient } = supabase;

const client = createClient(
"https://pxtpsugbuunjzurdvzkc.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4dHBzdWdidXVuanp1cmR2emtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NDY4OTIsImV4cCI6MjA4NjEyMjg5Mn0.VXRKe2AXSiv8vRxfoPDyBl9McRmkYDVUBcRN2Jy6q5g"
);

const email = document.getElementById("email");
const password = document.getElementById("password");

document.getElementById("loginBtn").addEventListener("click", login);
document.getElementById("signupBtn").addEventListener("click", signup);

async function signup(){

const { error } = await client.auth.signUp({
email: email.value,
password: password.value
});

if(error){
alert(error.message);
}else{
alert("Signup success — check email");
}

}

async function login(){

const { data, error } = await client.auth.signInWithPassword({
email: email.value,
password: password.value
});

if(error){
alert(error.message);
}else{
alert("Login success");
}

}

