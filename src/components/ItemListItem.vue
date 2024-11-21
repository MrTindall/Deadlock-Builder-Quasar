<template>
  <q-btn
    flat
    unelevated
    class="selectable-card-btn full-width"
    @click="addToBuild"
  >
    <q-card class="item">
      <img
        :src="item.image"
        :class="[itemClass, 'item-img']"
      />
      <q-card-section>
        <p class="text-start">{{ item.name }}</p>
        <p class="text-start">Cost: {{ item.cost }}</p>
        <q-btn
          flat
          label="Details ›"
          @click.stop="itemArrowClick"
          class="text-end"
          style="width: 100%;"
        />
      </q-card-section>
    </q-card>
  </q-btn>
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
      alert(
        "Name: " +
          this.item.name +
          "\n\nCost: " +
          this.item.cost +
          "\n\nAbility Cooldown: " +
          this.item.properties.AbilityCooldown.value +
          " seconds"
      );
    },
    addToBuild() {
      // Placeholder, will eventually add to build
      alert("Added to build: " + this.item.name);
    },
  },
};
</script>

<style lang="scss">
.selectable-card-btn {
  padding: 0;
  background: none;
}
</style>
