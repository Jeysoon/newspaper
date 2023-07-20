/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OsdMessageComponent } from './osd-message.component';

describe('OsdMessageComponent', () => {
  let component: OsdMessageComponent;
  let fixture: ComponentFixture<OsdMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsdMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsdMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
