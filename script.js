const { createClient } = supabase;

const client = createClient(
"https://pxtpsugbuunjzurdvzkc.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4dHBzdWdidXVuanp1cmR2emtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NDY4OTIsImV4cCI6MjA4NjEyMjg5Mn0.VXRKe2AXSiv8vRxfoPDyBl9McRmkYDVUBcRN2Jy6q5g"
);

const email = document.getElementById("email");
const password = document.getElementById("password");

document.getElementById("loginBtn").addEventListener("click", login);
document.getElementById("signupBtn").addEventListener("click", signup);

async function signup(){

const { error } = await client.auth.signUp({
email: email.value,
password: password.value
});

if(error){
alert(error.message);
}else{
alert("Signup success — check email");
}

}

async function login(){

const { data, error } = await client.auth.signInWithPassword({
email: email.value,
password: password.value
});

if(error){
alert(error.message);
}else{
alert("Login success");
}

}
