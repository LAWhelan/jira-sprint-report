import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { SprintIssuesResponse, Sprint } from "../model/model";
import { map } from "rxjs/operators"
import {Observable, of} from "rxjs";
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class JiraService {
  private http: HttpClient;
  private readonly headers: HttpHeaders;
  private baseUrl: string = '';
  private apiKey: string = environment.apiKey;
  private cache: Map<string, object> = new Map<string, object>();

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
    const url = [this.baseUrl, `rest/agile/1.0/sprint/${sprintKey}/issue`].join('');
    return this.http
      .get(url, {
        headers: this.headers
      }).pipe(
        map(res => res as SprintIssuesResponse)
      )
  };

  getSprint(sprintKey: string): Observable<Sprint> {
    if(this.cache.has('getSprint:'+sprintKey)){
      return of(this.cache.get('getSprint:'+sprintKey)) as Observable<Sprint>;
    }
    const url = [this.baseUrl, `rest/agile/1.0/sprint/${sprintKey}`].join('');
    return this.http
      .get(url, {
        headers: this.headers
      }).pipe(
        map(res => res as Sprint)
      )
  };
}
