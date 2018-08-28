const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/test',
        component: (resolve) => import('@/views/test/test.vue')
    },
    {
        path: '/foot',
        component: { template:'<transition name="slide"><div class="foo">...1111111111111111111</div></transition>' },
        alias: '/foot2'
    },
    {
        path: '/user/:id',
        component: () => import('@/views/test/user.vue'),
        children:[
            { path:"profile",component: () => import('@/views/test/user-profile.vue') }
        ]
    }
];

export default routers;