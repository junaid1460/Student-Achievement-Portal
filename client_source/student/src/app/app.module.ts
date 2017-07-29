import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from '@angular/material'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppComponent, DeleteDialog ,UploadDialog, HelpDialog} from './app.component';
import 'hammerjs'
@NgModule({
  declarations: [
    AppComponent
    ,DeleteDialog,
    UploadDialog,
    HelpDialog
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
  ],
  providers: [],

  entryComponents:[DeleteDialog, UploadDialog, HelpDialog],
  bootstrap: [AppComponent],
})
export class AppModule { }
