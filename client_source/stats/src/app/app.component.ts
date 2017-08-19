import { Component, ViewChild } from '@angular/core';
import {AppService} from './app.service'
import {MdSidenav} from '@angular/material'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   cdoc_id = null;
  navinfo = null;
  @ViewChild('infonavbar') nav:MdSidenav;
  showInfo(file){
    this.navinfo = file
    this.nav.open()
  }
  constructor(private _aps:AppService){
    this.result='Files';
    this.search()
  }
  show_overlay = true
  result = "Files"
  usns = new Set()
  years = new Set()
  toggleOverlay(){
    this.show_overlay = !this.show_overlay
  }
  val:string = "";
  addVal(){
    if(this.val == "")
      return
    console.log(parseInt(this.val).toString())
    if(parseInt(this.val) && parseInt(this.val).toString().length==this.val.length)
      this.years.add(this.val)
    else
      this.usns.add(this.val.toLocaleUpperCase())
    this.val = ""
    }
  clear(){
    this.usns = new Set()
    this.years = new Set()
  }
  getArray(e:Set<any>){
    var tmp = []
    e.forEach(e=>{
      tmp.push(e)
    })
    return tmp
  }
  docs = []
  nextpage = null
  count = 0
  search(){
    var keys = this.getArray(this.years).concat(this.getArray(this.usns))
    var domains = this.getArray(this.domain_query)
    var cats = this.getArray(this.cat_query)
    var years = this.getArray(this.year_query)
    this._aps.getDocs(keys, domains, cats, years).subscribe(e=>{
      console.log(e.json())
       var t  =e.json()
       this.docs = []
      t.results.forEach(e=>{
        this.docs.push(e)
      })
      this.nextpage = t.next
      this.count = t.count

    })
  }
 getDate(str){
    return new Date(str).toDateString()
  }
  loadMore(link){
   this._aps.loadMore(link).subscribe(e=>{
      var t  =e.json()
      t.results.forEach(e=>{
        this.docs.push(e)
      })
      this.nextpage = t.next
   }, e=>{
     console.log("error", e)
   })
  }


  domain_list = ['Department', 'Institution', 'National', 'International']
  domain_query = new Set()
  addDomain(e, domain){
    if(e.checked == true)
      this.domain_query.add(domain)
    else
      this.domain_query.delete(domain)
    console.log(this.domain_query)
    
  }
  cat_list_det = {
    'Cultural':[],
    'Technical':['workshop', 'Conference', 'Projects', 'Other'],
    'Sport':[], 
    'Academic':['Addon Courses', 'Audit courses', 'Internships', 'Skill dev programs', 'Other'], 
    'Other':[]
  }

  cat_list =  Object.keys(this.cat_list_det)
  doc_type = ['Participation', 'Achievement']
  cat_query = new Set()
  addCategory(e, cat){
  
    if(e.checked == true)
      this.cat_query.add(cat)
    else
      this.cat_query.delete(cat)
    console.log(this.cat_query)
  }
  year_list = [['1st year', 1], ['2nd year', 2],['3rd year', 3], ['4th year', 4]]
  year_query = new Set()
  addYear(e, year){
    if(e.checked == true)
      this.year_query.add(year)
    else
      this.year_query.delete(year)
    console.log(this.year_query)
  }
  check($event){
    if($event.keyCode == 13){
      this.addVal()
      this.search()
    }
  }


 
}
