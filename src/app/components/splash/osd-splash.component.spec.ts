/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OsdSplashComponent } from './osd-splash.component';

describe('OsdSplashComponent', () => {
  let component: OsdSplashComponent;
  let fixture: ComponentFixture<OsdSplashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsdSplashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsdSplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
