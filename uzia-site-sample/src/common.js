/**
 * 共通処理や関数など
 */
import _ from 'lodash';

// pathにhttpもしくはhttpsが含まれていなければローカルパスからのフルパスに置換
export const replaceURLPublicPath = (path) => {
  if (!path) return;
  if (_.includes(path, 'http') || _.includes(path, 'https')) {
    return path;
  } else {
    if (path.slice(0, 1) === '/') {
      // 先頭にスラッシュが含まれていればそのまま連結して返却
      return process.env.PUBLIC_URL + path;
    } else {
      return process.env.PUBLIC_URL + '/' + path;
    }
  }
}