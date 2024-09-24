
const apiKey = process.env.api_key;
const standardHeaders = () => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append(
    'Authorization',
    'Basic ' + apiKey,
  );
  return headers;
};
const getSprintIssues = async (sprintKey) => {
  const res = await fetch(`https://razrhq.atlassian.net/rest/agile/1.0/sprint/${sprintKey}/issue`, {
    headers: standardHeaders()
  });
  return await res.json();
}

const getSprint = async (sprintKey) => {
  const res = await fetch(`https://razrhq.atlassian.net/rest/agile/1.0/sprint/${sprintKey}`,
    {headers: standardHeaders()}
  );
  return await res.json();
}

const getIssue = async (issueKey) => {
  const res = await fetch(`https://razrhq.atlassian.net/rest/api/2/issue/${issueKey}`,
    {
      method: 'GET',
      headers: standardHeaders()
    });
  return await res.json();
};

const getEpics = async () => {
  const bodyData = {
      jql: "project = FIB and type = EPIC and status not in (closed, done, \"to do\")",
      maxResults: 1000,
     };
  const headers = standardHeaders();
  headers.append('X-Atlassian-Token', 'no-check');
  const res = await fetch('https://razrhq.atlassian.net/rest/api/2/search/jql',
    {
    body: JSON.stringify(bodyData),
    method: 'POST',
    headers: headers
  });
  return await res.json();
};

module.exports = {
  getEpics,
  getSprint,
  getSprintIssues,
  getIssue,
}
