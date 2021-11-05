const axios = require('axios')
const jsonFile = 'data.json';
const fs = require('fs');

let startIndex = 1347300;
let endIndex =1347500;
const speed = 50; // milliseconds

let index =startIndex;
const pending = [];
const finalData = []
const catched = []
const url ='https://apphub.mobitel.lk/mobitelint/mapis/selectedstudent/api/student'
let count = 0;

const config = {
    headers: {
      'x-ibm-client-id': 'a1bb8ae0-4645-458c-b961-5fbe0265cd1e',
    }
  }

async function getData(index) {
    axios.get(`${url}?index=${index}`, config)
    .then((data) => {
        count++;

        const pendingListItemIndex = pending.indexOf(index);
        if (pendingListItemIndex > -1) {
        pending.splice(pendingListItemIndex, 1);
        }

        if(data.data.id != 0 && data.data.unicode=== "123P"){
            finalData.push(data.data);
            fs.writeFileSync(jsonFile, JSON.stringify(finalData,null,2)); 
        }
        
    })
    .catch((error)=>{
        catched.push(error.config.url.split('=')[1])

        const pendingListItemIndex = pending.indexOf(+error.config.url.split('=')[1]);
        if (pendingListItemIndex > -1) {
        pending.splice(pendingListItemIndex, 1);
        }
    })
   
    .finally(()=>{
        if(index==endIndex){
            fs.writeFileSync(jsonFile, JSON.stringify(finalData,null,2));    
        }

        console.clear();

        console.log('\x1b[32m%s\x1b[0m', `Successfull (${count}) : `,startIndex,' - ',index); 


        console.log();
        console.log('\x1b[32m%s\x1b[0m',`Found (${finalData.length}) : `);

        finalData.forEach((finalDataOne,index)=>{
            console.log(`   [${index+1}] \x1b[35m%s\x1b[0m`, finalDataOne.indexNo, ' - ' ,finalDataOne.fullName)
        })
        

        console.log();
        console.log('\x1b[31m%s\x1b[0m',`Catched (${catched.length}) : `);

        catched.forEach((catchedOne,index)=>{
            console.log(`   [${index+1}] \x1b[31m%s\x1b[0m`, catchedOne)
        })


        console.log();
        console.log('\x1b[36m%s\x1b[0m',`Pending (${pending.length}) : `);

        pending.forEach((pendingDataOne,index)=>{
            console.log(`   [${index+1}] \x1b[35m%s\x1b[0m`, pendingDataOne)
        })

        
    })
}


const loop = setInterval(()=>{
    index ++;
    getData(index);
    pending.push(index)
    if(index === endIndex){
        clearInterval(loop)
    }
},speed)


