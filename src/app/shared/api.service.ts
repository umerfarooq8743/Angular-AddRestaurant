import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }
  postRestaurant(data:any){
    return this._http.post<any>("http://localhost:3000/posts",data).pipe(map((res:any)=>{
      return res;
    }))
  }
  getRestaurant(){
    return this._http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=>{
      return res;
    }))
  }
  updatesRestaurant(data:any,id:number){
    var routs="http://localhost:3000/posts/"
    return this._http.put<any>(routs+id,data).pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteRestaurant(id:number){debugger
    var route = "http://localhost:3000/posts/" + id
    return this._http.delete<any>(route).pipe(map((res:any)=>{
      return res;
    }))
  }
}
