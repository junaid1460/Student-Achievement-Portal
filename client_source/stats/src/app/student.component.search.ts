import {Component} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import { AppService } from './app.service'
import { Headers } from '@angular/http'
@Component({
    templateUrl :'./student.component.search.html',
    styleUrls : ['./student.component.css']
})
export class StudentSearchComponent{
    user:string;
    count:number;
    docs = []
     getDate(str){
    return new Date(str).toDateString()
  }
goback(){
    
}
    constructor(private route:ActivatedRoute, private aps:AppService ){
        route.params.subscribe(p =>{
           console.log("query", p)
            var t = atob(p.search)
            var tmp = JSON.parse(t);
            tmp['keys'] = [p.username]
            console.log(tmp)
            this.aps.getDataWithFilter(new Headers({
                'content-type':'application/json',
                'data': JSON.stringify(tmp)
            })).subscribe(e => {
                var tt =  e.json()
                this.docs = tt.results
                this.count = tt.count
                console.log(e.json())
            })
        })
    }
}