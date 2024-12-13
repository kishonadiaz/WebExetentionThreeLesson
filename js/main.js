import * as THREE from "../src/THREE.js"


let lcont = document.querySelector("#lessoncont");
let width = cont.getBoundingClientRect().width;
let height = cont.getBoundingClientRect().height;

const scene = new THREE.Scene();
const camera = new  THREE.PerspectiveCamera( 75, width/ height, 0.1, 1000 );

const renderer = new  THREE.WebGLRenderer({alpha:true,
    powerPreference: "high-performance",
    antialias: true});
renderer.setSize( width, height );
renderer.setAnimationLoop( animate );
lcont.appendChild( renderer.domElement );

const geometry = new  THREE.BoxGeometry( 10, 10, 10 );
const material = new  THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new  THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z =20;

camera.lookAt(cube.position)

function animate() {

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
    console.log(cube);
	renderer.render( scene, camera );

}
animate();
