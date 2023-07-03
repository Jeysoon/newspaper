import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

public currentRoute = new BehaviorSubject<string>('');

// Expose the subject as an Observable
public currentRoute$ = this.currentRoute.asObservable();

constructor() { }

}
