 var ObjectId = require('mongodb').ObjectId;
//Retrieve Existing faculty
function getFaculty( req, res, conn )
{
    var query = req.query;
     conn.collection("faculty").find( query ).toArray(function( err, result){
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

//Create new faculty.
function postFaculty( req, res, conn )
{
    var body = req.body;
    conn.collection("faculty").insertMany( body, function( err, result ){
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

//Update faculty details.
function putFaculty( req, res, conn )
{
  var body=req.body;
    body._id = ObjectId(body._id);
    conn.collection("faculty").updateOne( {_id: body._id}, { $set: body }, function( err, result ){
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


//delete Faculty
function deleteFaculty( req, res, conn )
{
  var body=req.body;
    body._id = ObjectId(body._id);
    conn.collection("faculty").deleteOne( {_id: body._id}, { $set: body }, function( err, result ){
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
    getFaculty: getFaculty,
    postFaculty : postFaculty,
    putFaculty: putFaculty,
    deleteFaculty: deleteFaculty
};