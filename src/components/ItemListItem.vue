<template>
  <q-card class="item">
    <img :src="item.image" :class="[itemClass, 'item-img']" style="height: 170px;"/>
    <q-card-section>
      <p class="text-center">{{ item.name }}</p>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "ItemListItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
    itemClass: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>

</style>
