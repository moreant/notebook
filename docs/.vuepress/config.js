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
            owner: 'OWNER_OF_REPO',
            repo: 'NAME_OF_REPO',
            clientId: 'YOUR_CLIENT_ID',
            clientSecret: 'YOUR_CLIENT_SECRET',
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
        lastUpdated: 'Last Updated',
        nav: [
            { text: 'Hello', link: '/' },
            { text: 'springBoot', link: '/spring-boot/' },
            { text: 'Vue', link: '/vue/' },
            { text: 'Blog', link: 'https://moreant.github.io/', target: '_blank' },
            { text: 'GitHub', link: 'https://github.com/moreant', target: '_blank' },
        ]
    }
}
