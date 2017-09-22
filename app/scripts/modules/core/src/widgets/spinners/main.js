// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Spinner from './Spinner.vue';
import './load-bar';

/* eslint-disable no-new */
new Vue({
  el: '#spinner',
  template: '<Spinner/>',
  components: { Spinner }
});
