import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SprintReportComponent } from './sprint-report/sprint-report.component';
import { FormsModule } from "@angular/forms";
import { JiraService } from "../../services/jira.service";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [
    SprintReportComponent
  ],
  exports: [
    SprintReportComponent
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
