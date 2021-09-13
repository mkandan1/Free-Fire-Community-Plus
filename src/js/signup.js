// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC3JOXNs46bBAMyqBcHKfPTOB8OVl5naKI",
    authDomain: "free-fire-community-a793a.firebaseapp.com",
    projectId: "free-fire-community-a793a",
    storageBucket: "free-fire-community-a793a.appspot.com",
    messagingSenderId: "559176829952",
    appId: "1:559176829952:web:90e8ef9569184f32325ce5",
    databaseURL: "https://free-fire-community-a793a-default-rtdb.firebaseio.com/"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize variable
const auth = firebase.auth();
const database = firebase.database();
var errorMessage = document.getElementById("head-error-message");

// Error message component
const firstNameError = document.getElementById("first-name-error-message");
const lastNameerror = document.getElementById("last-name-error-message");
const emailError = document.getElementById("email-error-message");
const passwordError = document.getElementById("password-error-message");
const agreeError = document.getElementById("agree-error-message");


// Register function
function register() {
    // Get all input elements
    firstName = document.getElementById("first-name").value;
    lastName = document.getElementById("last-name").value;
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    agree = document.getElementById("agree");
    browserName = getBrowserName();
    environmentDetails = getEnvironmentDetails();
    dateAndTime = Date.now();

    // Validate all fields are correctly entered
    if (validate_firstName(firstName) == false || validate_lastName(lastName) == false) {
        return // Don't run below code
    }
    if (check_email(email) == false) {
        return  // Don't run below code
    }
    if (validate_password(password) == false) {
        return  // Don't run below code
    }
    if (validate_agreement() == false) {
        return  // Don't run below code
    }

    // Create a new user after validation
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {

            var user = auth.currentUser
            var db_ref = database.ref()

            var user_data = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                os_name: e.os.name,
                os_version: e.os.version,
                browser_name: e.browser.name,
                browser_version: e.browser.version,
                account_created_on: new Date(dateAndTime).toString()
            }

            db_ref.child('users/' + user.uid).set(user_data)

            firebase.auth().currentUser.sendEmailVerification()
                .then(() => {
                });

            setTimeout(function () { window.location = "/public/auth/LogIn/"; }, 3000);
        })
        .catch(function (error) {
            var error_code = error.code
            var error_messgae = error.message

            // Display error
            errorMessage.innerHTML = error_messgae;
        })

}

// First name validation
function validate_firstName(firstName) {
    // Pattern
    var firstNamePattern = /^[a-zA-Z ]*$/;
    var empty = "";

    if (firstNamePattern.test(firstName) == false) {
        // First name is not valid
        firstNameError.innerHTML = "Please enter valid first name";
        document.getElementById("first-name").style.borderColor = "red";
        return false;
    }

    else if (empty == firstName) {
        firstNameError.innerHTML = "First name can't be empty";
        document.getElementById("first-name").style.borderColor = "red";
        return false;
    }

    else {
        // First name is valid
        firstNameError.innerHTML = "";
        document.getElementById("first-name").style.borderColor = "";
        return true;
    }
}

// Last name validaton
function validate_lastName(lastName) {
    // Pattern
    var lastNamePattern = /^[a-zA-Z ]*$/;
    var empty = "";

    if (lastNamePattern.test(lastName) == false) {
        // First name is not valid
        lastNameerror.innerHTML = "Please enter valid last name";
        document.getElementById("last-name").style.borderColor = "red";
        return false;
    }

    else if (empty == lastName) {
        lastNameerror.innerHTML = "Last name can't be empty";
        document.getElementById("last-name").style.borderColor = "red";
        return false;
    }
    else {
        // First name is valid
        lastNameerror.innerHTML = "";
        document.getElementById("last-name").style.borderColor = "";
        return true;
    }
}

// Validate Email pattern
function check_email(email) {
    var emailPattern = /^[^@]+@\w+(\.\w+)+\w$/;
    var empty = "";

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

// Validate Password
function validate_password(password) {
    var empty = "";
    if (password.length < 6) {
        passwordError.innerHTML = "Password must contain 6 characters";
        document.getElementById("password").style.borderColor = "red";
        return false;
    }

    else if (empty == password) {
        passwordError.innerHTML = "Password can't be empty";
        document.getElementById("password").style.borderColor = "red";
        return false;
    }

    else {
        passwordError.innerHTML = "";
        document.getElementById("password").style.borderColor = "";
        return true;
    }
}

// Validate Agreement

function validate_agreement() {
    if (agree.checked == false) {
        agreeError.innerHTML = "Please select checkbox below";
        return false;
    }
    else {
        agreeError.innerHTML = "";
        return true;
    }
}

// Browser 
function getBrowserName() {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        return "Opera";
    }
    else if (navigator.userAgent.indexOf("Chrome") != -1) {
        return "Chrome";
    }
    else if (navigator.userAgent.indexOf("Safari") != -1) {
        return "Safari";
    }
    else if (navigator.userAgent.indexOf("Firefox") != -1) {
        return "Firefox";
    }
    else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) //IF IE > 10
    {
        return "MSIE";
    }
    else {
        return "Unknown Browser";
    }
}


function getEnvironmentDetails() {

    var module = {
        options: [],
        header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
        dataos: [
            { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
            { name: 'Windows', value: 'Win', version: 'NT' },
            { name: 'iPhone', value: 'iPhone', version: 'OS' },
            { name: 'iPad', value: 'iPad', version: 'OS' },
            { name: 'Kindle', value: 'Silk', version: 'Silk' },
            { name: 'Android', value: 'Android', version: 'Android' },
            { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
            { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
            { name: 'Macintosh', value: 'Mac', version: 'OS X' },
            { name: 'Linux', value: 'Linux', version: 'rv' },
            { name: 'Palm', value: 'Palm', version: 'PalmOS' }
        ],
        databrowser: [
            { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
            { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
            { name: 'Safari', value: 'Safari', version: 'Version' },
            { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
            { name: 'Opera', value: 'Opera', version: 'Opera' },
            { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
            { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
        ],
        init: function ls() {
            var agent = this.header.join(' '),
                os = this.matchItem(agent, this.dataos),
                browser = this.matchItem(agent, this.databrowser);

            return { os: os, browser: browser };
        },
        matchItem: function (string, data) {
            var i = 0,
                j = 0,
                html = '',
                regex,
                regexv,
                match,
                matches,
                version;

            for (i = 0; i < data.length; i += 1) {
                regex = new RegExp(data[i].value, 'i');
                match = regex.test(string);
                if (match) {
                    regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
                    matches = string.match(regexv);
                    version = '';
                    if (matches) { if (matches[1]) { matches = matches[1]; } }
                    if (matches) {
                        matches = matches.split(/[._]+/);
                        for (j = 0; j < matches.length; j += 1) {
                            if (j === 0) {
                                version += matches[j] + '.';
                            } else {
                                version += matches[j];
                            }
                        }
                    } else {
                        version = '0';
                    }
                    return {
                        name: data[i].name,
                        version: parseFloat(version)
                    };
                }
            }
            return { name: 'unknown', version: 0 };
        }
    };

    e = module.init();

}