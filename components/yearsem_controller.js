 var ObjectId = require("mongodb").ObjectId;
//retrieve year and sem details
function getYearSem(req , res , conn)
{
    var query = req.query;
     conn.collection("yearsem").find( query ).toArray(function( err, result){
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
//create year and sem
function postYearSem(req , res , conn)
{
    var body=req.body;
    conn.collection("yearsem").insertMany(body , function(err ,result){
        if(err)
            {
                res.statusCode=500;
                res.json({"result":err.message});
            }
        else
        {
            res.json({"result":"Inserted" + " " + result.insertedCount + " " + "records" });
        }
    });
}

//update year and sem
function putYearSem(req , res , conn)
{
  var body=req.body;
    body._id = ObjectId(body._id);
    conn.collection("yearsem").updateOne( {_id: body._id}, { $set: body }, function( err, result ){
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


//delete year and sem
function deleteYearSem(req , res , conn)
{
  var body=req.body;
    body._id = ObjectId(body._id);
    conn.collection("yearsem").deleteOne( {_id: body._id}, function( err, result ){
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
module.exports=
    {
    getYearSem:getYearSem,
    postYearSem:postYearSem,
    putYearSem:putYearSem,
    deleteYearSem:deleteYearSem
};




