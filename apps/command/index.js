import { Command, Option } from 'commander';

const program = new Command();

program
  .option('-d, --dev [v1...]', '启动项目', '50')
  .option('-l, --list', '打印所有页面、卡片')
  .option('-r, --release', '发布某张卡');

function collect(value, previous) {
  console.log(previous);
  return previous.concat([value]);
}
program
  .option('--no-sauce', 'Remove sauce')
  .option('--cheese <flavour>', 'cheese flavour', 'mozzarella')
  .option('--no-cheese', 'plain with no cheese')
  .option('-c, --collect <value>', 'repeatable value', collect, [])
  .version('0.0.1', '-v --version')
  .addOption(new Option('-s, --secret').hideHelp())
  .addOption(
    new Option('-t, --timeout <delay>', 'timeout in seconds').default(
      60,
      'one minute',
    ),
  )
  .addOption(
    new Option('-k, --drink <size>', 'drink cup size').choices([
      'small',
      'medium',
      'large',
    ]),
  )
  .addOption(new Option('-p, --port <number>', 'port number').env('PORT'))
  .addOption(
    new Option('--donate [amount]', 'optional donation in dollars')
      .preset('20')
      .argParser(parseFloat),
  )
  .addOption(
    new Option('--disable-server', 'disables the server').conflicts('port'),
  )
  .addOption(
    new Option('--free-drink', 'small drink included free ').implies({
      drink: 'small',
    }),
  );

program
  .name('pm')
  .command('clone <source> [destination]')
  .command('stop [service]', 'stop named service, or all if no name supplied');

program.parse(process.argv);

const options = program.opts();

console.log(options);
