import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://pxtpsugbuunjzurdvzkc.supabase.co";
const SUPABASE_KEY = "sb_publishable_BOHqCxkzsVWChq-zAc4Q3Q_ED0khzHW";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// LOGIN
async function login() {
  alert("Login not implemented yet");
}

// CREATE EVENT
async function createEvent() {
  const name = document.getElementById("eventName").value;

  if (!name) {
    alert("Enter event name");
    return;
  }

  const { error } = await supabase.from("events").insert([{ name }]);

  if (error) {
    alert(error.message);
  } else {
    alert("Event created");
    loadEvents();
  }
}

// LOAD EVENTS
async function loadEvents() {
  const { data } = await supabase.from("events").select("*");

  const box = document.getElementById("events");
  box.innerHTML = "";

  if (!data) return;

  data.forEach(e => {
    box.innerHTML += `<p>${e.name}</p>`;
  });
}

// EXPOSE FUNCTIONS TO HTML
window.createEvent = createEvent;
window.login = login;

// INITIAL LOAD
loadEvents();
