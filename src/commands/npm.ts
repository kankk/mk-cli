import inquirer from 'inquirer';
import shell from 'shelljs';
import { Chalk } from 'chalk';
import Logger, { getShellExecText } from '../utils/logger';
import config, { IConfigUser } from '../utils/config';

const userConfig = config.getConfig('user') as Record<string, IConfigUser>;

// 展示 npm registry
export function showRegistry() {
  const registry = getShellExecText('npm config get registry');

  const user = Object.values(userConfig).find(
    (item) => item.registry === registry
  );
  const userColor = (user?.color ?? 'white') as keyof Chalk;
  const userRegistry = user?.registry ?? '';
  const userDesc = user?.desc ?? 'unknown';

  if (user) {
    Logger.log(`npm registry: [${userDesc}] ${userRegistry}`, userColor);
  } else {
    Logger.error(`npm registry: [${userDesc}] ${registry}`);
  }
}

// 设置 npm registry
const setRegistryByUser = async () => {
  const { user } = await inquirer.prompt([
    {
      type: 'list',
      name: 'user',
      message: '设置 registry 的用户',
      choices: Object.entries(userConfig).map(
        ([user, info]: [string, any]) => ({
          name: `${info.desc}: <${info.registry}> [${info.desc}]`,
          value: user,
        })
      ),
    },
  ]);
  const info = userConfig[user];
  const { registry } = info;
  shell.exec(`npm config set registry ${registry}`);
  showRegistry();
};

// 检查当前用户是否可以发布 npm 包
const checkNpmUserForPublish = () => {
  const currentUser = getShellExecText('npm whoami');
  const currentRegistry = getShellExecText('npm config get registry');

  const userInfo = Object.values(userConfig).find(
    (item) => item.npmName === currentUser
  );

  if (userInfo) {
    const checked = userInfo.registry === currentRegistry;

    if (checked) {
      Logger.success(`✅ 当前用户 ${currentUser} 与 ${currentRegistry} 匹配`);
    } else {
      Logger.error(`❌ 当前用户 ${currentUser} 与 ${currentRegistry} 不匹配`);
    }
  } else {
    Logger.error(`❌ 当前用户 ${currentUser} 不存在`);
  }
};

interface INpmOptions {
  check: boolean;
  registry: boolean;
}

export async function operateNpm(option: INpmOptions) {
  const { check, registry } = option;

  if (check) checkNpmUserForPublish();
  if (registry) setRegistryByUser();

  showRegistry();
}
