import * as dat from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import axios from 'axios';
// import https from 'https';
/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')
// console.log(canvas.width+"hahh"+canvas.height);

// Scene
const scene = new THREE.Scene()
const axesHelper=new THREE.AxesHelper(5);
// scene.add(axesHelper);
/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

let class_light=["1","1","1","1","1","1","1","1","1","1"];
let wc_light=["1","1"];
let zl_light=["1","1","1","1"];
let class_data=[0,0,0,0,0];
let alarm=false;

//连接后段获取数据
function fetchDataAndUpdate(url, select) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic b2JpeDpPYml4MTIzNDU2");
    myHeaders.append("Cookie", "JSESSIONID=3037ae70cc9dfccea3089d95ecf5078e957a84fbcf1abd0656");
    myHeaders.append("targeturl", String(url));
  
    const requestOptions = {
      method: "get", // 使用 POST 方法
      headers: myHeaders,
      redirect: "follow",
    };
  
    fetch("http://192.168.1.11:8080", requestOptions)
      .then(response => response.text())
      .then(xmlString => {
        // console.log("1:"+xmlString);
        // 解析 XML 字符串
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");
        // console.log(xmlDoc);
        if(select == "class_bool1"){
          const boolVal = xmlDoc.querySelector('bool').getAttribute('val');
            class_light[1]=boolVal;
            loadModel();
            loadModel2();
        }else if(select == "class_bool2"){
            const boolVal = xmlDoc.querySelector('bool').getAttribute('val');
            class_light[2]=boolVal;
          }
          else if(select == "class_bool3"){
            const boolVal = xmlDoc.querySelector('bool').getAttribute('val');
            class_light[3]=boolVal;
          }
          else if(select == "class_bool4"){
            const boolVal = xmlDoc.querySelector('bool').getAttribute('val');
            class_light[4]=boolVal;
          }
          else if(select == "class_bool5"){
            const boolVal = xmlDoc.querySelector('bool').getAttribute('val');
            class_light[5]=boolVal;
          }
          else if(select == "class_bool6"){
            const boolVal = xmlDoc.querySelector('bool').getAttribute('val');
            class_light[6]=boolVal;
          }
          else if(select == "class_bool7"){
            const boolVal = xmlDoc.querySelector('bool').getAttribute('val');
            class_light[7]=boolVal;
          }
          else if(select == "class_bool8"){
            const boolVal = xmlDoc.querySelector('bool').getAttribute('val');
            class_light[8]=boolVal;
          }
          else if(select == "class_bool9"){
            const boolVal = xmlDoc.querySelector('bool').getAttribute('val');
            class_light[9]=boolVal;
          }
        else if(select == "wc_bool")
        {
          const numVal = xmlDoc.querySelector('bool').getAttribute('val');
          wc_light[1]=numVal;
        }
        else if(select == "zl_bool1")
        {
          const timeVal = xmlDoc.querySelector('bool').getAttribute('val');
            zl_light[1]=timeVal;
        }else if(select == "zl_bool2")
        {
          const timeVal = xmlDoc.querySelector('bool').getAttribute('val');
            zl_light[2]=timeVal;
        }else if(select == "zl_bool3")
        {
          const timeVal = xmlDoc.querySelector('bool').getAttribute('val');
            zl_light[3]=timeVal;
            console.log("jdjdjdjdjdj");
        }else if(select=="alarm"){
            const timeVal = xmlDoc.querySelector('bool').getAttribute('val');
            alarm=timeVal;
            // console.log(alarm);
            class_alarm();
        }
        else
        {
          console.log("数据类型错误");
        }
      })
      .catch(error => {
        console.error("请求失败:", error);
        // alert("请求失败，请查看控制台错误信息。");
      });
  }
  console.log(class_light);
  console.log(zl_light);
  console.log(wc_light);
  console.log(alarm);
//   console.log(class_data);
  // 点击按钮时立即发送一次请求
//   document.getElementById("sendRequest").addEventListener("click", function() {
//       fetchDataAndUpdate("https://localhost/obix/config/demo/bool1/out/", "bool");
//     }
  
//   );
  
  // 立即发送一次请求并定时刷新
  function sendAndRefresh() {
    fetchDataAndUpdate("https://localhost/obix/config/demo/F1/F101/light1/BooleanWritable/out/", "class_bool1");
    fetchDataAndUpdate("https://localhost/obix/config/demo/F1/F101/light2/BooleanWritable/out/", "class_bool2");
    fetchDataAndUpdate("https://localhost/obix/config/demo/F1/F101/light3/BooleanWritable/out/", "class_bool3");
    fetchDataAndUpdate("https://localhost/obix/config/demo/F1/F101/light4/BooleanWritable/out/", "class_bool4");
    fetchDataAndUpdate("https://localhost/obix/config/demo/F1/F101/light5/BooleanWritable/out/", "class_bool5");
    fetchDataAndUpdate("https://localhost/obix/config/demo/F1/F101/light6/BooleanWritable/out/", "class_bool6");
    fetchDataAndUpdate("https://localhost/obix/config/demo/F1/F101/light7/BooleanWritable/out/", "class_bool7");
    fetchDataAndUpdate("https://localhost/obix/config/demo/F1/F101/light8/BooleanWritable/out/", "class_bool8");
    fetchDataAndUpdate("https://localhost/obix/config/demo/F1/F101/light9/BooleanWritable/out/", "class_bool9");
    fetchDataAndUpdate("https://localhost/obix/config/demo/F1/wc_m/light/BooleanWritable10/out/", "wc_bool");
    fetchDataAndUpdate("https://localhost/obix/config/demo/F1/corridor/light1/BooleanWritable10/out/", "zl_bool1");
    fetchDataAndUpdate("https://localhost/obix/config/demo/F1/corridor/light2/BooleanWritable10/out/", "zl_bool2");
    fetchDataAndUpdate("https://localhost/obix/config/demo/F1/corridor/light3/BooleanWritable14/out/", "zl_bool3");
    fetchDataAndUpdate("https://localhost/obix/config/demo/F1/F101/alarmF101/out/", "alarm");
  }
  
  // 页面加载时立即发送请求并定时刷新
  sendAndRefresh();
  setInterval(sendAndRefresh, 5000); // 每5秒刷新一次 
  
  
  
//厕所
const bakedTexture2 = textureLoader.load('uv.png')
// 创建一个 HTML 元素作为提示框


gltfLoader.load(
    // resource URL
    'toiletdemoscene.glb',
    // called when the resource is loaded
    function (gltf) {
        for (let i = 0; i < 43; i++) {
            let built = gltf.scene.children[i];
            let geo = built.geometry;
            let edgeo = new THREE.EdgesGeometry(geo);
            let edmat = new THREE.LineSegments(edgeo, new THREE.LineBasicMaterial({ color: "#44cef6" }));
            edmat.rotateY(Math.PI);
            edmat.interactive = true;
            scene.add(edmat);
            edmat.position.set(20, 0, 0);
        }
    }
);


// 创建一个 Raycaster 对象
var raycaster = new THREE.Raycaster();

// 定义鼠标事件处理函数
// 创建一个提示框元素
var tooltip = document.createElement('div');
tooltip.style.position = 'absolute';
tooltip.style.background = 'black';
tooltip.style.border = '1px solid #000';
tooltip.style.padding = '5px';
tooltip.style.display = 'none'; // 初始时隐藏
tooltip.style.background = 'black'; // 修改背景颜色
tooltip.style.color = 'white'; // 修改文字颜色
tooltip.style.borderRadius = '10px'; // 修改边框圆角
tooltip.style.width = '60px'; // 修改宽度
tooltip.style.height = '60px'; // 修改高度
tooltip.style.fontSize = '10px'; // 设置字体大小
document.body.appendChild(tooltip);

// 定义鼠标事件处理点击函数
function onMouseMove(event) {
    // 计算鼠标的归一化设备坐标
    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // 更新射线的方向和起点
    raycaster.setFromCamera(mouse, camera);

    // 计算射线和场景中所有对象的交点
    var intersects = raycaster.intersectObjects(scene.children, true);

    // 如果射线与某个对象相交，则显示提示框
    if (intersects.length > 0) {
        var intersect = intersects[0]; // 获取第一个相交对象

        // 更新提示框的位置和内容
        tooltip.style.left = (event.clientX + 10) + 'px'; // 将提示框稍微偏移以避免重叠
        tooltip.style.top = (event.clientY + 10) + 'px';
        tooltip.innerHTML = 'D1234<br>温度:23C<br>湿度:34wt<br>噪声:34db'; // 设置提示框内容
        tooltip.style.display = 'block'; // 显示提示框
    } else {
        // 如果没有相交对象，则隐藏提示框
        tooltip.style.display = 'none';
    }
}

// 监听鼠标移动事件
document.addEventListener('mousemove', onMouseMove, false);



function loadModel2() {
//走廊上1灯
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].scale.set(3,3,3);
        if(zl_light[1]!="true"){
            gltf.scene.children[0].children[2].material.color=0xff0000;
        }
        gltf.scene.children[0].position.set(20,3.5,-7.5);
	}
);
//走廊上3灯
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].scale.set(3,3,3);
        if(zl_light[2]!="true"){
            gltf.scene.children[0].children[2].material.color=0xff0000;
        }
        gltf.scene.children[0].position.set(-5,3.5,-7.5);
	}
);
//走廊上2灯
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].scale.set(3,3,3);
        if(zl_light[3]!="true"){
            gltf.scene.children[0].children[2].material.color=0xff0000;
        }
        gltf.scene.children[0].position.set(8,3.5,-7.5);
	}
);
}
loadModel2();
//右2教室灯
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(-8,2.95,2);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(-8,2.95,-3);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(-8,2.95,-0.5);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(-5,2.95,-3);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(-5,2.95,2);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(-5,2.95,-0.5);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(-2,2.95,-0.5);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        //表示灯熄灭
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(-2,2.95,2);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(-2,2.95,-3);
	}
);


//左边教室2
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(-8,2.95,-13);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(-8,2.95,-18);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(-8,2.95,-15.5);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(-5,2.95,-18);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(-5,2.95,-13);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(-5,2.95,-15.5);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(-2,2.95,-15.5);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        //表示灯熄灭
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(-2,2.95,-13);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(-2,2.95,-18);
	}
);

//右边教室1
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(5,2.95,2);
	}
);

gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(5,2.95,-3);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(5,2.95,-0.5);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(8,2.95,-3);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(8,2.95,2);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(8,2.95,-0.5);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(11,2.95,-0.5);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        //表示灯熄灭
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(11,2.95,2);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].children[2].material.color=0xff0000;
        gltf.scene.children[0].position.set(11,2.95,-3);
	}
);


function loadModel() {
//左边教室1
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        //变黑
        if (class_light[1]!="true"){
            gltf.scene.children[0].children[2].material.color=0xff0000;
        }
        gltf.scene.children[0].position.set(5,2.95,-13);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        if (class_light[2]!="true"){
            gltf.scene.children[0].children[2].material.color=0xff0000;
        }
        gltf.scene.children[0].position.set(5,2.95,-18);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        if (class_light[3]!="true"){
            gltf.scene.children[0].children[2].material.color=0xff0000;
        }
        gltf.scene.children[0].position.set(5,2.95,-15.5);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        if (class_light[4]!="true"){
            gltf.scene.children[0].children[2].material.color=0xff0000;
        }
        gltf.scene.children[0].position.set(8,2.95,-18);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        if (class_light[5]!="true"){
            gltf.scene.children[0].children[2].material.color=0xff0000;
        }
        // console.log(class_light[5]);
        gltf.scene.children[0].position.set(8,2.95,-13);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        if (class_light[6]!="true"){
            gltf.scene.children[0].children[2].material.color=0xff0000;
        }
        gltf.scene.children[0].position.set(8,2.95,-15.5);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        if (class_light[7]!="true"){
            gltf.scene.children[0].children[2].material.color=0xff0000;
        }
        gltf.scene.children[0].position.set(11,2.95,-15.5);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        if(class_light[8]!="true"){
            gltf.scene.children[0].children[2].material.color=0xff0000;
        }
        gltf.scene.children[0].position.set(11,2.95,-13);
	}
);
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        if (class_light[9]!="true"){
            gltf.scene.children[0].children[2].material.color=0xff0000;
        }
        gltf.scene.children[0].position.set(11,2.95,-18);
	}
);
//厕所灯
gltfLoader.load(
	// resource URL
	'light.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        // console.log(gltf);
		scene.add( gltf.scene );
        let light=gltf.scene.getObjectById( '台灯02' );
        // let light2=light.geometry;
        gltf.scene.children[0].rotateX(Math.PI);
        gltf.scene.children[0].scale.set(3,3,3);
        if (wc_light[1]!="true"){
            gltf.scene.children[0].children[2].material.color=0xff0000;
        }
        gltf.scene.children[0].position.set(20,3.5,-0.5);
	}
);
}

loadModel();

//平面设置
let plane= new THREE.PlaneGeometry( 50,40 );
const planematerial = new THREE.MeshBasicMaterial( {
  color: "#a1afc9",
  side: THREE.DoubleSide
} );
// const plane2 = new THREE.Mesh( plane, planematerial );
// plane2.rotateX(Math.PI/2);//绕x轴旋转π/4
// plane2.position.set(0,-0.5,0);
// scene.add( plane2 );

let geo=plane;
let edgeo=new THREE.EdgesGeometry( geo ); 
let edmat=new THREE.LineSegments(edgeo, new THREE.LineBasicMaterial( { color: "#44cef6" } ) );
edmat.rotateX(Math.PI/2); 
scene.add( edmat );
edmat.position.set(0,-0.5,0);



//太阳光位置
const sunLight1 = new THREE.DirectionalLight(0xffffff, 1)
sunLight1.position.set(0, 1, 0)
scene.add(sunLight1)
const sunLight2 = new THREE.DirectionalLight(0xffffff, 1)
sunLight2.position.set(0, -5, 0)
scene.add(sunLight2)
const sunLight3 = new THREE.DirectionalLight(0xffffff, 1)
sunLight3.position.set(3, 0, 10)
scene.add(sunLight3)
const sunLight4 = new THREE.DirectionalLight(0xffffff, 1)
sunLight4.position.set(0, 0, -10)
scene.add(sunLight4)
const sunLight5 = new THREE.DirectionalLight(0xffffff, 1)
sunLight5.position.set(-5,4,-0.5)
scene.add(sunLight5)

/**
 * Textures
 */
const bakedTexture = textureLoader.load('baked.jpg')

/**
 * Materials
 */
// Baked material
const bakedMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff })
bakedTexture.flipY = false
bakedTexture.encoding = THREE.sRGBEncoding

/**
 * Model
 */

//背景设置
let rgbloader=new RGBELoader();
rgbloader.load("./bac.hdr",(envMap)=>{
  //球形映射
  envMap.mapping=THREE.EquirectangularReflectionMapping;
  scene.background=new THREE.Color("#142132");
  scene.environment=new THREE.Color("#142132");
  rgbloader.colorSpace = THREE.SRGBColorSpace;
  // plane2.envMap=envMap;
});



//右边第一间教室
const objLoader = new OBJLoader();

function class_alarm(){
    // console.log(alarm);
    objLoader.load(
        'kyositu.obj',
        function (obj) {
            obj.children[0].material.map=bakedTexture;
            let built=obj.children[0];
            let geo=built.geometry;
            let edgeo=new THREE.EdgesGeometry( geo ); 
            let edmat;
            if(alarm=="true"){//alarm
                // console.log("ngla");
                edmat=new THREE.LineSegments(edgeo, new THREE.LineBasicMaterial( { color: "#ff0000" } ) ); 
                alert("D1234教室出现异常,请尽快处理!");
            }else{
                // console.log("sjdjddj");
                edmat=new THREE.LineSegments(edgeo, new THREE.LineBasicMaterial( { color: "#44cef6" } ) ); 
            }
            
            scene.add( edmat );
            edmat.position.set(3, -2, 0);
        },
    );
}
objLoader.load(
    'kyositu.obj',
    function (obj) {
        obj.children[0].material.map=bakedTexture;
        let built=obj.children[0];
        let geo=built.geometry;
        let edgeo=new THREE.EdgesGeometry( geo ); 

        let edmat=new THREE.LineSegments(edgeo, new THREE.LineBasicMaterial( { color: "#44cef6" } ) ); 
        scene.add( edmat );
        edmat.position.set(3, -2, 0);
    },
);

//右边第二间教室
objLoader.load(
    'kyositu.obj',
    function (obj) {


        // obj.position.set(-10, -2, 0);
        // obj.children[0].material.map=bakedTexture;
        // scene.add(obj);

        obj.children[0].material.map=bakedTexture;
        let built=obj.children[0];
        let geo=built.geometry;
        let edgeo=new THREE.EdgesGeometry( geo ); 
        let edmat=new THREE.LineSegments(edgeo, new THREE.LineBasicMaterial( { color: "#44cef6" } ) ); 
        scene.add( edmat );
        edmat.position.set(-10, -2, 0);
    },
);
//左边第一间教室
objLoader.load(
    'kyositu.obj',
    function (obj) {


        // obj.position.set(3, -2, -15);
        // obj.children[0].material.map=bakedTexture;
        // scene.add(obj);

        // console.log(obj);
        obj.children[0].material.map=bakedTexture;
        let built=obj.children[0];
        let geo=built.geometry;
        let edgeo=new THREE.EdgesGeometry( geo ); 
        let edmat=new THREE.LineSegments(edgeo, new THREE.LineBasicMaterial( { color: "#44cef6" } ) ); 
        scene.add( edmat );
        edmat.position.set(3, -2, -15);
    },
);
//左边第二间教室
objLoader.load(
    'kyositu.obj',
    function (obj) {


        // obj.position.set(-10, -2, -15);
        // obj.children[0].material.map=bakedTexture;
        // scene.add(obj);

        obj.children[0].material.map=bakedTexture;
        let built=obj.children[0];
        let geo=built.geometry;
        let edgeo=new THREE.EdgesGeometry( geo ); 
        let edmat=new THREE.LineSegments(edgeo, new THREE.LineBasicMaterial( { color: "#44cef6" } ) ); 
        scene.add( edmat );
        edmat.position.set(-10, -2, -15);
    },
);
// gltfLoader.load(
// 	// resource URL
// 	'toiletdemoscene.glb',
// 	// called when the resource is loaded
// 	function ( gltf ) {
//         console.log("1234");
//         console.log(gltf);
//         console.log("1234");
// 		scene.add( gltf.scene );
//         gltf.scene.position.set(20, 0, -15);
//         gltf.scene.children[0].material.map=bakedTexture2;
//         gltf.scene.rotateY(Math.PI);


// 	}
// );
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -47.175
camera.position.y = 19.803
camera.position.z =-5.845
// カメラの向きを変える
camera.lookAt(-10, 10, 10)


scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    // console.log(camera.position)
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
