import Vue from 'vue';
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate';
import { required, numeric } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: (field) => `${field}不得為空`,
});

extend('numeric', {
  ...numeric,
  message: (field) => `${field}只能為數字`,
});

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
