import chalk, { Chalk } from 'chalk';
import shell from 'shelljs';

const TAG = '[mk-cli]';

const Logger = {
  log: (msg: string, color: keyof Chalk = 'white') =>
    console.log((chalk[color] as Chalk)(`${TAG} ${msg}`)),
  error: (msg: string) => console.log(chalk.red(`${TAG} ${msg}`)),
  warn: (msg: string) => console.log(chalk.yellow(`${TAG} ${msg}`)),
  info: (msg: string) => console.log(chalk.cyan(`${TAG} ${msg}`)),
  success: (msg: string) => console.log(chalk.green(`${TAG} ${msg}`)),
};

export function getShellExecText(command: string) {
  const ans = shell.exec(command, { silent: true });
  return ans?.stdout?.replace(/\n/, '');
}

export default Logger;
