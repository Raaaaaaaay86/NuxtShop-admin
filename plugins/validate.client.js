import Vue from 'vue';
import VeeValidate from 'vee-validate';
import { required, numeric } from 'vee-validate/dist/rules';

VeeValidate.Validator.extend('required', {
  ...required,
  getMessage: (field) => `${field}不得為空`,
});

VeeValidate.Validator.extend('numeric', {
  ...numeric,
  getMessage: (field) => `${field}只能為數字`,
});

Vue.component('ValidationObserver', VeeValidate.ValidationObserver);
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
