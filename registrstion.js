class USER {
    constructor(firstName, lastName, nid, selectGender, birthDate, postCode, email, phoneNumber, password) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.nid = nid;
        this.selectGender = selectGender;
        this.birthDate = birthDate;
        this.postCode = postCode;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
    }
}

// TO HANDLE UI TASKS 
class UI {
    static showAlert(msg, name) {

        //Create a div
        const div = document.createElement('div');
        div.className = `alert ${name}`;

        //Add alert message
        div.appendChild(document.createTextNode(msg));

        //Grub the place where i want to put this
        const container = document.querySelector('.wrapper');
        const form = document.querySelector('#brREG');

        container.insertBefore(div, form);

        //Vanish in 3 sec
        setTimeout(()=>document.querySelector('.alert')
                .remove(), 3000);
    }

    static clearField() {
        document.querySelector('#firstName').value = '';
        document.querySelector('#lastName').value = '';
        document.querySelector('#nid').value = '';
        document.querySelector('#selectGender').value = '';
        document.querySelector('#birthDate').value = '';
        document.querySelector('#postCode').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#phoneNumber').value = '';
        document.querySelector('#password').value = '';
    }
}

// TO COMMUNICATE WITH SERVER 
class SERVE {
    static async postData(user) {
        const options = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                firstName: user.firstName, 
                lastName: user.lastName, 
                nid: user.nid, 
                selectGender: user.selectGender, 
                birthDate: user.birthDate, 
                postCode: user.postCode, 
                email: user.email, 
                phoneNumber: user.phoneNumber, 
                password: user.password
                })
            }
            const req = await fetch(' http://127.0.0.1:5050/api/0/people/reg', options)
            const data = await req.json();

            // LOGGGING DATA
            console.log(data);


            if (data.success === false ) {
                UI.showAlert('Mis-Match! Somewthing went wrong.', 'yellow')
                }

            if (data.success === true ) {
                UI.showAlert('Account Created Successfully.', 'green')
            }
    }
}


// EVENTS 
document.querySelector('#reg-form').addEventListener('submit', (event)=>{
    event.preventDefault();

    // GET VALUES FROM FORM 
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const nid = document.querySelector('#nid').value;
    const selectGender = document.querySelector('#selectGender').value;
    const birthDate = document.querySelector('#birthDate').value;
    const postCode = document.querySelector('#postCode').value;
    const email = document.querySelector('#email').value;
    const phoneNumber = document.querySelector('#phoneNumber').value;
    const password = document.querySelector('#password').value;

    // VALIDATION 

    if(firstName === '' || lastName === '' || nid === ''|| selectGender === ''||
        birthDate === ''|| postCode === ''|| email === ''|| phoneNumber === ''|| password === '') {
            UI.showAlert('Please fill all the fields', 'yellow')
    
    } else {
        const user = new USER(firstName, lastName, nid, selectGender, birthDate, postCode, email, phoneNumber, password);

        SERVE.postData(user);
    
        // CLEAR FIELDS 
        // UI.clearField();
    }

})