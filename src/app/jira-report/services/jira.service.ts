import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from '../../../environments/environment';
import { Sprint, SprintIssuesResponse } from "../model/model";


@Injectable({
  providedIn: 'root'
})
export class JiraService {
  private http: HttpClient;
  private readonly headers: HttpHeaders;
  private baseUrl: string = '';
  private apiKey: string = environment.apiKey;
  private cache: Map<string, object> = new Map<string, object>();
  private maxResults = 200;

  constructor(client: HttpClient) {
    this.http = client;
    this.headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append(
      'Authorization',
      'Basic ' + this.apiKey,
    );
  }

  getSprintIssues(sprintKey: string): Observable<SprintIssuesResponse> {
    if(this.cache.has('getSprintIssues:'+sprintKey)){
      return of(this.cache.get('getSprintIssues:'+sprintKey)) as Observable<SprintIssuesResponse>;
    }
    const url = this.baseUrl.concat(`rest/agile/1.0/sprint/${sprintKey}/issue`);
    return this.http
      .get(url, {
        headers: this.headers,
        params: {maxResults: this.maxResults, expand: 'changelog'}
      }).pipe(
        map(res => res as SprintIssuesResponse)
      )
  };

  getSprint(sprintKey: string): Observable<Sprint> {
    if(this.cache.has('getSprint:'+sprintKey)){
      return of(this.cache.get('getSprint:'+sprintKey)) as Observable<Sprint>;
    }
    const url = this.baseUrl.concat(`rest/agile/1.0/sprint/${sprintKey}`);
    return this.http
      .get(url, {
        headers: this.headers
      }).pipe(
        map(res => res as Sprint)
      )
  };

  getPlannedEpics(): Observable<any> {
    const url = this.baseUrl.concat(`rest/api/v.2/search/jql`);
    return this.http
      .get(url, {
        headers: this.headers
      }).pipe(
        map(res => res as any)
      )
  }
}
