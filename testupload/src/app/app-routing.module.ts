import {NgModule} from "@angular/core";
import {RouterModule,Routes} from "@angular/router";
import {AppComponent} from "./app.component";
import {DetailsComponent} from './components/details/details.component';
import { AllComponent } from './components/all/all.component';
export const routes:Routes = [
	{
		path:"",
		component:AllComponent
	},
	{
		path:"details/:id",
		component:DetailsComponent
	}
];
@NgModule({
	imports:[RouterModule.forRoot(routes)],
	exports:[RouterModule]
})

export class AppRoutingModule{

}


