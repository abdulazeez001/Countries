const fetchDataByName = async(name)=>{
    if(name){
        if (REGION.indexOf(name)>-1){
            const response = await axios.get(`https://restcountries.eu/rest/v2/region/${name}` )
            return reduceToEight(response.data)
        }
        else{
            const response = await axios.get(`https://restcountries.eu/rest/v2/name/${name}` )
            return response.data[0]
        }
    }
    else{
        const response = await axios.get(`https://restcountries.eu/rest/v2/all` )
        return reduceToEight(response.data)  
    }  
}

const reduceToEight = async (data,num=12)=>{
    let randomItems = {}
    const numOfItems = await Object.keys(data).length
    
    while (Object.keys(randomItems).length<num){
        let randomVal = Math.floor(Math.random()*numOfItems)
        randomItems[randomVal] = data[randomVal]
    }

    return randomItems
}

const createDiv=(items,item)=>{
    let tag = document.createElement('div')
    
        tag.setAttribute('class','country') 
        tag.innerHTML = `
               
                    <img src=${item.flag} width="280px" height="150px">
                    <a href="about.html#${item.name}"><h6>${item.name}</h6></a>
                    <p><span>Population: </span>${item.population}</p>
                    <p><span>Region: </span>${item.region}</p>
                    <p><span>Capital: </span>${item.capital}</p>
                
                
            `
        
        items.appendChild(tag)
}
const createSecondPageDiv= async(items,item)=>{
    let tag = document.createElement('div')
    
        tag.setAttribute('class','country') 
        tag.setAttribute('class','row')
        let languages =item.languages.reduce((language,index)=>{return language.concat(`${index.nativeName}`)},[])
        let borders =item.borders.reduce((border,index)=>{return border.concat(`<button>${index}</button>`)},[])
        tag.innerHTML = `
               <div class="col-md-6">
                   <img src=${item.flag} width="400px" height="250px">
               </div>

               <div class="col-md-6">
                  <div class="row">
                         <a href="about.html#${item.name}"><h6>${item.name}</h6></a>
                  </div>
                  <div class="row">
                        <div class="col-md-6">
                        <p><span>Native name: </span>${item.nativeName}</p>
                        <p><span>Population: </span>${item.population}</p>
                        <p><span>Region: </span>${item.region}</p>
                        <p><span>Sub Region: </span>${item.subregion}</p>
                        <p><span>Capital: </span>${item.capital}</p>
                        </div>
                        <div class="col-md-6">
                        <p><span>Top Level Domain: </span>${item.topLevelDomain[0]}</p>
                        <p><span>Currencies: </span>${item.currencies[0].name}</p>
                        <p><span>Languages: </span>${languages}</p>
                        <p><span>Time Zone: </span>${item.timezones[0]}</p>
                        </div>
                  </div>
                  <div class="row pd">
                        <p><span>Borders Countries: </span>${borders}</p>
                  </div>
                  

           
               </div>

                
            `
        
        items.appendChild(tag)
}

const postCountries= async(items,name,createMyDiv)=>{
    if(!name||REGION.indexOf(name)>-1){

        name ? countriesData =await fetchDataByName(name):countriesData =await fetchDataByName();
        const val = Object.values(countriesData)
        val.forEach((item)=>{
          createMyDiv(items,item)
        })
        console.log(window.location.pathname)
    }
    else{
        item =await fetchDataByName(name)
        createMyDiv(items,item)
    }    
}

let changeMode = function(mode_btn){
    countryDiv = document.querySelectorAll(".country")
    if (countryDiv.length>1){
        countryDiv.forEach((div)=>{
            div.id=='' ? div.id="shadow":div.id='';
        }) 
    }else if(countryDiv.length==1){
        countryDiv[0].id=='' ? countryDiv[0].id="shadow":countryDiv[0].id='';
    }
    if(input && select && submit){
        input.id=='' ? input.id="shadow":input.id='';
        select.id=='' ? select.id="shadow":select.id='';
        submit.id=='' ? submit.id="shadow":submit.id='';
    }
    if(btn){
        btn.id=='' ? btn.id="shadow":btn.id='';
    }
    
    
    mode_btn.id == 'light' ?  mode_btn.id = 'top-dark-mode' :  mode_btn.id = 'light';
    document.body.id=='dark-mode' ? document.body.id='light-mode': document.body.id='dark-mode';
    isInDarkMode == false ? isInDarkMode=true:isInDarkMode=false;
}



const REGION = ["Africa","Americas","Asia","Europe","Oceania"]
let countriesData;
let countries =  document.querySelector('.countries')
let countriesTwo =  document.querySelector('.countries-two')
let input = document.querySelector('input')
let submit = document.querySelector('.submit')
let select = document.querySelector('select')
let darkMode = document.querySelector('.dark-mode')
let topElement = document.querySelector(".top")
let countryDiv;
let isInDarkMode = false;
let btn = document.querySelector(".btn")

if(submit){
    submit.addEventListener('click',async ()=>{
    
        //console.log(countryDiv)
        select.value = ''
        countries.innerHTML=''
        await postCountries(countries,input.value,createDiv)
        if (isInDarkMode==true){
            countryDiv = document.querySelectorAll(".country")
        if (countryDiv.length>1){
            countryDiv.forEach((div)=>{
                div.id=='' ? div.id="shadow":div.id='';
            }) 
        }else if(countryDiv.length==1){
            countryDiv[0].id=='' ? countryDiv[0].id="shadow":countryDiv[0].id='';
        }
        }
        
    })
    
}

if (select){
    select.addEventListener('change',(e)=>{

        if(countriesData){
            const country = Object.values(countriesData).filter((country)=>{
                return country.region == e.target.value
            })
            countries.innerHTML=''
            country.forEach((country)=>{
              createDiv(countries,country)
            })  
            
        }
        if (isInDarkMode==true){
            countryDiv = document.querySelectorAll(".country")
        if (countryDiv.length>1){
            countryDiv.forEach((div)=>{
                div.id=='' ? div.id="shadow":div.id='';
            }) 
        }else if(countryDiv.length==1){
            countryDiv[0].id=='' ? countryDiv[0].id="shadow":countryDiv[0].id='';
        }
        }
    
    })
}


darkMode.addEventListener('click',()=>{changeMode(topElement)})

if(window.location.href.split("/").splice(-1,).join(``).split("#")[0]!="about.html"){

    input.value ? postCountries(countries,input.value,createDiv) : postCountries(countries,item='',createDiv)
}


