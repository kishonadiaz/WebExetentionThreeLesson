import * as THREE from "../src/THREE.js"
// import {AnimationUtils} from '../examples/jsm/utils/';
import { GLTFLoader } from '../examples/jsm/loaders/GLTFLoader.js';
import { Animations } from './animations.js';
import { SkinMesh } from './SkinMesh.js';
import { Vocals } from './vocals.js';
// import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js';

export  class Character{

    constructor(scene,renderer,camera){
        console.log(window);
        this.scene = scene;
        this.renderer = renderer;
        this.animations = new Animations(this.scene);
        this.mixer;
        this.model;
        this.skinmesh;
        this.skeleton;
        this.anime;
        this.camera = camera;
        this.whichAnimetion = "";
        //this.voice = new Vocals("./Rhubarb-Lip-Sync-1.13.0-Linux/greats.wav")
        this.GUIActions={
            //play:this.voice.play
        }
        this.target = new THREE.Object3D();
        this.target.position.z = 2;
        this.intersectionPoint = new THREE.Vector3();
        this.planeNormal = new THREE.Vector3();
        this.plane = new THREE.Plane();
        this.mousePosition = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.head;
        this.actions;
        this.activeAction;
        this.previousAction;
        this.clip;
        this.INTERCEPTED;
        this.oldheadtrack = [];
        this.lastcameraPos;
        this.initalHeadPos = new THREE.Vector3();
        // this.Tween = new TWEEN.Tween();
        this.moveback = false;
        this.nextanime = "";
        this.x = 0.0
        this.y = 0
        this.z = 0
       
    }
    setNextAnime(val){
        this.nextanime = val;
    }
    setINTERCEPTED(INTERCEPTED){
        this.INTERCEPTED = INTERCEPTED;
    }
    voicedata=(uri)=>{
        //this.voice.setaudiojson(uri);
    }
    getPosition(){
        if(this.model)
            return this.model.position;
        return undefined;
    }
    move(x,y,z){
        if(this.model)
            this.model.position.set(x,y,z);
    }
    roatate(x,y,z){
        if(this.model)
            this.model.rotation.set(0,(Math.PI / 2),0)
    }
    addAnimetions(uri,name){
        this.animations.add(uri,name);
    }
    setAnimation(name){
        setTimeout(()=>{
            this.animations.activeanimation = name;
            if(this.animations.CURRENTLIST[name].name ==  name){
               
                this.whichAnimetion = name;
               
            }
            
        },100)
       
    }
    get(val){
        return this[val];
    }
    animate(delta){
       
        // if(this.mixer){ 

        //     var anim = this.animations;
         
        //     var cli = anim.animations[anim.CURRENTLIST[this.animations.activeanimation].position];
            
        //     var anime = this.mixer.clipAction(cli);
           
            
        //     anime.play();
        //     this.mixer.update(delta);
        // }
        if(this.mixer)
            this.mixer.update(delta);
       
    }
    mouth=(cues,val)=>{
        
        
    }
    talk(callback){
        //this.voice.talk(callback)
    }
    events =()=>{
       
    }
    lookat(x,y,z){
        var arg = arguments;
        if(this.model)
            this.model.lookAt(x,y,z);
    }
    load=()=>{
        const loader = new GLTFLoader();

        
        loader.load( chrome.runtime.getURL('./models/6625fafc8be5a6962779be1e (4).glb'),( gltf )=> {

            this.model = gltf.scene;
            this.model.name = "maincharacter"
            this.skinmesh = new SkinMesh(this.model);
            this.skinmesh.name = "character"
            this.scene.add(this.model);
            //this.oldheadtrack =  this.animations.getObjectByName(this.animations.activeanimation).tracks[7].values
        //    console.log(model.getObjectByName(""),model.getObjectByProperty("material"),scene)
            // console.log(model.getObjectByName("Wolf3D_Head")["morphTargetInfluences"][skinmesh["data"]["morphTargetDictionary"]["morphTargetDictionary"].mouthSmileLeft]=1)
            
            this.mixer = new THREE.AnimationMixer(this.model);
            
            // if (blendMode !== this.clip.blendMode) {
                
            //     if (blendMode === AdditiveAnimationBlendMode) {
            //         AnimationUtils.makeClipAdditive(clip);
            //     } else {
            //         clip.blendMode = blendMode;
            //     }
            // }
            this.actions= {};
            // console.log(this.animations.getObjectByName("Head.quaternion")["valuse"]=[]);
            // for( let i =0; i < gltf.animations.length; i++){
            //     const clip = gltf.animations[i];
            //     const action = this.mixer.clipAction(clip);
            //     this.actions[clip.name] = action;
            //     console.log(clip.name);

            // }
            // for(var i=0; i< this.scene.animations[this.animations.CURRENTLIST[this.whichAnimetion].position].tracks.length; i++){
            //     this.oldheadtrack.push(this.scene.animations[this.animations.CURRENTLIST[this.whichAnimetion].position].tracks[i]);
            // }
            
            
            this.head = this.model.getObjectByName("Head");
            // this.head.name = "head"
            // this.initalHeadPos = this.head.position;
            // this.clip = this.scene.animations[this.animations.CURRENTLIST[this.whichAnimetion].position-1];
            // // this.clip.tracks.splice(3, 3);
            // this.oldheadtrack = this.scene.animations
            // console.log( this.oldheadtrack)

            this.x = this.model.position.x;
            this.y = this.model.position.y;
            this.z = this.model.position.z;
            this.model.traverse( function ( object ) {
                // console.log(object);
                //mixer = new THREE.AnimationMixer(object);
                if ( object.isMesh ) object.castShadow = true;

            } );
            //console.log(this.model);
            // this.camera.lookAt(this.model.position)
            // this.camera.updateProjectionMatrix();
            if(this.mixer){ 

                var anim = this.animations;
             
                var cli = anim.animations[anim.CURRENTLIST[this.animations.activeanimation].position];
                
                var anime = this.mixer.clipAction(cli);
               
                
                anime.play();
                
            }
            
            
            //this.voice.load();
            this.skeleton = new THREE.SkeletonHelper( this.model );
                            this.skeleton.visible = false;
                            this.scene.add(this.skeleton );

        }, undefined, function ( error ) {

            console.error( error );

        } );

        
    }
    update(delta){
        this.animate(delta)
        this.animations.update()
        //this.voice.update();
        
        
    }

}



