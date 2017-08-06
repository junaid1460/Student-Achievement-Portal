import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent, VerifyDialog } from './app.component';
import {HttpModule} from '@angular/http';
import {AppService} from './app.service'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import 'hammerjs'
@NgModule({
  declarations: [
    AppComponent,
    VerifyDialog
  ],
  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [AppService],
  entryComponents:[VerifyDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
