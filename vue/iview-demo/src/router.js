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
        component: (resolve) => require(['@/views/test/test.vue'], resolve)
    }
];
export default routers;