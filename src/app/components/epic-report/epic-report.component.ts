import {Component, OnInit} from '@angular/core';
import {JiraService} from "../../services/jira.service";
import {map, mergeMap,} from "rxjs/operators";
import {Issue} from "../../model/model";
import {combineLatest, from, Observable, toArray} from "rxjs";

@Component({
  selector: 'app-epic-report',
  templateUrl: './epic-report.component.html',
  styleUrls: ['./epic-report.component.css']
})
export class EpicReportComponent implements OnInit{
  private jiraService: JiraService;
  issues$: Observable<Issue[]> = new Observable<Issue[]>()
  teams$: Observable<String[]> = new Observable<String[]>()
  issuesByTeam$: Observable<Map<String, Issue[]>> = new Observable<Map<String, Issue[]>>
  constructor(jiraService: JiraService) {
    this.jiraService = jiraService;
  }

  ngOnInit(): void {
    this.issues$ = this.jiraService.getPlannedEpics();
    this.teams$ = this.issues$.pipe(
      mergeMap(issues => from(issues)),
      map(issue=> issue.fields.customfield_10109?.value ?? ''),
      toArray()
    )
    this.issuesByTeam$ = combineLatest([this.issues$, this.teams$]).pipe(
     map(([issues, teams]) => {
       // Create an object to hold the issues for each team
       const issuesByTeam = new Map<String, Issue[]>();

       // Initialize an empty array for each team
       teams.forEach(team => {
         issuesByTeam.set(team, [])
       });
       issuesByTeam.set('Unassigned', [])

       // Organize issues into the respective team arrays
       issues.forEach(issue => {
         const teamId = issue.fields.customfield_10109?.value ?? 'Unassigned';
         if (issuesByTeam.get(teamId)) {
           issuesByTeam.get(teamId)?.push(issue);
         }
       });

       return issuesByTeam;
     })
    )
  }
}
