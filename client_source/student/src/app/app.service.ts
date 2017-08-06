import {Injectable} from '@angular/core'
import {Http, HttpModule, Headers, RequestOptions} from '@angular/http'

@Injectable()
export class StudentService{
    constructor(private _http:Http){
        
    }
    getCSRF_TOKEN(){
       return document.getElementsByName('csrf')[0].attributes['content'].value
    }
    getDocuments(){
        return this._http.get('/api/student/docs?format=json');
    }
    deleteDocument(doc_id){

        let headers = new Headers({ 
      'Content-Type': 'application/json', 
      'X-CSRFToken': this.getCSRF_TOKEN(),
      'id' :doc_id
     });
     let req = new RequestOptions({headers:headers})
        
        return this._http.post('/api/student/docs/delete',
            JSON.stringify({'id' :doc_id}),req
            )
    }

    uploadDocument(title, year, file, dom, cat, date:Date, place:string){
        let headers = new Headers({  
            'X-CSRFToken': this.getCSRF_TOKEN(),
        });
        //change date format
        var tmp = date.getFullYear() +'-'+ date.getMonth() + '-' + date.getDay()
        let req = new RequestOptions({headers:headers})
        var data = new FormData();
        data.append('_file',file)
        data.append('_title',title)
        data.append('_year',year)
        data.append('_domain',dom)
        data.append('_category',cat)
        data.append('_date', tmp)
        data.append('_place',place)
        return this._http.post('/api/student/docs',data,req)
    }
}
