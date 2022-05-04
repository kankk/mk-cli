import inquirer from 'inquirer';
import shell from 'shelljs';
import Logger, { getShellExecText } from '../utils/logger';
import config from '../utils/config';

const gitConfig = config.getConfig('user');

// 展示 npm registry
export function showRegistry() {
  const registry = getShellExecText('npm config get registry');

  const user: any = Object.values(gitConfig).find(
    (item: any) => item.registry === registry
  );
  const userColor = user?.color ?? 'white';
  const userRegistry = user?.registry ?? '';
  const userDesc = user?.desc ?? 'unknown';

  if (user) {
    Logger.log(`npm registry: [${userDesc}] ${userRegistry}`, userColor);
  }
}

// 设置 npm registry
const setRegistryByUser = async (user: string) => {
  const info = gitConfig[user];
  const { registry } = info;
  shell.exec(`npm config set registry ${registry}`);
  showRegistry();
};

interface INpmOptions {
  registry: boolean;
}

export async function operateNpm(option: INpmOptions) {
  const { registry } = option;
  if (registry) {
    const { user } = await inquirer.prompt([
      {
        type: 'list',
        name: 'user',
        message: '设置 registry 的用户',
        choices: Object.entries(gitConfig).map(
          ([user, info]: [string, any]) => ({
            name: `${info.desc}: <${info.registry}> [${info.desc}]`,
            value: user,
          })
        ),
      },
    ]);
    setRegistryByUser(user);
  } else {
    showRegistry();
  }
}
