#!/usr/bin/env node

import { program } from "commander";

import oidcInstaller from "./oidc-installer.js";

program
  .name("starter kit helper")
  .description("CLI to some JavaScript string utilities")
  .version("0.8.0");

program
  .command("oidc:config")
  .description("get sso config data and set it in your env")
  .action(oidcInstaller);
// .argument("<string>", "string to split")
// .option("--first", "display just the first substring")
// .option("-s, --separator <char>", "separator character", ",")
// .action((str, options) => {
//   const limit = options.first ? 1 : undefined;
//   console.log(str.split(options.separator, limit));
// });

program.parse();

// let clientSecret;

// async function getConfig() {
//   const description = chalkAnimation.rainbow("*** SSO Config ***");

//   await sleep();

//   description.stop();

//   const answers = await inquirer.prompt([
//     {
//       name: "authority",
//       type: "input",
//       message: "What is your authority url?",
//     },
//     {
//       name: "clientSecret",
//       type: "input",
//       message: "What is your client secret?",
//     },
//     {
//       name: "clientId",
//       type: "input",
//       message: "What is your client id?",
//     },
//   ]);

//   console.log(answers);
// }

// try {
//   await getConfig();
// } catch (error) {
//   console.log(chalk.bgRed("process is stop"));
// }
