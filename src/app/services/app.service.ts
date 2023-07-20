import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

public currentRoute = new BehaviorSubject<string>('');

public currentRoute$ = this.currentRoute.asObservable();

constructor() { }

}
