import { Component } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Student app';
  documents = [
    {
      name : "Sambram coding and debugging",
      file : "xabcd.pdf",
      verified : false
    },
     {
      name : "Sentia code chef",
      file : "xabcd.pdf",
      verified : false
    }
  ]
  constructor(private dialog:MdDialog){}
  openDeleteDialog(){
    let d = this.dialog.open(DeleteDialog).afterClosed().subscribe( res =>{
      console.log(res)
    })
  }
  openUploadDialog(){
    let d = this.dialog.open(UploadDialog).afterClosed().subscribe( res =>{
      console.log(res)
    })
  }
  openHelpDialog(){
    let d = this.dialog.open(HelpDialog).afterClosed().subscribe( res =>{
      console.log(res)
    })
  }
}



@Component({
  template : `
  <h2 md-dialog-title>Delete this document</h2>
<md-dialog-content><h4>Are you sure? You can't undo this operation.</h4> </md-dialog-content>
<md-dialog-actions>
  <button md-button md-dialog-close>No</button>
  <!-- Can optionally provide a result for the closing dialog. -->
  <button md-button [md-dialog-close]="true">Yes, delete</button>
</md-dialog-actions>
  
  `
})
export class DeleteDialog {
  constructor(public dialogRef: MdDialogRef<DeleteDialog>) {}
}


@Component({
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadDialog {
  constructor(public dialogRef: MdDialogRef<UploadDialog>) {}
}


@Component({
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpDialog {
  constructor(public dialogRef: MdDialogRef<HelpDialog>) {}
}