const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const masterName = core.getInput('master-name', { required: true });
  const expiredTime = core.getInput('expired-time', { required: true }) * 24 * 60 * 60 * 1000;
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
      const date = Date.parse((await client.repos.getCommit({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        ref: branch.commit.sha
      })).data.commit.committer.date);

      const now = Date.now();

      if (now - date > expiredTime) {
        const data = (await client.repos.compareCommits({
          owner: github.context.repo.owner,
          repo: github.context.repo.repo,
          base: master.name,
          head: branch.name
        })).data;

        if (data.ahead_by == 0) {
          const result = await client.repos.deleteBranchProtection({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            branch: branch.name
          });

          console.log(`===> ${result}`);
        }
      }
    }
  }
}

run().catch(error => {
  core.setFailed(`${error}`);
});