const fs = require('fs');

function UpdateLocalData(data) {
    fs.writeFileSync('./locale/data.txt',JSON.stringify(data),'utf8');
}

function ReadLocalData()
{
    let data = fs.readFileSync('./locale/data.txt','utf8');
    return data;
}

module.exports = {
    UpdateLocalData :UpdateLocalData,
    ReadLocalData : ReadLocalData
};