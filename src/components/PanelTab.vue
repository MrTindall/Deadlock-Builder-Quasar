<template>
  <div>
    <div class="text-h6">{{ name }}</div>
    <div>
      <ItemList :itemList="itemList" @itemIsActive="addToBuild" @deleteItem="deleteItem"/>
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
    itemList: {
      type: Array,
      required: true,
    },
  },
  methods: {
    addToBuild(item) {
     this.$emit("itemIsActive", item);
    },
    deleteItem(item) {
      this.$emit("deleteItem", item)
    },
  }
};
</script>
