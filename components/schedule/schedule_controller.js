

var ObjectId = require('mongodb').ObjectId;
//retrieve Schedule
function getSchedule(req ,res ,conn)
{
    var query = req.query;
     conn.collection("subject").aggregate([
         {
           $match: query  
         },
        {
            $set: {
                _id: {
                    $toString: "$_id"
                } 
            }
        },
         {
             $lookup:{
                 from: 'schedule',
                 localField:'_id',
                 foreignField:'subject',
                 as:'scheduleDetails'
             }
         },
         {
             $unwind:{path:'$scheduleDetails'}
         },
          {
            $set: {
                faculty: {
                    $toObjectId: "$faculty"
                } 
            }
        },
         {
             $lookup:{
                 from: 'faculty',
                 localField: 'faculty',
                 foreignField:'_id',
                 as: 'facultyDetails'
             }
         },
         {
             $unwind: {path: '$facultyDetails'}
         },
         {
             $sort:{
                 "scheduleDetails.start": 1
             }
         }
     ]).toArray(function( err, result){
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
//create Schedule
function postSchedule(req ,res ,conn)
{
    var body = req.body;
    conn.collection("schedule").insertMany( body, function( err, result ){
        if( err )
            {
                res.statusCode = 500;
                res.json({"result":err.message});
            }
        else
        {
            res.json({"result":"Inserteds " + result.insertedCount + " records "});
        }
    } );
}

//update Schedule
function putSchedule(req ,res ,conn)
{
  var body=req.body;
    body._id = ObjectId(body._id);
    conn.collection("schedule").updateOne( {_id: body._id}, { $set: body }, function( err, result ){
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

//delete Schedule
function deleteSchedule(req ,res ,conn)
{
  var body=req.query;
    body._id = ObjectId(body._id);
    conn.collection("schedule").deleteOne( {_id: body._id}, { $set: body }, function( err, result ){
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
    getSchedule: getSchedule,
    postSchedule: postSchedule,
    putSchedule: putSchedule,
    deleteSchedule: deleteSchedule
};