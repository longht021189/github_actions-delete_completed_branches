const core = require('@actions/core');
const github = require('@actions/github');

try {
  const masterName = core.getInput('master-name', { required: true });
  const expiredTime = core.getInput('expired-time', { required: true });
  const githubToken = core.getInput("github-token", { required: true });

  const client = github.getOctokit(github_token);

  console.log(`Hello ${masterName} ${expiredTime} ${githubToken}!`);

  const time = (new Date()).toTimeString();
  core.setOutput("time", time);

  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}