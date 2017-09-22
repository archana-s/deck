import Vue from 'vue';

const template = `<ul class="nostyle">
  <span v-for="n in count">- {{ n }} </span>
</ul>`;

Vue.component('load-bar', {
  props: ['count'],
  template
});
