import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import {AppService} from './app.service'
import {MdSidenav, MdButton} from '@angular/material'




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
        [0, 'Other']
    ],
    1:[
        [5, 'Add-on courses'],
        [6, 'Audit courses'],
        [7, 'Interships'],
        [8, 'Skill development programs'],
        [0, 'Other']
    ]
}

const sort_options = [
  ['_title', 'Achievement title'],
  ['_user__user__username',  'USN'],
  ['_created_at', 'Upload date'],
  ['_event_time', 'Event date'],
  ['_place', 'Event Place']
]


@Component({
  selector: 'my-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnDestroy{
  doc_types = doc_type_choce;
  doc_domains = doc_domain_choice;
  doc_cats = doc_category_choice;
  doc_sub_cats = doc_sub_cat_choice;
  doc_year = doc_year_choice;
  doc_sort_options = sort_options;
  type_query = new Set()
  myresult:number = 0;
  ngOnDestroy(){
  
  }
   addType(e, domain){
    
    if(e.checked == true)
      this._aps.type_query.add(domain)
    else
      this._aps.type_query.delete(domain)
    console.log(this._aps.type_query)
    
  }

  toggleAllTypes(){
    if(this._aps.type_query.size == 0){
      this.doc_types.forEach(e =>{
        this._aps.type_query.add(e[0])
      })
    }
    else this._aps.type_query = new Set()
  }
   cdoc_id = null;
  navinfo = null;
  @ViewChild('infonavbar') nav:MdSidenav;
  showInfo(file){
    this._aps.navinfo = file
    this.nav.open()
  }
  constructor(private _aps:AppService){
    this.result='Files';
    this.search()
    // console.log(window.location.pathname = "/stats")
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
      this._aps.years.add(this.val)
    else
      this._aps.usns.add(this.val.toLocaleUpperCase())
    this.val = ""
    }
  clear(){
    this._aps.usns = new Set()
    this._aps.years = new Set()
  }
  getArray(e:Set<any>){
    if(!e) return []  
    var tmp = []
    e.forEach(e=>{
      tmp.push(e)
    })
    return tmp
  }
  docs = []
  nextpage = null
  count = 0;
  students = []
  snextpage = null
  scount = 0
  search(){
    var keys = this.getArray(this._aps.years).concat(this.getArray(this._aps.usns))
    var domains = this.getArray(this._aps.domain_query)
    var cats = this.getArray(this._aps.cat_query)
    var years = this.getArray(this._aps.year_query)
    var types = this.getArray(this._aps.type_query)
    let subcats = new Set()
    cats.forEach(e => {
      console.log('cat',e)
      console.log(this._aps.sub_cat_query[e])
      this.getArray(this._aps.sub_cat_query[e]).forEach(t =>{
        subcats.add(t)
      })
    })
    console.log(keys, domains, cats, years, subcats,types)
    // if(true == true)return;
    if(this._aps.myresult == 1)
    this._aps.getDocs(keys, domains, cats, years, types, this.getArray(subcats),this._aps.sortby, true).subscribe(e=>{
      console.log(e.json())
       var t  =e.json()
       this._aps.students = []
      t.results.forEach(e=>{
        this._aps.students.push(e)
      })
      this._aps.snextpage = t.next
      this._aps.scount = t.count
    })
    else{
      this._aps.getDocs(keys, domains, cats, years, types, this.getArray(subcats),this._aps.sortby).subscribe(e=>{
      console.log(e.json())
       var t  =e.json()
       this._aps.docs = []
      t.results.forEach(e=>{
        this._aps.docs.push(e)
      })
      this._aps.nextpage = t.next
      this._aps.count = t.count
    })
    }
  }
 getDate(str){
    return new Date(str).toDateString()
  }
  loadMore(link){
   this._aps.loadMore(link).subscribe(e=>{
      var t  =e.json()
      t.results.forEach(e=>{
        this._aps.docs.push(e)
      })
      this._aps.nextpage = t.next
   }, e=>{
     console.log("error", e)
   })
  }

loadMores(link){
   this._aps.loadMore(link).subscribe(e=>{
      var t  =e.json()
      t.results.forEach(e=>{
        this._aps.students.push(e)
      })
      this._aps.snextpage = t.next
   }, e=>{
     console.log("error", e)
   })
  }

  domain_list = ['Department', 'Institution', 'National', 'International']
  toggleAllDomain(){
    if(this._aps.domain_query.size == 0)
      this.doc_domains.forEach(e =>{
        this._aps.domain_query.add(e[0])
      })
    else
      this._aps.domain_query = new Set()
  }
  
  domain_query = new Set()
  addDomain(e, domain){
    
    if(e.checked == true)
      this._aps.domain_query.add(domain)
    else
      this._aps.domain_query.delete(domain)
    console.log(this._aps.domain_query)
    
  }

  cat_list_det = {
    'Cultural':[],
    'Technical':['workshop', 'Conference', 'Projects', 'Other'],
    'Sport':[], 
    'Academic':['Addon Courses', 'Audit courses', 'Internships', 'Skill dev programs', 'Other'], 
    'Other':[]
  }

  cat_list =  Object.keys(this.cat_list_det)
  toggleAllCategory(){
    if(this._aps.cat_query.size == 0)
      this.doc_cats.forEach(e =>{
        this._aps.cat_query.add(e[0])
      })
    else
      this._aps.cat_query = new Set()
  }
  sub_cat_query = {};
  tmp_squery = {}
  toggleSubCategory(cat){
    if(!this._aps.sub_cat_query[cat]){
      console.log(cat,this._aps.sub_cat_query[cat])
    }
    if(this._aps.sub_cat_query[cat].size == 0){
      this.doc_sub_cats[cat].forEach(e=>{
        this._aps.sub_cat_query[cat].add(e[0])
      })
    }else this._aps.sub_cat_query[cat] = new Set()
  }
  doc_type = ['Participation', 'Achievement']
  cat_query = new Set()
  addCategory(e, cat, el){
    console.log(el)
  
    if(e.checked == true){
      this._aps.cat_query.add(cat);
    }
    else{
      this._aps.cat_query.delete(cat);
    }
    console.log(this._aps.cat_query)
  }
  year_list = [['1st year', 1], ['2nd year', 2],['3rd year', 3], ['4th year', 4]]
  year_query = new Set()
  addYear(e, year){
    if(e.checked == true)
      this._aps.year_query.add(year)
    else
      this._aps.year_query.delete(year)
    console.log(this._aps.year_query)
  }

  toggleAllYears(){
    if(this._aps.year_query.size == 0){
      this.doc_year.forEach(e =>{
        this._aps.year_query.add(e[0])
      })

    }else this._aps.year_query = new Set()
  }
  check($event){
    if($event.keyCode == 13){
      this.addVal()
      this.search()
    }
  }
   addSubCategory(e, cat, subcat){
     if(!this._aps.sub_cat_query[cat]){
       this._aps.sub_cat_query[cat] = new Set()
     }
    if(e.checked == true)
      this._aps.sub_cat_query[cat].add(subcat)
    else
      this._aps.sub_cat_query[cat].delete(subcat)
    // console.log(this.cat_query)
  }
  ngOnInit(){

  // console.log(this.sub_cat_query)
  // this.docs =            this._aps.docs
  // this.nextpage =        this._aps.nextpage
  // this.count =           this._aps.count
  // this.students =        this._aps.students
  // this.snextpage =       this._aps.snextpage
  // this.scount =          this._aps.scount
  // this.domain_query =    this._aps.domain_query
  // this.sub_cat_query =   this._aps.sub_cat_query;
  // this.tmp_squery =      this._aps.tmp_squery
  // this.cat_query =       this._aps.cat_query
  // this.year_query =      this._aps.year_query
  // this.usns =            this._aps.usns
  // this.years =           this._aps.years
  // this.cdoc_id =         this._aps.cdoc_id
  // this.navinfo =         this._aps.navinfo
  // this.type_query =      this._aps.type_query
  // this.myresult=         this._aps.myresult
    // if(this._aps.sub_cat_query == {}){
    //     this.doc_cats.forEach(e=>{
    //   this._aps.sub_cat_query[e[0]] = new Set()
    // })
    // }
  }
  download(){
    this._aps.loadMore('/api/stats/getpdf').subscribe(e=>{
      // console.log()
      this.downloadFile((<any>e)._body)
    }
    )
  }
  downloadFile(data){
  var blob = new Blob([data], { type: 'application/pdf' });

  var url= window.URL.createObjectURL(blob);
  window.open(url,'_blank')
}
} 
