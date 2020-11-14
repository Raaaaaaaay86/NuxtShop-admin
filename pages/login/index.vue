<template>
  <div
    class="h-100vh d-flex align-center justify-center"
    style="background-color:#455A64;"
  >
    <v-sheet
      elevation="1"
      rounded
      class="pa-8 d-flex flex-column align-center justify-center"
    >
      <v-form @submit.prevent="signin">
        <v-text-field
          v-model="username"
          type="email"
          label="帳號"
          outlined
          dense
        />
        <v-text-field
          v-model="password"
          type="password"
          label="密碼"
          :error-messages="errorMessage"
          outlined
          dense
        />
        <v-btn color="success" @click.prevent="signin">
          登入
        </v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
import { ref, useContext, computed } from '@nuxtjs/composition-api';

export default {
  layout: 'login',
  setup() {
    const { store, redirect } = useContext();
    const username = ref('mirror46258a@gmail.com');
    const password = ref('zxczxc12');
    const errorMessage = computed(() => store.getters['auth/errorMessage']);

    const signin = async () => {
      const success = await store.dispatch('auth/signin', { username: username.value, password: password.value });
      if (success) return redirect('/products');
      return false;
    };

    return {
      username,
      password,
      signin,
      errorMessage,
    };
  },
};
</script>
