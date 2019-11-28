# Entry-Management-Software (Innovacer Summergeeks) #
Entry Management Software with check-in and check-out functionality.The project is hosted on heroku.https://entrymanagementsummer.herokuapp.com/
# Technology Stack  #
---
* [Node.js](https://nodejs.org/en/) -open-source JavaScript runtime environment 
* [Express](https://expressjs.com/) -a web application framework for Node.js,
* [MongoDb](https://www.mongodb.com/) -Database (Nosql)
* [NodeMailer](https://nodemailer.com/about/) - Node module used for sending mails.
* [fast2sms Api](https://www.fast2sms.com/dashboard/sms/bulk)- Used for sending SMS.

# How it works?
1. *Firstly visitor checks in and his/her details are stored in the visitor db.*
2. *Then when he/she checks out, details from visitor db are removed and added into the checkout db.*
3. *After check-in the host gets an email and sms listing out the details of visitor.*
4. *Fast2Sms api used here only allows Non-DND numbers. DND numbers will not get any type of SMS.*
4. *While checking out, if the entered e-mail is not found in the visitor db then a message appears saying that the person needs to      checkin.*
5. *After check-out the visitor also gets an email listing out his/her visit details.*
6. *After every process the person is redirected to the landing page.*

# Installation #
---
1. Use 'npm install' to install all the dependencies listed in package.json file.
   
   ```bash
    npm install
    ```
2. Add your credentials in routes/checkin.js
    ```javascript
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "xyz@gmail.com",
            pass: 'abc'
        }
    });
    var mailOptions = {
        from: 'xyz@gmail.com',
        to: "",
        subject: "",
        text: ""
    };
    ```
3. Allow nodemailer to access your gmail account
    * (https://www.google.com/settings/security/lesssecureapps)

4. Run application
    ```
    npm start
    ```

# Structure
---

![Structure](https://i.imgur.com/jzkE5GB.jpg)

# Interface #
---
 ### Landing Page ### 
 * This page has 2 buttons in the center.
    *Check-in* - It goes to check-in route
    *Check-out*- It goes to check-out route
 ![landingpage](https://i.imgur.com/t21JqYJ.jpg)

### Check-in Page ###
![check-in page](https://i.imgur.com/VUneSLJ.jpg)
### Check-out Page ###
![check-out page](https://i.imgur.com/K5zaZZS.jpg)

# Email and SMS
---
### *Check-in* ###
![email](https://i.imgur.com/z4JKsM4.jpg)

### *Check-out* ###
![email](https://i.imgur.com/xOLpCrm.jpg)

### *SMS* ###
![SMS](https://i.imgur.com/zgJLkma.jpg)

# Database Models
---
### * Visitor Schema - Check-in details are stored in visitor collection. ###

```javascript
var visitorSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    hostName: String,
    hostEmail: String,
    hostPhone: String,
    checkin: { type: Date, default: new Date() }
});
```
### * Check-out Schema ###
```javascript
var checkoutSchema = new mongoose.Schema({
    name: String,
    phone: String,
    hostName: String,
    address: String,
    checkin: String,
    checkout: { type: Date, default: new Date() }
});
```
# Deployment
This app is deployed using Heroku.

# Contact Details
1. Name:Pawan Saggu
2. Phone:8901217101
3. Email- pawansaggu007@gmail.com



