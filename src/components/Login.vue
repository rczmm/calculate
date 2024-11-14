<template>
  <div class="login-container">
    <div class="login-card">
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Logo" class="logo"/>
      <h2 class="login-title">登录</h2>

      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="username">用户名</label>
          <input
              id="username"
              v-model="credentials.username"
              type="text"
              placeholder="输入您的用户名"
              required
          />
        </div>

        <div class="input-group">
          <label for="password">密码</label>
          <input
              id="password"
              v-model="credentials.password"
              type="password"
              placeholder="输入您的密码"
              required
          />
        </div>

        <button type="submit" class="login-button" @click="handleLogin">下一步</button>
      </form>

      <div class="login-footer">
        <a href="#" @click.prevent="forgotPassword">忘记密码？</a>
        <a href="#" @click.prevent="createAccount">创建帐户</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {ref} from 'vue';
import router from "@/router";
import {useUserStore} from "@/store/user";


export default {
  setup() {
    const credentials = ref({username: '', password: ''});

    const handleLogin = async () => {
      const userStore = useUserStore();
      const success = await userStore.login(credentials.value);
      if (success) {
        await router.push('/welcome');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    }

    const forgotPassword = () => {
      alert('请联系管理员重置密码');
    };

    const createAccount = async () => {
      alert('跳转到创建帐户页面');
    };

    return {
      credentials,
      handleLogin,
      forgotPassword,
      createAccount,
    };
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-card {
  width: 360px;
  padding: 2rem;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.logo {
  width: 80px;
  margin-bottom: 1rem;
}

.login-title {
  font-size: 1.5rem;
  font-weight: 500;
  color: #202124;
  margin-bottom: 1rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  text-align: left;
}

.input-group label {
  font-size: 0.9rem;
  color: #5f6368;
  margin-bottom: 0.25rem;
}

.input-group input {
  padding: 0.75rem;
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 1rem;
  color: #202124;
}

.input-group input:focus {
  border-color: #1a73e8;
  outline: none;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #1a73e8;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.login-button:hover {
  background-color: #1669c1;
}

.login-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.login-footer a {
  font-size: 0.9rem;
  color: #1a73e8;
  text-decoration: none;
}

.login-footer a:hover {
  text-decoration: underline;
}
</style>
