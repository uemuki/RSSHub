const got = require('@/utils/got');
const util = require('./utils');
const formatPubDate = require('@/utils/date.js');
const querystring = require('querystring');

const got_ins = got.extend({
    responseType: 'json',
    headers: { 'X-Juejin-Src': 'web', 'X-Juejin-Token': '' },
});

// 只能获取 category - 全部 - 热门
module.exports = async (ctx) => {
    const category = ctx.params.category;
    const tag = ctx.params.tag;

    let id = 'all';
    let name = '';
    const catResponse = await got_ins.get('https://gold-tag-ms.juejin.im/v1/categories');
    const [cat] = catResponse.data.d.categoryList.filter((item) => category.localeCompare(item.title) === 0);
    if (cat !== undefined) {
        id = cat.id;
        name = cat.name;
    }

    const tagResponse = await got_ins.get('https://gold-tag-ms.juejin.im/v1/tags');
    const [t] = tagResponse.data.d.tags.filter((item) => item.title === tag);
    const tagIds = t && t.id ? [t.id] : [];

    const qs = querystring.stringify({
        src: 'web',
        limit: 10,
        category: id,
        tagIds: [t.id],
        sort: 'rankIndex'
    });

    const title = `掘金-${name} ${t.title}`;
    const url = `https://timeline-merger-ms.juejin.im/v1/get_entry_by_rank?${qs}`;
    const link = `https://juejin.im/welcome/${category}/${tag}?sort=popular`;

    const response = await got_ins.get(url);
    const entrylist = response.data.d.entrylist

    const resultItems = await Promise.all(
        entrylist.map(async (item) => {
            const resultItem = {
                title: item.title,
                link: item.originalUrl,
                description: item.summaryInfo,
                pubDate: item.createdAt,
            };
            return Promise.resolve(resultItem);
        })
    );

    ctx.state.data = {
        title: title,
        link: link,
        item: resultItems,
    };
};
