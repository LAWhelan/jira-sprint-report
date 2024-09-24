import {Component, OnInit} from '@angular/core';
import {JiraService} from "../../services/jira.service";
import {tap} from "rxjs/operators";
import {Issue, IssueList} from "../../model/model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-epic-report',
  templateUrl: './epic-report.component.html',
  styleUrls: ['./epic-report.component.css']
})
export class EpicReportComponent implements OnInit{
  private jiraService: JiraService;
  issues$: Observable<Issue>[] = []
  epics$:  Observable<IssueList> = new Observable<IssueList>()
  constructor(jiraService: JiraService) {
    this.jiraService = jiraService;
  }

  ngOnInit(): void {
    this.epics$ = this.jiraService.getPlannedEpics().pipe(
      tap(issuesList => {
        issuesList.issues.map(value => {
          this.issues$.push(this.jiraService.getIssue(value.id))
        })
      }),
    )
  }
}
