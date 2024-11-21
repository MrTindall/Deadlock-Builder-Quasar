<template>
  <div>
    <div class="text-h6">{{ name }}</div>
    <div>
      <ItemList :itemList="itemList" :itemClass="itemClass" @itemIsActive="addToBuild"/>
    </div>
  </div>
</template>

<script>
import ItemList from './ItemList.vue';

export default {
  name: "PanelTab",
  components: {
    ItemList,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    itemClass: {
      type: String,
      default: "",
    },
    itemList: {
      type: Array,
      required: true,
    },
  },
  methods: {
    addToBuild(item) {
     this.$emit("itemIsActive", item);
    },
  }
};
</script>
