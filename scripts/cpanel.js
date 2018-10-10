

let userList = JSON.parse(document.querySelector('#userList').value);
let userRole = document.querySelector('#userRole').value;
// console.log(userList);

let renderedList=[];

//Display users






sortUsers = (aoi)=>{
    // console.log(userList);
    renderedList = userList.filter( function(user){
        return user.aoi === aoi;      
    })
}

displayUsers = () =>{
    document.querySelector('#Search-Results').innerHTML ="";
    renderedList.forEach((user)=>{
        let section = document.createElement('section');
       section.setAttribute('class','align-center w3-pale-blue w3-topbar w3-bottombar w3-border-black');
        section.innerHTML =`<a href="/edit?uid=${user.uid}"><div class="align-center w3-padding-16">
        <img src="http://iustlive.com/Index/examination/GetImageByRegNo.aspx?RegNo=${user.uid}" height="120px">
        <p>Name: <b>${user.fullName}</b></p>
        <p>RollNo.: <b>${user.rollNo}</b></p>
        <p>Area: <b>${user.aoi}</b></p>
        <p>Phone: <b>${user.phone}</b></p>
        <p>CGPA: <b>${user.cgpa}</b></p>
        <p>Application Status: <b>${user.state}</b></p>
        <p>Company Assigned: <b>${user.companyAssigned}</b></p>
        </div></a>
        `;
        document.querySelector('#Search-Results').appendChild(section);
    })
}



document.querySelector('#sort-option').addEventListener('click',()=>{

    let tempList = renderedList;
    let tempvalue = document.querySelector('#sort-option').value;

    console.log('Sorting Cgpa')


    if(tempvalue==='cgpa'){
        renderedList.sort(function(user1,user2){
            if(user1.cgpa < user2.cgpa)
            return 1;

            if(user1.cgpa > user2.cgpa)
            return -1;

            if(user1.cgpa === user2.cgpa)
            return 0;
        })

        
    }

    if(tempvalue==='Accepted'){
        console.log('heard here')
       renderedList = renderedList.filter((user)=>{
            return user.state === 'Accepted';
        })
    }

    if(tempvalue==='Rejected'){
        renderedList =  renderedList.filter((user)=>{
            return user.state === 'Rejected';
        })}

        if(tempvalue==='underProcess'){
           renderedList = renderedList.filter((user)=>{
                return user.state === 'underProcess';
            })
        }
    displayUsers();

    renderedList = tempList;
    
})


//control state


if(userRole === 'admin')
{
    renderedList = userList;

    displayUsers();
    
}

else {

    renderedList = userList.filter((user)=>{
        return user.aoi === userRole;
    })
    document.querySelector('#sort-aoi').style.display = "none";
    console.log('Passive Admin');
    displayUsers();
    
}


document.querySelector('#total-enroll').innerHTML = `<p>Total enrollments : ${renderedList.length} </p>`

document.querySelector('#searchBtn').addEventListener('click', function(event){
    
    let searchText = document.querySelector('#searchText').value;
    console.log(searchText);   
    let index = userList.findIndex(function(user){
        return user.uid === searchText;
    }) 

    console.log(index);

    if(index === -1)
    {
       
    }

    else {

        document.querySelector('#Search-Results').innerHTML = '';

        

        let section = document.createElement('section');
       section.setAttribute('class','align-center w3-pale-blue w3-topbar w3-bottombar w3-border-black');
        section.innerHTML =`<a href="/edit?uid=${userList[index].uid}"><div class="align-center w3-padding-16">
        <img src="http://iustlive.com/Index/examination/GetImageByRegNo.aspx?RegNo=${userList[index].uid}" height="120px">
        <p>Name: <b>${userList[index].fullName}</b></p>
        <p>RollNo.: <b>${userList[index].rollNo}</b></p>
        <p>Area: <b>${userList[index].aoi}</b></p>
        <p>Phone: <b>${userList[index].phone}</b></p>
        <p>CGPA: <b>${userList[index].cgpa}</b></p>
        <p>Application Status: <b>${userList[index].state}</b></p>
        <p>Company Assigned: <b>${userList[index].companyAssigned}</b></p>
        </div></a>
        `;
  /** <p>${userList[index].fullName}</p><br>
        <p>${userList[index].aoi}</p><br>
        <p>CGPA : ${userList[index].cgpa}</p>*/
    document.querySelector('#Search-Results').appendChild(section);

    }

})


function findUser() {
    let searchText = document.querySelector('#searchText').value;
    console.log(searchText);   
    let index = userList.findIndex(function(user){
        return user.uid === searchText;
    }) 

    console.log(index);

    if(index === -1)
    {
        return false;
    }

    else return true;

}

document.querySelector('#sort-aoi').addEventListener('click',(event)=>{
    let value = document.querySelector('#sort-aoi').value
    if(value === 'get-count'){
        console.log('change heard')
    let web=0;
    let ml=0;
    let android=0;
    let iot=0;

    userList.forEach(function(user){
        if(user.aoi === 'Web Development')
        web++;
        if(user.aoi === 'Machine Learning')
        ml++;
        if(user.aoi === 'Internet Of Things')
        iot++;
        if(user.aoi === 'Android/Swift')
        android++;

        document.querySelector('#Search-Results').innerHTML = `<div class='w3-container w3-black align-center'>
        <h5>Web Development : ${web} enrolled </h5>
        <h5>Machine Learning : ${ml} enrolled </h5>
        <h5>Internet Of Things : ${iot} enrolled </h5>
        <h5>Android/Swift : ${android} enrolled </h5>
        </div>`;
    })
    }

   else if(value == 'Web Development'){
        console.log('heard');
        sortUsers('Web Development');
        console.log(renderedList);
        displayUsers();
    }

    else if(value == 'Machine Learning'){
        console.log('heard');
        sortUsers('Machine Learning');
        console.log(renderedList);
        displayUsers();
    }
    else if(value == 'Internet Of Things'){
        console.log('heard');
        sortUsers('Internet Of Things');
        console.log(renderedList);
        displayUsers();
    }
    else if(value == 'Android/Swift'){
        console.log('heard');
        sortUsers('Android/Swift');
        console.log(renderedList);
        displayUsers();
    }



})


