function htmlToEditorJs(html, memo=[] ,customTags = {}) {
    const parser = new DOMParser();
    const documents = parser.parseFromString(html, 'text/html');
    const blocks = memo;
   
    
    for(var i=0; i < documents.body.children.length; i++){
      var child = documents.body.children[i];
      console.log(documents.body.children);
      if (child.nodeType === 1) { // Element nodes
        const tagName = child.tagName.toLowerCase();
          switch (tagName) {
            case 'p':
              blocks.push({
                type: 'paragraph',
                data: { text: child.innerHTML }
              });
              break;
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'h6':  
              blocks.push({
                type: 'header',
                data: {
                  text: child.textContent,
                  level: parseInt(tagName[1]) // Extract level from tag name (e.g., h2 -> 2)
                }
              });
              break;
            case 'ul':
              const unorderedItems = Array.from(child.querySelectorAll('li')).map(li => li.textContent);
              blocks.push({
                type: 'list',
                data: { style: 'unordered', items: unorderedItems }
              });
              break;
            case 'ol':
              const orderedItems = Array.from(child.querySelectorAll('li')).map(li => li.textContent);
              blocks.push({
                type: 'list',
                data: { style: 'ordered', items: orderedItems }
              });
              break;
            case 'div':
              console.log(child)
              var diviems = Array.from(child.childNodes).map(childr => { return findchldren(childr.innerHTML,blocks);});
              console.log(diviems,"asgldfhkasjdgkldsfh");
              blocks.push({
                
                type: 'div',
                data: {items: diviems }
              });
              break;
            case 'a':
              blocks.push({
                type: 'link',
                data: {
                  text: node.textContent,
                  href: node.href
                }
              });
              break;
            case 'video':
              console.log(child)
              // var diviems = Array.from(child.childNodes).map(child => { return findchldren(child.innerHTML,blocks);});
              // console.log(diviems,Array(child.childNodes).map(child => { return findchldren(child.innerHTML,blocks)}),"asjdgkldsfh");
              blocks.push({
                type: 'video',
                data: {
                  data: {items:"dsfff"},
                }
              });
              break;
            case 'audio':
              console.log(child)
              // var diviems = Array.from(child.childNodes).map(child => { return findchldren(child.innerHTML,blocks);});
              // console.log(diviems,Array(child.childNodes).map(child => { return findchldren(child.innerHTML,blocks)}),"kldsfh");
              blocks.push({
                type: 'audio',
                data: {
                  data: {items:"sd.kfjhlkdgs"},
                }
              });
              break;
            case 'source':
              console.log(child)
              blocks.push({
                type: 'source',
                data: {
                  src: {items:child.src},
                }
              });
            break;
            default:
              console.log(`Unhandled tag: ${tagName}`);
            }
        }
      }
      findchldren(child,blocks);
    
    // var h1,h2,h3,h4,h5,h6;
    // var div,p,a,li,ul,ol;
    // var video,audio,image,source;
    // h1 = documents.querySelectorAll("h1");
    // h2 = documents.querySelectorAll("h2");
    // h3 = documents.querySelectorAll("h3");
    // h4 = documents.querySelectorAll("h4");
    // h5 = documents.querySelectorAll("h5");
    // h6 = documents.querySelectorAll("h6");
    // // h1 = documents.querySelectorAll("h1");

    // div = documents.querySelectorAll("div");
    // p = documents.querySelectorAll("p");
    // a = documents.querySelectorAll("a");
    // li = documents.querySelectorAll("li");
    // ul = documents.querySelectorAll("ul");
    // ol = documents.querySelectorAll("ol");

    // video = documents.querySelectorAll("video");
    // audio = documents.querySelectorAll("audio");
    // image = documents.querySelectorAll("image");
    // source = documents.querySelectorAll("source");





    // documents.body.childNodes.forEach(node => {

    //   // if (node.nodeType === Node.ELEMENT_NODE) {
    //   //   // Case-insensitive comparison
    //   //   if (node.tagName.toLowerCase() === "audio") {
    //   //     // Do something with the audio element
    //   //     console.log(node); 
    //   //   }
    //   // }
    //   // if (node.nodeType === 1) { // Element nodes
    //   //   const tagName = node.tagName.toLowerCase();
    //   //   console.log(tagName);
    //   //   // Handle custom tags
    //   //   if (customTags[tagName]) {
    //   //     const customBlock = customTags[tagName](node);
    //   //     if (customBlock) blocks.push(customBlock);
    //   //     return;
    //   //   }
  
    //   //   // Handle default tags
    //   //   switch (tagName) {
    //   //     case 'p':
    //   //       blocks.push({
    //   //         type: 'paragraph',
    //   //         data: { text: node.innerHTML }
    //   //       });
    //   //       break;
    //   //     case 'h1':
    //   //     case 'h2':
    //   //     case 'h3':
    //   //     case 'h4':
    //   //     case 'h5':
    //   //     case 'h6':  
    //   //       blocks.push({
    //   //         type: 'header',
    //   //         data: {
    //   //           text: node.textContent,
    //   //           level: parseInt(tagName[1]) // Extract level from tag name (e.g., h2 -> 2)
    //   //         }
    //   //       });
    //   //       break;
    //   //     case 'ul':
    //   //       const unorderedItems = Array.from(node.querySelectorAll('li')).map(li => li.textContent);
    //   //       blocks.push({
    //   //         type: 'list',
    //   //         data: { style: 'unordered', items: unorderedItems }
    //   //       });
    //   //       break;
    //   //     case 'ol':
    //   //       const orderedItems = Array.from(node.querySelectorAll('li')).map(li => li.textContent);
    //   //       blocks.push({
    //   //         type: 'list',
    //   //         data: { style: 'ordered', items: orderedItems }
    //   //       });
    //   //       break;
    //   //     case 'div':
    //   //       console.log(node)
    //   //       var diviems = Array.from(node.childNodes).map(child => { return findchldren(child.innerHTML,blocks);});
    //   //       console.log(diviems,Array(node.childNodes).map(child => { return findchldren(child.innerHTML,blocks)}),"asgldfhkasjdgkldsfh");
    //   //       blocks.push({
              
    //   //         type: 'div',
    //   //         data: {items: diviems }
    //   //       });
    //   //       break;
    //   //     case 'a':
    //   //       blocks.push({
    //   //         type: 'link',
    //   //         data: {
    //   //           text: node.textContent,
    //   //           href: node.href
    //   //         }
    //   //       });
    //   //       break;
    //   //     case 'video':
    //   //       console.log(node)
    //   //       var diviems = Array.from(node.childNodes).map(child => { return findchldren(child.innerHTML,blocks);});
    //   //       console.log(diviems,Array(node.childNodes).map(child => { return findchldren(child.innerHTML,blocks)}),"asjdgkldsfh");
    //   //       blocks.push({
    //   //         type: 'video',
    //   //         data: {
    //   //           data: {items:diviems},
    //   //         }
    //   //       });
    //   //       break;
    //   //     case 'source':
    //   //       console.log(node)
    //   //       blocks.push({
    //   //         type: 'source',
    //   //         data: {
    //   //           src: {items:node.src},
    //   //         }
    //   //       });
    //   //     break;
    //   //     case 'audio':
    //   //       console.log(node)
    //   //       var diviems = Array.from(node.childNodes).map(child => { return findchldren(child.innerHTML,blocks);});
    //   //       console.log(diviems,Array(node.childNodes).map(child => { return findchldren(child.innerHTML,blocks)}),"kldsfh");
    //   //       blocks.push({
    //   //         type: 'audio',
    //   //         data: {
    //   //           data: {items:diviems},
    //   //         }
    //   //       });
    //   //       break;
    //   //     default:
    //   //       console.log(`Unhandled tag: ${tagName}`);
    //   //   }
    //   // }
    // });
  
    return {
      time: Date.now(),
      blocks,
      version: '2.30.7'
    };
  }
  var findchldren = (elem,memo=[],customTags={})=>{
    if(elem == undefined)
      return;
    if(elem.length < 0)
      return;
    var out  = memo;
    var blocks = [];

    var child = htmlToEditorJs(elem,blocks);
    if(child){
      if(child.children.length> 0){
        for(var i =0; i < child.children.length; i++){
          console.log(htmlToEditorJs(child.children[i].innerHTML,blocks));
        }
      }
    }
    
    
    return blocks;
    // if(elem == undefined)
    //   return;
    
    // const parser = new DOMParser();
    // const documents = parser.parseFromString(elem, 'text/html');
    // const blocks = i;
    // var  out = {
    //   time: Date.now(),
    //   blocks,
    //   version: '2.30.7'
    // };
    // if(documents){
    //   console.log(documents)
    //   if(elem.childNodes)
    //   {
        
    //   }
    // }
    // console.log(documents);
    // documents.body.childNodes.forEach(node => {
    //   // if (node.nodeType === 1) { // Element nodes
    //   //   const tagName = node.tagName.toLowerCase();
  
    //   //   // Handle custom tags
    //   //   if (customTags[tagName]) {
    //   //     const customBlock = customTags[tagName](node);
    //   //     if (customBlock) blocks.push(customBlock);
    //   //     return;
    //   //   }
  
    //   //   // Handle default tags
    //   //   switch (tagName) {
    //   //     case 'p':
    //   //       blocks.push({
    //   //         type: 'paragraph',
    //   //         data: { text: node.innerHTML }
    //   //       });
    //   //       break;
    //   //     case 'h1':
    //   //     case 'h2':
    //   //     case 'h3':
    //   //     case 'h4':
    //   //     case 'h5':
    //   //     case 'h6':  
    //   //       blocks.push({
    //   //         type: 'header',
    //   //         data: {
    //   //           text: node.textContent,
    //   //           level: parseInt(tagName[1]) // Extract level from tag name (e.g., h2 -> 2)
    //   //         }
    //   //       });
    //   //       break;
    //   //     case 'ul':
    //   //       const unorderedItems = Array.from(node.querySelectorAll('li')).map(li => li.textContent);
    //   //       blocks.push({
    //   //         type: 'list',
    //   //         data: { style: 'unordered', items: unorderedItems }
    //   //       });
    //   //       break;
    //   //     case 'ol':
    //   //       const orderedItems = Array.from(node.querySelectorAll('li')).map(li => li.textContent);
    //   //       blocks.push({
    //   //         type: 'list',
    //   //         data: { style: 'ordered', items: orderedItems }
    //   //       });
    //   //       break;
    //   //     case 'div':
    //   //       var diviems = Array.from(node.childNodes).map(child => { return findchldren(child.innerHTML,blocks);});
    //   //       console.log(diviems,Array(node.childNodes).map(child => { return findchldren(child.innerHTML,blocks)}),"asgldfhkasjdgkldsfh");
    //   //       blocks.push({
              
    //   //         type: 'div',
    //   //         data: {items: diviems }
    //   //       });
    //   //       break;
    //   //     case 'a':
    //   //       blocks.push({
    //   //         type: 'link',
    //   //         data: {
    //   //           text: node.textContent,
    //   //           href: node.href
    //   //         }
    //   //       });
    //   //       break;
    //   //     case 'video':
    //   //       var diviems = Array.from(node.childNodes).map(child => { return findchldren(child.innerHTML);});
    //   //       console.log(diviems,Array(node.childNodes).map(child => { return findchldren(child.innerHTML)}),"asgldfhkasjdgkldsfh");
    //   //       blocks.push({
    //   //         type: 'video',
    //   //         data: {
    //   //           data: {items:diviems},
    //   //         }
    //   //       });
    //   //       break;
    //   //     case 'audio':
    //   //       var diviems = Array.from(node.childNodes).map(child => { return findchldren(child.innerHTML);});
    //   //       console.log(diviems,Array(node.childNodes).map(child => { return findchldren(child.innerHTML)}),"asgldfhkasjdgkldsfh");
    //   //       blocks.push({
    //   //         type: 'audio',
    //   //         data: {
    //   //           data: {items:diviems},
    //   //         }
    //   //       });
    //   //       break;
    //   //     default:
    //   //       console.log(`Unhandled tag: ${tagName}`);
    //   //   }
    //   // }
      
    //   if(node.lenght > 0){
    //     out = htmlToEditorJs(String(node.innerHTML),blocks);
    //   }else if(node.childNodes.length > 0){
    //     node.childNodes.forEach(noesd=>{
    //       out = htmlToEditorJs(String(noesd.innerHTML),blocks);
    //     })
        
    //   }
    //   return out;
    // })
    // if(elem == undefined)
    //     return;
    
   
    // if(elem.length > 0){
    //   for(var i=0;i < elem.length; i++){
    //     console.log(elem[i]);
    //   }
    // }else if(elem.childNodes.length > 0){
    //   for(var i=0;i < elem.childNodes.length; i++){
    //     console.log(elem.childNodes[i]);
    //   }
    // }
    // for(var i=0;elem.childNodes.length; i++){
    //     console.log(elem);
    //     //console.log(htmlToEditorJs(elem.childNodes[i]).innerHTML);

    // }
    return;
    
  }
  export default htmlToEditorJs;