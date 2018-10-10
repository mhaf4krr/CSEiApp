const localController = require('./localDataController');

module.exports = function(app,urlencodedParser) {

    
    let data;
    let userList = [];
    let index;
    let UserIndextoEdit;
    
    function findUserIndex(uidToFind){
        let index = userList.findIndex( (user)=>{
            return user.uid === uidToFind;
        })
        UserIndextoEdit=index;
        return index;
    }

     /* User Editing */

     app.get('/edit',function(req,res){
        console.log(req.query.uid);
        console.log(req.query);
        let index = findUserIndex(req.query.uid);
        res.render('edit',{user:userList[index],userRole:req.query.userRole,message:''});
    });

    app.post('/edit',urlencodedParser,(req,res)=>{
        console.log(req.body);
        userList[UserIndextoEdit] = req.body;
        localController.UpdateLocalData((userList));
        console.log('List Updated');
        res.render('viewSubmitted',{user:req.body});

    })


    app.get('/',(req,res)=>{
        res.render('index');
    })

   app.get('/form',(req,res)=>{
        res.render('form');
    });

    

    app.post('/DisplaySubmission',urlencodedParser, (req, res) => {
        data = req.body;
        data.uid = data.uid.toUpperCase();
        data.fullName = data.fullName.toUpperCase();
        
        res.render('DisplaySubmission',{user:req.body});
    });

    app.post('/success',urlencodedParser, (req, res) => {
        

        if(localController.ReadLocalData() === "")
        {
            console.log('Local Data Empty');
        }

        else {
            userList = localController.ReadLocalData()
            
            userList = JSON.parse(userList);   
        }


       
      

         index = userList.findIndex( function(user){
           return user.uid === data.uid;
       })

       if(index === -1) {
        
        console.log(data);
        userList.push(data);
        
       localController.UpdateLocalData((userList));
       res.render('success',{user:data});}

       else {
           res.render('alreadyRegistered',{uid:data.uid});
       }

       
    });

        // <============= LOGIN ================>

    app.get('/login',(req,res)=>{
        res.render('login',{data:{message:'',color:''}});
    })

    app.post('/login',urlencodedParser,(req,res)=>{
        let loginInfo = req.body;
        console.log(loginInfo);

        let loggedUser=loginInfo;
        
        if(loginInfo.username === 'hyder@admin' && loginInfo.password === 'root' && loginInfo.role ==='developer')
        {   
            loggedUser.name='Hyder';
            loggedUser.role='admin';

            if(localController.ReadLocalData() === "")
            {
                console.log('Local Data Empty');
            }
    
            else {
                userList = localController.ReadLocalData()
                
                userList = JSON.parse(userList);   
            }

            
            res.render('cpanel',{user:loggedUser,userlist:localController.ReadLocalData()});
        }


        if(loginInfo.username === 'benazir@iot' && loginInfo.password === 'kitchen' && loginInfo.role ==='iot')
        {   
            loggedUser.name='Benazir';
            loggedUser.role='Internet Of Things';

            if(localController.ReadLocalData() === "")
            {
                console.log('Local Data Empty');
            }
    
            else {
                userList = localController.ReadLocalData()
                
                userList = JSON.parse(userList);   
            }

            
            res.render('cpanel',{user:loggedUser,userlist:localController.ReadLocalData()});
        }

        if(loginInfo.username === 'mehvish@android' && loginInfo.password === 'android' && loginInfo.role ==='android-swift')
        {   
            loggedUser.name='Mehvish';
            loggedUser.role='Android/Swift';

            if(localController.ReadLocalData() === "")
            {
                console.log('Local Data Empty');
            }
    
            else {
                userList = localController.ReadLocalData()
                
                userList = JSON.parse(userList);   
            }

        }
            if(loginInfo.username === 'shayaan@ml' && loginInfo.password === 'machine' && loginInfo.role ==='ml')
        {   
            loggedUser.name='Shayaan';
            loggedUser.role='Machine Learning';

            if(localController.ReadLocalData() === "")
            {
                console.log('Local Data Empty');
            }
    
            else {
                userList = localController.ReadLocalData()
                
                userList = JSON.parse(userList);   
            }
            
            res.render('cpanel',{user:loggedUser,userlist:localController.ReadLocalData()});
        }

    })



    //download Local Data

    app.get('/AdminData', function (req, res) {
 
        res.download('./locale/data.txt', function (err) {
            
            console.log(err);})});
     
       //===================================================  USER DELETION +++++++++++++++++?++++++++++++++++++++++++++++>

       app.get('/deleteUser',(req,res)=>{
            console.log(req.query);
            let index =  userList.findIndex( function(user){
                return req.query.user === user.uid }) 
            

            if(req.query.userRole === 'admin') {
            
         

            console.log(`deleted user :${userList[index].uid} , name: ${userList[index].fullName}`);
            userList.splice(index,1);
            localController.UpdateLocalData((userList));
            res.render('edit',{user:'',userRole:'admin',message:'USER HAS BEEN REMOVED'});


        }


           else { res.render('edit',{user:userList[index],userRole:req.query.userRole,message:'You are NOT AUTHORIZED !'});

         }})


    app.get('/viewSubmitted',(req,res)=>{
        res.render('viewSubmitted',{user:userList[index]});
    })


    app.get('/status',(req,res)=>{
        res.render('status',{data:''})
    })

    app.post('/status',urlencodedParser,(req,res)=>{
        let tempData = req.body;
        

        if(localController.ReadLocalData() === "")
        {
            console.log('Local Data Empty');
        }

        else {
            userList = localController.ReadLocalData()
            
            userList = JSON.parse(userList);   
        }

        let exists =  userList.findIndex( function(user){
            return user.uid === tempData.uid;
        })

        if(exists === -1)
        {
            let details = {state : 'Doesnot Exist',
            stateColor : 'w3-red',
            companyAlloted : 'Not Available',
            companyAllotedColor :'w3-pale-red',
            message :'Application does not Exist. Please Register!',
            messageColor:'w3-pale-red'
        }

            res.render('status',{data:details});
        }

        if(userList[exists].state === 'Rejected')
        {
            let details = {
                state : 'Rejected',
                stateColor : 'w3-red',
                companyAlloted : 'Not Possible',
                companyAllotedColor :'w3-pale-red',
                message :'Application has been Submitted',
                messageColor:'w3-pale-green'
            }
            

            res.render('status',{data:details});
        }

        else {
            let details = {
                state : userList[exists].state,
                stateColor : 'w3-green',
                companyAlloted : userList[exists].companyAlloted,
                companyAllotedColor :'w3-pale-green',
                message :'Application has been Submitted',
                messageColor:'w3-pale-green'
            }

            res.render('status',{data:details});
        }
        
    })

   

}