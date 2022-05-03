import chalk, { Chalk } from 'chalk';

const TAG = '[mk-cli]';

const Logger = {
  log: (msg: string, color: keyof Chalk = 'white') =>
    console.log((chalk[color] as Chalk)(`${TAG} ${msg}`)),
  error: (msg: string) => console.log(chalk.red(`${TAG} ${msg}`)),
  warn: (msg: string) => console.log(chalk.yellow(`${TAG} ${msg}`)),
  info: (msg: string) => console.log(chalk.cyan(`${TAG} ${msg}`)),
  success: (msg: string) => console.log(chalk.green(`${TAG} ${msg}`)),
};

export default Logger;
