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
    if (boolean) return "Acceptabelt";
    else return "Ikke Acceptabelt";
}

var taskData;
document.querySelector("#submit").addEventListener("click", function(e) {
    e.preventDefault();
    const path = "Results/"+removePeriods(document.getElementById("taskno").value) + "/" + document.getElementById("wpqrno").value;
    onValue(ref(database, path), (snapshot) => {
        taskData = snapshot.val();
        var sum = 0, n = 0;
        for (let strength in taskData.DT.Tensile.Result) {
            sum += taskData.DT.Tensile.Result[strength];
            n++;
        }
        var assignments = {
            vacc: boolToAccept(taskData['NDT']['Visual']['Result']),
            visual_comments: "Kommentarer: " + taskData.NDT.Visual.Comments,
            uacc: boolToAccept(taskData.NDT.Ultrasonic.Result),
            ultrasonic_comments: "Kommentarer: " + taskData.NDT.Ultrasonic.Comments,
            macc: boolToAccept(taskData.NDT.Magnetic.Result),
            magnetic_comments: "Kommentarer: " + taskData.NDT.Magnetic.Comments,
            tavg: "Gennemsnitlig Trækstyrke: " + String(Math.round(sum/n)) + " MPa",
            tensile_comments: "Kommentarer: " + taskData.DT.Tensile.Comments,
            bend_comments: "Kommentarer: " + taskData.DT.Bend.Comments,
            impact_comments: "Kommentarer: " + taskData.DT.Impact.Comments,
            macro_acc: boolToAccept(taskData.DT.Macro.Result),
            macro_comments: "Kommentarer: " + taskData.DT.Macro.Comments,
            hardness_comments: "Kommentarer: " + taskData.DT.Hardness.Comments
        }

        for (let key in assignments) {
            document.getElementById(key).innerText = String(assignments[key]);
            if (String(assignments[key]) == "Acceptabelt") {
                document.getElementById(key).style.color = "green";
            } else if (String(assignments[key]) == "Ikke Acceptabelt") {
                document.getElementById(key).style.color = "red";
            }
        }

        // handle bend test acceptance display
        var bendRes = taskData.DT.Bend.Result;
        removeAllChildNodes(document.getElementById("bacc"));
        var innerHTMLStr = "";
        for (let antal in bendRes) {
            if (bendRes[antal]) {  // acceptable, create check mark
                innerHTMLStr += "<svg xmlns='http://www.w3.org/2000/svg' style = 'margin: auto 2%' width='25' height='25' fill='green' class='bi bi-check2-square' viewBox='0 0 16 16'><path d='M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z'/><path d='m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z'/></svg>";
            } else {  // not acceptable, create x mark
                innerHTMLStr += "<svg xmlns='http://www.w3.org/2000/svg' style = 'margin: auto 2%' width='21' height='21' fill='red' class='bi bi-x-square' viewBox='0 0 16 16'><path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/></svg>";
            }
        }
        document.getElementById("bacc").innerHTML = innerHTMLStr;

        // handle impact energy averages display modal
        var energies = taskData.DT.Impact.Result;
        removeAllChildNodes(document.getElementById("impact_energies"));
        for (let trial in energies) {
            var tr = document.createElement("tr"), td1 = document.createElement("td"), td2 = document.createElement("td");
            td1.classList.add("text-center"); td1.innerText = trial;
            td2.classList.add("text-center"); td2.innerText = energies[trial];
            tr.appendChild(td1);
            tr.appendChild(td2);
            document.getElementById("impact_energies").appendChild(tr);
        }

        // handle hardness display modal
        var hardnesses = taskData.DT.Hardness.Result;
        removeAllChildNodes(document.getElementById("hardness_levels"));
        for (let trial in hardnesses) {
            var tr = document.createElement("tr"), td1 = document.createElement("td"), td2 = document.createElement("td"), 
                td3 = document.createElement("td"), td4 = document.createElement("td");
            td1.classList.add("text-center"); td1.innerText = trial;
            td2.classList.add("text-center"); td2.innerText = hardnesses[trial].BaseAvg;
            td3.classList.add("text-center"); td3.innerText = hardnesses[trial].HAZAvg;
            td4.classList.add("text-center"); td4.innerText = hardnesses[trial].WeldAvg;
            tr.appendChild(td1); tr.appendChild(td2); tr.appendChild(td3); tr.appendChild(td4);
            document.getElementById("hardness_levels").appendChild(tr);
        }

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