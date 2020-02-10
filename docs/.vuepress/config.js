module.exports = {
    title: 'Moreant study notes',
    description: 'study Note',
    base: '/notebook/',
    plugins: [
        '@vuepress/active-header-links',
        '@vuepress/back-to-top',
        '@vuepress/medium-zoom',
        '@vuepress/nprogress',
        ['@vssue/vuepress-plugin-vssue', {
            // 设置 `platform` 而不是 `api`
            platform: 'github',

            // 其他的 Vssue 配置
            owner: 'moreant',
            repo: 'notebook',
            clientId: '15200460713de3351c06',
            clientSecret: '8081c554ae6faea720b386f7c71b724923a8d162',
        },]
    ],
    locales: {
        '/': {
            lang: 'zh-CN',
        }
    },
    themeConfig: {
        sidebar: {
            '/spring-boot/': [
                '',
                'hello-spring',
            ],
            '/vue/': [
                '',
            ]
        },
        lastUpdated: '上次更新',
        nav: [
            { text: 'Hello', link: '/' },
            { text: 'springBoot', link: '/spring-boot/' },
            { text: 'Vue', link: '/vue/' },
            { text: 'Blog', link: 'https://moreant.github.io/', target: '_blank' },
            { text: 'GitHub', link: 'https://github.com/moreant', target: '_blank' },
        ]
    }
}
