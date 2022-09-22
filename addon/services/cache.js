import Service from '@ember/service';
import { set, get } from '@ember/object';
import { assert } from '@ember/debug';
import { isArray } from '@ember/array';
import { isEmpty } from '@ember/utils';
import _ from 'lodash';

export default Service.extend({
  _cache: {},

  store(cacheName, key, value) {
    assert('A cache name is required.', typeof cacheName === 'string');
    assert('A key is required.', key != null);

    const cachePath = `_cache.${cacheName}`;

    let cache = get(this, cachePath);

    if (!cache || !isArray(cache)) {
      set(this, cachePath, []);
      cache = get(this, cachePath);
    }

    const existing = cache.find(obj => _.isEqual(get(obj, 'key'), key));

    if (existing) {
      set(existing, 'value', value);
    } else {
      cache.push({ key, value });
    }
  },

  lookup(cacheName, key) {
    assert('A cache name is required.', typeof cacheName === 'string');
    assert('A key is required.', key != null);

    const cache = get(this, `_cache.${cacheName}`);

    if (!cache) {
      return undefined;
    }

    const record = cache.find(obj => _.isEqual(get(obj, 'key'), key));

    return record ? get(record, 'value') : undefined;
  },

  clear(cacheName, key) {
    assert('A cache name is required.', typeof cacheName === 'string');

    const cache = get(this, '_cache.' + cacheName);

    if (!cache) {
      return false;
    }

    if (isEmpty(key)) {
      set(this, `_cache.${cacheName}`, []);
      return true;
    }

    const record = cache.find(obj => _.isEqual(get(obj, 'key'), key));

    if (record) {
      cache.removeObject(record);
    }

    return Boolean(record);
  }
});
