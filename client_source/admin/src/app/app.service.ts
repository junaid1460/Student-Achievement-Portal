import {Injectable} from '@angular/core'
import {Http, HttpModule, Headers, RequestOptions} from '@angular/http'

@Injectable()
export class AppService{
    constructor(private _http:Http){
        
    }
    getCSRF_TOKEN(){
       return document.getElementsByName('csrf')[0].attributes['content'].value
    }

    addUsers(data){

        let headers = new Headers({ 
      'Content-Type': 'application/json', 
      'X-CSRFToken': this.getCSRF_TOKEN(),
    
     });
     let req = new RequestOptions({headers:headers})
        
        return this._http.post('/api/admin/addusers',
            JSON.stringify({'data':data}),req
            )
    }
    uploadCSV(file){
        let headers = new Headers({  
            'X-CSRFToken': this.getCSRF_TOKEN(),
        });
       
        let req = new RequestOptions({headers:headers})
        var data = new FormData();
        data.append('_file',file)
        return this._http.post('/api/admin/addusers',data,req)
    }
    getJSON(file){
        let headers = new Headers({  
            'X-CSRFToken': this.getCSRF_TOKEN(),
        });
       
        let req = new RequestOptions({headers:headers})
        var data = new FormData();
        data.append('_file',file)
        return this._http.post('/api/admin/getjson',data,req)
    }

}
