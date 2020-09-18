const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const masterName = core.getInput('master-name', { required: true });
  const expiredTime = core.getInput('expired-time', { required: true });
  const githubToken = core.getInput('github-token', { required: true });
  const client = github.getOctokit(githubToken);

  /**
   * {
   *    name: ...,
   *    commit: {
   *      sha: ...
   *      url: ...
   *    },
   *    protected: true/false
   * }
   */
  const list = (await client.repos.listBranches({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo
  })).data;

  const master = list.find(element => element.name === masterName);
  if (master === undefined || master === undefined) {
    core.setFailed(`${masterName} is not found!`);
    return;
  }

  for (const branch of list) {
    if (branch.name != masterName) {
      const data = (await client.repos.compareCommits({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        base: master.name,
        head: branch.name
      })).data;
    
      console.log(`ahead_by: ${JSON.stringify(data.ahead_by)}`);
      console.log(`behind_by: ${JSON.stringify(data.behind_by)}`);

      const date = (await client.repos.getCommit({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        ref: branch.commit.sha
      })).data.commit.committer.date;

      console.log(`date: ${JSON.stringify(date)}`);
    }
  }

  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);
}

run().catch(error => {
  core.setFailed(`${error}`);
});