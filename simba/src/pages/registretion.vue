<script setup>
import $ from 'jquery'
import { ref } from 'vue';
import axios from 'axios';
axios.defaults.baseURL = 'http://192.168.1.224:3000/users'

//data
let userRegistrationEmail = ref('');
let userRegistrationPassword = ref('');
let userLoginPassword = ref('');
let userLoginEmail = ref('');
let userConfirmationCode = ref('');
const actionRef = ref();

//animate
function animateSignIn() {
  $('.action').animate({height: "toggle", opacity: "toggle"}, "slow");

}

function animateCreateAccount(){
  $('.action').animate({height: "toggle", opacity: "toggle"}, "slow");
}

function animateCode() {
  $('.action1').animate({height: "toggle", opacity: "toggle"}, "slow");

}

function animateChangePassword(){
  $('.action2').animate({height: "toggle", opacity: "toggle"}, "slow");
}


//validations
function errorRegisterBackAdd(login, text){
  const parent= login.parentNode
  const errorLabel = document.createElement('label')
  errorLabel.classList.add('error-label')
  errorLabel.textContent = text
  parent.classList.add('error')
  parent.append(errorLabel)
}

function errorBackAdd(err_login, text){
  const errorLabel = document.createElement('label')
  errorLabel.classList.add('error-label')
  errorLabel.textContent = text
  err_login.classList.add('error')
  err_login.append(errorLabel)

}
function errorBackRemove(err_login){
  if (err_login.classList.contains('error')){
    err_login.classList.remove('error')
    err_login.querySelector('.error-label').remove()
  }
}


//requests
async function addCode() {
  try {
    const response = await axios.post('/create', {
      userEmail:userRegistrationEmail.value
    }, {
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      credentials: 'same-origin',
    })
    animateCode()
    return response.data
  }
  catch (err){
    console.log(err)

  }
}

const addNewUser = async () => {
  try {
    const response = await axios.post('addUser', {userEmail:userRegistrationEmail.value,userCodeVerification:userConfirmationCode.value, userPassword:userRegistrationPassword.value})
    return response.data
  } catch (err) {
    console.error(err.response.data.message)
    let login = document.querySelector(err.response.data.id)
    errorRegisterBackAdd(login, err.response.data.message)
  }
}
const LogIn = async ()=>{
  try{
    const response = await axios.post('/Login', {userEmail:userLoginEmail.value, userPassword:userLoginPassword.value})

    if (response.data.statusCode===200){
      window.location.href='home.html'
    }
    return response.data

  }catch (err){
    console.error(err.response.data.message)
    errorBackAdd(err_login, err.response.data.message)
  }
}


</script>

<template>
  <div class="login-page">
    <div class="form">
      <div
        ref="actionRef"
        class="action1 action register-form"
      >
        <div class="confirmation">
          <div class="box">
            <input v-model="userRegistrationEmail" data-required="true" id="email" type="email" placeholder="email address"/>
          </div>
          <div class="box">
            <input v-model="userRegistrationPassword" data-min-length="8" data-max-length="30" id="password" type="password" placeholder="password"/>
          </div>
        </div>
        <button id="click" @click="addCode">create</button>
        <p class="message">Have you already registered? <a href="#" @click="animateSignIn">Sign In</a></p>

      </div>
      <div class="action2 action login-form">
        <div class="box_login">
          <input v-model="userLoginEmail" type="email" placeholder="Email"/>
          <input v-model="userLoginPassword" type="password" placeholder="password"/>
        </div>
        <button id="click1" @click="LogIn">login</button>


        <p class="message">Not registered? <a href="#" @click="animateCreateAccount">Create an account</a></p>
        <p class="change">Have you forgotten the password? <a href="#" @click="animateChangePassword">Change</a></p>
      </div>
      <div class="action1 change-form">
        <div class="change-box">
          <input v-model="userConfirmationCode" id="change" type="number" placeholder="code"/>
          <button id="click2" @click="addNewUser">send</button>
        </div>

      </div>
      <div class="action2 change-form">
        <div class="change-box">
          <input v-model="userConfirmationCode" id="change" type="number" placeholder="code"/>
          <button id="click2" @click="addNewUser">send</button>
        </div>
        <p class="change">Have you forgotten the password? <a href="#" @click="animateChangePassword">Change</a></p>
      </div>
    </div>
  </div>


</template>

<style>
.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {

  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {

  text-transform: uppercase;
  outline: 0;
  background: #4c90af;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #4368a0;
}
.form .message {
  margin: 15px 0 0;
  color: #474242;
  font-size: 12px;
}
.form .change {
  margin: 15px 0 0;
  color: #474242;
  font-size: 12px;
}
.form .message a {
  color: #4c5baf;
  text-decoration: none;
}
.form .change a {
  color: #4c5baf;
  text-decoration: none;
}
.form .register-form {
  display: none;
}
.form .change-form {
  display: none;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before, .container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #000000;
}
.container .info span {
  color: #000000;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.error-label {
  font-size: 12px;
  color: red;
  float: left;
}
.error input::placeholder{
  color: red;
}
</style>
