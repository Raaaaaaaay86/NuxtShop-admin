<template>
  <v-snackbar
    v-model="visible"
    top
    right
    timeout="-1"
    color="secondary"
  >
    <div class="d-flex align-center">
      {{ msg }}
      <v-spacer />
      <v-btn
        text
        :color="color"
        @click.native="close"
      >
        關閉
      </v-btn>
    </div>
  </v-snackbar>
</template>

<script>
import { computed, useContext } from '@nuxtjs/composition-api';

export default {
  setup() {
    const { store } = useContext();
    const visible = computed(() => store.getters['snackbar/visible']);
    const showClose = computed(() => store.getters['snackbar/showClose']);
    const color = computed(() => store.getters['snackbar/color']);
    const msg = computed(() => store.getters['snackbar/msg']);

    const close = () => {
      store.commit('snackbar/CLOSE');
    };

    return {
      msg,
      close,
      color,
      visible,
      showClose,
    };
  },
};
</script>
