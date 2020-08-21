import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, fromEventPattern, EmptyError } from 'rxjs';
import { Data } from 'src/app/model/data';
import { HotelServiceService } from 'src/app/service/hotel-service.service';
import { isNgTemplate } from '@angular/compiler';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   cityList :  Map<number, Data> = new Map<number, Data>();
    dataLoud2:Data[]=[]
     Chekin:any;
     ChekOut:any;
     Search:FormGroup;
     totalNigt:number;
     checkDate:Date;
     contHotel:number;
  constructor(private service:HotelServiceService,private cdr: ChangeDetectorRef) { 
    this.Chekin='';
    this.ChekOut='';
    this.totalNigt=0;
    this.checkDate=new Date;
    console.log(this.checkDate)
    this.Search = new FormGroup({
      checkin:  new FormControl('',[Validators.required]),
      checkout:  new FormControl ('',[Validators.required]),
    
    });
  }

  ngOnInit(): void {
   
 
   

    
 
  }
  get f(){
    
    return this.Search.controls;
  
}
  ngAfterViewChecked(){
    //your code to update the model
    this.cdr.detectChanges();
 }
 onSubmit(){
   dataLoud2:Data[]=[];
   this.Chekin=this.Search.get('checkin').value;
   this.ChekOut=this.Search.get('checkout').value;
   console.log((Date.parse(this.ChekOut)-Date.parse(this.Chekin))/86400000)
   this.totalNigt=(Date.parse(this.ChekOut)-Date.parse(this.Chekin))/86400000;
    console.log( this.Chekin)
    let newDate = new Date(this.Chekin);
    this.contHotel=0;
    this.service.getData().subscribe(data=>{
     
      for(let entry of data){
       
        if(newDate>=new Date(entry.available_on)){
          if(this.dataLoud2.length==0){
           
                entry.count=1;
                this.dataLoud2.push(entry);
          }
      else if(this.dataLoud2.length>=0){
          
           if (!this.dataLoud2.some((item) => item.city == entry.city)) {
             entry.count=1;
             this.dataLoud2.push(entry);
            }
            else{
            var  index = this.dataLoud2.findIndex(x => x.city ===entry.city);
            this.dataLoud2[index].count+=1;
            }
     
      
     } 
     
          }
          this.contHotel+=1;
     }
    
    
     });
   }
  highPrice(){
    this.dataLoud2.sort((a,b) => (a.price< b.price) ? 1 : ((b.price < a.price) ? -1 : 0)); 
  }
  lowPrice(){
    this.dataLoud2.sort((a,b) => (a.price> b.price) ? 1 : ((b.price >a.price) ? -1 : 0)); 
  }
  AzSort(){
    this.dataLoud2.sort((a,b) => (a.name> b.name) ? 1 : ((b.name >a.name) ? -1 : 0)); 
  }
  ZaSort(){
    console.log('welcome');
    this.dataLoud2.sort((a,b) => (a.name< b.name) ? 1 : ((b.name <a.name) ? -1 : 0)); 
  }
  countDublicateCity(array:Data[]){
console.log(array.length)
  }

}
