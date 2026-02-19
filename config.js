const SUPABASE_URL = "https://pxtpsugbuunjzurdvzkc.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4dHBzdWdidXVuanp1cmR2emtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NDY4OTIsImV4cCI6MjA4NjEyMjg5Mn0.VXRKe2AXSiv8vRxfoPDyBl9McRmkYDVUBcRN2Jy6q5g";

const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Toast helper
function toast(msg, type = "info") {
  alert(msg);
}

// Loading buttons
function showLoading(btn, text) {
  btn.disabled = true;
  btn.dataset.old = btn.innerHTML;
  btn.innerHTML = text;
}

function hideLoading(btn) {
  btn.disabled = false;
  btn.innerHTML = btn.dataset.old;
}

// Auth guard
async function requireAuth() {
  const { data } = await db.auth.getSession();
  if (!data.session) {
    window.location.href = "auth.html";
    return null;
  }
  return data.session;
}

// Current user
async function getCurrentUser() {
  const { data: auth } = await db.auth.getUser();
  if (!auth.user) return null;

  const { data } = await db
    .from("profiles")
    .select("*")
    .eq("id", auth.user.id)
    .single();

  return data;
}

// Logout
async function logout() {
  await db.auth.signOut();
  window.location.href = "auth.html";
}

// Helpers
function formatDate(d) {
  return new Date(d).toLocaleDateString();
}

function formatTime(t) {
  return t?.slice(0,5) || "";
}

function timeAgo(ts) {
  const sec = Math.floor((Date.now() - new Date(ts)) / 1000);
  if (sec < 60) return "just now";
  if (sec < 3600) return Math.floor(sec/60)+"m ago";
  if (sec < 86400) return Math.floor(sec/3600)+"h ago";
  return Math.floor(sec/86400)+"d ago";
}
