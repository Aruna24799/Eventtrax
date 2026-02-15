const supabase = window.supabase.createClient(
"https://pxtpsugbuunjzurdvzkc.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4dHBzdWdidXVuanp1cmR2emtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NDY4OTIsImV4cCI6MjA4NjEyMjg5Mn0.VXRKe2AXSiv8vRxfoPDyBl9McRmkYDVUBcRN2Jy6q5g"
);

async function signup(){
await supabase.auth.signUp({
email:email.value,
password:password.value
});
alert("Signup complete");
}

async function login(){
await supabase.auth.signInWithPassword({
email:email.value,
password:password.value
});
auth.classList.add("hidden");
app.classList.remove("hidden");
loadEvents();
}

async function logout(){
await supabase.auth.signOut();
location.reload();
}

async function createEvent(){
await supabase.from("events").insert({name:eventName.value});
eventName.value="";
loadEvents();
}

async function loadEvents(){
const {data}=await supabase.from("events").select("*");
events.innerHTML="";
data.forEach(e=>{
events.innerHTML+=`<option value="${e.id}">${e.name}</option>`;
});
}

async function joinEvent(){
await supabase.from("participants").insert({
name:username.value,
event_id:events.value
});
alert("Joined");
}

async function submitFeedback(){
await supabase.from("feedback").insert({
event_id:events.value,
rating:rating.value,
message:message.value
});
alert("Feedback saved");
}

function downloadCert(){
alert("Certificate downloaded (demo)");
}

