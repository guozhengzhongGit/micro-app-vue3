<template>
  <div class="outer"> vue3微应用 </div>
</template>

<script setup></script>

<style lang="less" scoped>
.outer {
  font-size: 14px;
  color: cadetblue;
  .logo {
    width: 50%;
    margin: 0 auto;
    img {
      display: block;
      width: 100%;
    }
  }
  .content {
    font-size: 16px;
    color: red;
  }
  &_bg {
    background: url('@/assets/images/title.jpg');
    background-size: cover;
    height: 50px;
  }
}
</style>
