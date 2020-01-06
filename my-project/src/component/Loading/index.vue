<template>
    <div class="container1">
 <div class="loading"></div>
</div>
</template>

<script>
export default {
    name : 'Loading'
}
</script>

<style scoped>
.container1 {
 position: absolute;
 left: 50%;
 bottom: 50%;
 transform: translate(-50%, -50%);
}
 
.loading {
 width: 28px;
 height: 28px;
 border-radius: 100%;
 border: 5px #ffffff solid;
 border-right-color: #87CEEB;
 animation: loading 1s linear infinite;
}
 
@keyframes loading {
 0% {
 transform: rotate(0deg);
 }
 100% {
 transform: rotate(360deg);
 }
}
</style>
