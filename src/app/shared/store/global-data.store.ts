import { takeWhile } from 'rxjs/operators';
import { inject, Inject, Injectable, InjectionToken } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { switchMap, tap, catchError, EMPTY, BehaviorSubject, concatMap, timer, Subscription, map } from 'rxjs';

import { ApiDataService } from './api-data.service';
import { ApiOptions } from './api-options.model';

const API_OPTS = new InjectionToken<ApiOptions>('API_OPTS');

export interface GlobalDataState {
  data: any[]
  selected: any
}

const defaultState: GlobalDataState = {
  data: [],
  selected: {},
};

@Injectable()
export class GlobalDataStore<T extends { id: number }> extends ComponentStore<GlobalDataState> {

  private defaultPollingInfo = { frequency: 0, pollingIn: 0, percent: 0, isPolling: false }

  pollingTimerObject = new Subscription()
  countDownTimerObject = new Subscription()

  params: Array<string | number> = []

  private nextPollingInSeconds = new BehaviorSubject(this.defaultPollingInfo)
  nextPollingInSeconds$ = this.nextPollingInSeconds.asObservable()

  private get path() {
    return this.pathJoin([ this.options.server, ...this.options.endpoint, ...this.params ])
  }

  private get hasPolling() {
    return ((this.options.polling || 0) > 0) ? true : false
  }

  isPending$ = new BehaviorSubject<boolean>(false)
  error$ = new BehaviorSubject<any>(null)

  protected apiService = inject(ApiDataService<T>)

  private isFetchRecords = false

  private pollingState = false
  private isPolling = false
  private pollingFrequency

  constructor(
    @Inject(API_OPTS) private options: ApiOptions,
  ) {

    super(defaultState)

    if(this.options.polling) {
      this.pollingFrequency = this.options.polling * 1000 //milliseconds
      this.startPolling()
      this.countDownTimer()
    }

  }

  readonly data$ = this.select(({ data }) => data)
  readonly dataRecord$ = this.select(({ selected }) => selected)

  readonly select$ = (id: number) => {
    return this.select(({ data }) => data.find(item => item.id === id))
  }

  private readonly setData$ = this.updater((state: GlobalDataState, data: T[]) => {
    return { ...state, ...{ data: data } }
  })

  private readonly setDataRecord$ = this.updater((state: GlobalDataState, data: T) => {
    return { ...state, ...{ selected: data } }
  })

  private readonly addData$ = this.updater((state: GlobalDataState, data: T) => {

    const exists = state.data.find((item: T) => item.id === data.id)

    if(exists) {
      this.error('Record already exists')
      return state
    } else {
      return { ...state, ...{ data: [...state.data, data] } }
    }

  })

  private readonly deleteData$ = this.updater((state: GlobalDataState, data: T) => {
    const foundRecord = state.data.findIndex(item => item.id === data.id)
    const newState = [ ...state.data ]
    newState.splice(foundRecord, 1)
    return { ...state, ...{ data: [...newState] } }
  })

  private readonly updateData$ = this.updater((state: GlobalDataState, data: T) => {

    const foundRecord = state.data.findIndex(item => item.id === data.id)
    const newState = [ ...state.data ]

    if(foundRecord === -1) {
      newState.push(data)
    } else {
      newState[foundRecord] = data
    }

    return { ...state, ...{ data: [...newState] } }

  })

  readonly refreshData = this.effect(data =>
    data.pipe(
      tap(() => {
        return (this.isFetchRecords) ?
          this.fetchRecords() : this.fetchRecord()
      })

  ))

  readonly fetchRecord = this.effect(data =>
    data.pipe(
      tap(() => this.isPending$.next(true)),
      switchMap((params) => this.apiService.fetchRecords(this.pathJoin([ this.path ])).pipe(
        tap({
          next: (data: any) => {
            this.setDataRecord$(data)
            this.isFetchRecords = false
            this.isPending$.next(false)
            this.pollingState = false
          }
        }),
        tap({
          error: (error) => this.error(error)
        }),
        tap({
          complete: () => this.isPending$.next(false)
        }),
        catchError(() => EMPTY),
      ))

  ))

  readonly fetchRecords = this.effect(data =>
    data.pipe(
      tap(() => this.isPending$.next(true)),
      switchMap((params) => this.apiService.fetchRecords(this.pathJoin([ this.path ])).pipe(
        tap({
          next: (data: any) => {
                this.setData$(data)
                this.isFetchRecords = true
                this.pollingState = false
                this.isPending$.next(false)
              }
        }),
        tap({
          error: (error) => this.error(error)
        }),
        tap({
          complete: () => this.isPending$.next(false)
        }),
        catchError(() => EMPTY),
      ))

  ))

  readonly addRecord = this.effect<T>(data =>
    data.pipe(
      tap(() => this.isPending$.next(true)),
      switchMap((data: T) => this.apiService.createRecord(this.path, data).pipe(
        tap({
          next: (res) => {
            this.addData$(res)
            this.setDataRecord$(res)
            this.isPending$.next(false)
              }
        }),
        tap({
          error: (error) => this.error(error)
        }),
        tap({
          complete: () => this.isPending$.next(false)
        }),
        catchError(() => EMPTY)
      ))

  ))

  readonly deleteRecord = this.effect<T>(data =>
    data.pipe(
      tap(() => this.isPending$.next(true)),
      concatMap((data: any) => this.apiService.deleteRecord(`${this.path}`).pipe(
        tap({
          next: (res) => {
            this.deleteData$(data)
            this.isPending$.next(false)
              }
        }),
        tap({
          error: (error) => this.error(error)
        }),
        tap({
          complete: () => this.isPending$.next(false)
        }),
        catchError(() => EMPTY)
    ))

  ))

  readonly updateRecord = this.effect<T>(data =>
    data.pipe(
      tap(() => this.isPending$.next(true)),
      concatMap((data?: any) => this.apiService.updateRecord(`${this.path}`, data).pipe(
        tap({
          next: (res) => {
            this.updateData$(data)
            this.isPending$.next(false)
              }
        }),
        tap({
          error: (error) => this.error(error)
        }),
        tap({
          complete: () => this.isPending$.next(false)
        }),
        catchError(() => EMPTY)
      ))

  ))

  readonly updateRecords = this.effect<T[]>(data =>
    data.pipe(
      tap(() => this.isPending$.next(true)),
      switchMap((data) => this.apiService.updateRecords(this.path, data).pipe(
        tap({
          next: (res: any) => {
            this.setData$(data)
            this.isPending$.next(false)
              }
        }),
        tap({
          error: (error) => this.error(error)
        }),
        tap({
          complete: () => this.isPending$.next(false)
        }),
        catchError(() => EMPTY),
      ))

  ))

  pathJoin(parts: any[], sep = '/') {

    return parts.map(i => {
      const value = (typeof i === 'string' || i instanceof String) ? i : i.toString()
      return value.replace(/(^\/|\/$)/, '')
    }).join(sep).replace(/\/$/, '')

  }

  error(err: string) {
    console.log('ERROR: ', err)
    this.isPending$.next(false)
    this.error$.next(err)
  }

  startPolling() {

    if(this.hasPolling && this.pollingState) return

    if(!this.isPolling) {
      this.isPolling = true
      this.countDownTimerObject.add(() => this.countDownTimer())
      this.pollingTimerObject =
        timer((this.pollingFrequency || 0), (this.pollingFrequency || 0))
        .pipe(
        ).subscribe(data => {
          this.countDownTimer()
          this.refreshData()
        })
      }
  }

  stopPolling() {
    this.options.polling = 0
    this.isPolling = false
    this.pollingTimerObject.unsubscribe()
    this.countDownTimerObject.unsubscribe()
    this.nextPollingInSeconds.next(this.defaultPollingInfo)
  }

  countDownTimer() {
    this.nextPollingInSeconds.next(this.defaultPollingInfo)
    this.countDownTimerObject = timer(0, 1000)
    .pipe(
      map(t => t),
      takeWhile(t => t < (this.pollingFrequency || 0)/1000),
      tap(t => {
        const pollingLength = (this.pollingFrequency || 0)/1000
        const pollingTime = pollingLength - t
        const percent = Math.floor((100/pollingLength) * (pollingLength - pollingTime))
        const curPercent = (pollingTime === 0) ? 0 : percent
        const pollingInfo = { frequency: this.options.polling || 0, pollingIn: pollingTime, percent: curPercent, isPolling: this.isPolling }
        this.nextPollingInSeconds.next(pollingInfo)
      })
    ).subscribe()
  }

}
