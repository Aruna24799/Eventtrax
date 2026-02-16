const SUPABASE_URL = "https://pxtpsugbuunjzurdvzkc.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4dHBzdWdidXVuanp1cmR2emtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NDY4OTIsImV4cCI6MjA4NjEyMjg5Mn0.VXRKe2AXSiv8vRxfoPDyBl9McRmkYDVUBcRN2Jy6q5g";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

window.signup = async function () {
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  });

  if (error) alert(error.message);
  else alert("Signup successful");
};

window.login = async function () {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  });

  if (error) return alert(error.message);

  auth.classList.add("hidden");
  app.classList.remove("hidden");
  loadEvents();
};

window.logout = async function () {
  await supabase.auth.signOut();
  location.reload();
};

window.createEvent = async function () {
  await supabase.from("events").insert({ name: eventName.value });
  eventName.value = "";
  loadEvents();
};

async function loadEvents() {
  const { data } = await supabase.from("events").select("*");
  events.innerHTML = "";
  data.forEach(e => events.innerHTML += `<option value="${e.id}">${e.name}</option>`);
}

window.joinEvent = async function () {
  await supabase.from("participants").insert({
    name: username.value,
    event_id: events.value
  });
  alert("Joined");
};

window.submitFeedback = async function () {
  await supabase.from("feedback").insert({
    event_id: events.value,
    rating: rating.value,
    message: message.value
  });
  alert("Feedback saved");
};

window.downloadCert = function () {
  alert("Certificate downloaded (demo)");
};
