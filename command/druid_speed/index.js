import {Command, Option } from "commander"



const program = new Command();

program.name('ds')
    .command('dev', 'druid run dev --local_test')
    .command('release','druid run release')


program.parseAsync();