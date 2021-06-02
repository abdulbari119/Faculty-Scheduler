 var ObjectId = require("mongodb").ObjectId;
//retrieve subjects
function getSubject(req , res , conn)
{
    var query = req.query;
     conn.collection("subject").find( query ).toArray(function( err, result){
         if(err)
         {
          res.statusCode = 500;      
          res.json({"result" : err.message});
         }
         else
         {
              res.json({"result" : result});
         }
     });
   
}

//create subjects
function postSubject(req , res , conn)
{
    var body = req.body;
    conn.collection("subject").insertMany( body, function( err, result ){
        if( err )
            {
                res.statusCode = 500;
                res.json({"result":err.message});
            }
        else
        {
            res.json({"result":"Inserted " + result.insertedCount + " records "});
        }
    } );
}

//update subjects
function putSubject(req , res , conn)
{
  var body=req.body;
    body._id = ObjectId(body._id);
    conn.collection("subject").updateOne( {_id: body._id}, { $set: body }, function( err, result ){
        if( err )
            {
                res.statusCode = 500;
                res.json({"result":err.message});
            }
        else
        {
            res.json({"result":"Updated " + result.result.n + " record "});
        }
    } );
    
}

//delete subjects
function deleteSubject(req , res , conn)
{
  var body=req.body;
    body._id = ObjectId(body._id);
    conn.collection("subject").deleteOne( {_id: body._id}, function( err, result ){
        if( err )
            {
                res.statusCode = 500;
                res.json({"result":err.message});
            }
        else
        {
            res.json({"result":"deleted " + result.deletedCount+ " record "});
        }
    } );
    
}
module.exports = {
    getSubject: getSubject,
    postSubject : postSubject,
    putSubject: putSubject,
    deleteSubject: deleteSubject
};