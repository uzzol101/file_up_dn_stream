var express = require('express');
var path = require('path');
const http = require('http');
var fs = require("fs");
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// =========================== MULTER =====================
// file upload from multipart/form data
var multer  = require('multer');

// multer will not add any extionsion by default 
// destination where uploaded file will stay
// 
 var storage = multer.diskStorage({
 	destination: function(req,file,cb){
 		cb(null,"./testupload/src/assets/images");
 	},
 	// 
 	filename:function(req,file,cb){
 		// only suport these file type
 		if(file.originalname.match(/\.(jpg|jpeg|png|svg)$/)){
 			// added date now to get a random digit before every filename
 			cb(null,Date.now()+'_'+file.originalname)
 		}else{
 			console.log("file type not supported ");
 		}
 	}
 });
 // here limit can be passed to determine the file size
 var upload = multer({storage:storage});
 //======================================================
var index = require('./routes/index');
var users = require('./routes/users');
var data = require('./models/upload');
var mongoose = require('mongoose');
 mongoose.connect("mongodb://localhost/file_upload");
var db = mongoose.connection;
db.once("open",()=>{
	console.log("Database connected");
});
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "content-Type,Authorization");
    next();
});

app.use('/', index);
app.use('/users', users);



// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




app.get("/",(req,res)=>{
	res.send("App started");
});

// here avatar is name of input field { <input type"file" name="avatar"/>}
app.post('/profile', upload.any(),  function (req, res, next) {
  // req.files  contains file details
  // use FormData api (pre installed) to send multipart/form-data from angular side
console.log(req.body);
// console.log(req.files[0]);
  var info = {
  	name:req.body.name,
  	// add images before filename {/images/90770970909_file.jpg} 
  	img: {
      imgName:"assets/images/" + req.files[0].filename,
      imgPath:req.files[0].path
    }
  };
  data.create(info,(err,file)=>{
  	if(err){
  		res.json({
        success:false,
        msg:"something went wrong"
      });
  	}else{
  		res.json({
        success:true,
        msg:"Data saved in db"
      });
  	}
  });
  
  // req.body will hold the text fields, if there were any
});

app.get('/profile',(req,res)=>{
	data.find({},(err,data)=>{
		
		 res.json(data);
	});
});

// show specic image
app.get("/profile/:id",(req,res)=>{
  data.findById(req.params.id,(err,found)=>{
    if(err){
      console.log(err);
    }else{
      console.log(found.img);
      res.json(found);
    }
  });
});
// delete specific image
app.delete("/profile/:id",(req,res)=>{
  data.findByIdAndRemove(req.params.id,(err,removed)=>{
    if(err){
      console.log(err);
    }else{
      fs.unlink(removed.img.imgPath,(err,deleted)=>{
        if(err){
          console.log("Can't delete the file from folder");
        }else{
          res.json({
        success:true,
        msg:"deleted successfuly"
      });
        }
      })
    }
  });
});

// download imgae or send file to client
app.get('/download/:id',(req,res)=>{
  data.findById(req.params.id,(err,download)=>{
   var file = path.join(__dirname, download.img.imgPath);
  console.log("your request reached here thank you");
   res.download(file, function (err) {
       if (err) {
           console.log("Error can't download");
           console.log(err);
       } else {
        console.log("success");
          
       }


  });


});
});


app.get("/stream/:id",(req,res)=>{
   // res.set({"content-Type":"image/jpg"});

   data.findById(req.params.id,(err,found)=>{
      // path to file want to stream
       var file = path.join(__dirname,found.img.imgPath);
  console.log(file);
  //  create stream
   var stream = fs.createReadStream(file);
  // stream it and send it through res object to client
stream.pipe(res);
   });
 

});
app.listen(3000,()=>{
	console.log("App listening at port 3000");
});

// data.create({
// 	name:"mofiz",
// 	age:20
// });

// data.find({},(err,data)=>{
// 	console.log(data);
// })

 // data.remove({},(err,msg)=>{
 // 	console.log("database emptyed");
 // });


 
 // fs.closeSync("assets/images/1501997956534_Hydrangeas.jpg");

  // fs.unlinkSync(path.join(__dirname,"testupload/src/assets/images/1501997956534_Hydrangeas.jpg"));
