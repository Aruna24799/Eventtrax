import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
 apiKey: "...",
 authDomain: "...",
 projectId: "...",
 storageBucket: "...",
 messagingSenderId: "...",
 appId: "..."
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.login = async () => {
 await signInWithEmailAndPassword(auth,
 email.value,
 password.value);
 alert("Logged in");
};

window.createEvent = async () => {
 await addDoc(collection(db,"events"),{
   name:eventName.value,
   created:Date.now()
 });
 loadEvents();
};

async function loadEvents(){
 const snap = await getDocs(collection(db,"events"));
 events.innerHTML="";
 snap.forEach(d=>{
  events.innerHTML+=`<p>${d.data().name}</p>`;
 });
}

loadEvents();
