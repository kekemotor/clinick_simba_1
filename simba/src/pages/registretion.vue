<script setup lang="ts">

</script>

<template>


  <form class="form" action="" method="post">
    <input class="input" type="text" placeholder="Ваше имя">
    <input class="input" type="email" placeholder="Ваш e-mail">
    <input class="input" type="tel" placeholder="Ваш телефон">
    <input class="input" type="password" placeholder="Пароль">
    <input class="input" type="password" placeholder="Пароль еще раз">
    <button class="btn" type="submit">Регистрация</button>
  </form>


</template>

<style>
body {
  font-family: Arial, sans-serif;
  font-size: 16px;
  color: #000;
  background-color: #f8f8f8;
}

* {
  box-sizing: border-box;
}

.form {
  max-width: 320px;
  padding: 15px;
  margin: 20px auto;
  background-color: #fff;
}

.input {
  display: block;
  width: 100%;
  padding: 8px 10px;
  margin-bottom: 10px;

  border: 1px solid #ccc;

  font-family: inherit;
  font-size: 16px;
}

.btn {
  display: block;
  width: 100%;
  padding: 8px 10px;

  border: 0;
  background-color: #1167bc;
  cursor: pointer;

  font-family: inherit;
  font-size: 16px;
  color: #fff;
}

.btn:hover {
  background-color: #128cb0;
}
</style>
