
import * as THREE from "../src/THREE.js"
export class NavObjects{
    constructor(radius,width, height,color,scene,name){
        this.radius = radius;
        this.width = width;
        this.height = height;
        this.color = color
        this.scene = scene;
        this.name = name;
        this.geometry = new THREE.SphereGeometry( this.radius, this.width, this.height ); 
        this.material = new THREE.MeshBasicMaterial( { color: this.color } ); 
        this.sphere = new THREE.Mesh(this.geometry, this.material );
        this.sphere.name = this.name;
    }
    move(x,y,z){
        this.sphere.position.set(x,y,z)
    }
    load(){
        console.log(this.sphere);
        this.scene.add(this.sphere);
    }
    animate(){
        
    }
    mesh(){
        return this.sphere;
    }

    update(){

    }
}