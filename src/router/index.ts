import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';

import WelcomeVue from '@/components/Welcome.vue';
import ExerciseVue from "@/components/Exercise.vue";
import ReportVue from '@/components/Report.vue';
import {useUserStore} from "@/store/user";
import Login from "@/components/Login.vue";


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Login
    },
    {
        path: '/welcome',
        component: WelcomeVue,
        meta: {requiresAuth: true},
    },
    {
        path: '/exercise/:category/:params/:quantity',
        component: ExerciseVue,
        props: true,
        meta: {requiresAuth: true},
    },
    {
        path: '/report',
        component: ReportVue,
        meta: {requiresAuth: true},
    },
    {
        path: '/report-share',
        component: () => import('@/components/ReportShare.vue'),
        meta: {requiresAuth: true},
    },
    {
        path: '/print-question',
        component: () => import('@/components/QuestionsPrint.vue'),
        meta: {requiresAuth: true},
    },
    {
        path: '/mistakes-collection',
        component: () => import('@/components/MistakesCollection.vue'),
        meta: {requiresAuth: true},
    },
    {
        path: '/:PathMatch(.*)', // 404
        redirect: '/',
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    userStore.initialize();

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!userStore.user) {
            router.push('login').then(r => {
            })
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;

