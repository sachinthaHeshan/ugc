const axios = require('axios')
const jsonFile = 'data.json';
const fs = require('fs');


const startIndex = 1347335;
const endIndex = 1347339;
const finalData = []
let index

const config = {
    headers: {
      'x-ibm-client-id': 'a1bb8ae0-4645-458c-b961-5fbe0265cd1e',
    }
  }

const getData = (index) => {
    axios.get(`https://apphub.mobitel.lk/mobitelint/mapis/selectedstudent/api/student?index=${index}`, config)
    .then((data) => {
        if(data.data.id != 0 && data.data.unicode=== "123P"){
            console.log(data.data.indexNo, ' - ' ,data.data.fullName)
            finalData.push(data.data);
        }
    })
    .finally(()=>{
        if(index==endIndex){
            fs.writeFileSync(jsonFile, JSON.stringify(finalData,null,2));    
        }else{
            index++;
            getData(index)
        }
      
    })
}

getData(startIndex)

// for(let index = startIndex; index<=endIndex; index++){
//     getData(index);
// }


