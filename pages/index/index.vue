<template>
  <div>
    <h1>foo</h1>
  </div>
</template>

<script>
export default {
  middleware({ redirect }) {
    redirect('/products');
  },
};
</script>
