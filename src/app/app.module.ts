import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {AppRouterConfig} from "./lib.routes";
import { EpicReportComponent } from './components/epic-report/epic-report.component';
import {SprintReportComponent} from "./components/sprint-report/sprint-report.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {JiraService} from "./services/jira.service";


@NgModule({
  declarations: [
    AppComponent,
    EpicReportComponent,
    SprintReportComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRouterConfig),
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [JiraService],
  bootstrap: [AppComponent]
})
export class AppModule { }
