import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
data:any;
progressPercentage:any;

  constructor(private authService:AuthService) {}

   ngOnInit(){
     this.authService.getInfo().subscribe(data=>{
        this.data = data;

    
        
      });
   }

    onSubmit(name,files,event){
       event.preventDefault();
    	// files  type is []
   	// create new formdata instanc
  	let formdata = new FormData();
  	// send the name
    formdata.append("name",name);
    // append the file want to send
  	formdata.append("file",files[0]);
    	  this.authService.sendInfo(formdata).subscribe(data=>{
        this.progressPercentage = data;
     
        });
	
    }

  
}
