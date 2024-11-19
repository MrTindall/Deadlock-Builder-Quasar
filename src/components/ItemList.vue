<template>
  <q-list class="row items-center">
    <q-item 
      v-for="item in itemList" 
      :key="item.id" 
      class="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-12"
    >
      <ItemListItem :item="item" :itemClass="itemClass" />
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
    itemClass: {
      type: String,
      default: "",
    },
  },
};
</script>
