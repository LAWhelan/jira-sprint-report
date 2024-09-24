import {Component, ElementRef, ViewChild} from '@angular/core';
import {JiraService} from "../../services/jira.service";
import {debounceTime, fromEvent} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Issue, Sprint} from "../../model/model";

@Component({
  selector: 'app-report',
  templateUrl: './sprint-report.component.html',
  styleUrls: ['./sprint-report.component.css']
})
export class SprintReportComponent {
  /**Constants**/
  private DONE: string = 'green';
  private IN_PROGRESS: string = 'yellow';
  private NOT_STARTED: string = 'blue-gray';

  /**Dependencies**/
  private jiraService: JiraService;

  /**Data binding template variables**/
  @ViewChild('submitButton') public submitButton!: ElementRef;
  sprintKey: string = '350';
  issues: Issue[] = [];
  stories: Issue[] = [];
  sprint: Sprint = {
    name: "Enter a sprint id to proceed.",
    startDate: '',
    endDate: ''
  };
  totalPoints: number = 0;
  completedPoints: number = 0;
  inProgressPoints: number = 0;

  constructor(jiraService: JiraService) {
    this.jiraService = jiraService;
  }

  ngAfterViewInit(): void {
    fromEvent(this.submitButton.nativeElement, 'click').pipe(
      debounceTime(1000), //ignore double click
      tap(() => this.submit()) //submit form
    ).subscribe()
  }

  submit() {
     this.jiraService.getSprint(this.sprintKey).pipe(
       tap(sprint => this.sprint = sprint)
     ).subscribe();

     this.jiraService.getSprintIssues(this.sprintKey).pipe(
       map(sprint => sprint.issues),
       tap(issues=> {
         this.issues = issues;
         this.stories = issues.filter(i =>
           (i.fields.issuetype.name === 'Story' || i.fields.issuetype.name === 'Bug' || i.fields.issuetype.name === 'Task'));
       })
     ).subscribe({
       next: () => this.processSprintMetrics(),
       complete: () => console.log('Complete'),
       error: () => console.log('Error')
     });
  }

  processSprintMetrics() {
    this.totalPoints = 0;
    this.completedPoints = 0;
    this.inProgressPoints = 0;
    this.stories.forEach(val => {
      if(+val.fields.customfield_10046) {
        this.totalPoints += +val.fields.customfield_10046;
        if(val.fields.status.statusCategory.colorName == this.DONE) {
          this.completedPoints += +val.fields.customfield_10046;
        } else if (val.fields.status.statusCategory.colorName == this.IN_PROGRESS) {
          this.inProgressPoints +=  +val.fields.customfield_10046;
        }
      }
      val.totalSubtasks = 0;
      val.subtasksDone = 0;
      val.subtasksNotStarted = 0;
      val.subtasksInProgress = 0;
      val.fields.subtasks.forEach(subTask =>{
        val.totalSubtasks += 1;
        switch(subTask.fields.status.statusCategory.colorName) {
          case this.DONE:
            val.subtasksDone++;
            break;
          case this.IN_PROGRESS:
            val.subtasksInProgress++;
            break;
          case this.NOT_STARTED:
            val.subtasksNotStarted++;
            break;
        }
      });
    });
    this.sortStories();
  }
  private sortStories(): void {
    this.stories = this.stories.sort((story1, story2):number =>{

      const story1Color: string = story1.fields.status.statusCategory.colorName;
      const story2Color: string = story2.fields.status.statusCategory.colorName;
      const story1StatusType: string = story1.fields.status.name;
      const story2StatusType: string = story2.fields.status.name;
      if(story1Color === story2Color) {
        if(story1StatusType === story2StatusType)
          return +story2.fields.customfield_10046 - +story1.fields.customfield_10046;
        return story1StatusType > story2StatusType ? 1 : -1
      }
      if(story1Color === this.NOT_STARTED)
        return 1;
      if(story2Color === this.NOT_STARTED)
        return -1;
      if(story1Color === this.IN_PROGRESS)
        return 1;
      if(story2Color === this.IN_PROGRESS)
        return -1;
      return 0;
    })
  }

  calculateWidth(numerator: number, denominator: number): string {
    return `${(numerator / denominator) * 100}%`
  }

  getBusinessDatesCount(endDateString: string): number {
    let count = 0;
    let endDate = new Date(endDateString);
    const curDate = new Date();
    while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      if(dayOfWeek !== 0 && dayOfWeek !== 6) count++;
      curDate.setDate(curDate.getDate() + 1);
    }
    return count;
  }

}
