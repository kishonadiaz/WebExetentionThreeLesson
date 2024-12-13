
// import * as THREE from "../src/THREE.js"
// import {CSS3DRenderer,CSS3DObject} from '../examples/jsm/renderers/CSS3DRenderer.js' 

// // console.log()

// // let lcont = document.querySelector("#lessoncont");
// // let width = cont.getBoundingClientRect().width;
// // let height = cont.getBoundingClientRect().height;

// // const scene = new ..Scene();
// // const camera = new ..PerspectiveCamera( 75, width/ height, 0.1, 1000 );

// // const renderer = new .WebGLRenderer({alpha:true,
// //     powerPreference: "high-performance",
// //     antialias: true});
// // renderer.setSize( width, height );
// // renderer.setAnimationLoop( animate );
// // lcont.appendChild( renderer.domElement );

// // const geometry = new ..BoxGeometry( 10, 10, 10 );
// // const material = new ..MeshBasicMaterial( { color: 0x00ff00 } );
// // const cube = new ..Mesh( geometry, material );
// // scene.add( cube );

// // camera.position.z =20;

// // camera.lookAt(cube.position)

// // function animate() {

// // 	cube.rotation.x += 0.01;
// // 	cube.rotation.y += 0.01;
// //     console.log(cube);
// // 	renderer.render( scene, camera );

// // }
// // animate();

// var importroute = new ImportRouting()
// importroute.add("three","../src/THREE.js");
// importroute.apply();

import * as THREE from "../src/THREE.js";
import WebGL from '../examples/jsm/capabilities/WebGL.js';

import { OrbitControls } from '../examples/jsm/controls/OrbitControls.js';
// import { GUI } from '../examples/jsm/libs/lil-gui.module.min.js';
import {CSS3DRenderer,CSS3DObject} from '../examples/jsm/renderers/CSS3DRenderer.js' 
// import ImportRouting from "./importRouting.js";
import { Character } from '../componets/character.js';
// import { NavObjects } from './componets/navobjects.js';
// import * as TWEEN from "/addons/libs/tween.module.js";



var levent = new Event("levent");
var revent = new Event("revent");
var mycont = document.getElementById("lessoncont");
var myCanvas = document.querySelector("#canvas")
const scene = new THREE.Scene();
const scenecss = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, .1, 1000 );
const csscamera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, .1, 1000 );
let stats, raycaster;
let clock;

clock = new THREE.Clock()
let INTERSECTED;
let theta = 0;

const pointer = new THREE.Vector2();
const radius = 5;

const cssrenderer = new CSS3DRenderer();
cssrenderer.setSize(innerWidth, innerHeight);
mycont.appendChild(cssrenderer.domElement);

const renderer = new THREE.WebGLRenderer({alpha:true,
	    powerPreference: "high-performance",
	    antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
mycont.appendChild( renderer.domElement );

const al = new THREE.AmbientLight(0xffffff,0.5);
scene.add(al);
const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x8d8d8d, 3 );
				hemiLight.position.set( 0, 20, 0 );
				scene.add( hemiLight );

				const dirLight = new THREE.DirectionalLight( 0xffffff, 3 );
				dirLight.position.set( - 3, 10, - 10 );
				dirLight.castShadow = true;
				dirLight.shadow.camera.top = 2;
				dirLight.shadow.camera.bottom = - 2;
				dirLight.shadow.camera.left = - 2;
				dirLight.shadow.camera.right = 2;
				dirLight.shadow.camera.near = 0.1;
				dirLight.shadow.camera.far = 40;
				scene.add( dirLight );
                const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshPhongMaterial( { color: 0xcbcbcb, depthWrite: false } ) );
				mesh.rotation.x = - Math.PI / 2;
				mesh.receiveShadow = true;
				mesh.name = "ground";
				// scene.add( mesh );

                
                
                
const actor = new Character(scene,renderer,camera);

actor.addAnimetions(chrome.runtime.getURL("../animations/Idle.fbx"),"Idle");
actor.addAnimetions(chrome.runtime.getURL("../animations/Salute.fbx"),"Salute");
actor.addAnimetions(chrome.runtime.getURL("../animations/Standing Greeting.fbx"),"Standing Greeting");
actor.addAnimetions(chrome.runtime.getURL("../animations/Walking.fbx"),"Walking");

actor.load();
actor.setAnimation("Idle");
// actor.voicedata("./Rhubarb-Lip-Sync-1.13.0-Linux/talkings.json")
actor.events();

setTimeout(()=>{
	//actor.move(10,0,0)
},10)

var el = document.createElement("div");
el.innerHTML = "<h1></h1>";
var cssobj = new CSS3DObject(el)
console.log((window.innerWidth/(window.innerWidth/window.innerHeight)))
cssobj.position.set(window.innerWidth/(window.innerWidth/window.innerHeight),0,0);
// cssobj.scale.set(.9,.9,0.9)
scenecss.add(cssobj);
// camera.translateX(300);

console.log(actor)


// scene.background = new THREE.Color( 0xffffff );
// camera.position.set(0,0,1)
//camera.scale.set(1,1,1)
// camera.lookAt( actor.model.position );
camera.zoom;
camera.position.set( 0, 2,  2 );
camera.lookAt( 0, 1.5, 0 );
//camera.fov = camera.fov * -.5;
// var oldfov = camera.fov;
camera.updateProjectionMatrix();
// csscamera.position.set( 0, 1,  800);
// camera.translateX(-.5);
// csscamera.lookAt( 0, 1, 0 );
// csscamera.fov = csscamera.fov * .5;
// csscamera.updateProjectionMatrix();
console.log(camera);
renderer.shadowMap.enabled = true;

window.addEventListener( 'resize', onWindowResize );

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
	//camera.lookAt( .6, 1.5, 0 );
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}
const listener = new THREE.AudioListener();
camera.add( listener );



function animate() {
	requestAnimationFrame( animate );
	//console.log(scene);
    const delta = clock.getDelta();
    actor.update(delta);

	render();

	
}



function render(){
	
	renderer.render( scene, camera );


}

// document.addEventListener("speak", e => {
// 	actor.GUIActions.play()
//   })

if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}
