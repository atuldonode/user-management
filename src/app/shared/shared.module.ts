import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SHARED_MATERIAL_MODULES } from './shared-material';

const Modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  ...SHARED_MATERIAL_MODULES,
];

@NgModule({
  declarations: [
  ],
  imports: [...Modules, CommonModule],
  exports: [...Modules,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [TitleCasePipe, DecimalPipe, DatePipe]
})
export class SharedModule { }
