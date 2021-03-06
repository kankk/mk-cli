import { Command } from 'commander';

import { cleanNodeModules } from './commands/clean';
import { operateCliConfig } from './commands/config';
import { operateGit } from './commands/git';
import { operateNpm } from './commands/npm';
import { projectInfo } from './commands/project';

const program = new Command();

// eslint-disable-next-line @typescript-eslint/no-var-requires
program.version(require('../package.json').version);

program.command('git').description('git operations').action(operateGit);

program
  .command('npm')
  .description('npm operations')
  .option('-c, --check', 'check npm publish user', false)
  .option('-r, --registry', 'npm config set registry', false)
  .action(operateNpm);

program
  .command('clean')
  .description('clean node_modules')
  .action(cleanNodeModules);

program
  .command('config')
  .description('cli local config(.mkrc.yaml)')
  .action(operateCliConfig);

program
  .command('project')
  .description('当前项目的配置')
  .option('-u, --user', '修改当前项目的 user', false)
  .action(projectInfo);

program.parse(process.argv);
