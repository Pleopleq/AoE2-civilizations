class UI {
    constructor(){
    this.civInfo = document.querySelector('.blockContainer__civ');
    this.civUnit = document.querySelector('.blockContainer__unit');
    }
    printCiv(civilizations){
        //Init a new API object so i can make the call when the new button is in the page
        const api = new API;
        let output = '';
        civilizations.forEach(function(civ){
        //Make a new ul FOREACH civilizations in the JSON response and adding the call of the function
        //api.getUnit
        output  += `
        <ul>
            <li><strong>${civ.name}</strong></li>
            <li>Expansion: ${civ.expansion}</li>
            <li><button onclick="api.getUnit('${civ.unique_unit[0]}')" class="blockContainer__civ-uniqueUnit"><a href="#">Unique unit</a></button></li>
        </ul>
        `
    });
    this.civInfo.innerHTML = output;
    }
//Function that is called when the button in the list of civs is clicked
    printUnit(unit, cost, key){
        this.civUnit.innerHTML = `
        <h1>${unit.name}</h1>
        <p>${unit.description}</p>
        <ul>
            <li>Age: ${unit.age} age</li>
            <p><strong>Cost:</strong></p>
            <ul>
                <li> ${cost[0]} - ${key[0]} </li>
                <li>${cost[1]} - ${key[1]}</li>
            </ul>
        </ul>
        `
    }
}

class API {
    //this async funtion give fetch the AoE2 API for all the civs in the game
    async getCivs(){
        const civResponse = await fetch("https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations");
        const civilizations = await civResponse.json();
        console.log(civilizations);
        return civilizations 
    }
    //this async function give me the Unique Unit that every civ has. 
    async getUnit(name){
        //init a new UI instance so i can print the unit in the UI when the fetch is done
        const ui = new UI;
        const unitResponse = await fetch(name);
        const uniqueUnit = await unitResponse.json();
        console.log(uniqueUnit);
        //Because the cost of the unit is in an objet i use the Object.keys/values to store
        //then inside of an array so is more easy to manage
        const keyCostUnit = Object.keys(uniqueUnit.cost)
        const costUnit = Object.values(uniqueUnit.cost);
        ui.printUnit(uniqueUnit, costUnit, keyCostUnit);
        return uniqueUnit;
    }
}


const ui = new UI;
const api = new API;

const buttonFetch = document.getElementById('fetch-data');

//Function for the first button that fetch all the civs
buttonFetch.addEventListener('click', () => {
    api.getCivs()
    .then(data =>{
        if(data === '') {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
          } else {
              ui.printCiv(data.civilizations);
          }
    })

})



// const unitInfo = document.querySelector('blockContainer__civ').addEventListener('click',function(e){
//     if(e.target && e.target.className === 'blockContainer__civ-unit'){
//     const id = e.target.data.civilizations.id;
//     console.log(id)
//      }
//  });


