import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report/report.component';
import { FormsModule } from "@angular/forms";
import { JiraService } from "./services/jira.service";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [
    ReportComponent
  ],
  exports: [
    ReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    JiraService
  ]
})
export class JiraReportModule { }
