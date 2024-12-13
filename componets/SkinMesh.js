export class SkinMesh{
    
    constructor(obj,influence){
        
        this.skindata ={};
        this.model = obj;
        
        
        if(obj){
            console.log(Object.entries(obj));
            if(obj.getObjectsByProperty().length > 0){
                for(var [i,item] of Object.entries(obj)){
                    
                    if(i == "children"){
                        
                        for(var j of this.recursion(item,influence) ){
                            console.log(j);
                            this.skindata[j.name] = j;
                        }
                        //console.log(this.reqirsion(item));
                        
                    }
                }
            }
            
        }
        console.log(this.skindata);
        return {"data":this.skindata,"class":this};
    }
    /**
     * This calls for the morphing of choossen part if ther is a action for it
    * @name action
    * @param {String} part
    * @param {String} morph
    * @param {String} value  
    * 
    */
    action(part,morph,value){
        //console.log(this.skindata["morphTarget"]["morphTargetDictionary"]);
        this.skindata[part].morphTargetInfluences[this.skindata["morphTarget"]["morphTargetDictionary"][morph]]=value;
    }
    
    recursion(obj,influence="",memo=[]){
        if(!obj) return;
        if(obj.length == undefined) return;
        var h={"name":"morphTarget"};
        var f ={"name":"morphTargetInfluences"};
        var morphTargetDictionaryarr = [];
        var morphTargetInfluencesarr = {};
        console.log(this);
        for(var [j,item] of Object.entries(obj)){
            console.log(j,item);
            if(Number.isInteger(parseInt(j))){
                for(var [k,l] of Object.entries(item.children)){
                    console.log(k,l);
                    var Nc = l.getObjectsByProperty("Nc");
                    if (l.type != "SkinnedMesh"){
                        continue;
                    }
                 
                    memo.push(l);
                    
                    morphTargetDictionaryarr.push(l["morphTargetDictionary"]!=null?l["morphTargetDictionary"]:{});
                    // morphTargetInfluencesarr.push(Object( l["morphTargetInfluences"]!=null?l["morphTargetInfluences"]:{}))
                    morphTargetInfluencesarr[l.name] = l["morphTargetInfluences"]!=null?l["morphTargetInfluences"]:{}
                    // if(obj.getObjectByProperty() != "Nc")
                        //this.reqirsion(k,memo);
                }
             
                //this.reqirsion(j,memo);
            }
            console.log(morphTargetDictionaryarr)
            h["morphTargetDictionary"] = morphTargetDictionaryarr[0];
            // f["morphTargetInfluences"] = morphTargetInfluencesarr;
            // console.log(memo,j,h,morphTargetDictionaryarr,f);
            memo.push(h);
            //memo.push(h);
            if(j != "Nc")
                continue;
            else if(j == "Nc")
                memo.push(item);
        }
        return (memo)? memo : obj;
    }
    // get get(){
    //     return this.skindata != undefined ? this.skindata: -1;
    // }
    // set set(node){
    //     console.log(node);
    //     //this.skindata[name] = val;
    // }
   
    
}
