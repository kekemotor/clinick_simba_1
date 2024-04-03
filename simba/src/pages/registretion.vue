<script>
export default {
  mounted() {
    const script = document.createElement('script');
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js';
    document.head.appendChild(script); // Вуаля! Скрипт в действии!
  }
}
$('.message a').click(function(){
  $('.action').animate({height: "toggle", opacity: "toggle"}, "slow");
});
$('.change a').click(function(){
  $('.action1').animate({height: "toggle", opacity: "toggle"}, "slow");
});
</script>

<template>


  <div class="login-page">
    <div class="form">
      <div class="action register-form">
        <div class="confirmation">
          <div class="box">
            <input data-min-length="4" data-max-length="15"  id="name"  type="text" placeholder="name"/>
          </div>
          <div class="box">
            <input data-min-length="8" data-max-length="30" id="password" type="password" placeholder="password"/>
          </div>
          <div class="box">
            <input data-required="true" id="email" type="text" placeholder="email address"/>
          </div>
        </div>
        <button id="click">create</button>
        <p class="message">Have you already registered? <a href="#">Sign In</a></p>

      </div>
      <div class="action1 action login-form">
        <div class="box_login">
          <input id="username" type="text" placeholder="username"/>
          <input id="password1" type="password" placeholder="password"/>
        </div>
        <button id="click1">login</button>


        <p class="message">Not registered? <a href="#">Create an account</a></p>
        <p class="change">Have you forgotten the password? <a href="#">Change</a></p>
      </div>
      <div class="action1 change-form">
        <div class="change-box">
          <input id="change" type="text" placeholder="email address"/>
          <button id="click2">send</button>
        </div>


        <p class="change">Have you forgotten the password? <a href="#">Back</a></p>
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
