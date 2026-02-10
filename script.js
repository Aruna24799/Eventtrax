import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔁 SUPABASE DETAILS
const SUPABASE_URL = "https://pxtpsugbuunjzurdvzkc.supabase.co";
const SUPABASE_KEY = "sb_publishable_BOHqCxkzsVWChq-zAc4Q3Q_ED0khzHW";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// 🔐 ADMIN PASSWORD (CHANGE IF YOU WANT)
const ADMIN_PASSWORD = "admin123";

// LOGIN CHECK
if (localStorage.getItem("admin") === "true") {
  showDashboard();
}

window.login = () => {
  const pass = document.getElementById("adminPass").value;

  if (pass === ADMIN_PASSWORD) {
    localStorage.setItem("admin", "true");
    showDashboard();
  } else {
    alert("Wrong password");
  }
};

window.logout = () => {
  localStorage.removeItem("admin");
  location.reload();
};

function showDashboard() {
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");
  loadEvents();
}

// EVENTS
window.createEvent = async () => {
  const name = document.getElementById("eventName").value;

  if (!name) return alert("Enter event name");

  await supabase.from("events").insert([{ name }]);
  document.getElementById("eventName").value = "";
  loadEvents();
};

async function loadEvents() {
  const { data } = await supabase.from("events").select("*");

  const box = document.getElementById("events");
  box.innerHTML = "";

  data.forEach(e => {
    box.innerHTML += `<p>${e.name}</p>`;
  });
}
