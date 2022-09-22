import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncateTextPipe } from './truncate-text.pipe';
import { TimeHMSPipe } from './time-hms.pipe';



@NgModule({
  declarations: [
    TruncateTextPipe,
    TimeHMSPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TruncateTextPipe,
		TimeHMSPipe
  ]
})
export class PipesModule { }
