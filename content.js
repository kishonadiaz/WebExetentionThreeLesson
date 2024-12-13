let cont = document.createElement("div");
cont.id = "lessoncont";
document.body.append(cont);

(async ()=>{
    // const importing  = await import(chrome.runtime.getURL("js/importRouting.js"))
    // console.log(importing);
    // importing.default.add("three",chrome.runtime.getURL("/src/THREE.js"));
    // importing.default.build();
    // importing.default.apply();
    const src = chrome.runtime.getURL("js/main.js?v=2")
    const contentMain = await import(src);
   
 
  
})();
