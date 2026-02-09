import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://pxtpsugbuunjzurdvzkc.supabase.co";
const SUPABASE_KEY = "sb_publishable_BOHqCxkzsVWChq-zAc4Q3Q_ED0khzHW";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Generate Event ID
function generateEventId() {
  return "EVT-" + Math.floor(100000 + Math.random() * 900000);
}

window.addEvent = async () => {
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
  loadEvents();
};

async function loadEvents() {
  const { data } = await supabase.from("events").select("*");

  const box = document.getElementById("events");
  box.innerHTML = "";

  data.forEach(e => {
    box.innerHTML += `<p><b>${e.event_id}</b> — ${e.name}</p>`;
  });
}

loadEvents();
