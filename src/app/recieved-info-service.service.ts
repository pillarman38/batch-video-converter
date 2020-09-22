import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs'; 
@Injectable({
  providedIn: 'root'
})
export class RecievedInfoServiceService {
  getInfo = new BehaviorSubject<any[]>(null)
  why: Observable<any[]> = this.getInfo.asObservable();
  constructor() { }

  changeInfo(message: any) {
    console.log(message);
    this.getInfo.next(message)
    
  }
}
