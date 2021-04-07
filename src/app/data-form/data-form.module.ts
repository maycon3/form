import { NgModule } from '@angular/core';
import { DataFormComponent } from './data-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations:[
        DataFormComponent
    ],
    imports:[
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class DataFormModule { }