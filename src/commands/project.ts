import path from 'path';
import fs from 'fs';
import inquirer from 'inquirer';
import shell from 'shelljs';
import Logger, { getShellExecText } from '../utils/logger';
import config, { IConfigUser } from '../utils/config';

const userConfig = config.getConfig('user') as Record<string, IConfigUser>;

export async function checkProjectConfig() {
  let checked = false;
  const cwdPath = process.cwd();
  const pkgPath = path.join(cwdPath, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    const pkgName = pkg.name;
    if (pkgName.startsWith('@')) {
      const user = Object.values(userConfig).find((item) =>
        pkgName.startsWith(item.npmScope)
      );

      if (user) {
        const name = getShellExecText('git config user.name');
        const email = getShellExecText('git config user.email');
        const npmName = getShellExecText('npm whoami');
        const registry = getShellExecText('npm config get registry');

        const checkName = name === user.name;
        const checkEmail = email === user.email;
        const checkNpmName = npmName === user.npmName;
        const checkRegistry = registry === user.registry;
        checked = checkName && checkEmail && checkNpmName && checkRegistry;

        // 校验 git.user.name
        if (checkName) {
          Logger.success(`✅ 当前 user.name: ${name} 与项目匹配`);
        } else {
          Logger.error(`❌ 当前 user.name: ${name}] 与项目不匹配`);
        }

        // 校验 git.user.email
        if (checkEmail) {
          Logger.success(`✅ 当前 user.email: ${email} 与项目匹配`);
        } else {
          Logger.error(`❌ 当前 user.email: ${email} 与项目不匹配`);
        }

        // 校验 npm.user
        if (checkNpmName) {
          Logger.success(`✅ 当前 npm.user: ${npmName} 与项目匹配`);
        } else {
          Logger.error(`❌ 当前 npm.user: ${npmName} 与项目不匹配`);
        }

        // 校验 npm.registry
        if (checkRegistry) {
          Logger.success(`✅ 当前 npm.registry: ${registry} 与项目匹配`);
        } else {
          Logger.error(`❌ 当前 npm.registry: ${registry} 与项目不匹配`);
        }
      } else {
        Logger.error(
          `❌ 当前项目的 scope: ${pkgName.split('/')[0]}] 不在 cli 配置中`
        );
      }
    } else {
      Logger.warn('非 @scope/name 格式的项目, 无法校验');
    }
  } else {
    Logger.error(`❌ 当前目录没有 package.json 文件`);
  }

  if (checked) process.exit(0);
  else process.exit(1);
}

export async function changeProjectConfig() {
  const { user } = await inquirer.prompt([
    {
      type: 'list',
      name: 'user',
      message: '选择当前项目的用户',
      choices: Object.keys(userConfig).map((key) => {
        const item = userConfig[key];
        return {
          name: `[${item.desc}] ${item.name} <${item.email}>`,
          value: key,
        };
      }),
    },
  ]);

  const config = userConfig[user];
  if (config) {
    const { name, email, registry } = config;

    name && shell.exec(`git config user.name "${name}"`);
    email && shell.exec(`git config user.email "${email}"`);
    registry && shell.exec(`npm config set registry ${registry}`);

    Logger.success(`✅ 已将项目配置修改为 ${user}`);
  } else {
    Logger.error(`❌ 没有找到 ${user} 的配置`);
  }
}

interface IProjectOptions {
  user: boolean;
}

export async function projectInfo(options: IProjectOptions) {
  const { user } = options;
  if (user) {
    await changeProjectConfig();
  }

  checkProjectConfig();
}
