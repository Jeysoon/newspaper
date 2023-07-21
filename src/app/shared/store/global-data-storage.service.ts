
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UtilsService } from './utils.service';

import { EncryptionDecryptionService } from './encryption-decryption.service';
import { StorageOptions } from './models/storage-options.model';
import { GlobalStorage } from './models/store.model';

  @Injectable({
    providedIn: 'root'
  })
  export class GlobalDataStorageService {

    private dataStore = new BehaviorSubject({})
    dataStore$ = this.dataStore.asObservable()

    private settings: any = {}
    private storage: GlobalStorage[] = []

    protected utilsService = inject(UtilsService)

    lc = (str: string) => str.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '_')

    constructor(
      private encryptionDecryptionService: EncryptionDecryptionService
    ) {
      this.storage = this.getStorageOptions()
    }

    initStorage() {

      const storageStores = this.getStorageOptions()
      storageStores.map(item => {
        this.initDataStore(item.store, item.options, true)
      })

    }

    initDataStore(storeName: string, options?: StorageOptions, create = false) {

      const store = this.lc(storeName)
      const hasOptions = this.initStorageOptions(store, options, create)

      if(!this.hasStore(store)) {
        const updatedOptions = StorageOptions.adapt({ ...options, ...{ override: true }})
        this.createStore(store, updatedOptions)
      }

      if(hasOptions) {

        const hasStore = this.loadStore(store)
        this.removeExpired(store)
        this.updateStore(store)

        return hasStore

      }

      return false

    }

    updateStoreStorageOptions(storeName: string, options: StorageOptions) {

      const store = this.lc(storeName)
      const storageData = this.getStorageOptions()
      const optionsIndex = storageData.findIndex(item => item.store === store)

      if(optionsIndex >= 0) {

        const curOptions = storageData[optionsIndex].options

        if(!this.utilsService.objectsEqual(options, curOptions)) {
          storageData[optionsIndex].options = options
          this.setStorageOptions(storageData)
          this.removeStore(storeName)
          this.initDataStore(storeName, options)
          return true
        }

      }

      return false

    }

    getStoreStorageOptions(storeName: string) {

      const store = this.lc(storeName)
      const storageData = this.getStorageOptions()
      const optionsData = storageData.find(item => item.store === store)
      return optionsData?.options

    }

    getStores() {
      return this.storage.map(item => item.store)
    }

    getSetting(storeName: string, setting: string) {

      const store = this.lc(storeName)
      const settings = this.lc(setting)

      try {

        if(!this.hasStore(store)) {
          const message = `No such Store '${store}' has been Initialized`
          throw new Error(message)
        }

        this.removeExpired(store, settings)
        return this.findSetting(store, settings)

      } catch(error) {
        return
      }

    }

    getSettings(storeName: string) {

      const store = this.lc(storeName)

      try {

        if(!this.hasStore(store)) {
          const message = `No such Store '${store}' has been Initialized`
          throw new Error(message)
        }

        const result = this.removeOptions({ ...this.settings[store] })
        return Object.keys(result)

      } catch(error) {
        return []
      }

    }

    settingExists(storeName: string, setting: string) {
      const store = this.lc(storeName)
      const settings = this.lc(setting)
      return (this.getSetting(store, settings)) ? true : false
    }

    storeExists(storeName: string) {
      const store = this.lc(storeName)
      return (this.getStores().find(st => st === store.toLocaleLowerCase())) ? true : false
    }

    createSetting(storeName: string, setting: string, initialValue = {}, options?: { expiresIn?: string, override?: boolean }) {

      const store = this.lc(storeName)
      const settings = this.lc(setting)

      try {

        if(!this.hasStore(store)) {
          const message = `No such Store '${store}' has been Initialized`
          throw new Error(message)
        }

        this.removeExpired(store, settings)
        const exists = this.settingExists(store, settings)

        if(exists) {
          const message = `Setting ' ${settings} for Store ${store}' already exists`
          throw new Error(message)
        }

        const expiresEpoch = this.expires(options?.expiresIn)

        if(expiresEpoch) {
          this.settings[store][settings] = { value: initialValue, expires: expiresEpoch }
        } else {
          this.settings[store][settings] = { value: initialValue }
        }

        this.updateStore(store)

      } catch(error) {
        console.log(error)
        return false
      }

      return true

    }

    updateSetting(storeName: string, setting: string, value: any, create?: boolean) {

      const store = this.lc(storeName)
      const settings = this.lc(setting)

      try {

        if(!this.hasStore(store)) {
          const message = `No such Store '${store}' has been Initialized`
          throw new Error(message)
        }

        this.removeExpired(store, settings)
        const foundSetting = this.findSetting(store, settings)

        if(!foundSetting) {
          const message = `No such Setting '${settings}' in Store ${store}`
          throw new Error(message)
        }

        this.settings[store][settings] = { ...this.settings[store][settings], ...{ value } }
        this.updateStore(store)

      } catch(error) {
        console.log(error)
        return false
      }

      return true

    }

    removeSetting(storeName: string, setting: string) {

      const store = this.lc(storeName)
      const settings = this.lc(setting)

      try {

        if(!this.hasStore(store)) {
          const message = `No such Store '${store}' has been Initialized`
          throw new Error(message)
        }

        this.removeExpired(store, settings)
        const foundSetting = this.findSetting(store, settings)

        if(foundSetting) {
          delete this.settings[store][settings]
          this.updateStore(store)
          return true
        }

      } catch(error) {
        console.log(error)
        return false
      }

      return false

    }

    getExpiryTime(settingsObject: any) {

      if(this.hasExpiry(settingsObject)) {
        const timeRemaining = this.expiresIn(settingsObject.expires) || 0
        const hours = Math.floor(timeRemaining/60/60)
        const minutes = Math.floor(timeRemaining/60)
        return { hours: (hours < 1) ? 0 : hours, minutes: (minutes < 1) ? 0 : minutes }
      } else {
        return
      }

    }

    getExpiryDate(settingsObject: any, localDate?: boolean) {
      const date = (this.hasExpiry(settingsObject)) ? settingsObject.expires : undefined
      return (date) ? (localDate) ? new Date(date * 1000) : date : date
    }

    createStore(storeName: string, options?: StorageOptions) {

      const store = this.lc(storeName)

      if(this.storeExists(store) && !options?.override) {
        console.warn('Store: "'+store.toUpperCase()+'" already exists. You cannot have duplicate stores')
        return false
      }

      if(!this.storeInitialized(store)) {
          console.warn('Store: "'+store.toUpperCase()+'" has been initialized with Default Storage options')
          options = StorageOptions.adapt({ override: true })
      }

      this.initStorageOptions(store, options, true)

      if(this.hasStore(store) && !(options?.override)) return false

      this.settings[store] = {}

      if(options?.expiresIn) {
        const expiresIn = this.expires(options?.expiresIn)
        this.settings[store] = { ...this.settings[store], ...{ expires: expiresIn } }
      }

      this.updateStore(store)
      return true
    }

    removeStore(storeName: string) {

      const store = this.lc(storeName)
      const storageOptions = this.getStoreStorageOptions(store)

      delete this.settings[store]
      this.removeStoreStorageOptions(store)

      if(storageOptions?.session) {
        sessionStorage.removeItem(store)
      } else {
        localStorage.removeItem(store)
      }

      return true

    }

    clearStore(storeName: string) {
      const store = this.lc(storeName)
      if(!this.hasStore(store)) return false
      this.settings[store] = {}
      return true
    }

    removeStorage() {

      const storageData = this.getStorageOptions()
      storageData.map(item => this.removeStore(item.store))

      sessionStorage.removeItem('storage')
      this.storage = []

    }

    private loadStore(storeName: string) {

      const store = this.lc(storeName)

      if(!this.storeInitialized(store)) {
        this.initStorageOptions(store, StorageOptions.adapt(), true)
        console.warn('Store: ', store, 'has been initialized with Default options')
      }

      this.hasStore(store)
      const storageOptions = this.getStoreStorageOptions(store)

      const data = (storageOptions?.session) ? sessionStorage.getItem(store) : localStorage.getItem(store)
      const decryptedData = (storageOptions?.encrypt) ? this.encryptionDecryptionService.decrypt(data || '') : data
      const storeData = (!(!decryptedData && decryptedData !== '')) ? JSON.parse(decryptedData || '{}') : {}

      if(!storeData) return false

      this.settings[store] = storeData
      this.dataStore.next(this.settings)

      return true
    }

    private removeExpired(storeName: string, setting = '') {

      const store = this.lc(storeName)
      const settings = this.lc(setting)

      if(!this.hasStore(store)) return
      if(!this.settingExists(store, settings)) return

      const expiryObj = (store && settings) ? this.settings[store][settings] : this.settings[store]

      if(this.hasExpiry(expiryObj)) {
        if(this.hasExpired(expiryObj.expires)) {

          if(store && settings) {
            delete this.settings[store][settings]
            this.updateStore(store)
            return true
          } else {
            this.removeStore(store)
            return true
          }

        }
      }

      return false

    }

    private hasStore(storeName: string) {
      const store = this.lc(storeName)
      const found = this.storage.find(item => item.store === store)
      return (found) ? true : false
    }

    private expires(str?: string) {

      if(!str) return
      const type = str.slice(-1)
      const now = Math.floor(new Date().getTime() / 1000)

      switch (type) {
        case
        'd':
          const days = parseInt(str.slice(0, -1))
          return now + (days * 86400)
        break;
        case
        'h':
          const hrs = parseInt(str.slice(0, -1))
          return now + (hrs * 3600)
        break;
        default:
          return
          break;
      }

    }

    private hasExpired(expiryDate: number) {
      if(!expiryDate) return
      const expires = this.expiresIn(expiryDate)
      return (expires! < 0) ? true : false
    }

    private hasExpiry(setting: any) {
      return (setting?.expires) ? true : false
    }

    private expiresIn(expiryDate: number) {
      if(!expiryDate) return
      const now = Math.floor(new Date().getTime() /1000)
      return expiryDate - now
    }

    private updateStore(storeName: string) {

      const store = this.lc(storeName)
      const storageOptions = this.getStoreStorageOptions(store)

      const data = (storageOptions?.encrypt) ?
        this.encryptionDecryptionService.encrypt(this.settings[store]) : JSON.stringify(this.settings[store])

      if(storageOptions?.session) {
        sessionStorage.setItem(store.toLowerCase(), data)
      } else {
        localStorage.setItem(store.toLowerCase(), data)
      }

      setTimeout(() => {
        this.dataStore.next(this.settings)
      }, 500)

    }

    private findSetting(storeName: string, setting: string) {

      const store = this.lc(storeName)
      const settings = this.lc(setting)

      let foundSetting = this.utilsService.getValueByProp(this.settings[store], settings)

      if(foundSetting) {

        const isExpired = this.hasExpired(foundSetting?.expires)

        if(isExpired) {
          this.removeSetting(store, settings)
          return
        }

      }

      return foundSetting

    }

    private initStorageOptions(storeName: string, options?: StorageOptions, createOptions = false) {

      const store = this.lc(storeName)
      const option = (options) ? options : StorageOptions.adapt()

      const storageConfig = sessionStorage.getItem('storage')
      const storageData: GlobalStorage[] = (storageConfig) ? JSON.parse(storageConfig) : []

      const foundIndex = storageData.findIndex(item => item.store === store)

      if(foundIndex > -1) {
        storageData[foundIndex].options = option
      } else {

        if(createOptions) {
          storageData.push({ store: store, options: option })
        } else {
          return false
        }

      }

      this.setStorageOptions(storageData)

      return true

    }

    private getStorageOptions(): { store: string, options: StorageOptions }[] {

      const storageConfig = sessionStorage.getItem('storage')
      return (storageConfig) ? JSON.parse(storageConfig) : []

    }

    private setStorageOptions(storageConfigs: { store: string, options: StorageOptions }[]) {

      sessionStorage.setItem('storage', JSON.stringify(storageConfigs))
      this.storage = storageConfigs
      return true

    }

    private removeStoreStorageOptions(storeName: string) {

      const store = this.lc(storeName)
      const storageData = this.getStorageOptions()
      const storageConfigs = storageData.filter(item => item.store !== store)
      this.setStorageOptions(storageConfigs)

    }

    private storeInitialized(storeName: string) {
      const store = this.lc(storeName)
      return this.getStoreStorageOptions(store)
    }

    private removeOptions(obj: any) {
      const keys: string[] = ['expires']
      keys.forEach(key => delete obj[key])
      return obj
    }

}
