import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
routes: [
    {
        path: '/',
        component: () => import(/* webpackChunkName: "home" */ '@/components/common/base/Home.vue'),
        meta: { title: '自述文件' },
        children: [
            {
                path: '/',
                redirect: "/index",
            },
            {
                path: '/index',
                component: () => import('@/components/view/index/index'),
                meta: { title: '首页' }
            },
            // 系统上线-begin
            {
                path: '/sysOnline',
                component: () => import('@/components/view/codeSafe/fortifyScan'),
                meta: { title: '需求管理' }
            },
            {
                path: '/codeScan',
                component: () => import('@/components/view/codeSafe/fortifyScan'),
                meta: { title: '代码扫描' }
            },
            {
                path: '/webScan',
                component: () => import('@/components/view/codeSafe/webScan'),
                meta: { title: '代码扫描' }
            },
            {
                path: '/projectDatail',
                component: () => import('@/components/view/codeSafe/projectDatail'),
                meta: { title: '漏洞详情' }
            }
        ]
    }
]
})
