const Router = require('@koa/router');
const router = new Router();

// 遍历整个 routes 文件夹，导入模块路由 router.js 和 router-custom.js 文件
// 格式参考用例：routes/epicgames/router.js
const RouterPath = require('require-all')({
    dirname: __dirname + '/routes',
    filter: /^.*router([-_]custom[s]?)?\.js$/,
});

// 将收集到的自定义模块路由进行合并
for (const project in RouterPath) {
    for (const routerName in RouterPath[project]) {
        const proRouter = RouterPath[project][routerName]();
        proRouter.stack.forEach((nestedLayer) => {
            router.stack.push(nestedLayer);
        });
    }
}

// index
router.get('/', require('./routes/index'));

// test
router.get('/test/:id', require('./routes/test'));

// RSSHub
router.get('/rsshub/rss', require('./routes/rsshub/routes')); // 弃用
router.get('/rsshub/routes', require('./routes/rsshub/routes'));
router.get('/rsshub/sponsors', require('./routes/rsshub/sponsors'));

// Infoq
router.get('/infoq/recommend', require('./routes/infoq/recommend'));
router.get('/infoq/topic/:id', require('./routes/infoq/topic'));

// 美团技术团队
router.get('/meituan/tech/home', require('./routes/meituan/tech/home'));

// LeetCode
router.get('/leetcode/articles', require('./routes/leetcode/articles'));
router.get('/leetcode/submission/us/:user', require('./routes/leetcode/check-us'));
router.get('/leetcode/submission/cn/:user', require('./routes/leetcode/check-cn'));

// segmentfault
router.get('/segmentfault/channel/:name', require('./routes/segmentfault/channel'));

// 掘金
router.get('/juejin/category/:category', require('./routes/juejin/category'));
router.get('/juejin/tag/:tag', require('./routes/juejin/tag'));
router.get('/juejin/trending/:category/:type', require('./routes/juejin/trending'));
router.get('/juejin/books', require('./routes/juejin/books'));
router.get('/juejin/pins', require('./routes/juejin/pins'));
router.get('/juejin/posts/:id', require('./routes/juejin/posts'));
router.get('/juejin/collections/:userId', require('./routes/juejin/favorites'));
router.get('/juejin/collection/:collectionId', require('./routes/juejin/collection'));
router.get('/juejin/shares/:userId', require('./routes/juejin/shares'));
router.get('/juejin/welcome/:category/:tag', require('./routes/juejin/welcome'));

module.exports = router;
