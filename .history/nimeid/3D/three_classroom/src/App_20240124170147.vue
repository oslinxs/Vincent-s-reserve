<script setup>
import* as Three from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scen=new Three.Scene();
const camera=new Three.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);

const renderer=new Three.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry=new Three.BoxGeometry(1,1,1);
const material=new Three.MeshBasicMaterial({color:0xff0000});

const axesHelper=new Three.AxesHelper(5);
scen.add(axesHelper);
const cube=new Three.Mesh(geometry,material);
scen.add(cube);

camera.position.z=8;
camera.position.y=1;
camera.position.x=1;
function animate(){
  requestAnimationFrame(animate);
  cube.rotation.x+=0.01;
  cube.rotation.y+=0.01;
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
canvas{
  display: block;
  position: fixed;
  left: 0;
  right: 0;
}
</style>
