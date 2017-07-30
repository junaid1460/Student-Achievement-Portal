import { Component, Inject, ElementRef, ViewChild } from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar, MD_DIALOG_DATA} from '@angular/material'
import {StudentService} from './app.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StudentService]
})
export class AppComponent {
  refreshing:boolean  = false;
  refresh(){
    if(!this.refreshing){
      this.snack.open('Refreshing page! wait for a while','okay', {duration: 2000})
      this.refreshing = true;
       this._aps.getDocuments().subscribe(e => {
        this.documents = e.json()
        this.refreshing = false
        this.snack.open('Successfully refreshed page','okay', {duration: 2000})
    })
    }
  }
  title = 'Student app';
  documents = [
    {
      name : "Sambram coding and debugging",
      file : "xabcd.pdf",
      verified : false
    }
  ]
  constructor(private dialog:MdDialog,
              private _aps:StudentService,
              private snack:MdSnackBar){
              this.refresh()
  }
  openDeleteDialog(event:any){
    console.log(event);
    
    let d = this.dialog.open(DeleteDialog, {data: event }).afterClosed().subscribe( res =>{
      if(res){
        
        this.snack.open('Deleting document. please wait!', '', {duration : 5000});
        this._aps.deleteDocument(res).subscribe((res) => {
          this.snack.open(res.json().status, 'okay', {duration : 1000}).afterDismissed().subscribe(e=>{
            this.refresh()
          })
          
        })
      }
    
    })
  }
  openUploadDialog(){
    let d = this.dialog.open(UploadDialog).afterClosed().subscribe( res =>{
        this.refresh()
    })
  }
  openHelpDialog(){
    let d = this.dialog.open(HelpDialog).afterClosed().subscribe( res =>{
      console.log(res)
    })
  }
  logout(){
    window.location.href = "/logout"
  }
}



@Component({
  template : `
  <h2 md-dialog-title>Delete this document</h2>
<md-dialog-content>Are you sure? You can't undo this operation.</md-dialog-content>
<md-dialog-actions>
  <button md-button md-dialog-close>No</button>
  <!-- Can optionally provide a result for the closing dialog. -->
  <button md-button [md-dialog-close]="data">Yes, delete</button>
</md-dialog-actions>
  `
})
export class DeleteDialog {
  constructor(public dialogRef: MdDialogRef<DeleteDialog>,
  @Inject(MD_DIALOG_DATA) public data: any) {}
}


import {FormControl, Validators} from '@angular/forms'
@Component({
  templateUrl: './upload.component.html'
})
export class UploadDialog {
  constructor(public dialogRef: MdDialogRef<UploadDialog>,
    private snack:MdSnackBar,
    private _aps:StudentService) {}
  @ViewChild('title') title:ElementRef;
  @ViewChild('file') file:ElementRef;
  year:any;
  _title:any;
  uploading:boolean = false;
  required = new FormControl('',[Validators.required])
  yrequired = new FormControl('',[Validators.required])
  frequired = new FormControl('',[Validators.required])
  upload(){
    console.log(this.title.nativeElement.value)
    console.log(this.year)
    console.log(this.file.nativeElement.files.length)
    var error = false

    if(this.file.nativeElement.files.length == 0){
      this.snack.open('Please select a document to upload.', 'okay', {duration:4000})
      error = true
    }
    if(this.yrequired.hasError('required') || this.required.hasError('required')){
      this.snack.open('Fix errors.', 'okay', {duration:4000})
      error = true
    }
    
    if(error)return
    if(this.file.nativeElement.files[0].size/1000 > 800){
      console.log(this.file.nativeElement.files[0].size/1000)
      this.snack.open('File is too big, max file size is upto 800kb.', 'okay', {duration:4000})
      return
    }
    // upload here
    this.uploading = true;
    this._aps.uploadDocument(this._title, this.year,this.file.nativeElement.files[0]).subscribe(e =>{
      this.dialogRef.close()
      
    }, err =>{
      this.uploading = false
    })
  }
}


@Component({
  templateUrl: './help.component.html'
})
export class HelpDialog {
  constructor(public dialogRef: MdDialogRef<HelpDialog>) {}
}