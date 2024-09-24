const express = require('express')
const app = express()
if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV === undefined) {
  require("dotenv").config();
}
const jira = require('./services/jira')
app.get('/api/sprints/:sprintKey', async (req, res) => {
  const sprintResponse = await jira.getSprint(req.params.sprintKey)
  res.json(sprintResponse)
})

app.get('/api/sprints/:sprintKey/issues', async (req, res) => {
  const sprintResponse = await jira.getSprintIssues(req.params.sprintKey)
  res.json(sprintResponse)
})
app.get('/api/epics', async (req, res) => {
  const epicResponse = await jira.getEpics()
  console.log(epicResponse)
  res.json(epicResponse)
})
module.exports = app
