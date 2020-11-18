<template>
  <div class="text-center">
    <v-dialog
      v-model="visible"
      persistent
      width="300"
    >
      <v-card
        color="secondary"
        dark
        class="pa-2"
      >
        <v-card-text>
          {{ msg }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { computed, useContext } from '@nuxtjs/composition-api';

export default {
  setup() {
    const { store } = useContext();
    const visible = computed(() => store.getters['loader/visible']);
    const msg = computed(() => store.getters['loader/msg']);

    return {
      visible,
      msg,
    };
  },
};
</script>
