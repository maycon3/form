import { NgModule } from '@angular/core';
import { CampoControlComponent } from './campo-control/campo-control.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { CommonModule } from '@angular/common';
import { DropdownService } from './services/dropdown.service';
import { HttpClientModule } from '@angular/common/http';
import { ErrorMsgComponent } from './error-msg/error-msg.component';

@NgModule({
    declarations:[
        CampoControlComponent,
        FormDebugComponent,
        ErrorMsgComponent
    ],
    imports:[
        CommonModule,
        HttpClientModule
    ],
    exports:[
        CampoControlComponent,
        FormDebugComponent,
        ErrorMsgComponent
    ],
    providers:[
        DropdownService
    ]
})
export class SharedModule  { }