/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThankkyouComponent } from './thankkyou.component';

describe('ThankkyouComponent', () => {
  let component: ThankkyouComponent;
  let fixture: ComponentFixture<ThankkyouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThankkyouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankkyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
