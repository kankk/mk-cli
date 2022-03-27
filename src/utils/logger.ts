import chalk from 'chalk';

const TAG = '[mk-cli]';

const logger = {
  log: (msg: string, color = 'white') => console.log(chalk[color](`${TAG} ${msg}`)),
  error: (msg: string) => console.log(chalk.red(`${TAG} ${msg}`)),
  warn: (msg: string) => console.log(chalk.yellow(`${TAG} ${msg}`)),
  info: (msg: string) => console.log(chalk.cyan(`${TAG} ${msg}`)),
  success: (msg: string) => console.log(chalk.green(`${TAG} ${msg}`)),
};

export default logger;
