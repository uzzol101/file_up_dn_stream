import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpRequest,HttpEventType,HttpResponse} from '@angular/common/http';
import "rxjs/add/operator/map";
import { ResponseContentType } from '@angular/http';
@Injectable()
export class AuthService {

 url = "http://localhost:3000/profile";
  public headers = new HttpHeaders().set("Content-Type","applicatin/json");

  constructor(private http:HttpClient) { }


  //  do not use headers or it will through error
  sendInfo(data){
  	// return this.http.post("http://localhost:3000/profile",data).map(res=>{
  	// 	return res;
  	// });

    // first create new httprequest and set report progress to true;
    let req = new HttpRequest("POST",this.url,data,{reportProgress:true});
    // example used subscribe here {i have used map since i will use subscribe on the component side}
    return this.http.request(req).map(event => {
  // Via this API, you get access to the raw event stream.
  // Look for upload progress events.
  if (event.type === HttpEventType.UploadProgress) {
    // This is an upload progress event. Compute and show the % done:
    // return this value as number
   return Math.round(100 * event.loaded / event.total);
    // console.log(`File is ${percentDone}% uploaded.`);
  } else if (event instanceof HttpResponse) {
    return 'File is completely uploaded 100';
  }
});

  }

  // fetch data from db
 	getInfo(){
 		return this.http.get("http://localhost:3000/profile",{headers:this.headers}).map(res=>{
 			
 			return res;

 		});
 	}


  getDetails(id){
    return this.http.get("http://localhost:3000/profile/"+id,{headers:this.headers}).map(res=>{
      return res;
    });
  } 

  deleteOne(id){
    return this.http.delete("http://localhost:3000/profile/"+id).map(res=>{
      return res;
    });
  }

  download(id){
    return this.http.get("http://localhost:3000/download/"+id).map(res=>{
      return res;
    });
  }

  stream(id){
    return this.http.get("http://localhost:3000/stream/"+id,{responseType: 'blob'}).map(res=>{
      return new Blob([res],{type:"image/jpg"});
    });
  


  }

}

