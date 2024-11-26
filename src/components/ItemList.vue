<template>
  <q-list class="row">
    <q-item 
      v-for="item in itemList" 
      :key="item.id" 
      class="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-xs-12 flex flex-center"
    >
      <!-- Pass itemList down as a prop to ItemListItem -->
      <ItemListItem 
        :item="item" 
        :itemList="itemList"
        @itemIsActive="addToBuild" 
        @deleteItem="deleteItem" 
      />
    </q-item>
  </q-list>
</template>

<script>
import ItemListItem from './ItemListItem.vue';

export default {
  name: "ItemList",
  components: {
    ItemListItem,
  },
  props: {
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
      this.$emit("deleteItem", item);
    }
  }
};
</script>
