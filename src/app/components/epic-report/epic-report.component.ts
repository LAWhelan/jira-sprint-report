import {Component, OnInit} from '@angular/core';
import {JiraService} from "../../services/jira.service";

@Component({
  selector: 'app-epic-report',
  templateUrl: './epic-report.component.html',
  styleUrls: ['./epic-report.component.css']
})
export class EpicReportComponent implements OnInit{
  private jiraService: JiraService;
  private epics: any;

  constructor(jiraService: JiraService) {
    this.jiraService = jiraService;
  }

  ngOnInit(): void {
    console.log('epic-report init')
    this.epics = this.jiraService.getPlannedEpics().subscribe();
  }
}
