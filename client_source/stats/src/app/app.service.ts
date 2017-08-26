import {Injectable} from '@angular/core'
import {Http, URLSearchParams, Headers, ResponseContentType} from '@angular/http'

@Injectable()
export class AppService  {
    docs = []
    nextpage = null
    count = 0;
    students = []
    snextpage = null
    scount = 0
    domain_query = new Set()
    sub_cat_query = {};
    tmp_squery = {}
    cat_query = new Set()
    year_query = new Set()
    usns = new Set()
    years = new Set()
    cdoc_id = null;
    navinfo = null;
    type_query = new Set()
    myresult:number = 0
    old_header:Headers;
    sortby:string;
    constructor(private _http:Http){
    
    }
  
   
    getDocs(keys, domains, cats, years, type, subcat, sortby, student = false ){
        var  link = '/api/stats/search?format=json';
        if(student == true){
            link = '/api/stats/searchstudent?format=json';
        }
        
        var tmp = new URLSearchParams()
        let headers = new Headers({
            'Content-Type': 'application/json',
            'data' : JSON.stringify({
            'keys' : keys,
            'domains' : domains,
            'cats' : cats,
            'years' : years,
            'types' : type,
            'subcat' : subcat,
            'sortby' : sortby?sortby:""
            })

        })
        console.log(headers.get('data'))
        // console.log("new",new Headers( JSON.parse( JSON.stringify(headers))) )
        this.old_header = headers
        return this._http.get(link,{ headers:headers})
    
    }  
    getSearchB64(){
        return btoa(this.old_header.get('data'))
    } 
    loadMore(link){
        return this._http.get(link,{ headers:this.old_header})
    }
    loadPDF(link){
        return this._http.get(link,{ headers:this.old_header, responseType:ResponseContentType.Blob})
    }
    getDataWithFilter(header:Headers){
        console.log(header)
        return this._http.get('/api/stats/search?format=json',{headers:  header})
    }
    getCurrentStudentData(username){
        return this._http.get('/api/stats/getstudent?user='+username)
    }
}