 var ObjectId = require('mongodb').ObjectId;
//retrieve department
function getDepartment(req ,res ,conn)
{
    var query = req.query;
     conn.collection("department").find( query ).toArray(function( err, result){
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
//create department
function postDepartment(req ,res ,conn)
{
    var body = req.body;
    conn.collection("department").insertMany( body, function( err, result ){
        if( err )
            {
                res.statusCode = 500;
                res.json({"result":err.message});
            }
        else
        {
            res.json({"result":"Inserte " + result.insertedCount + " records "});
        }
    } );
}

//update department
function putDepartment(req ,res ,conn)
{
  var body=req.body;
    body._id = ObjectId(body._id);
    conn.collection("department").updateOne( {_id: body._id}, { $set: body }, function( err, result ){
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

//delete department
function deleteDepartment(req ,res ,conn)
{
  var body=req.body;
    body._id = ObjectId(body._id);
    conn.collection("department").deleteOne( {_id: body._id}, { $set: body }, function( err, result ){
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

module.exports={
    getDepartment: getDepartment,
    postDepartment: postDepartment,
    putDepartment: putDepartment,
    deleteDepartment: deleteDepartment
};