<template>
  <q-card class="item">
    <img
      :src="item.image"
      :class="[itemClass, 'item-img']"
      style="height: 170px"
    />
    <q-card-section>
      <p class="text-start">{{ item.name }}</p>
      <p class="text-start">Cost: {{ item.cost }}</p>
      <q-btn
        flat
        label="Details ›"
        @click="itemArrowClick"
        class="text-end"
        style="width: 100%;"
      />
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
  methods: {
    itemArrowClick() {
      // Placeholder, will eventually trigger Modal
      alert("Name: " + this.item.name + "\n\nCost: " + this.item.cost);
    },
  },
};
</script>

<style scoped>

</style>
