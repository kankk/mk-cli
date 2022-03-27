import { Command } from 'commander';

import { cleanNodeModules } from './commands/clean';

console.log('Hello World');

const program = new Command();

program.version(require('../package.json').version);

program
  .command('clean')
  .description('clean node_modules')
  .action(cleanNodeModules);

program.parse(process.argv);
