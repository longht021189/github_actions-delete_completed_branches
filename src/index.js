const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const masterName = core.getInput('master-name', { required: true });
  const expiredTime = core.getInput('expired-time', { required: true });
  const githubToken = core.getInput('github-token', { required: true });
  const client = github.getOctokit(githubToken);
  const list = await client.repos.listBranches()

  console.log(`masterName = ${masterName}, expiredTime = ${expiredTime}, githubToken = ${githubToken}, list = ${list}`);
  
  //   const repo = github.context.repo;
  //   console.log(`Hello , !`);
  //   // const time = (new Date()).toTimeString();
  //   // core.setOutput("time", time);
  //   const payload = JSON.stringify(github.context.payload, undefined, 2)
  //   console.log(`The event payload: ${payload}`);
  // } catch (error) {
  //   core.setFailed(error.message);
  // }
}

run().catch(error => {
  console.log(`Error: ${error.message}\n${error}`);
  core.setFailed(error.message);
});