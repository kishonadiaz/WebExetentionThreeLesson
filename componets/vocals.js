
import * as THREE from "../src/THREE.js"

export class Vocals{
    constructor(uri){
        this.url = uri;
        this.fileloader = new THREE.FileLoader();
        this.lipsync;
        this.audio = new Audio(uri);
        
        this.audio.setAttribute("controls","true");
        console.log(this.audio);
        // this.audio.autoplay = true;
        // this.audio.load();
        this.photonics = {
            A: "viseme_PP",
            B: "viseme_kk",
            C: "viseme_I",
            D: "viseme_AA",
            E: "viseme_O",
            F: "viseme_U",
            G: "viseme_FF",
            H: "viseme_TH",
            X: "viseme_sil",
        };
        this.audiodata;
    }
    add(){

    }
    setaudiojson=(uri)=>{
        this.audiodata = uri;

        
    }
    load=(uri)=>{
        
         this.fileloader.load(
            this.audiodata,
             ( data )=> {
                this.lipsync =  JSON.parse(data);
           
        
            },
        
            // onProgress callback
            function ( xhr ) {
                console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            },
        
            // onError callback
            function ( err ) {
                console.error( 'An error happened' );
            }
        )
    }
    play=(e)=>{
   
        if(e){
            // alert("ok");
            this.audio.autoplay = true;
            this.audio.load();
            this.load();
            this.audio.play();
            
        }else{
            //this.audio.pause();
            // this.audio.addEventListener("ended",(e)=>{
            //     this.audio.currentTime =0;
            //     this.play(false);
            //     this.audio = new Audio(this.url);
                
            // })
        }
    }
    talk=(callback)=>{
    
        if(this.lipsync){
        
            const currentAudioTime = this.audio.currentTime;
            Object.values(this.photonics).forEach((val)=>{
            callback(val,0);
            });
            for(var i=0; i < this.lipsync.mouthCues.length;i++){
                const mouthCues = this.lipsync.mouthCues[i];
                if(currentAudioTime >= mouthCues.start && currentAudioTime <= mouthCues.end){
                    callback(this.photonics[mouthCues.value],1)
                    break;
                }
            }
            // if(this.audio.currentTime  <= 0){
            //     Object.values(this.photonics).forEach((val)=>{
            //         callback(val,0);
            //     });
            // }

           
        }
    }
    update(){
       
        if(this.audio.ended){
            // this.audio.addEventListener("ended",(e)=>{
            //     this.audio.currentTime =0;
            //     this.audio
            //     this.audio = new Audio(this.url);
            //     Object.values(this.photonics).forEach((val)=>{
                    
            //         });
            // })
        }
    }
}