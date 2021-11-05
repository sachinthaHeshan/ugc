const axios = require('axios')
const jsonFile = 'data.json';
const fs = require('fs');


const startIndex = 1347235;
const endIndex = 1347339;
const finalData = []
let count = 0;
let index;

const config = {
    headers: {
      'x-ibm-client-id': 'a1bb8ae0-4645-458c-b961-5fbe0265cd1e',
    }
  }

const getData = (index) => {
    axios.get(`https://apphub.mobitel.lk/mobitelint/mapis/selectedstudent/api/student?index=${index}`, config)
    .then((data) => {
        count++;

        if(data.data.id != 0 && data.data.unicode=== "123P"){
            console.log(data.data.indexNo, ' - ' ,data.data.fullName)
            finalData.push(data.data);
        }

        console.clear();
        console.log(`Found (${finalData.length}) : `);

        finalData.forEach((finalDataOne)=>{
            console.log('   ',finalDataOne.indexNo, ' - ' ,finalDataOne.fullName)
        })

        console.log('\n');
        console.log(`Successfull (${count}) : `,index);
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


