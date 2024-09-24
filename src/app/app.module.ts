import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import  { JiraReportModule } from "./jira-report/jira-report.module";
import {RouterModule} from "@angular/router";
import {AppRouterConfig} from "./lib.routes";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    JiraReportModule,
    RouterModule.forRoot(AppRouterConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
