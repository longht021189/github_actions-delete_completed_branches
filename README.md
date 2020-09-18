# Auto Delete Completed Branches

This action is going to delete merged branches that haven't commit in a long days.

## Inputs

### `github-token`

**Required** The token of github to get, check and delete branches. Must be `${{ secrets.GITHUB_TOKEN }}`.

### `master-name`

**Required** The name of main branch to compare with others branches. Maybe `"master"`.

### `expired-time`

**Required** The expired time. Default `30`.

## Outputs
No outputs

## Example usage
```
uses: longht021189/github_actions-delete_completed_branches@0.0.1
with:
  github-token: ${{ secrets.GITHUB_TOKEN }}
  master-name: 'master'
  expired-time: 31
```