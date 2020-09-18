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

  const list2 = (await client.repos.listBranchesForHeadCommit({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    commit_sha: list[0].commit.sha
  }));

  console.log(`list2: ${JSON.stringify(list2)}`);

  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);
}

run().catch(error => {
  core.setFailed(`${error}`);
});