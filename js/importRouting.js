class ImportRouting{
    self = this;
    constructor(){
        self = this;
        this.importtag=[]
        this.builtimports = "";
        
    }
    add(alisa,fileorurl){
        this.importtag.push(`"${alisa}":"${fileorurl}"`)
    }
    build(){
        var outstring = "";
        for(var i =0; i < this.importtag.length; i++){
            if(i >= this.importtag.length){
                 outstring+= this.importtag[i];
            }else{
                outstring+= this.importtag[i]+",";
            }
        }
        this.builtimports = outstring;
    }

    apply(){
        async function hash(data) {
            const encoder = new TextEncoder();
            const dataBuffer = encoder.encode(data);
          
            const hashBuffer = await window.crypto.subtle.digest('SHA-256', dataBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
            return hashHex;
        }
          
        hash('Hello World').then(sha=>{
           
        });
      
        document.onreadystatechange = function(e)
        {
            self.build();
            console.log(document.readyState)
            if (document.readyState === 'complete')
            {
              
                var out = `
                {
                    "imports":{
                        ${self.builtimports}
                    }
                }`
        
               var illa = `<script type="importmap">${out}</script>`
                        document.head.innerHTML += illa;
                //dom is ready, window.onload fires later
            }
        };
      
    }

}
export default new ImportRouting()


