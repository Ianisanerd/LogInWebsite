import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
  import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
  import{getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js"

  const firebaseConfig = {
    apiKey: "AIzaSyAy1MQ5jMpJmpR22-01J3jq0BLDR6cSG68",
    authDomain: "login-form-c392d.firebaseapp.com",
    projectId: "login-form-c392d",
    storageBucket: "login-form-c392d.firebasestorage.app",
    messagingSenderId: "149317139852",
    appId: "1:149317139852:web:71081faad22389a1f7aaa9"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUserFName').innerText=userData.firstName;
                document.getElementById('loggedUserEmail').innerText=userData.email;
                document.getElementById('loggedUserLName').innerText=userData.lastName;

            }
            else{
                console.log("no document found matching id")
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }
    else{
        console.log("User Id not Found in Local storage")
    }
  })

  const logoutButton=document.getElementById('logout');

  logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='index.html';
    })
    .catch((error)=>{
        console.error('Error Signing out:', error);
    })
  }) 