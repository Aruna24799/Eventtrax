import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://pxtpsugbuunjzurdvzkc.supabase.co";
const SUPABASE_KEY = "sb_publishable_BOHqCxkzsVWChq-zAc4Q3Q_ED0khzHW";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function generateEventId() {
  return "EVT-" + Math.floor(100000 + Math.random() * 900000);
}

// CREATE EVENT
window.createNewEvent = async () => {
  const name = document.getElementById("eventName").value;
  if (!name) return alert("Enter event");

  const event_id = generateEventId();

  const { error } = await supabase.from("events").insert([{ name, event_id }]);

  if (error) return alert(error.message);

  alert("Event Created: " + event_id);
  document.getElementById("eventName").value = "";
  loadEvents();
};

// JOIN EVENT
window.joinEvent = async () => {
  const name = document.getElementById("participantName").value;
  const event_id = document.getElementById("eventId").value;

  if (!name || !event_id) return alert("Enter name and event id");

  const { error } = await supabase.from("participants").insert([{ name, event_id }]);

  if (error) return alert(error.message);

  alert("Joined Event");
  document.getElementById("participantName").value = "";
};

// LOAD EVENTS
async function loadEvents() {
  const { data } = await supabase.from("events").select("*");

  const eventsBox = document.getElementById("events");
  const dropdown = document.getElementById("adminEventSelect");

  eventsBox.innerHTML = "";
  dropdown.innerHTML = "";

  data.forEach(e => {
    eventsBox.innerHTML += `<p><b>${e.event_id}</b> — ${e.name}</p>`;
    dropdown.innerHTML += `<option value="${e.event_id}">${e.event_id} - ${e.name}</option>`;
  });
}

// ADMIN VIEW
window.loadAdminParticipants = async () => {
  const eventId = document.getElementById("adminEventSelect").value;

  const { data } = await supabase
    .from("participants")
    .select("*")
    .eq("event_id", eventId);

  const box = document.getElementById("adminParticipants");
  box.innerHTML = "<h4>Participants</h4>";

  data.forEach(p => {
    box.innerHTML += `<p>${p.name}</p>`;
  });
};

loadEvents();
