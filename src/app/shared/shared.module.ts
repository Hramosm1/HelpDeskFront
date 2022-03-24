import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopComponent } from './top/top.component';
import { BaseComponent } from './base/base.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TopComponent,
        BaseComponent
    ],
    declarations: [
      TopComponent,
      BaseComponent
    ]
})
export class SharedModule
{
}
