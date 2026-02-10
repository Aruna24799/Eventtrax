import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔹 Supabase config
const SUPABASE_URL = "https://pxtpsugbuunjzurdvzkc.supabase.co";
const SUPABASE_KEY = "sb_publishable_BOHqCxkzsVWChq-zAc4Q3Q_ED0khzHW";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// 🔹 Create Event (Admin)
window.createEvent = async () => {
  const input = document.getElementById("eventName");
  const name = input.value.trim();

  if (!name) {
    alert("Enter event name");
    return;
  }

  const { error } = await supabase
    .from("events")
    .insert([{ name }]);

  if (error) {
    alert("Error: " + error.message);
    return;
  }

  input.value = "";
  loadEvents();
};

// 🔹 Load Events (Event Rooms)
async function loadEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  const box = document.getElementById("events");
  box.innerHTML = "";

  data.forEach(event => {
    const div = document.createElement("div");
    div.className = "event-item";
    div.textContent = event.name;
    box.appendChild(div);
  });
}

// Load on page start
loadEvents();
