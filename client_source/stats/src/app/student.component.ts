import {Component} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import { AppService } from './app.service'
@Component({
    templateUrl :'./student.component.html',
    styleUrls : ['./student.component.css']
})
export class StudentComponent{
    user:string;
    count:number;
    docs = []
     getDate(str){
    return new Date(str).toDateString()
  }
    constructor(private route:ActivatedRoute, private aps:AppService ){
        route.params.subscribe(p =>{
            this.user = p.username;
            this.aps.getCurrentStudentData(this.user).subscribe(e =>{
                this.docs = e.json()
                this.count = this.docs.length
                console.log(this.docs)
                this.log()
            })
        }) 
  console.log(this.aps.docs
  ,this.aps.nextpage
  ,this.aps.count
  ,this.aps.students
  ,this.aps.snextpage
  ,this.aps.scount
  ,this.aps.domain_query
  ,this.aps.sub_cat_query
  ,this.aps.tmp_squery
  ,this.aps.cat_query
  ,this.aps.year_query
  ,this.aps.usns
  ,this.aps.years
  ,this.aps.cdoc_id
  ,this.aps.navinfo
  ,this.aps.type_query
  ,this.aps.myresult)
    }
log(){
      console.log(this.aps.docs
  ,this.aps.nextpage
  ,this.aps.count
  ,this.aps.students
  ,this.aps.snextpage
  ,this.aps.scount
  ,this.aps.domain_query
  ,this.aps.sub_cat_query
  ,this.aps.tmp_squery
  ,this.aps.cat_query
  ,this.aps.year_query
  ,this.aps.usns
  ,this.aps.years
  ,this.aps.cdoc_id
  ,this.aps.navinfo
  ,this.aps.type_query
  ,this.aps.myresult)
}
}