import { Component, Inject, ElementRef, ViewChild } from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar, MD_DIALOG_DATA, MdSidenav} from '@angular/material'
import {StudentService} from './app.service';


const doc_type_choce = [
    [1,'Participation'],
    [2,'Achievement']
]

const doc_year_choice = [
    [1,'1st year'],
    [2,'2nd year'],
    [3,'3rd year'],
    [4,'4th year']
]

const doc_domain_choice = [
    [1, 'Department'],
    [2, 'Institution'],
    [3, 'National'],
    [4, 'International'],
]

const doc_category_choice = [
    
    [1, 'Academic'],
    [2, 'Technical'],
    [3, 'Cultural'],
    [4, 'Sport'],
    [0, 'Other'],
]

const doc_sub_cat_choice = {
    0:[],
    3:[],
    4:[],
    2:[
        [1, 'Work shops'],
        [2, 'Conferences'],
        [3, 'Projects'],
        [4, 'Competitions'],
        [9, 'Other']
    ],
    1:[
        [5, 'Addon courses'],
        [6, 'Audit courses'],
        [7, 'Interships'],
        [8, 'Skill development programs'],
        [0, 'Other']
    ]
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StudentService]
})
export class AppComponent {
   username = (<any>window).username
  user= (<any>window).user
  refreshing:boolean  = false;
  @ViewChild('infonavbar') infonav:MdSidenav;
  refresh(not:boolean = true){
    if(!this.refreshing){
      if(not)
      this.snack.open('Refreshing page! wait for a while','okay', {duration: 2000})
      this.refreshing = true;
       this._aps.getDocuments().subscribe(e => {
        this.documents = e.json()
        this.refreshing = false
        if(not)
        this.snack.open('Successfully refreshed page','okay', {duration: 2000})
    },e=>{
      this.snack.open('Something went wrong while fetching documents. please retry','okay', {duration: 2000})
    })
    }
  }
  title = 'Student app';
  documents = [
  ]
  constructor(private dialog:MdDialog,
              private _aps:StudentService,
              private snack:MdSnackBar){
              this.refresh(false)
              // console.log(this.user, this.username)
  }
  getDate(str){
    return new Date(str).toDateString()
  }
  delete_selected(){
    var tmp = []
    this.selected.forEach(e=>{
      tmp.push(e)
    })
    this.openDeleteDialog(tmp)
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
        if(res==true)
          this.refresh()
    })
  }
  openHelpDialog(){
    let d = this.dialog.open(HelpDialog).afterClosed().subscribe( res =>{
      console.log(res)
    })
  }
  openPasswordDialog(){
    let d = this.dialog.open(PasswordDialog).afterClosed().subscribe( res =>{
      console.log(res)
    })
  }
  
  logout(){
    window.location.href = "/logout"
  }
  delete_button = false
  selected = new Set()
  selectFile($event, id){
    if($event.checked == true)
      this.selected.add(id)
    else
      this.selected.delete(id)
    if(this.selected.size > 0){
      this.delete_button = true
    }else{
      this.delete_button = false
    }
  }

  navinfo = null
  showInfo(file){
    this.navinfo = file;
    this.infonav.open()
    console.log(file  )
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
  templateUrl: './upload.component.html',
  styleUrls:['./upload.component.css']
})
export class UploadDialog {
  usernname = (<any>window).username
  user= (<any>window).username
  doc_types = doc_type_choce
  doc_cats = doc_category_choice
  doc_subs = doc_sub_cat_choice
  doc_domains = doc_domain_choice
  doc_years = doc_year_choice
  constructor(public dialogRef: MdDialogRef<UploadDialog>,
    private snack:MdSnackBar,
    private _aps:StudentService) {}
  @ViewChild('title') title:ElementRef;
  @ViewChild('file') file:ElementRef;
  _year:any = 1;
  _title:any;
  _date;
  _domain:any = 1;
  _cat:any = 0;
  _place:string;
  _type:number = 1;
  _sub_cats:any = {
    1:0,
    2:9,
    3:0
    ,4:0,
    0:0
  }
  uploading:boolean = false;
  required = new FormControl('',[Validators.required])
  yrequired = new FormControl('',[Validators.required])
  drequired = new FormControl('',[Validators.required])
  crequired = new FormControl('',[Validators.required])
  yorequired = new FormControl('',[Validators.required])
  prequired = new FormControl('',[Validators.required])
  upload(){
    console.log("date : ",this._date)
    console.log("title  : ",this._title,"domain : ",this._domain)
    console.log("year  :",this._year)
    console.log("cat  : ",this._cat,'sub : ',this._sub_cats[this._cat])
    console.log("place : ",this._place)
    console.log('type : ',this._type)
    var error = false

    if(this.file.nativeElement.files.length == 0){
      this.snack.open('Please select a PDF document to upload.', 'okay', {duration:4000})
      error = true
      return
    }
    if(this.file.nativeElement.files[0].type != 'application/pdf'){
      this.snack.open('Document is not a PDF', 'okay', {duration:4000})
      error = true
      return
    }
    console.log(this.file.nativeElement.files[0].type)
    if(
    this.required.hasError('required')||
    this.prequired.hasError('required')||
    this.yorequired.hasError('required')){
      this.snack.open('Fix errors.', 'okay', {duration:4000})
      error = true
    }
    
    if(error)return
    if(this.file.nativeElement.files[0].size/1000 > 800){
      console.log(this.file.nativeElement.files[0].size/1000)
      this.snack.open('File is too big, max file size is upto 800kb.', 'okay', {duration:4000})
      return
    }
    console.log(this.file.nativeElement.files[0].size)
    // upload here
    this.uploading = true;
    this._aps.uploadDocument(this._title, this._year,this.file.nativeElement.files[0]
                              , this._domain, this._cat, this._date,this._place, this._sub_cats[this._cat], this._type).subscribe(e =>{
      this.dialogRef.close(true)
      
    }, err =>{
      console.log(err)
      this.uploading = false
    })
  }

}


@Component({
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpDialog {
  constructor(public dialogRef: MdDialogRef<HelpDialog>) {}
}

@Component({
  templateUrl: './password.component.html'
})
export class PasswordDialog {
  constructor(public dialogRef: MdDialogRef<PasswordDialog>,
  private _aps:StudentService,
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