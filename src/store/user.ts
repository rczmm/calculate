import {defineStore} from 'pinia';
import {ref} from 'vue';
import axios from 'axios';

interface User {
    id: number;
    username: string;
    token: string;
}

export const useUserStore = defineStore('user', () => {
    const user = ref<User | null>(null);

    async function login(credentials: { username: string; password: string }) {
        const {username, password} = credentials;
        if (username === 'xfxf' && password === 'xfxf') {
            user.value = {
                id: 1,
                username: 'xfxf',
                token: 'dummy-token'
            };
            localStorage.setItem('user', JSON.stringify(user.value));
            return true;
        } else {
            return false;
        }
    }

    function logout() {
        user.value = null;
        localStorage.removeItem('user');
    }

    function initialize() {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            user.value = JSON.parse(storedUser);
        }
    }

    return {user, login, logout, initialize};
});