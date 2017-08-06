import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http'


@Injectable()
export class AppService{
    constructor(private _http:Http){

    }
    getCSRF_TOKEN(){
       return document.getElementsByName('csrf')[0].attributes['content'].value
    }
    getStudents(){
       return this._http.get('/api/faculty/studentlist')
    }
    getStudentDocs(id){
        return this._http.get('/api/faculty/docs/student?id='+id)
    }
    verify(id:Set<any>){
         let headers = new Headers({ 
      'Content-Type': 'application/json', 
      'X-CSRFToken': this.getCSRF_TOKEN(),
     });
     let req = new RequestOptions({headers:headers})
        console.log("ids", id)
        var x = []
        id.forEach(v =>{
            x.push(v)
        })
        console.log(x)
        return this._http.post('/api/faculty/docs/student/verify',
            JSON.stringify({'doc_id' :x}),req
            )
    
    }
}