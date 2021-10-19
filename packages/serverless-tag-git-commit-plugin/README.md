# Serverless Tag Git Commit Plugin

A Serverless plugin to add a Cloudformation tag with the current commit.

When added to the `plugin` key in your Serverless config file, it will automatically add a `GIT_COMMIT_HASH` tag to your Cloudformation stack at every deploy with the current git commit hash.

You can then run

```bash
serverless deployedCommit
```

and you will get the hash of the latest deployed commit.
