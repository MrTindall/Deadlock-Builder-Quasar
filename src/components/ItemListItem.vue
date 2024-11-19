<template>
  <q-card class="item">
    <img
      :src="item.image"
      :class="[itemClass, 'item-img']"
      style="height: 170px"
    />
    <q-card-section>
      <p class="text-start">{{ item.name }}</p>
      <div class="row" style="display: flex; justify-content: space-between; align-items: center;">
        <div class="col text-start">
          <p>Cost: {{ item.cost }}</p>
        </div>
        <div class="col text-end" style="display: flex; justify-content: flex-end;">
          <q-btn
            flat
            label="&#8594"
            @click="handleArrowClick"
            class="text-h6"
            style="padding: 0;"
          />
        </div>
      </div>
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
    handleArrowClick() {
      // Placeholder, will eventually trigger Modal
      alert("Name: " + this.item.name + "\n\nCost: " + this.item.cost);
    },
  },
};
</script>

<style scoped>

</style>
