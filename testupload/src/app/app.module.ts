import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule,HTTP_INTERCEPTORS} from "@angular/common/http";
import { AppComponent } from './app.component';
import {DetailsComponent} from './components/details/details.component';
import {AppRoutingModule} from "./app-routing.module";

//================== SERVICES ================
import {AuthService} from './services/auth.service';

import { AllComponent } from './components/all/all.component';



@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    AllComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
   
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
