/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OsdEntryFormComponent } from './osd-entry-form.component';

describe('OsdEntryFormComponent', () => {
  let component: OsdEntryFormComponent;
  let fixture: ComponentFixture<OsdEntryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsdEntryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsdEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
