import {Routes} from "@angular/router";
import {SprintReportComponent} from "./components/sprint-report/sprint-report.component";
import {EpicReportComponent} from "./components/epic-report/epic-report.component";

export const AppRouterConfig: Routes = [
  {
    path: 'sprint-report',
    component: SprintReportComponent
  },
  {
    path: 'epic-report',
    component: EpicReportComponent
  }
]
