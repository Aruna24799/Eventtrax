const SUPABASE_URL = "https://pxtpsugbuunjzurdvzkc.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4dHBzdWdidXVuanp1cmR2emtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NDY4OTIsImV4cCI6MjA4NjEyMjg5Mn0.VXRKe2AXSiv8vRxfoPDyBl9McRmkYDVUBcRN2Jy6q5g";

window.db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Require auth
async function requireAuth() {
  const { data } = await db.auth.getSession();
  if (!data.session) {
    window.location.href = "auth.html";
    return null;
  }
  return data.session;
}

// Get profile
async function getCurrentUser() {
  const { data: auth } = await db.auth.getUser();
  if (!auth.user) return null;

  const { data } = await db.from("profiles").select("*").eq("id", auth.user.id).single();
  return data;
}

// Logout
async function logout() {
  await db.auth.signOut();
  window.location.href = "auth.html";
}

// Helpers
function toast(msg){ alert(msg); }

function formatDate(d){ return new Date(d).toLocaleDateString(); }
function formatTime(t){ return t?.substring(0,5); }
function timeAgo(d){ return new Date(d).toLocaleString(); }

function getCategoryEmoji(c){
  return {Tech:"💻",Business:"💼",Design:"🎨",Education:"📚"}[c] || "📌";
}

function showLoading(btn,text){
  btn.dataset.txt = btn.innerHTML;
  btn.innerHTML = text;
  btn.disabled=true;
}
function hideLoading(btn){
  btn.innerHTML = btn.dataset.txt;
  btn.disabled=false;
}

// Certificate download
function downloadCertificate(data){
  const blob = new Blob([JSON.stringify(data,null,2)],{type:"text/plain"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="certificate.txt";
  a.click();
}
