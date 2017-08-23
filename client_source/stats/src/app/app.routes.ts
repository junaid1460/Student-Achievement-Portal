import {Routes, RouterModule} from '@angular/router'
import {Component} from '@angular/core'
import {AppComponent} from './app.component'
import {StudentComponent} from './student.component'
import {StudentSearchComponent} from './student.component.search'

@Component({
    selector:'app-root',
    template:`
    <router-outlet></router-outlet>
    `
})
export class RouterComponent{

}

export const routes:Routes = [
    //goto component and set path
    {path:'', component:AppComponent,pathMatch:'full'},
    {path:'student/:username', component:StudentComponent},
    {path:'student/:username/:search', component:StudentSearchComponent}
]