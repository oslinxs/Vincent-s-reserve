<script setup>
import* as Three from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//场景与照相机
const scen=new Three.Scene();
const camera=new Three.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);

//渲染器
const renderer=new Three.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

//立方体
const geometry=new Three.BoxGeometry(1,1,1);
const material=new Three.MeshBasicMaterial({color:0xff0000});
const material2=new Three.MeshBasicMaterial({color:0x00ff00});

//坐标轴和轨道控制器
const axesHelper=new Three.AxesHelper(5);
const controls = new OrbitControls( camera, renderer.domElement );
scen.add(axesHelper);
const cube2=new Three.Mesh(geometry,material2);
const cube=new Three.Mesh(geometry,material);
cube2.add(cube);
scen.add(cube2);
cube2.position.set(1,0,0);
cube.position.set(3,0,0);

camera.position.z=8;
camera.position.y=1;
camera.position.x=1;
function animate(){
  controls.update();
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
canvas{
  display: block;
  position: fixed;
  left: 0;
  right: 0;
}
</style>
