const SUPABASE_URL = "https://pxtpsugbuunjzurdvzkc.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4dHBzdWdidXVuanp1cmR2emtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NDY4OTIsImV4cCI6MjA4NjEyMjg5Mn0.VXRKe2AXSiv8vRxfoPDyBl9McRmkYDVUBcRN2Jy6q5g";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// DOM
const auth = document.getElementById("auth");
const app = document.getElementById("app");
const afterJoin = document.getElementById("afterJoin");

const email = document.getElementById("email");
const password = document.getElementById("password");
const eventName = document.getElementById("eventName");
const events = document.getElementById("events");
const username = document.getElementById("username");
const rating = document.getElementById("rating");
const message = document.getElementById("message");

// AUTH

async function signup() {
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  });

  if (error) return alert(error.message);
  alert("Signup success");
}

async function login() {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  });

  if (error) return alert(error.message);

  auth.classList.add("hidden");
  app.classList.remove("hidden");
  loadEvents();
}

async function logout() {
  await supabase.auth.signOut();
  location.reload();
}

// EVENTS

async function createEvent() {
  if (!eventName.value) return alert("Enter event name");

  const { error } = await supabase
    .from("events")
    .insert({ name: eventName.value });

  if (error) return alert(error.message);

  eventName.value = "";
  loadEvents();
}

async function loadEvents() {
  const { data } = await supabase.from("events").select("*");

  events.innerHTML = "";
  data.forEach(e => {
    events.innerHTML += `<option value="${e.id}">${e.name}</option>`;
  });
}

// PARTICIPANT

async function joinEvent() {
  if (!username.value) return alert("Enter your name");

  const { error } = await supabase.from("participants").insert({
    name: username.value,
    event_id: events.value
  });

  if (error) return alert(error.message);

  alert("Joined event");
  afterJoin.classList.remove("hidden");
}

// FEEDBACK

async function submitFeedback() {
  const { error } = await supabase.from("feedback").insert({
    event_id: events.value,
    rating: rating.value,
    message: message.value
  });

  if (error) return alert(error.message);

  alert("Feedback saved");
}

// CERTIFICATE (demo)

function downloadCert() {
  alert("Certificate downloaded (demo)");
}

// SESSION CHECK

supabase.auth.getSession().then(res => {
  if (res.data.session) {
    auth.classList.add("hidden");
    app.classList.remove("hidden");
    loadEvents();
  }
});
