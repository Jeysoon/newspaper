import { Injectable, inject } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { AppService } from 'src/app/utils/app.service';
import { RandomSignature } from 'src/app/utils/random';

@Injectable({
  providedIn: 'root'
})
export class EncryptionDecryptionService {

  appID

  private appService = inject(AppService)

  constructor() {
    this.appID = (this.appService.appID) ? this.appService.appID : ''
    if(this.appID === '') console.warn('No App Key has been define')
  }

  generateCipherKey() {
    return (RandomSignature().toString() + RandomSignature().toString()).substring(0, 8)
  }

  encrypt(str: string, key = this.appID) {

    if(!str || key === '') return ''

    let _key = CryptoJS.enc.Utf8.parse(key)
    let _iv = CryptoJS.enc.Utf8.parse(key)

    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(str), _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });

      return encrypted.toString()

  }

  decrypt(str: string, key = this.appID) {

    if(!str || key === '') return

    let _key = CryptoJS.enc.Utf8.parse(key)
    let _iv = CryptoJS.enc.Utf8.parse(key)

    return CryptoJS.AES.decrypt(
      str, _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);

  }

}
