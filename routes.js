var scheduleController = require("./components/schedule/schedule_controller.js");
var facultyController = require("./components/faculty_controller.js");
var departmentController=require("./components/department_controller.js");
var subjectController=require("./components/subject_controller.js");
var yearsemController=require("./components/yearsem_controller.js");
var database = require("./database.js");
var conn = database.getConnection();

module.exports =  function( app )
{
    app.get("/schedule",function(req,res){scheduleController.getSchedule(req, res, conn)});
    app.post("/schedule",function(req,res){scheduleController.postSchedule(req, res, conn)});
    app.put("/schedule",function(req,res){scheduleController.putSchedule(req, res, conn)});
    app.delete("/schedule",function(req,res){scheduleController.deleteSchedule(req, res, conn)});
    
    app.get( "/faculty", function( req, res ) { facultyController.getFaculty( req, res, conn ); } );
    app.put( "/faculty", function( req, res ) { facultyController.putFaculty( req, res, conn ); } );
    app.post( "/faculty", function( req, res ) { facultyController.postFaculty( req, res, conn ); } );
    app.delete( "/faculty", function( req, res ) { facultyController.deleteFaculty( req, res, conn ); } );
    
    
    
    app.get( "/department", function( req, res ) { departmentController.getDepartment( req, res, conn ); } );
    app.post( "/department", function( req, res ) { departmentController.postDepartment( req, res, conn ); } );
    app.put( "/department", function( req, res ) { departmentController.putDepartment( req, res, conn ); } );
    app.delete( "/department", function( req, res ) { departmentController.deleteDepartment( req, res, conn ); } );
    
    
    
    
    app.get( "/subject", function( req, res ) { subjectController.getSubject( req, res, conn ); } );
    app.post( "/subject", function( req, res ) { subjectController.postSubject( req, res, conn ); } );
    app.put( "/subject", function( req, res ) { subjectController.putSubject( req, res, conn ); } );
    app.delete( "/subject", function( req, res ) { subjectController.deleteSubject( req, res, conn ); } );
    
    
    
    app.get( "/yearsem", function( req, res ) { yearsemController.getYearSem( req, res, conn ); } );
    app.post( "/yearsem", function( req, res ) { yearsemController.postYearSem( req, res, conn ); } );
    app.put( "/yearsem", function( req, res ) { yearsemController.putYearSem( req, res, conn ); } );
    app.delete( "/yearsem", function( req, res ) { yearsemController.deleteYearSem( req, res, conn ); } );



};
