import { Component, Inject } from '@angular/core';
import {AppService} from './app.service';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar} from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logout(){
    window.location.href = "/logout"
  }
  students = []
  docs = {}
  documents = []
  cdoc_id = null;
  constructor(private _aps:AppService, private _dialog:MdDialog, private snk:MdSnackBar){
    this._aps.getStudents().subscribe(e=>{
      this.students = e.json()
    }, e=>{
      console.log('coudn\'t fetch student information')
    })
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