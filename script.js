const { createClient } = supabase;

const supabaseClient = createClient(
  "https://pxtpsugbuunjzurdvzkc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4dHBzdWdidXVuanp1cmR2emtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NDY4OTIsImV4cCI6MjA4NjEyMjg5Mn0.VXRKe2AXSiv8vRxfoPDyBl9McRmkYDVUBcRN2Jy6q5g"
);

// Inputs
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const eventNameInput = document.getElementById("eventName");
const usernameInput = document.getElementById("username");
const eventsSelect = document.getElementById("events");

// Buttons
document.getElementById("loginBtn").addEventListener("click", login);
document.getElementById("signupBtn").addEventListener("click", signup);
document.getElementById("createEventBtn").addEventListener("click", createEvent);
document.getElementById("joinBtn").addEventListener("click", joinEvent);

// ---------- AUTH ----------

async function signup() {
  const { error } = await supabaseClient.auth.signUp({
    email: emailInput.value,
    password: passwordInput.value
  });

  if (error) alert(error.message);
  else alert("Signup successful. Now login.");
}

async function login() {
  const { error } = await supabaseClient.auth.signInWithPassword({
    email: emailInput.value,
    password: passwordInput.value
  });

  if (error) alert(error.message);
  else {
    alert("Login successful");
    loadEvents();
  }
}

// ---------- EVENTS ----------

async function createEvent() {
  if (!eventNameInput.value) return alert("Enter event name");

  const { error } = await supabaseClient
    .from("events")
    .insert([{ name: eventNameInput.value }]);

  if (error) alert(error.message);

  eventNameInput.value = "";
  loadEvents();
}

async function loadEvents() {
  const { data, error } = await supabaseClient.from("events").select("*");

  if (error) {
    alert(error.message);
    return;
  }

  eventsSelect.innerHTML = "";

  data.forEach(e => {
    eventsSelect.innerHTML += `<option value="${e.id}">${e.name}</option>`;
  });
}

// ---------- PARTICIPANTS ----------

async function joinEvent() {
  if (!usernameInput.value) return alert("Enter your name");

  const { error } = await supabaseClient.from("participants").insert([{
    name: usernameInput.value,
    event_id: eventsSelect.value
  }]);

  if (error) alert(error.message);
  else alert("Joined event");
}
