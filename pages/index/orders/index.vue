<template>
  <div class="pa-4">
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
          text: '成立時間',
        },
        {
          text: '編號',
        },
        {
          text: '訂單名稱',
        },
        {
          text: '價格',
        },
        {
          text: '付款方式',
        },
        {
          text: '付款狀態',
        },
        {
          text: '操作',
        },
      ],
    };
  },
};
</script>
