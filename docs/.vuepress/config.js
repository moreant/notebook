module.exports = {
    title: 'Moreant study notes',
    description: 'study Note',
    base: '/notebook/',
    head: [
        ['link', { rel: 'icon', href: '/logo.jpg' }]
    ],
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
        sidebarDepth: 2,
        sidebar: {
            '/spring-boot/': [
                '',
                'hello-spring',
                'properties',
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
            { text: 'GitHub', link: 'https://github.com/moreant/notebook', target: '_blank' },
        ],
        repo: 'moreant/notebook',
        // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
        // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
        repoLabel: '查看源码',
        // 假如你的文档仓库和项目本身不在一个仓库：
        docsRepo: 'moreant/notebook',
        // 假如文档不是放在仓库的根目录下：
        docsDir: 'docs',
        // 假如文档放在一个特定的分支下：
        docsBranch: 'master',
        // 默认是 false, 设置为 true 来启用
        editLinks: true,
        // 默认为 "Edit this page"
        editLinkText: '帮助我改善此页面'
    }
}
