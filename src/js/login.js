// Your web app's Firebase configuration
var firebaseConfig = {
    // Firebase Configuration
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialie variables
const auth = firebase.auth();
const database = firebase.database();

const errorMessage = document.getElementById("head-error-message");
const emailError = document.getElementById("email-error-message");
const passwordError = document.getElementById("password-error-message");

// Set up Login function
function login() {
    // Get all our input fields
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        return
        // Don't continue running the code
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                last_login: Date.now()
            }

            // Push to Firebase Database
            database_ref.child('user/' + user.uid).update(user_data)

            // Store user email in localStorage
            localStorage.setItem("currentLoggedinUser", email);

            // Redirect after successful login
            window.location = "/public/"
        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            errorMessage.innerHTML = error_message;
        })
}

// Forget password
function forgetPassword() {
    // Validate input fields
    if (validate_email(email) == false) {
        return
        // Don't continue running the code
    }

    // Run 
    firebase.auth().sendPasswordResetEmail(email)
        .then(function() {
            console.log("Reset email sent");
        })
        .catch(function (error) {
            var error_Code = error.code;
            var error_message = error.message;
            errorMessage.innerHTML = error_message;
        });
}

// Validate Email pattern
function validate_email(email) {
    var emailPattern = /^[^@]+@\w+(\.\w+)+\w$/;

    if (emailPattern.test(email) == false) {
        emailError.innerHTML = "Please enter valid email";
        document.getElementById("email").style.borderColor = "red";
        return false;
    }
    else {
        emailError.innerHTML = "";
        document.getElementById("email").style.borderColor = "";
        return true;
    }
}

// validate Password
function validate_password(password) {
    if (password.length < 6) {
        passwordError.innerHTML = "Password must be 6 characters";
        return false;
    }
    else if (password = "") {
        passwordError.innerHTML = "Please type password";
        return false;
    }
    else {
        passwordError.innerHTML = "";
        return true;
    }
}


