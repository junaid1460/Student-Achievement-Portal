import { Component, Inject , ViewChild,} from '@angular/core';
import {FormControl, Validators} from '@angular/forms'
import {AppService} from './app.service';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar, MdSidenav} from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logout(){
    window.location.href = "/logout"
  }
  openPasswordDialog(){
    let d = this._dialog.open(PasswordDialog).afterClosed().subscribe( res =>{
      console.log(res)
    })
  }
  setMessage(id){
    this._dialog.open(ErrorMessageDialog, {data:id}).afterClosed().subscribe(e=>{
      if(e==true){
        this.nav.close();
        this.refresh()
      }
    })
  }
  students = []
  docs = {}
  documents = []
  cdoc_id = null;
  navinfo = null;
  @ViewChild('infonavbar') nav:MdSidenav;
  showInfo(file){
    this.navinfo = file
    this.nav.open()
  }
  refreshStudents(){
      this._aps.getStudents().subscribe(e=>{
      this.students = e.json()
      this.documents = []
      this.c_stud = null
      
    }, e=>{
      console.log('coudn\'t fetch student information')
    })
  }
   getDate(str){
    return new Date(str).toDateString()
  }
  constructor(private _aps:AppService, private _dialog:MdDialog, private snk:MdSnackBar){
    this.refreshStudents()
  }
  c_stud:any = null;
  setStudent(student){
    this.getDox(student.id)
    this.c_stud = student;
  }

  getDox(id){
    if(this.docs[id]){
      this.cdoc_id = id;
      this.verify_button = false
      this.checked = new Set()
      this.documents = this.docs[id]
       return
    }
    this.loadDox(id)
  }
  loadDox(id){
     this._aps.getStudentDocs(id).subscribe(e=>{
      this.docs[id] = e.json()
      this.cdoc_id = id
      this.checked = new Set()
      this.verify_button = false
      this.documents = this.docs[id];
    }, e=>{
      console.log('coudn\'t fetch student\'s documents')
    })
  }
  refresh(){
    this.loadDox(this.cdoc_id)
  }

  verify(id){
    this.confirm_verify(new Set([id]))
  }

  confirm_verify(data){
    this._dialog.open(VerifyDialog, {data : data}).afterClosed().subscribe(e=>{
      if(e==true){
        this.refresh()
        this.snk.open("Verified successfully", null, {duration:2000})
      }
    }, e=>{

    })
  }

  verify_button = false;
  checked = new Set()
  check($event, id){
    if($event.checked == true){
      this.checked.add(id)
    }else{
      this.checked.delete(id)
    }
    if(this.checked.size > 0){
      this.verify_button = true
    }else this.verify_button = false
    console.log(this.checked)
  }
}


@Component({
  template:`  <h2 md-dialog-title>Verify</h2>
<md-dialog-content>{{message}}</md-dialog-content>
<md-dialog-actions>
  <button md-button md-dialog-close>No</button>
  <button md-button (click)="verify()">Yes, Verify</button>'
</md-dialog-actions>
<md-progress-bar mode="indeterminate" *ngIf="verifying"></md-progress-bar>
`
})
export class VerifyDialog{
  message = "verify selected documents?"
  constructor(private dialog:MdDialogRef<VerifyDialog>,
  @Inject(MD_DIALOG_DATA) private data:Set<any>,  
  private _aps:AppService,
  private _snk:MdSnackBar){
    console.log(data.size)
    if(data.size <= 1){
      this.message = "verify this document?"
    }
 
  }
  verifying = false;
  verify(){
    this.verifying = true
    this._aps.verify(this.data).subscribe(e=>{
      console.log(e.json())
      this.dialog.close(true)
    },e=>{
      console.log("Error", e)
      this.verifying = false
      this._snk.open('Something went wrong!', "okay", {duration:2000})
    })
  }

}




@Component({
  template:`<div style="width:40vw"> <h2 md-dialog-title>Verify</h2>
<md-dialog-content>
<md-input-container style="width:100%">
    <input [(ngModel)] = "_message" mdInput [formControl]="required" #message maxlength="500" placeholder="Message">
    <md-hint align="start"><strong>Don't disclose personal info</strong> </md-hint>
    <md-hint align="end">{{message.value.length}} / 500</md-hint>
  </md-input-container>
</md-dialog-content>
<md-dialog-actions>
  <button md-button md-dialog-close>Cancel</button>
  <button md-button (click)="setMessage()">Set message</button>'
</md-dialog-actions>
<md-progress-bar mode="indeterminate" *ngIf="sending"></md-progress-bar>
</div>
`
})
export class ErrorMessageDialog{
  required = new FormControl('', [Validators.required])
  constructor(private dialog:MdDialogRef<ErrorMessageDialog>,
  @Inject(MD_DIALOG_DATA) private data:any,  
  private _aps:AppService,
  private _snk:MdSnackBar){
  
 
  }
  _message:string;
  sending = false
  setMessage(){
    if(this.required.hasError('required')) return
    console.log(this._message, this.data)
    this._aps.setMessage(this.data.id, this._message).subscribe(e=>{
      this._snk.open('successfully set message', null, {duration:2000});
      this.data._has_error = true;
      this.data._error_mesage = this._message;
      this.dialog.close(true)
    }, e=>{
      this._snk.open('Something went wrong!', null, {duration:2000});
      console.log(e)
    })
    
  }


}



@Component({
  templateUrl: './password.component.html'
})
export class PasswordDialog {
  constructor(public dialogRef: MdDialogRef<PasswordDialog>,
  private _aps:AppService,
private snk:MdSnackBar) {}
  current_password:string = "";
  new_password:string = "";
  changePass(){
    if(this.current_password.length == 0){
      this.snk.open('Please enter current password',null,{duration:2000});
      return
    }
    if(this.new_password.length <= 7){
      this.snk.open('new Password is too short. 8 characters required.',null,{duration:2000})
      return
    }
    this._aps.changePass(this.current_password,this.new_password).subscribe(e=>{
      if(e.json().status == true){
        // this.snk.open('password has been changed!', null, {duration:2000})
        window.location.href = '/'
      }else{
        this.snk.open('That didn\'t work, check whether password is correct!', null, {duration:2000})
      }
    }, e=>{
      this.snk.open('something went wrong!', null, {duration:2000})
    })
  }
}