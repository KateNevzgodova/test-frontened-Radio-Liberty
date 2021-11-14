import "../styles/index.scss";

window.addEventListener ("load", function(){
    
    renderList();
    
    document.getElementById('button_add').addEventListener('click',addNewHash);

    document.getElementById('add_tag').addEventListener('keydown',function (event) {
        if (event.keyCode === 13){
            addNewHash();
        }
    }); 
   
    window.addEventListener('hashchange',function(){
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

    resultTags.tags.forEach((item,index)=>{
        let elementList = document.createElement('li');
        elementList.addEventListener('click',()=>{deleteHash(resultTags.tags, index)});
        elementList.innerText = item;
        list.appendChild(elementList);
    });

}

function deleteHash(tags,currentIndex){
    const newTags = tags.filter((_,indexTag)=>{
        if (indexTag!=currentIndex){
            return true;
        }
        return false;
    })             
    const newHash = `#tags=${newTags.join(',')}`;
    const url = window.location;
    url.hash = newHash;
}
function addNewHash(){
    const inputValue = document.getElementById('add_tag').value;
    if(inputValue){
        
        const resultTags = hashParse();
        const newHash = `#tags=${resultTags.tags.join(',')}${resultTags.tags.length>0 ? ',' : ''}${inputValue}`;
        const url = window.location;
        url.hash = newHash;
        document.getElementById('add_tag').value='';
    }    
}

function hashParse(){
        
     const url = window.location;
     const {hash} = url;

    // 1 case - without hash
    if (!hash){
        const urlHash =`${url.origin}#tags=red,blue,purple`;
        window.location.replace(urlHash);
        return;
    }
    

    // 2 case - with wrong hash
    const parseParams = hash.split('=');
   
    if(parseParams[0]!=='#tags'){
         return {
             errorText:'Wrong hash!',
             tags:[]
        }
    } else if(!parseParams[1]){
        // 3 case - with empty params
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