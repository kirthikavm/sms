var question = require('../model/model');

//create and save
exports.create=(req,res)=>{

    if(!req.body){
        res.status(400).send({message:"content can not be empty"});
        return;
    }     //new questions
    const questions = new question({
        questiontype:req.body.questiontype,
        qstatus:req.body.qstatus,
        questionname:req.body.questionname,
        shortdes:req.body.shortdes,
        longquestion :req.body.longquestion,
        ansType:req.body.atype,
        tagname:req.body.tagname,
        lstinput:req.body.lstinput,
        txtans:req.body.txtans,
        answerid:req.body.answerid

    })

    //save questions
    questions
        .save(questions)
        .then(data=>{
            console.log(data);
           res.redirect('/add-question');
        })
        .catch(err=>{
            res.ststus(500).send({message:err.message||"Some error occured."});
        });
}

//retrieve all question / single question
exports.find=(req,res)=>{
    if(req.query.id){
        const id= req.query.id;
        question.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Not found user with id"});
            }else{
                res.send(data);
          }
        })
        .catch(err=>{
            res.ststus(500).send({message:err.message||"Erroe retrieving record."});
        });

    }else{
        question.find()
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({message:err.message||"Some error occured."});
    });
    }
    
}


exports.search=(req,res)=>{
    if(req.query.tname){
        const tname= req.query.tname;
        question.find({tagname:{$regex:tname}})
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Not found question with id"});
            }else{
                 res.send(data);        
            }
        })
        .catch(err=>{
            res.status(500).send({message:err.message||"Erroe retrieving record."});
        });

    }else{
        question.find()
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({message:err.message||"Some error occured."});
    });
    }

}

exports.test=(req,res)=>{
    if(req.query.tname){
        const tname= req.query.tname;
        const page =req.query.page;
        console.log(tname);
        const skip = (page-1) * 1;
        question.find({tagname:{$regex:tname}}).skip(skip).limit(1)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Not found question with id"});
            }else{
                 res.send(data);        
            }
        })
        .catch(err=>{
            res.status(500).send({message:err.message||"Erroe retrieving record."});
        });

    }else{
        question.find()
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({message:err.message||"Some error occured."});
    });
    }

}

//update 
exports.update=(req,res)=>{ 
     if(!req.body){
        res.status(404).send({message:"data to update can not be empty"});
        return;
    }
    const id= req.params.id;
    question.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:"can not update question"});
        }else{
            res.send(data);
        }
    })
    .catch(err=>{
        res.status(500).send({message:err.message||"Some error occured."});
    });
}

//delete 
exports.delete=(req,res)=>{
    const id= req.params.id;   
    question.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:"can not delete question"});
        }else{
            res.send({message:"Deleted successfully"});
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Some error occured."});
    });

}




