import path from 'path';
import { glob } from 'glob';
import inquirer from 'inquirer';

// const cwd = process.cwd();

const res = await glob('**/*.cli.js', { ignore: 'node_modules/**' });

const cardPath = res.map(item => path.dirname(item));

const selectedCards = await inquirer.prompt([
  {
    type: 'checkbox',
    name: 'card',
    message: '选择要运行的卡片',
    choices: cardPath,
    loop: true,
  },
]);
