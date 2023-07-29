import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService<T> {

  constructor(
    private http: HttpClient
  ) { }

  fetchRecords(apiPath: string) {
    return this.http.get<T[]>(environment.api +'/'+ apiPath)
  }

  updateRecord(apiPath: string, data: T) {
    return this.http.put<T>(environment.api +'/'+ apiPath, data)
  }

  updateRecords(apiPath: string, data: T[]) {
    return this.http.put<T>(environment.api +'/'+ apiPath, data)
  }

  createRecord(apiPath: string, data: T) {

    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': '*/*', 'Host': 'wavecoders.ca'})
    const options = { headers: headers }

    return this.http.post<T>(environment.api +'/'+ apiPath, data, options)
  }

  deleteRecord(apiPath: string) {
    return this.http.delete<T>(environment.api +'/'+ apiPath)
  }
}
