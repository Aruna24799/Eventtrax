const supabase = window.supabase.createClient(
"https://pxtpsugbuunjzurdvzkc.supabase.co",
"YOUR_ANON_KEY"
);

// expose functions globally
window.signup = async function(){

const email=document.getElementById("email").value;
const password=document.getElementById("password").value;

await supabase.auth.signUp({email,password});
alert("Signup success");
}

window.login = async function(){

const email=document.getElementById("email").value;
const password=document.getElementById("password").value;

await supabase.auth.signInWithPassword({email,password});

auth.classList.add("hidden");
app.classList.remove("hidden");

loadEvents();
}

window.logout = async function(){
await supabase.auth.signOut();
location.reload();
}

window.createEvent = async function(){
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

window.joinEvent = async function(){
await supabase.from("participants").insert({
name:username.value,
event_id:events.value
});
alert("Joined");
}

window.submitFeedback = async function(){
await supabase.from("feedback").insert({
event_id:events.value,
rating:rating.value,
message:message.value
});
alert("Saved");
}

window.downloadCert = function(){
alert("Certificate demo");
}
