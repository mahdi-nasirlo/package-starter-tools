import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import chalk from "chalk";

import path from "path";
import fs from "fs";

export default async function oidcInstaller() {
  const description = chalkAnimation.rainbow(
    "*** SSO Config - This command will be add enlivenment variable of oidc ***"
  );

  await new Promise((r) => setTimeout(r, 1000));

  description.stop();

  const answers = await inquirer.prompt([
    {
      name: "authority",
      type: "input",
      message: "What is your authority url?",
    },
    {
      name: "clientSecret",
      type: "input",
      message: "What is your client secret?",
    },
    {
      name: "clientId",
      type: "input",
      message: "What is your client id?",
    },
  ]);

  const data = `\n\n# OIDC configs\nOIDC_AUTHORITY=${answers.authority}\nOIDC_CLIENT_ID=${answers.clientId}\nOIDC_CLIENT_Secret=${answers.clientSecret}`;

  const spinner = createSpinner("work on env ....").start();

  if (fs.existsSync(".env")) {
    await fs.appendFileSync(".env", data);
    spinner.success({ mark: chalk.bgYellow("File created and data written:") });
  } else {
    await fs.writeFileSync(".env", data);
    return spinner.success({ text: chalk.bgYellow("Error creating file:") });
  }

  spinner.clear();

  process.exit(1);
}
