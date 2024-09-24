import {Routes} from "@angular/router";
import {ReportComponent} from "./jira-report/report/report.component";

export const AppRouterConfig: Routes = [
    {
      path: 'sprint-report',
      component: ReportComponent
    }
  ]
