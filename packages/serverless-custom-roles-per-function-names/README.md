# Serverless Iam Roles Names Per Function

A Serverless plugin to make sure function role names are always valid, ie:

- Below the 64 characters long AWS limit
- Always unique
- Containing meaningful information

By using it, the following errors will never occur:

```
auto generated role name for function: ${functionName} is too long (over 64 chars).
Try setting a custom role name using the property: iamRoleStatementsName.
```

To use it, add it to the `plugin` key of your Serverless config file.

## ⚠️ Dependency

This plugin depends on [`serverless-iam-roles-per-function`](https://github.com/functionalone/serverless-iam-roles-per-function)
