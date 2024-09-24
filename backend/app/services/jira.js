
const apiKey = process.env.api_key;
const getSprintIssues = async (sprintKey) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append(
    'Authorization',
    'Basic ' + apiKey,
  );
  const res = await fetch(`https://razrhq.atlassian.net/rest/agile/1.0/sprint/${sprintKey}/issue`, {
    headers: headers
  });
  return await res.json();
}

const getSprint = async (sprintKey) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append(
    'Authorization',
    'Basic ' + apiKey,
  );
  const res = await fetch(`https://razrhq.atlassian.net/rest/agile/1.0/sprint/${sprintKey}`,
    {headers: headers}
  );
  return await res.json();
}


const getEpics = async () => {
  const bodyData = `{
      "jql": "project = FIB and type = epic and status not in ('to do', closed, done)",
      "maxResults": 1000,
     }`;
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append(
    'Authorization',
    'Basic ' + apiKey,
  );
  headers.append('X-Atlassian-Token', 'no-check');
  const res = await fetch('https://razrhq.atlassian.net/rest/api/2/search/jql',
    {
    body: bodyData,
    method: 'POST',
    headers: headers
  });
  return await res.json();
};

module.exports = {
  getEpics,
  getSprint,
  getSprintIssues
}
