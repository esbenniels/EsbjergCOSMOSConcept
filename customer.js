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

// <------------------------------------Special Behavior------------------------------------>

onValue(ref(database, "Results"), (snapshot) => {
    removeAllChildNodes(document.getElementById("taskno"));
    var data = snapshot.val();
    for (let task in data) {
        var option = document.createElement("option");
        option.innerText = task;
        option.value = task;
        document.getElementById("taskno").appendChild(option);
    }
    removeAllChildNodes(document.getElementById("wpqrno"));
    onValue(ref(database, "Results/"+removePeriods(document.getElementById("taskno").value)), (snapshot) => {
        for (let wpqr in snapshot.val()) {
            var option = document.createElement("option");
            option.innerText = wpqr;
            option.value = wpqr;
            document.getElementById("wpqrno").appendChild(option);
        }
    })
})

document.querySelector("#taskno").addEventListener("change", function() {
    removeAllChildNodes(document.getElementById("wpqrno"));
    onValue(ref(database, "Results/"+removePeriods(document.getElementById("taskno").value)), (snapshot) => {
        for (let wpqr in snapshot.val()) {
            var option = document.createElement("option");
            option.innerText = wpqr;
            option.value = wpqr;
            document.getElementById("wpqrno").appendChild(option);
        }
    })
})

function boolToAccept(boolean) {
    if (boolean) return "Acceptable";
    else return "Not Acceptable";
}

var taskData;
document.querySelector("#submit").addEventListener("click", function() {
    const path = "Results/"+removePeriods(document.getElementById("taskno").value) + "/" + document.getElementById("wpqrno");
    console.log(path);
    onValue(ref(database, path), (snapshot) => {
        taskData = snapshot.val();
        var tensileAvg;
        var sum = 0;
        var n = 0;
        for (let strength in taskData.DT.Tensile.Result) {
            sum += taskData.DT.Tensile.Result[strength];
            n++;
        }
        tensileAvg = sum/n;
        var assignments = {
            vacc: boolToAccept(taskData['NDT']['Visual']['Result']),
            visual_comments: taskData.NDT.Visual.Comments,
            uacc: boolToAccept(taskData.NDT.Ultrasonic.Result),
            ultrasonic_comments: taskData.NDT.Ultrasonic.Comments,
            macc: boolToAccept(taskData.NDT.Magnetic.Result),
            magnetic_comments: taskData.NDT.Magnetic.Comments,
            tavg: "Average Tensile Strength: " + String(tensileAvg),
            tensile_comments: taskData.DT.Tensile.Comments,
            // handle bend acceptance display
            bend_comments: taskData.DT.Bend.Comments,
            // handle impact energy averages
            impact_comments: taskData.DT.Impact.Comments,
            macro_acc: boolToAccept(taskData.DT.Macro.Result),
            macro_comments: taskData.DT.Macro.Comments,
            // handle hardness data points
            hardness_comments: taskData.DT.Hardness.Comments
        }

        // loop through assignments and use document.getElementById()
        // and innerText to fill in fields
    })
})


// <-----------------------------------------------------Default behavior---------------------------------------->

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
        // document.querySelector('#loginMessage').innerText = 'Velkommen til FORCE Technology\'s Kundeportal';
    } else {
        console.log("User logged out");
        currentUser = null;
        // document.getElementById('reg').style.display = 'block';
        // document.getElementById('proj').style.display = 'none';
        // document.getElementById('logout').style.display = 'none';
        // document.getElementById('login').style.display = 'block';
        // document.querySelector('#loginMessage').innerText = 'Venligst log ind til at se dine statusopdateringer';
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

// onAuthStateChanged(auth, user => {
//     if (user) {
//         document.getElementById('sign-in-state').innerText = "Signed In";
//     } else {
//         document.getElementById('sign-in-state').innerText = "Signed Out";
//     }
// })