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

import {getDatabase, ref, set, onValue, update} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
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

// HTML Argument Handling
{
    const URLParams = new URLSearchParams(window.location.search);
    const task = URLParams.get("task");
    if (task != null) {
        var taskData;
        onValue(ref(database, "Tasks/" + removePeriods(task)), (snapshot) => {
            console.log("retrieving");
            taskData = snapshot.val();
            // console.log(taskData);
            if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || 
                navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || 
                navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || 
                navigator.userAgent.match(/Windows Phone/i)) {
                // now in mobile browser
                // only show crucial information

                document.getElementById("theader").style.display = "none";
                document.getElementById("theaderinfo").style.display = "none";
                document.getElementById("theader2").style.display = "none";
                document.getElementById("theader2info").style.display = "none";

                var taskTitle = document.createElement("h5");
                taskTitle.innerText = "Task Nummer: " + task;
                document.getElementById("auxiliaryheader").appendChild(taskTitle);

                document.getElementById("tensileData1").style.display = "none";
                document.getElementById("tensileData2").style.display = "none";

                document.getElementById("bendData1").style.display = "none";
                document.getElementById("bendData2").style.display = "none";

                document.getElementById("impactData1").style.display = "none";
                document.getElementById("impactData2").style.display = "none";

                document.getElementById("macroData1").style.display = "none";
                document.getElementById("macroData2").style.display = "none";

                // tensile
                if (taskData.Trækprøvning.Valid) {
                    document.getElementById('tcutbool').checked = taskData.Trækprøvning['Status']['Cut'];
                    document.getElementById('tmachinedbool').checked = taskData.Trækprøvning.Status['Machined'];
                    document.getElementById('treadybool').checked = taskData.Trækprøvning.Status['Ready for Testing'];
                } else {
                    console.log("clearing tensile test");
                    removeAllChildNodes(document.getElementById("tensileTable"));
                }

                // bend
                if (taskData.Bøjeprøvning.Valid) {
                    document.getElementById('bcutbool').checked = taskData.Bøjeprøvning.Status['Cut'];
                    document.getElementById('bmachinedbool').checked = taskData.Bøjeprøvning.Status['Machined'];
                    document.getElementById('breadybool').checked = taskData.Bøjeprøvning.Status['Ready for Testing'];
                } else {
                    console.log("clearing bend test");
                    removeAllChildNodes(document.getElementById("bendTable"));
                }

                // impact
                if (taskData.Slagsejhedsprøvning.Valid) {
                    document.getElementById('scutbool').checked = taskData.Slagsejhedsprøvning.Status['Cut'];
                    document.getElementById('smachinedbool').checked = taskData.Slagsejhedsprøvning.Status['Machined'];
                    document.getElementById('sreadybool').checked = taskData.Slagsejhedsprøvning.Status['Ready for Testing'];
                } else {
                    console.log("clearing impact test");
                    removeAllChildNodes(document.getElementById("impactTable"));
                }

                // macro
                if (taskData.Makroætsning.Valid) {
                    document.getElementById('mcutbool').checked = taskData.Makroætsning.Status['Cut'];
                    document.getElementById('mmachinedbool').checked = taskData.Makroætsning.Status['Machined'];
                    document.getElementById('mreadybool').checked = taskData.Makroætsning.Status['Ready for Testing'];
                } else {
                    console.log("clearing macro test");
                    removeAllChildNodes(document.getElementById("macroTable"));
                }


            } else { // now in desktop browser
                // show all information
                document.querySelector("#taskno").innerText = addPeriods(task);
                document.querySelector("#refno").innerText = taskData.ReferenceNummer;
                document.querySelector("#clientEmail").innerText = taskData.ClientInfo['ContactEmail'];
                document.querySelector("#order").innerText = taskData.PreparedBy;
                document.querySelector("#antalemner").innerText = taskData.AntalEmner;
                document.querySelector("#ndt").innerText = taskData.NDT;
                document.querySelector("#dims").innerText = taskData.Dimension;
                
                // tensile
                if (taskData.Trækprøvning.Valid) {
                    document.getElementById('tantal').innerText = String(taskData.Trækprøvning.Antal);
                    document.getElementById('tprøvenmr').innerText = String(taskData.Trækprøvning['Prøve nmr']);
                    document.getElementById('tovervulst').checked = taskData.Trækprøvning['Overvulst slibes-bearbejdes'];
                    document.getElementById('trodvulst').checked = taskData.Trækprøvning['Rodvulst slibes-bearbejdes'];
                    document.getElementById('tslibes').checked = taskData.Trækprøvning['Slibes let'];
                    // document.getElementById('tlt').innerText = taskData.Trækprøvning['Lt'];
                    // document.getElementById('tlc').innerText = taskData.Trækprøvning['Lc'];
                    // document.getElementById('tf').innerText = taskData.Trækprøvning['f'];
                    // document.getElementById('tb').innerText = taskData.Trækprøvning['b'];
                    // document.getElementById('tb1').innerText = taskData.Trækprøvning['b1'];
                    // document.getElementById('ta').innerText = taskData.Trækprøvning['a'];
                    // document.getElementById('tR').innerText = taskData.Trækprøvning['R'];
                    document.getElementById('tcutbool').checked = taskData.Trækprøvning['Status']['Cut'];
                    document.getElementById('tmachinedbool').checked = taskData.Trækprøvning.Status['Machined'];
                    document.getElementById('treadybool').checked = taskData.Trækprøvning.Status['Ready for Testing'];


                } else {
                    console.log("clearing tensile test");
                    removeAllChildNodes(document.getElementById("tensileTable"));
                }

                // bend
                if (taskData.Bøjeprøvning.Valid) {
                    document.getElementById('bantal').innerText = String(taskData.Bøjeprøvning.Antal);
                    document.getElementById('bprøvenmr').innerText = String(taskData.Bøjeprøvning['Prøve nmr']);
                    document.getElementById('bovervulst').checked = taskData.Bøjeprøvning['Overvulst fjernes'];
                    document.getElementById('brodvulst').checked = taskData.Bøjeprøvning['Rodvulst fjernes'];
                    document.getElementById('bslibes').checked = taskData.Bøjeprøvning['Slibes let'];
                    // document.getElementById('ba').innerText = taskData.Bøjeprøvning['a'];
                    // document.getElementById('bb').innerText = taskData.Bøjeprøvning['b'];
                    // document.getElementById('bc').innerText = taskData.Bøjeprøvning['c'];
                    document.getElementById('bcutbool').checked = taskData.Bøjeprøvning.Status['Cut'];
                    document.getElementById('bmachinedbool').checked = taskData.Bøjeprøvning.Status['Machined'];
                    document.getElementById('breadybool').checked = taskData.Bøjeprøvning.Status['Ready for Testing'];
                } else {
                    console.log("clearing bend test");
                    removeAllChildNodes(document.getElementById("bendTable"));
                }

                // impact
                if (taskData.Slagsejhedsprøvning.Valid) {
                    document.getElementById('santal').innerText = String(taskData.Slagsejhedsprøvning.Antal);
                    document.getElementById('sprøvenmr').innerText = String(taskData.Slagsejhedsprøvning['Prøve nmr']);
                    document.getElementById("kærvtype").innerText = taskData.Slagsejhedsprøvning.Kærvtype;
                    document.getElementById("standard").innerText = taskData.Slagsejhedsprøvning.Prøvestandard;
                    // document.getElementById('ia').innerText = taskData.Slagsejhedsprøvning['a'];
                    // document.getElementById('ib').innerText = taskData.Slagsejhedsprøvning['b'];
                    // document.getElementById('ic').innerText = taskData.Slagsejhedsprøvning['c'];
                    document.getElementById('scutbool').checked = taskData.Slagsejhedsprøvning.Status['Cut'];
                    document.getElementById('smachinedbool').checked = taskData.Slagsejhedsprøvning.Status['Machined'];
                    document.getElementById('sreadybool').checked = taskData.Slagsejhedsprøvning.Status['Ready for Testing'];
                } else {
                    console.log("clearing impact test");
                    removeAllChildNodes(document.getElementById("impactTable"));
                }

                // macro
                if (taskData.Makroætsning.Valid) {
                    document.getElementById('mantal').innerText = String(taskData.Makroætsning.Antal);
                    document.getElementById('mprøvenmr').innerText = String(taskData.Makroætsning['Prøve nmr']);
                    document.getElementById("mslibes").checked = taskData.Makroætsning['Slibes planparallel til hårdhedsmåling'];
                    document.getElementById("mspektral").checked = taskData.Makroætsning.Spektralanalyse;
                    document.getElementById("mkorrosion").checked = taskData.Makroætsning.Korrosionsprøve;
                    document.getElementById('mcutbool').checked = taskData.Makroætsning.Status['Cut'];
                    document.getElementById('mmachinedbool').checked = taskData.Makroætsning.Status['Machined'];
                    document.getElementById('mreadybool').checked = taskData.Makroætsning.Status['Ready for Testing'];
                } else {
                    console.log("clearing macro test");
                    removeAllChildNodes(document.getElementById("macroTable"));
                }
            }
            const tpath = "Tasks/"+removePeriods(task)+"/Trækprøvning/Status/";
            const bpath = "Tasks/"+removePeriods(task)+"/Bøjeprøvning/Status/";
            const ipath = "Tasks/"+removePeriods(task)+"/Slagsejhedsprøvning/Status/";
            const mpath = "Tasks/"+removePeriods(task)+"/Makroætsning/Status/";
            
            if (taskData.Trækprøvning.Valid) {
                document.getElementById("tcutbool").addEventListener("change", function() {
                    set(ref(database, tpath + "Cut"), document.getElementById("tcutbool").checked);
                })
                document.getElementById("tmachinedbool").addEventListener("change", function() {
                    set(ref(database, tpath + "Machined"), document.getElementById("tmachinedbool").checked);
                })
                document.getElementById("treadybool").addEventListener("change", function() {
                    set(ref(database, tpath + "Ready for Testing"), document.getElementById("treadybool").checked);
                })
            }

            if (taskData.Bøjeprøvning.Valid) {
                document.getElementById("bcutbool").addEventListener("change", function() {
                    set(ref(database, bpath + "Cut"), document.getElementById("bcutbool").checked);
                })
                document.getElementById("bmachinedbool").addEventListener("change", function() {
                    set(ref(database, bpath + "Machined"), document.getElementById("bmachinedbool").checked);
                })
                document.getElementById("breadybool").addEventListener("change", function() {
                    set(ref(database, bpath + "Ready for Testing"), document.getElementById("breadybool").checked);
                })
            }

            if (taskData.Slagsejhedsprøvning.Valid) {
                document.getElementById("scutbool").addEventListener("change", function() {
                    set(ref(database, ipath + "Cut"), document.getElementById("scutbool").checked);
                })
                document.getElementById("smachinedbool").addEventListener("change", function() {
                    set(ref(database, ipath + "Machined"), document.getElementById("smachinedbool").checked);
                })
                document.getElementById("sreadybool").addEventListener("change", function() {
                    set(ref(database, ipath + "Ready for Testing"), document.getElementById("sreadybool").checked);
                })
            }

            if (taskData.Makroætsning.Valid) {
                document.getElementById("mcutbool").addEventListener("change", function() {
                    set(ref(database, mpath + "Cut"), document.getElementById("mcutbool").checked);
                })
                document.getElementById("mmachinedbool").addEventListener("change", function() {
                    set(ref(database, mpath + "Machined"), document.getElementById("mmachinedbool").checked);
                })
                document.getElementById("mreadybool").addEventListener("change", function() {
                    set(ref(database, mpath + "Ready for Testing"), document.getElementById("mreadybool").checked);
                })
            }

        })

        


    } else {
        // hide allData div
        removeAllChildNodes(document.getElementById('allData'));
    }
}


// Default Navbar and Login/Registration Form Handling
{
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

    // onAuthStateChanged(auth, user => {
    //     if (user) {
    //         document.getElementById('sign-in-state').innerText = "Signed In";
    //     } else {
    //         document.getElementById('sign-in-state').innerText = "Signed Out";
    //     }
    // })
}



