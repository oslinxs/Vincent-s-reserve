<script setup>
import* as Three from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

//场景与照相机
const scen=new Three.Scene();
const camera=new Three.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);

//渲染器
const renderer=new Three.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);


const colorfulgeometry=new Three.BoxGeometry(1,1,1);
const materiala1=new Three.MeshBasicMaterial({color:0xff0000});
const materiala2=new Three.MeshBasicMaterial({color:0x00ff00});
const materiala3=new Three.MeshBasicMaterial({color:0x0000ff});
const materiala4=new Three.MeshBasicMaterial({color:0x0ff000});
const materiala5=new Three.MeshBasicMaterial({color:0x000ff0});
const materiala6=new Three.MeshBasicMaterial({color:0xffffff});
const mesh2 = new Three.Mesh( colorfulgeometry, [materiala1,materiala2,materiala3,materiala4,materiala5,materiala6] );
mesh2.position.set(-2,0,0);
scen.add( mesh2 );
//立方体
const geometry=new Three.BoxGeometry(1,1,1);
const material=new Three.MeshBasicMaterial({color:0xff0000,wireframe:true});
const material2=new Three.MeshBasicMaterial({color:0x00ff00,wireframe:true});

const geometry2 = new Three.BufferGeometry();
const vertices = new Float32Array( [
	 1.0,  1.0,  0.0, // v3
	-1.0,  1.0,  0.0, // v4
	-1.0, -1.0,  0.0  // v5
] );

//加载hrd背景图
let rgbloader=new RGBELoader();
rgbloader.load("./bac.hdr",(envMap)=>{
  //球形映射
  envMap.mapping=Three.EquirectangularReflectionMapping;
  // scen.background=envMap;
  // scen.environment=envMap;
  rgbloader.colorSpace = Three.SRGBColorSpace;
  // plane2.envMap=envMap;
});
let text=new Three.TextureLoader();
let pic=text.load("./jiaju.jpeg")
//纹理颜色
pic.colorSpace = Three.SRGBColorSpace;

//平面设置,导入图片，透明度
let plane= new Three.PlaneGeometry( 10, 10 );
const planematerial = new Three.MeshBasicMaterial( {
  color: 0xffffff,
  map:pic,
  transparent: true
} );
const plane2 = new Three.Mesh( plane, planematerial );
// scen.add( plane2 );

// itemSize = 3 because there are 3 values (components) per vertex
// geometry2.setAttribute( 'position', new Three.BufferAttribute( vertices, 3 ) );
// const material3 = new Three.MeshBasicMaterial( { color: 0x0000ff ,side:Three.DoubleSide,wireframe:true} );
// const mesh = new Three.Mesh( geometry2, material3 );
// scen.add( mesh );

//坐标轴和轨道控制器
const axesHelper=new Three.AxesHelper(5);
const controls = new OrbitControls( camera, renderer.domElement );
scen.add(axesHelper);
// const cube2=new Three.Mesh(geometry,material2);
// const cube=new Three.Mesh(geometry,material);
// cube2.add(cube);
// scen.add(cube2);
// cube2.position.set(1,0,-5);
// cube.position.set(3,0,0);

camera.position.z=20;
camera.position.y=1;
camera.position.x=1;

// // 加载模型
// const jie_loader = new DRACOLoader();
// // Specify path to a folder containing WASM/JS decoding libraries.
// loader.setDecoderPath( './draco/' );
// const loader = new GLTFLoader();
// loader.setDRACOLoader( jie_loader );
// loader.load(
// 	// resource URL
// 	'models/gltf/duck/duck.gltf',
// 	// called when the resource is loaded
// 	function ( gltf ) {
// 		scen.add( gltf.scene );
// 	}
// );

//点击事件,坐标转换
const raycaster = new Three.Raycaster();
const pointer = new Three.Vector2();
window.addEventListener('click',(event)=>{
  event.preventDefault();
  pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  console.log( pointer.x, pointer.y );
  raycaster.setFromCamera( pointer, camera );
  const intersects = raycaster.intersectObjects( scen.children );
  if ( intersects.length > 0 ) {

    intersects[0].object._select=true;
    intersects[0].object._ori_col=intersects[0].object.material[0].color;
    intersects[0].object.material[0].color.set(0x555555);
  }
});
function animate(){
  controls.update();
  requestAnimationFrame(animate);
  // cube.rotation.x+=0.01;
  // cube.rotation.y+=0.01;
  // cube.rotation.z+=0.01;
  renderer.render(scen,camera);
}

animate();

//自适应窗口
window.addEventListener("resize",()=>{
  camera.aspect=window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
});



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
