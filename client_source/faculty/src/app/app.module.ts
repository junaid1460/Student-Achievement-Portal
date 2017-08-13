import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent, VerifyDialog, ErrorMessageDialog, PasswordDialog } from './app.component';
import {HttpModule} from '@angular/http';
import {AppService} from './app.service'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import 'hammerjs'
@NgModule({
  
  declarations: [
    AppComponent,
    VerifyDialog,
    ErrorMessageDialog,
    PasswordDialog
  ],
  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
  ],
  providers: [AppService],
  entryComponents:[VerifyDialog, ErrorMessageDialog, PasswordDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
