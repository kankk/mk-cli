import path from 'path';
import fs from 'fs';
import shell from 'shelljs';
import YAML from 'yaml';
import { cloneDeep } from 'lodash';
import Logger from '../utils/logger';

export interface IConfigUser {
  name: string;
  npmName: string;
  email: string;
  desc: string;
  registry: string;
  color: string;
}

// 默认 cli 配置文件
const getDefaultConfig = () => ({
  git: {
    github: {
      name: 'kankk',
      npmName: 'jianqihua',
      email: '286454796@qq.com',
      desc: 'Github 账号',
      token: '',
    },
  },
});

class Config {
  private configPath: string;
  private config: Record<string, any> = {};

  constructor() {
    try {
      const homeEnvTag = process.platform === 'win32' ? 'USERPROFILE' : 'HOME';
      const homePath = process.env[homeEnvTag];
      if (!homePath) {
        throw new Error(
          `配置初始化失败: process.env.${homeEnvTag}: ${homePath}`
        );
      }
      this.configPath = path.resolve(homePath, '.mkrc.yaml');
      if (fs.existsSync(this.configPath)) {
        try {
          this.config = YAML.parse(fs.readFileSync(this.configPath, 'utf8'));
        } catch (err) {
          throw new Error('配置解析失败');
        }
      } else {
        this.resetConfig();
      }
    } catch (err) {
      Logger.error(err.message);
      process.exit(1);
    }
  }

  private setConfig(config: object) {
    this.config = config;
    fs.writeFileSync(this.configPath, YAML.stringify(config));
  }

  // 获取指定 / 全局配置
  public getConfig(key = '') {
    if (!key) return cloneDeep(this.config);
    if (key in this.config) return cloneDeep(this.config[key]);
    return null;
  }

  // 查看配置文件
  public readConfig() {
    shell.exec(`cat ${this.configPath}`);
  }

  // 编辑配置文件
  public editConfig() {
    shell.exec(`code ${this.configPath}`);
  }

  // 重置配置文件
  public resetConfig() {
    const config = getDefaultConfig();
    this.setConfig(config);
    Logger.success('🎉 初始化配置成功');
  }
}

export default new Config();
