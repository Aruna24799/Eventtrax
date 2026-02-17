const supabase = window.supabase.createClient(
"https://pxtpsugbuunjzurdvzkc.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4dHBzdWdidXVuanp1cmR2emtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NDY4OTIsImV4cCI6MjA4NjEyMjg5Mn0.VXRKe2AXSiv8vRxfoPDyBl9McRmkYDVUBcRN2Jy6q5g"
);

async function signup(){
const email=document.getElementById("email").value;
const password=document.getElementById("password").value;

const {error}=await supabase.auth.signUp({email,password});

if(error){
alert(error.message);
}else{
alert("Signup successful. Now login.");
}
}

async function login(){
const email=document.getElementById("email").value;
const password=document.getElementById("password").value;

const {error}=await supabase.auth.signInWithPassword({email,password});

if(error){
alert(error.message);
}else{
alert("Login success");
window.location.href="dashboard.html";
}
}

window.signup=signup;
window.login=login;
