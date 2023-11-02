import {Command } from "commander"
const program = new Command();

// program
//   .name('connect')
//   .argument('<server>', 'connect to the specified server')
//   .argument('[user]', 'user account for connection', 'guest')
//   .description('Example program with argument descriptions')
//   .action((server, user) => {
//     console.log('server:', server);
//     console.log('user:', user);
//   });

const brew = program.command('brew [x]');
brew
    .command('tea')
    .action(() => {
        console.log('brew tea');
    });
brew
    .command('coffee')
    .action(() => {
        console.log('brew coffee');
    });

// // Add nested commands using `.addCommand().
// // The command could be created separately in another module.
// function makeHeatCommand() {
//   const heat = new Command('heat');
//   heat
//     .command('jug')
//     .action(() => {
//       console.log('heat jug');
//     });
//   heat
//     .command('pot')
//     .action(() => {
//       console.log('heat pot');
//     });
//   return heat;
// }

// program.addCommand(makeHeatCommand());


function myParseInt(value, dummyPrevious) {
    // parseInt takes a string and a radix
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      throw new commander.InvalidArgumentError('Not a number.');
    }
    return parsedValue;
  }
  
  // The previous value passed to the custom processing is used when processing variadic values.
  function mySum(value, total) {
    return total + myParseInt(value);
  }
  
  program
    .command('add')
    .argument('<first>', 'integer argument', myParseInt)
    .argument('[second]', 'integer argument', myParseInt, 1000)
    .action((first, second) => {
      console.log(`${first} + ${second} = ${first + second}`);
    });
  
  program
    .command('sum')
    .argument('<value...>', 'values to be summed', mySum, 0)
    .action((total) => {
      console.log(`sum is ${total}`);
    });

program.parse(process.argv);
