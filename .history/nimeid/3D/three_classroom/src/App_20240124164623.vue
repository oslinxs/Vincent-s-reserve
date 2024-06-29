<script setup>
import* as Three from "three"

const scen=new Three.Scene();
const camera=new Three.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);

const renderer=new Three.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry=new Three.BoxGeometry(1,1,1);
const material=new Three.MeshBasicMaterial({color:0xff0000});
const cube=new Three.Mesh(geometry,material);
scen.add(cube);

camera.position.z=5;
function animate(){
  requestAnimationFrame(animate);
  // cube.rotation.x+=0.01;
  // cube.rotation.y+=0.01;
  // cube.rotation.z+=0.01;
  renderer.render(scen,camera);
}

animate();


</script>

<template>
  <div>
  </div>
</template>

<style scoped>

</style>
