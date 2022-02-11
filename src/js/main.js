// Your web app's Firebase configuration
var firebaseConfig = {
    // Enter Firebase Configuration here
};



// Variables
var userLoginPanel = document.querySelector(".user-login-panel");
var userEmailInfo = document.querySelector(".user-info-01");
var displayEmail = document.getElementById("user-email-id");
var desktopNotLoggedinC = document.getElementById("dropdown-content").querySelector(".ls-component");
var desktopLoggedinC = document.getElementById("dropdown-content").querySelectorAll(".non-ls-component");
var userFullName = document.getElementById("user-full-name");


// Check and run the function when user is logged in
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        getUserData(user.uid);
        
        //Run this section when user logged in
        userLoginPanel.classList.remove("d-inline-block");
        userLoginPanel.classList.add("d-none");
        userEmailInfo.classList.remove("d-none");
        userEmailInfo.classList.add("d-block");
        return user = user.uid;
    }
    
})


function getUserData(uid) {
    firebase.database().ref('users/' + uid).on("value", snap => {
        const userUID = snap.val();
        const user_email = userUID.email;
        const user_firstName = userUID.first_name;
        const user_lastName = userUID.last_name;
        const role = userUID.role;

        displayEmail.innerHTML = user_email;
        userFullName.innerHTML = user_firstName + " " + user_lastName;
    })
}

function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("Log out successful");
        setTimeout(function(){location.reload()}, 1000);
      }).catch((error) => {
        // An error happened.
      });
}

function checkUser(role) {
    if (role == null || role == "user") {
        console.log("not a admin");
        return
    }
    else {
        document.getElementById("error").classList.remove("d-block");
        document.getElementById("error").classList.add("d-none");
        document.getElementById("main").classList.remove("d-none");
        document.getElementById("main").classList.add("d-block");
    }
}


// Logo click redirection

document.querySelector(".logo-container").addEventListener('click', logoRedirection);

function logoRedirection() {
    window.location = '/public';
}
