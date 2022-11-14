const ss = SpreadsheetApp.getActiveSheet();
const endRow = ss.getLastRow() - 1;

/**
 * スプレッドシートから検索ワードを取得
 *
 * @return {Array} 検索ワード
 */
export function getSearchWords(): string[][] {
  return ss.getRange(2, 1, endRow, 1).getValues();
}

/**
 * スプレッドシートからsince_idを取得
 *
 * @return {Array} since_id
 */
export function getSinceID(): string[][] {
  return ss.getRange(2, 2, endRow, 1).getValues();
}

/**
 * スプレッドシートにsince_idを保存
 *
 * @param {Array} sinceID since_id
 */
export function setSinceID(sinceID: string[][]) {
  ss.getRange(2, 2, endRow, 1).setValues(sinceID);
}
