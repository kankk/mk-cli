import inquirer from 'inquirer';
import Logger from '@utils/logger';
import config from '@utils/config';

const getConfigOperation = async () => {
  const questions = [
    {
      type: 'list',
      name: 'type',
      message: '请选择配置操作',
      choices: [
        {
          value: 'read',
          name: '查看配置',
        },
        {
          value: 'edit',
          name: '编辑配置',
        },
      ],
    },
  ];
  return inquirer.prompt(questions);
};

export async function operateCliConfig() {
  try {
    const { type } = await getConfigOperation();
    if (type === 'read') {
      config.readConfig();
    } else if (type === 'edit') {
      config.editConfig();
    }
  } catch (err) {
    Logger.error(err);
  }
}
