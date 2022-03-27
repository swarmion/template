# Setting up your CI/CD

## Choose the correct IAM policy to give your CI user

In order to restrict the abilities of the ci user on the testing and production environment, you need to create one or many policies to give that user.

You can find sample policies in [docs/policies](./policies/).

- Go to [the IAM console](https://console.aws.amazon.com/iamv2/home?#/policies);
- Click on "create policy";
- Select the JSON tab;
- Paste the JSON file from the sample policy (or your custom policy);
- Click on "Next: tags", then "Next: review";
- Check that your policy is correct;
- Click on "Create policy".

## Create an IAM user

You can follow the same procedure than in the [install docs](./install.md), except:

- DO NOT give that user an "Administrator Access"
- Instead, attach it the policy or policies that you have created in the previous step;
- Save the Access Key Id and Secret Access Key in order to pass them as credentials in your CI.
