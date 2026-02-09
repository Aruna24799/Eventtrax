import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://pxtpsugbuunjzurdvzkc.supabase.co";
const SUPABASE_KEY = "sb_publishable_BOHqCxkzsVWChq-zAc4Q3Q_ED0khzHW";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Generate Event ID
function generateEventId() {
  return "EVT-" + Math.floor(100000 + Math.random() * 900000);
}

// CREATE EVENT
window.createNewEvent = async () => {
  const name = document.getElementById("eventName").value;

  if (!name) {
    alert("enter event");
    return;
  }

  const eventId = generateEventId();

  const { error } = await supabase.from("events").insert([
    {
      name: name,
      event_id: eventId
    }
  ]);

  if (error) {
    alert(error.message);
    console.log(error);
    return;
  }

  document.getElementById("eventName").value = "";
  alert("Event created: " + eventId);

  loadEvents();
};

// JOIN EVENT
window.joinEvent = async () => {
  const name = document.getElementById("participantName").value;
  const eventId = document.getElementById("eventId").value;

  if (!name || !eventId) {
    alert("enter name and event id");
    return;
  }

  const { error } = await supabase.from("participants").insert([
    {
      name: name,
      event_id: eventId
    }
  ]);

  if (error) {
    alert(error.message);
    console.log(error);
    return;
  }

  document.getElementById("participantName").value = "";
  alert("Joined event");

  loadParticipants(eventId);
};

// LOAD EVENTS
async function loadEvents() {
  const { data, error } = await supabase.from("events").select("*");

  if (error) {
    console.log(error);
    return;
  }

  const box = document.getElementById("events");
  box.innerHTML = "";

  data.forEach(e => {
    box.innerHTML += `<p><b>${e.event_id}</b> — ${e.name}</p>`;
  });
}

// LOAD PARTICIPANTS
async function loadParticipants(eventId) {
  const { data, error } = await supabase
    .from("participants")
    .select("*")
    .eq("event_id", eventId);

  if (error) {
    console.log(error);
    return;
  }

  const box = document.getElementById("participants");
  box.innerHTML = "";

  data.forEach(p => {
    box.innerHTML += `<p>${p.name}</p>`;
  });
}

// Initial load
loadEvents();
