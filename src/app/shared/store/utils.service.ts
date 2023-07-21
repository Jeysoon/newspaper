
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  http = inject(HttpClient)

  constructor() { }

  isString(x: string | number) {
    return Object.prototype.toString.call(x) === '[object String]'
  }

  isObject(obj: any) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  }

  JSONToString(value: any) {
    return (this.isObject(value)) ? JSON.stringify(value) : value
  }

  stringToJSON(value: string) {
    return (this.isJSON(value)) ? JSON.parse(value) : value
  }

  isJSON(str: string) {
    try {
      JSON.parse(str)
    } catch (e) {
      return false
    }
    return true
  }

  getValueByProp(obj: any, prop: string) {
    if(typeof obj === 'undefined') return false
    return obj[prop]
  }

  objectsEqual(x: any, y: any): boolean {

    const ok = Object.keys, tx = typeof x, ty = typeof y

    return x && y && tx === 'object' && tx === ty ? (
      ok(x).length === ok(y).length &&
        ok(x).every((key: any) => this.objectsEqual(x[key], y[key]))
    ) : (x === y)

  }

  getJSON(file: string) {
    return this.http.get(`assets/data/${file}`)
  }

}
