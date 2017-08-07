import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MaterialModule} from '@angular/material'
import { AppComponent } from './app.component';
import {AppService} from './app.service'
import {HttpModule} from '@angular/http'
import {FormsModule} from '@angular/forms'
import 'hammerjs'
@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpModule,
    FormsModule
  ],
  providers: [ AppService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
