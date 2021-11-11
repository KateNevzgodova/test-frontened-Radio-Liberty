import "../styles/index.scss";

window.addEventListener ("load", function(){
    
    renderList();
    
    document.getElementById('button_add').addEventListener('click', function(){
        const inputValue = document.getElementById('add_tag').value;
        if(inputValue){
            console.log(inputValue);
            const resultTags = hashParse();
            const newHash = `#tags=${resultTags.tags.join(',')},${inputValue}`;

            const url = window.location;
            url.hash = newHash;
            document.getElementById('add_tag').value='';
        }
        
    })
    
    
   
    window.addEventListener('hashchange',function(){
        console.log('hash changed!');
        clear();
        renderList();
    })

})
function clear(){
    document.querySelector('.error').innerText='';
    document.getElementById('tags').innerHTML='';
}
function renderList(){
    const resultTags = hashParse();

    document.querySelector('.error').innerText=resultTags.errorText;
    const list =document.getElementById('tags');
    resultTags.tags.forEach((item)=>{
        let elementList = document.createElement('li');
        elementList.innerText = item;
        list.appendChild(elementList);
    }
    );
}

function hashParse(){
        
     const url = window.location;
    console.log(url.hash);
    const {hash} = url;

    // 1 case - without hash
    if (!hash){
        const urlHash =`${url.origin}#tags=red,blue,purple`;
        window.location.replace(urlHash);
        return;
    }
    

    // 2 case - with wrong hash
    const parseParams = hash.split('=');
    console.log(parseParams);
    if(parseParams[0]!=='#tags'){
         console.log('wrong hash!');
         return {
             errorText:'Wrong hash!',
             tags:[]
        }
    } else if(!parseParams[1]){
        // 3 case - with empty params
         console.log('empty tags!');

         return {
            errorText:'Empty tags!',
            tags:[]
       }
    } else{
        // 4 case - render tags
        const tags = parseParams[1].split(',');
        
        return {
            errorText:"",
            tags
       }
    }
}