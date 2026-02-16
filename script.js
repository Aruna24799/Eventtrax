const supabase = window.supabase.createClient(
"https://pxtpsugbuunjzurdvzkc.supabase.co",
"YOUR_ANON_KEY"
);

const email = document.getElementById("email");
const password = document.getElementById("password");

document.getElementById("signupBtn").onclick = signup;
document.getElementById("loginBtn").onclick = login;
document.getElementById("logoutBtn").onclick = logout;
document.getElementById("createBtn").onclick = createEvent;
document.getElementById("joinBtn").onclick = joinEvent;
document.getElementById("feedbackBtn").onclick = submitFeedback;

async function signup(){
await supabase.auth.signUp({
email: email.value,
password: password.value
});
alert("Signup complete");
}

async function login(){
await supabase.auth.signInWithPassword({
email: email.value,
password: password.value
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

