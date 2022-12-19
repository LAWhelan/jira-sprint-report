import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import  { JiraReportModule } from "./jira-report/jira-report.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    JiraReportModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
