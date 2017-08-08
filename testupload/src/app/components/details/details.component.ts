import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute,Router,ParamMap} from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
	details:any;
  constructor(private authService:AuthService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
  	this.getDetails();
  }

  downloadFile(data){
  var blob = new Blob([data], { type: 'image/jpeg' });
  var url= window.URL.createObjectURL(blob);
  window.open(url);
}

  getDetails(){
  	// get mongoose id from router url
  	let id = this.route.snapshot.paramMap.get("id");
  	this.authService.getDetails(id).subscribe(data=>{
  		this.details = data;
  		console.log(data);
  	});
  }
  onDelete(){
  	this.authService.deleteOne(this.details._id).subscribe(data=>{
  		console.log(data);
  	});
  	this.router.navigate(["/"]);
  }

  onDownload(){
    // to download a file
    window.open("http://localhost:3000/download/"+this.details._id);
   

  }

  onStream(){
   this.authService.stream(this.details._id).subscribe(data=>{
    
     console.log(data);
     // create url from blob data
     var fileUrl = URL.createObjectURL(data);
     // open the blob file in new window
     window.open(fileUrl);
   });
  }

}
