import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './modules/angular-material.module/angular-material.module';
import { DevExpressModule } from './modules/dev-express/devexpress.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        DevExpressModule,
        HttpClientModule,
        BrowserTransferStateModule,
        ToastrModule.forRoot(),
        NgxMaskModule.forRoot()
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        DevExpressModule,
        HttpClientModule,
        BrowserTransferStateModule,
        ToastrModule,
        NgxMaskModule
    ]
})
export class SharedModule
{
}
