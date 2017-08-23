import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MaterialModule} from '@angular/material'
import { AppComponent } from './app.component';
import {AppService} from './app.service'
import {HttpModule} from '@angular/http'
import {FormsModule} from '@angular/forms'
import 'hammerjs'
import {RouterModule} from '@angular/router'
import {StudentComponent} from './student.component'
import {StudentSearchComponent} from './student.component.search'
import {routes, RouterComponent} from './app.routes'
@NgModule({
  declarations: [
    RouterComponent,
    AppComponent,
    StudentComponent,
    StudentSearchComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ AppService , {provide :APP_BASE_HREF,useValue: '/stats'}],
  bootstrap: [RouterComponent]
})
export class AppModule { }
