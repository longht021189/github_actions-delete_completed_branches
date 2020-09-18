const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const masterName = core.getInput('master-name', { required: true });
  console.log(`masterName = ${masterName}`);

  const expiredTime = core.getInput('expired-time', { required: true });
  console.log(`expiredTime = ${expiredTime}`);

  const githubToken = core.getInput('github-token', { required: true });
  console.log(`githubToken = ${githubToken}`);
  

  // const myRepoID = context.repo({number: github.context.payload.repository.id})
  // await github.context.repo.owner.github.repos.listBranches(myRepoID)

  const client = github.getOctokit(githubToken, {
    baseUrl: 'https://api.github.com',
    log: {
      debug: console.debug,
      info : console.log,
      warn : console.warn,
      error: console.error
    }
  });
  console.log(`client = ${client}`);

  // const { headers } = await octokit.request('/');
  // console.log(`Scopes: ${headers['x-oauth-scopes']}`);

  const list = await client.repos.listBranches({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo
  });
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