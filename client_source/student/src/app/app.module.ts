import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule, MdDatepickerModule, MdNativeDateModule} from '@angular/material'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppComponent, DeleteDialog ,UploadDialog, HelpDialog, PasswordDialog} from './app.component';
import 'hammerjs'
import { StudentService} from './app.service'
import {HttpModule} from '@angular/http'
@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MdDatepickerModule,
    MdNativeDateModule
  ],
  declarations: [
    AppComponent
    ,DeleteDialog,
    UploadDialog,
    HelpDialog,
    PasswordDialog
  ],
  
  providers: [StudentService],

  entryComponents:[DeleteDialog, UploadDialog, HelpDialog, PasswordDialog],
  bootstrap: [AppComponent],
})
export class AppModule { }
