import { Command } from 'commander';

import { cleanNodeModules } from './commands/clean';

const program = new Command();

// eslint-disable-next-line @typescript-eslint/no-var-requires
program.version(require('../package.json').version);

program
  .command('clean')
  .description('clean node_modules')
  .action(cleanNodeModules);

program.parse(process.argv);
