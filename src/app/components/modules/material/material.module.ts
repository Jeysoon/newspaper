import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponent } from './material.component';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [MaterialComponent],
  exports: [MatButtonModule, MatIconModule]
})
export class MaterialModule { }
