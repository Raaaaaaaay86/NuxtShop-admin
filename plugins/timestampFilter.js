import Vue from 'vue';

const timestampFilter = (timestamp) => {
  const ts = new Date(timestamp * 1000);

  return `${ts.getFullYear()}-${ts.getMonth() + 1}-${ts.getDate()}`;
};

Vue.filter('YYYYMMDD', timestampFilter);
