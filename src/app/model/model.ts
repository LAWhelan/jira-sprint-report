export interface Sprint {
  name: string;
  startDate: string;
  endDate: string;
}

export interface SprintIssuesResponse {
  issues: Issue[]
}
export interface Issue {
  key:string;
  self:string;
  fields:{
    issuetype:{
      name: string;
      subtask: boolean;
    };
    subtasks: Issue[];
    status: {
      name: string;
      statusCategory: {
        colorName:string;
      };
    };
    summary: string;
    customfield_10046: string;//story points
    customfield_10109: any;//scrum team
    customfield_10270: string;//client enabled date
    duedate: string;
  };
  subtasksDone: number;
  subtasksInProgress: number;
  subtasksNotStarted: number;
  totalSubtasks: number;
}

export interface IssueList {
  issues: [{
    id: string
  }]
}
