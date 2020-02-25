import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: HttpClient) { }

  formatDay(today: Date, lastDay: Date){

    // console.log(today.getFullYear() > lastDay.getFullYear())
    // console.log(today.getMonth() > lastDay.getMonth())
    // console.log(today.getDate() > lastDay.getDate())
    // var a = today.getDate()
    // var b = lastDay.getDate()
    // console.log(a,b)
    // console.log(today, lastDay)

    // Primero preguntamos por el año, mes y finalmente el dia el mes
    if(today.getFullYear() > lastDay.getFullYear()){
        return true;
    }
    if(today.getMonth() > lastDay.getMonth()){
        return true;
    }
    if(today.getDate() > lastDay.getDate()){
        return true;
    }else{
        return false;
    }
  }

  obtainLastDay(list){
    var lastDay = new Date();
    
    _.forEach(list, data =>{
      lastDay = new Date(data.day);
    })

    return lastDay;
  }


}
