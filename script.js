import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://pxtpsugbuunjzurdvzkc.supabase.co";
const SUPABASE_KEY = "sb_publishable_BOHqCxkzsVWChq-zAc4Q3Q_ED0khzHW";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

let currentEvent = null;

/* ---------- ROLE SWITCH ---------- */

window.showAdmin = () => {
  role-screen.classList.add("hidden");
  admin-screen.classList.remove("hidden");
  loadAdminEvents();
};

window.showParticipant = () => {
  role-screen.classList.add("hidden");
  participant-screen.classList.remove("hidden");
  loadPublicEvents();
};

/* ---------- ADMIN ---------- */

window.createEvent = async () => {
  const name = eventName.value.trim();
  if (!name) return alert("Enter event");

  const { error } = await supabase.from("events").insert([{ name }]);

  if (error) return alert(error.message);

  eventName.value = "";
  loadAdminEvents();
};

async function loadAdminEvents() {
  const { data } = await supabase.from("events").select("*").order("id",{ascending:false});

  events.innerHTML = "";

  data.forEach(e=>{
    events.innerHTML += `<div class="event">${e.name}</div>`;
  });
}

/* ---------- PARTICIPANT ---------- */

async function loadPublicEvents(){
  const { data } = await supabase.from("events").select("*");

  eventList.innerHTML="";

  data.forEach(e=>{
    eventList.innerHTML += `<div class="event" onclick="selectEvent(${e.id})">${e.name}</div>`;
  });
}

window.selectEvent = id => currentEvent = id;

window.joinEvent = async () => {
  if(!currentEvent) return alert("Select event");

  const name = pname.value.trim();
  const email = pemail.value.trim();

  if(!name || !email) return alert("Fill all fields");

  const { error } = await supabase.from("participants").insert([
    { name, email, event_id: currentEvent }
  ]);

  if(error) return alert(error.message);

  alert("Joined successfully!");
  pname.value="";
  pemail.value="";
};
