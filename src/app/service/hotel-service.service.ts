import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Data } from '../model/data';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HotelServiceService {

  constructor(private httpClient:HttpClient) { }
  getData():Observable<Array<Data>>{
    return this.httpClient.get<Array<Data>>("https://api.npoint.io/d8c6ab8ac5307d469528")
  }

}
