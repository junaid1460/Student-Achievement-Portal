import { Component } from '@angular/core';
import {AppService} from './app.service';
import { MdSnackBar} from '@angular/material'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _aps:AppService, private snk:MdSnackBar){}
  title = 'app';
  records = [];
  file = null;
  upload(e){
    if(e.srcElement.files.length > 0){
      if(e.srcElement.files[0].type != 'text/csv'){
        console.log("Not a csv")
      }else{
        this.file = e.srcElement.files[0];
        this._aps.getJSON(e.srcElement.files[0]).subscribe(e=>{
          this.records = e.json()
        })
      }
    }
  }
  uploadCSV(){
    if(this.file != null){
      this._aps.uploadCSV(this.file).subscribe(
        e=>{
          this.snk.open('Successfully created accounts',"okay", {duration: 1000});
        },
        e=>{
          this.snk.open('Something went wrong',"retry", {duration: 4000}).onAction().subscribe(()=>{
            this.uploadCSV();
          })
        }
      )
    }
  }


}
