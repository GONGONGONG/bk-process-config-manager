/**
 * @file promise 缓存
 * @author
 */

interface Cache {
  [key: string]: any;
}

export default class CachedPromise {
  cache: Cache;

  constructor() {
    this.cache = {};
  }

  /**
     * 根据 id 获取缓存对象，如果不传 id，则获取所有缓存
     *
     * @param {string?} id id
     *
     * @return {Array|Promise} 缓存集合或promise 缓存对象
     */
  get(id: string) {
    if (typeof id === 'undefined') {
      return Object.keys(this.cache).map(requestId => this.cache[requestId]);
    }
    return this.cache[id];
  }

  /**
     * 设置 promise 缓存对象
     *
     * @param {string} id id
     * @param {Promise} promise 要缓存的 promise 对象
     *
     * @return {Promise} promise 对象
     */
  set(id: string, promise: T) {
    Object.assign(this.cache, { [id]: promise });
  }

  /**
     * 删除 promise 缓存对象
     *
     * @param {string|Array?} deleteIds 要删除的缓存对象的 id，如果不传则删除所有
     *
     * @return {Promise} 以成功的状态返回 Promise 对象
     */
  delete(deleteIds: string | string[]) {
    let requestIds = [];
    if (typeof deleteIds === 'undefined') {
      requestIds = Object.keys(this.cache);
    } else if (deleteIds instanceof Array) {
      deleteIds.forEach((id) => {
        if (this.get(id)) {
          requestIds.push(id);
        }
      });
    } else if (this.get(deleteIds)) {
      requestIds.push(deleteIds);
    }

    requestIds.forEach((requestId) => {
      delete this.cache[requestId];
    });

    return Promise.resolve(deleteIds);
  }
}
