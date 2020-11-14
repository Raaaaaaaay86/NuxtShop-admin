<template>
  <div class="pa-4">
    <v-btn
      color="success"
      nuxt
      to="/edit-coupon"
    >
      新增折扣券
    </v-btn>
    <v-data-table
      :headers="headers"
      class="elevation-1 mt-4"
      loading="true"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: '代碼',
        },
        {
          text: '折扣券名稱',
        },
        {
          text: '折扣比',
        },
        {
          text: '到期日',
        },
        {
          text: '是否啟用',
        },
        {
          text: '操作',
        },
      ],
    };
  },
};
</script>
