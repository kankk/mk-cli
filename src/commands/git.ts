import Logger, { getShellExecText } from '../utils/logger';
import config from '../utils/config';

const gitConfig = config.getConfig('user');

// 展示项目 git.user 配置
export const showProjectGitUser = () => {
  const projectUserName = getShellExecText('git config user.name');
  const projectUserEmail = getShellExecText('git config user.email');

  const projectUser: any = Object.values(gitConfig).find(
    (item: any) => item.name === projectUserName
  );
  const projectUserColor = projectUser?.color ?? 'white';
  const projectDesc = projectUser?.desc ?? '';

  Logger.log(
    `项目 git.user: ${projectUserName} <${projectUserEmail}> [${projectDesc}]`,
    projectUserColor
  );
};

// 展示全局 git.user 配置
export function showGlobalGitUser() {
  const globalUserName = getShellExecText('git config --global user.name');
  const globalUserEmail = getShellExecText('git config --global user.email');

  const globalUser: any = Object.values(gitConfig).find(
    (item: any) => item.name === globalUserName
  );
  const globalUserColor = globalUser?.color ?? 'white';
  const globalDesc = globalUser?.desc ?? '';

  Logger.log(
    `全局 git.user: ${globalUserName} <${globalUserEmail}> [${globalDesc}]`,
    globalUserColor
  );
}

export function operateGit() {
  showProjectGitUser();
  showGlobalGitUser();
}
