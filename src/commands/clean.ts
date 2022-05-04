import rimraf from 'rimraf';
import path from 'path';
import Logger from '../utils/logger';

const cwdPath = process.cwd();

async function deleteItem(item: string): Promise<string> {
  return new Promise((rs, rj) => {
    rimraf(path.join(cwdPath, item), (err) => {
      if (err) rj(`❌ 删除 ${item} 失败!, ${err.message}`);
      rs(`✅ 删除 ${item} 成功`);
    });
  });
}

export async function cleanNodeModules() {
  try {
    const ans = await Promise.all([
      deleteItem('node_modules'),
      deleteItem('package-lock.json'),
    ]);
    ans?.forEach((msg) => Logger.log(msg));
    Logger.success('🎉 clean done');
  } catch (err) {
    Logger.error(err);
  }
}
