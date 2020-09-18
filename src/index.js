const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const masterName = core.getInput('master-name', { required: true });
  console.log(`masterName = ${masterName}`);

  const expiredTime = core.getInput('expired-time', { required: true });
  console.log(`expiredTime = ${expiredTime}`);

  const githubToken = core.getInput('github-token', { required: true });
  console.log(`githubToken = ${githubToken}`);

  const client = github.getOctokit(githubToken, {
    log: {
      debug: (message) => {
        console.log(`debug: ${message}`);
      },
      info: (message) => {
        console.log(`info: ${message}`);
      },
      warn: (message) => {
        console.log(`warn: ${message}`);
      },
      error: (message) => {
        console.log(`error: ${message}`);
      }
    }
  });
  console.log(`client = ${client}`);

  const list = await client.repos.listBranches()
  console.log(`list = ${list}`);
  
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
  console.log(`Error: ${error.message}\n${error}\n${typeof(error)}`);
  core.setFailed(error.message);
});