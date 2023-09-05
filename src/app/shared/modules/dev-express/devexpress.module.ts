import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDataGridModule, DxSchedulerModule, DxTemplateModule,  
         DxFormModule, DxSelectBoxModule, DxTabPanelModule, DxRadioGroupModule } from 'devextreme-angular';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxChartModule, 
         DxPieChartModule, 
         DxMapModule, 
         DxCheckBoxModule, DxDiagramModule, DxDrawerModule, DxPopupModule } from 'devextreme-angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    DxSchedulerModule,
    DxTemplateModule,
    DxChartModule,
    DxPieChartModule,
    DxFormModule, 
    DxSelectBoxModule, 
    DxTabPanelModule,
    DxMapModule, 
    DxCheckBoxModule,
    DxDiagramModule,
    DxDrawerModule,
    DxPopupModule,
    DxRadioGroupModule
  ],
  exports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    DxSchedulerModule,
    DxTemplateModule,
    DxChartModule,
    DxPieChartModule,
    DxFormModule, 
    DxSelectBoxModule, 
    DxTabPanelModule,
    DxMapModule, 
    DxCheckBoxModule,
    DxDiagramModule,
    DxDrawerModule,
    DxPopupModule,
    DxRadioGroupModule
  ]
})
export class DevExpressModule { }
