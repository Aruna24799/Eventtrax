import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://pxtpsugbuunjzurdvzkc.supabase.co";
const SUPABASE_KEY = "sb_publishable_BOHqCxkzsVWChq-zAc4Q3Q_ED0khzHW";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// CREATE EVENT
window.createEvent = async () => {

  const name = document.getElementById("eventName").value.trim();

  if (!name) {
    alert("Enter event name");
    return;
  }

  const { error } = await supabase
    .from("events")
    .insert([{ name }]);

  if (error) {
    alert(error.message);
    console.log(error);
    return;
  }

  document.getElementById("eventName").value = "";
  loadEvents();
};

// LOAD EVENTS
async function loadEvents() {

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.log(error);
    return;
  }

  const box = document.getElementById("events");
  box.innerHTML = "";

  data.forEach(e => {
    box.innerHTML += `<p>${e.name}</p>`;
  });
}

loadEvents();
