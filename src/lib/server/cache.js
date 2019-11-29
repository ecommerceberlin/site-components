const LRUCache = require('lru-cache');

const ssrCache = new LRUCache({
    max: 100,
    maxAge: 1000 * 60 * 60 // 1hour
});

export default ssrCache;