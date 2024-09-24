import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Sprint, SprintIssuesResponse } from "../model/model";


@Injectable({
  providedIn: 'root'
})
export class JiraService {
  private http: HttpClient;
  private baseUrl: string = '';
  private cache: Map<string, object> = new Map<string, object>();

  constructor(client: HttpClient) {
    this.http = client;
  }

  getSprintIssues(sprintKey: string): Observable<SprintIssuesResponse> {
    if(this.cache.has('getSprintIssues:'+sprintKey)){
      return of(this.cache.get('getSprintIssues:'+sprintKey)) as Observable<SprintIssuesResponse>;
    }
    const url = this.baseUrl.concat(`api/sprints/${sprintKey}/issues`);
    return this.http
      .get(url).pipe(
        map(res => res as SprintIssuesResponse)
      )
  };

  getSprint(sprintKey: string): Observable<Sprint> {
    if(this.cache.has('getSprint:'+sprintKey)){
      return of(this.cache.get('getSprint:'+sprintKey)) as Observable<Sprint>;
    }
    const url = this.baseUrl.concat(`api/sprints/${sprintKey}`);
    return this.http
      .get(url).pipe(
        map(res => res as Sprint)
      )
  };

  getPlannedEpics(): Observable<any> {
    const url = this.baseUrl.concat(`api/epics`);
    return this.http
      .get(url).pipe(
        map(res => res as any)
      )
  }
}
