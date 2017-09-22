<template>
  <div class="vue-container styleguide">
    <h1 class="heading-2">Vue section with components</h1>
    <div class="load small" v-bind:title="tooltip">{{ msg }}</div>
    <div class="load large" v-if="seen">{{ largeMsg }}</div>
    <ol>
      <li v-for="item in items" v-bind:key="item">
        {{ item }}
      </li>
    </ol>
    <load-bar count=4></load-bar>
    <button class="primary" v-on:click="toggleSeen">Toggle Large Spinner</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Small Spinner',
      largeMsg: 'Large Spinner',
      tooltip: 'You hovered over tooltip',
      seen: false,
      items: [
        'Item 1', 'Item 2', 'Item 3'
      ]
    }
  },
  methods: {
    toggleSeen: function() {
      this.seen = !this.seen;
      // See the data and el object in console
      this.displayAllProps();
    },
    displayAllProps: function() {
      console.log(this.$data);
      console.log(this.$el);
    },
  },
  created: function() {
    console.log('created');
  },
  beforeMount: function() {
    console.log('before mount');
  },
  mounted: function() {
    console.log('mounted ');
  },
  beforeUpdate: function() {
    console.log('before update');
  },
  updated: function() {
    console.log('updated');
  },
  beforeDestroy: function() {
    console.log('before destroy');
  },
  destroyed: function() {
    console.log('destroyed');
  }
}
</script>

<style>
.vue-container {
  position: fixed;
  background-color: white;
  padding: 20px;
  margin: 4px;
  z-index: 2000000;
  border: 1px dashed black;
}
</style>

