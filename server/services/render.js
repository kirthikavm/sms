const axios = require('axios');

exports.homeRoutes=(req,res)=>{
    //make a get request to api/question
    axios.get('http://localhost:3000/api/question')
    .then(function(response){
        res.render('index',{question:response.data});
    })
    .catch(err=>{
        res.send(err);
    });
    
}

exports.search_question = (req,res)=>{
     //make a get request to api/question
     axios.get('http://localhost:3000/api/question/searchrec')
     .then(function(response){
         res.render('search-question',{question:response.data});
     })
     .catch(err=>{
         res.send(err);
     });
}

exports.add_question = (req,res)=>{
    res.render('add_question');
}

exports.update_question = (req,res)=>{
    // Equivalent to `axios.get('http://localhost:3000/api/question?id=xxxxx')`
    axios.get('http://localhost:3000/api/question',{params:{id:req.query.id}})
    .then(function(qdata){
        res.render('update_question',{questions:qdata.data});      
    })
    .catch(err=>{
        res.send(err);
    });
}

exports.searchTag_question = (req,res)=>{
    //make a get request to api/question
    axios.get('http://localhost:3000/api/question/search',{params:{tname:req.query.tname}})
    .then(function(response){
        res.render('search-question',{question:response.data});
    })
    .catch(err=>{
        res.send(err);
    });
}

exports.testQuestion = (req,res)=>{
    //make a get request to api/question
    axios.get('http://localhost:3000/api/question/test',{params:{tname:req.query.tname,page:req.query.page}})
    .then(function(response1){
        res.render('test-question',{question:response1.data});
    })
    .catch(err=>{
        res.send(err);
    });
}

