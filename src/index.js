const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  console.log("====================");

  // try {
  //   const masterName = core.getInput('master-name', { required: true });
  //   const expiredTime = core.getInput('expired-time', { required: true });
  //   const githubToken = core.getInput('github-token', { required: true });
  
  //   const client = github.getOctokit(githubToken);
  //   const repo = github.context.repo;
  //   const list = await client.repos.listBranches()
  
  //   console.log(`Hello ${masterName}, expiredTime = ${expiredTime}, githubToken = ${githubToken}, repo = ${repo}, list = ${list}!`);
  
  //   // const time = (new Date()).toTimeString();
  //   // core.setOutput("time", time);
  
  //   const payload = JSON.stringify(github.context.payload, undefined, 2)
  //   console.log(`The event payload: ${payload}`);
  // } catch (error) {
  //   core.setFailed(error.message);
  // }
}

run()