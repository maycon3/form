import { NgModule } from '@angular/core';
import { TemplateFormComponent } from './template-form.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations:[
        TemplateFormComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        SharedModule
    ],
   
})
export class TemplateFormModule { }