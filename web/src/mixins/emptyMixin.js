// import Vue from 'vue';

export const EmptyMixin = {
  methods: {
    emptySearchClear() {
      this.$emit('empty-clear');
    },
    emptyRefresh() {
      this.$emit('empty-refresh');
    },
  },
};

// Vue.mixin(EmptyMixin);
