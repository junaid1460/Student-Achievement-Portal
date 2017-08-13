import {Injectable} from '@angular/core'
import {Http, URLSearchParams, Headers} from '@angular/http'

@Injectable()
export class AppService {
    old_header:Headers;
    constructor(private _http:Http){}
    getDocs(keys, domains, cats, years, link = '/stats/search?format=json' ){
        var tmp = new URLSearchParams()
        let headers = new Headers({
            'Content-Type': 'application/json',
            'data':JSON.stringify({
            'keys':keys,
            'domains':domains,
            'cats':cats,
            'years':years
            })

        })
        this.old_header = headers
        return this._http.get(link,{ headers:headers})
    }
    loadMore(link){
        return this._http.get(link,{ headers:this.old_header})
    }
}