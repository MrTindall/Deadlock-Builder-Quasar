<template>
  <q-btn
    flat
    unelevated
    class="selectable-card-btn full-width"
    @click="addToBuild"
  >
    <q-card v-if="!item.isActive" class="item">
      <img :src="item.image" :class="['item-img', item.item_slot_type]" />
      <q-card-section>
        <p class="flex flex-start">{{ item.name }}</p>
        <p class="flex flex-start">Cost: {{ item.cost }}</p>
        <q-btn
            flat
            label="Details"
            @click.stop="itemDetails"
            class="flex flex-start"
            style="width: fit-content; padding: 0; margin: 0"
          />
      </q-card-section>
    </q-card>

    <q-card v-else class="item">
      <img :src="item.image" :class="['item-img', item.item_slot_type]" />
      <q-card-section>
        <p class="flex flex-start">{{ item.name }}</p>
        <p class="flex flex-start">Cost: {{ item.cost }}</p>
        <div
          class="button-row"
          style="display: flex; justify-content: space-between;"
        >
          <q-btn
            flat
            label="Details"
            @click.stop="itemDetails"
            class="flex flex-start"
            style="width: fit-content; padding: 0; margin: 0"
          />
          <q-btn
            icon="delete"
            flat
            unelevated
            class="flex flex-start"
            style="width: fit-content; padding: 0; margin: 0"
            @click="deleteItem"
          />
        </div>
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
  },
  methods: {
    itemDetails() {
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
      this.$emit("itemIsActive", this.item);
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
