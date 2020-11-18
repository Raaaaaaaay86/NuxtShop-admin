<template>
  <v-app>
    <v-navigation-drawer
      app
      clipped
      color="blue-grey darken-3"
    >
      <v-list>
        <v-list-item>
          <v-list-item-title class="white--text">
            功能列表
          </v-list-item-title>
        </v-list-item>
        <v-list-item-group>
          <v-list-item nuxt to="/products">
            <v-list-item-icon>
              <v-icon class="white--text">
                mdi-gift
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text">
                商品管理
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item nuxt to="/orders">
            <v-list-item-icon>
              <v-icon class="white--text">
                mdi-order-bool-descending
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text">
                訂單管理
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item nuxt to="/coupons">
            <v-list-item-icon>
              <v-icon class="white--text">
                mdi-ticket
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text">
                折價券管理
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      clipped-left
      fixed
      color="grey lighten-5"
    >
      <v-btn icon>
        <v-icon>
          mdi-menu
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <Snackbar />
    <Loader />
  </v-app>
</template>

<script>
import Snackbar from '@/components/SnackBar';
import Loader from '@/components/Loader';

export default {
  components: {
    Snackbar,
    Loader,
  },
};
</script>
