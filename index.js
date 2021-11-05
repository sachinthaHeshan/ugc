const axios = require('axios')
const jsonFile = 'data.json';
const fs = require('fs');


const startIndex = 1347330;
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
            finalData.push(data.data);
        }

        console.clear();
        console.log('\x1b[36m%s\x1b[0m',`Found (${finalData.length}) : `);

        finalData.forEach((finalDataOne,index)=>{
            console.log(`   [${index+1}] \x1b[35m%s\x1b[0m`, finalDataOne.indexNo, ' - ' ,finalDataOne.fullName)
        })

        console.log();
        console.log('\x1b[32m%s\x1b[0m', `Successfull (${count}) : `,startIndex,' - ',index); 
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


