// https://blog.csdn.net/api/articles?type=more&category=career&shown_offset=1583909759164505

const got = require('@/utils/got');

module.exports = async (ctx) => {
    const response = await got({
        method: 'get',
        url: 'https://blog.csdn.net/api/articles?type=more&category=career',
    });

    const articles = response.data && response.data.articles || [];

    ctx.state.data = {
        title: `Test ${ctx.params.id}`,
        itunes_author: ctx.params.id === 'enclosure' ? 'DIYgod' : null,
        link: 'https://github.com/DIYgod/RSSHub',
        item,
        allowEmpty: ctx.params.id === 'allow_empty',
    };
};
