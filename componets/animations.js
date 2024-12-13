import { FBXLoader } from '../examples/jsm/loaders/FBXLoader.js';


var reloadevent = new Event("reloadevent")
export class Animations{
    
    constructor(scene){
        this.CURRENTLIST ={}
        this.loader = new FBXLoader();
        this.scene =scene;
        this.activeanimation = "";
        this.animearr = []
        this.reloaded = false;
        this.animecount = 0;
        this.animations = this.scene.animations
    }
    add(loaduri, name){
        
        let animename  = name;
        let obj = {};
        obj[animename] = loaduri;

        this.CURRENTLIST[animename]={name:animename,position:this.animecount};
        this.animearr.push(obj);
        this.load();
        this.animecount++;
       
    }
    index(val){
        return this.animations[this.CURRENTLIST[val].position-1]
    }
    getObjectByName(val){
        var c,jitem;
        var children = (child,)=>{
            if(child == undefined) return;
            if(child.name == this.activeanimation){
                if(child["name"] == val) return child
                else{
                    for( var [c,jitem] of Object.entries(child))
                    {
                        if(val ==  c) return jitem;
                        else{
                            if(jitem.length > 0){
                                
                                for( var [h,pitem] of Object.entries(jitem)){
                                    if(val ==  h) return pitem;
                                    else{
                                        if(val ==  h) return pitem;
                                        
                                        if(pitem.name == undefined) {
                                            
                                            for (const [g,gitem] of pitem) {
                                                children(gitem);
                                            }
                                            
                                        }
                                        else{
                                            if(pitem.name === val){
                                                return pitem;
                                            }
                                        }
                                        
                                        children(pitem)
                                    }
                                    
                                    
                                    
                                }
                                children(jitem)
                            }else{

                            }
                        }
                          
                        children(jitem)
                    }
                    
                }
                
            }
        }
        for(var [i,item] of Object.entries(this.animations)){
            
            var c = children(item)
            if(c){
                return c
            }
            
        }
        return {};
    }
    get(val){
        return this.scene[val]
    }
    
    reload(){
        if(this.reloaded == false){
            if(this.animearr.length > 0){
                console.log(this.activeanimation);
                var name = Object.entries(this.animearr[this.CURRENTLIST["Idle"].position])[0][0];
                var uri = Object.entries(this.animearr[this.CURRENTLIST["Idle"].position])[0][1];
                console.log(this.scene.animations[this.CURRENTLIST["Idle"].position],Object.entries(this.animearr[this.CURRENTLIST["Idle"].position]));
                console.log(uri);
                this.loader.load(uri, ( object ) =>{
                    //console.log(this.scene.animations);
                    object.animations[0].name=name;
                    //console.log(object.animations[0])
                    this.animations[this.CURRENTLIST["Idle"].position]= object.animations[0];
                    //this.scene.animations = this.animations;
                
                }, undefined, function ( error ) {
                
                    console.error( error );
                
                } );
            }
            this.reloaded= true;
        }
        dispatchEvent(reloadevent);
        
        
    }
    load(){
        window.addEventListener("reloadevent",()=>{
            if(this.reloaded == true){
                setTimeout(()=>{
                    this.animations[this.CURRENTLIST["Idle"].position].clampWhenFinished = true;
                    this.reloaded = false;
                    
                },2000);
            }
        })
        if(this.animearr.length > 0){
            var name = Object.entries(this.animearr[this.animecount])[0][0];
            var uri = Object.entries(this.animearr[this.animecount])[0][1];
            //console.log(Object.entries(this.animearr[this.animecount-1])[0][1],this.animecount);
            this.loader.load(uri, ( object ) =>{
                console.log(this.scene.animations);
                object.animations[0].name=name;
            
                this.animations.push( object.animations[0] );
                this.scene.animations = this.animations;
            
            }, undefined, function ( error ) {
            
                console.error( error );
            
            } );
        }
    }
    update(){
        this.scene.animations = this.animations;
    }
}
