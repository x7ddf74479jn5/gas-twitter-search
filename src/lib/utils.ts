/**
 * スクリプト実行中にスプレッドシートをロックする
 *
 * @param {() => void} callback
 * @param {number} ms
 */
export function transaction(callback: () => void, ms: number) {
  const lock = LockService.getScriptLock();
  // ロック
  if (lock.tryLock(ms)) {
    callback();
    lock.releaseLock();
  } else {
    console.log("既にスクリプトが実行されています");
  }
}
