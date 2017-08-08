var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var upload = new Schema({
	name:String,
	img:{
		imgName:String,
		imgPath:String
	}
});

var Upload = mongoose.model("Upload",upload);

module.exports = Upload;