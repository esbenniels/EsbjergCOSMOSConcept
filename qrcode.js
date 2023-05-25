import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyCvhX0ER2RBFwZ-qGkla8sRBkqkufAv9ns",
    authDomain: "esbjergcosmos.firebaseapp.com",
    databaseURL: "https://esbjergcosmos-default-rtdb.firebaseio.com",
    projectId: "esbjergcosmos",
    storageBucket: "esbjergcosmos.appspot.com",
    messagingSenderId: "793155515262",
    appId: "1:793155515262:web:a9e442836e0f9658d5792f"
};

const app = initializeApp(firebaseConfig);

import {getDatabase, ref, set, onValue} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
const database = getDatabase(app);

import {getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 
    "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
const auth = getAuth(app);

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function removePeriods(input) {
    return input.replace(/\./g, "_()");
}
function addPeriods(input) {
    return input.replace(/\_\(\)/g, ".");
}

var currentUser;
//listen for auth status changes
onAuthStateChanged(auth, user => {
    if (user) {
        console.log("User logged in: ", user);
        currentUser = user;
        // populateElements();
        // document.getElementById('reg').style.display = 'none';
        // document.getElementById('proj').style.display = 'block';
        // document.getElementById('logout').style.display = 'block';
        // document.getElementById('login').style.display = 'none';
    } else {
        console.log("User logged out");
        currentUser = null;
        // document.getElementById('reg').style.display = 'block';
        // document.getElementById('proj').style.display = 'none';
        // document.getElementById('logout').style.display = 'none';
        // document.getElementById('login').style.display = 'block';
    }
})

// const login_form = document.querySelector("#login-form");
// login_form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const email = login_form['inputEmailLogin'].value;
//     const password = login_form['inputPasswordLogin'].value;
//     signInWithEmailAndPassword(auth, email, password).then((credential) => {
//             currentUser = credential.user;
//             $("#loginModal").modal('toggle');
//             location.reload();
//         })
//         .catch((e) => {
//             console.log(e.message);
//             alert(e.message);
//         })
// })

// const reg_form = document.querySelector('#reg-form');
// reg_form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const fname = document.getElementById("inputFName").value;
//     const lname = document.getElementById("inputLName").value;
//     const company = document.getElementById("inputComp").value;
//     const email = document.getElementById("inputEmail").value;
//     const password = document.getElementById("inputPassword").value;

//     if (email!="" && password!="" && fname != "" && lname!="") {
//     if (email.match(/.*@.*\..*/) != null) {
//     createUserWithEmailAndPassword(auth, email, password)
//         .then((credential) => {
//             currentUser = credential.user;
//             // alert("You have been registered and are now logged in");
//             $("#registerModal").modal('toggle');
//             set(ref(database, "Clients/" + removePeriods(email)), {
//                 First_Name: fname,
//                 Last_Name: lname,
//                 Email: email,
//                 Company: company
//             }).then(() => {
//                 location.reload();
//             })
//         }).catch((e) => {
//             console.log(e.message);
//             alert("An error occurred");
//         })
//     } else {
//         alert("Email must be formatted correctly");
//     }
//     } else {
//         alert("All form fields must be filled out");
//     }
// })

// document.getElementById('logout-btn').addEventListener('click', (e) => {
//     e.preventDefault();
//     signOut(auth).then(() => {
//         location.reload();
//     })
// })

onAuthStateChanged(auth, user => {
    if (user) {
        document.getElementById('sign-in-state').innerText = "Signed In";
    } else {
        document.getElementById('sign-in-state').innerText = "Signed Out";
    }
})

document.getElementById("task_btn").addEventListener("click", (e) => {
    e.preventDefault();
    removeAllChildNodes(document.getElementById("qr-code"));
    const task = document.getElementById("task").value;
    document.getElementById("qr-code").src = 
        "https://api.qrserver.com/v1/create-qr-code/?data=https://esbenniels.github.io/EsbjergCOSMOSConcept/?task=" + task + "&size=200x200";
})

