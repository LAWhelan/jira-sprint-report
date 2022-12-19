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
    customfield_10046: string;
  };
  subtasksDone: number;
  subtasksInProgress: number;
  subtasksNotStarted: number;
  totalSubtasks: number;
}
