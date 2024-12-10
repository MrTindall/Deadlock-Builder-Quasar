<template>
  <q-btn
    flat
    unelevated
    class="selectable-card-btn full-width"
    @click="addToBuild"
  >
    <q-card class="item">
      <img :src="item.image" :class="['item-img', item.item_slot_type]" />
      <q-card-section>
        <p class="flex flex-start" style="font-size: 1.1rem; margin-bottom: 2px;">{{ item.name }}</p>
        <p class="flex flex-start">${{ item.cost }}</p>
        <div
          class="button-row"
          style="display: flex; justify-content: space-between"
        >
          <q-btn
            push
            flat
            label="Details"
            @click.stop="itemDetails = !itemDetails"
            class="flex flex-start"
            style="width: fit-content; padding: 10 0; margin: 0"
            glossy
          />
          <DetailsModal 
            v-model="itemDetails" 
            :item="item"
            :itemList="itemList"
          />
          <q-btn
            v-if="item.isActive && isPickable"
            icon="delete"
            flat
            unelevated
            class="flex flex-start trash"
            @click.stop="deleteItem"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-btn>
</template>

<script>
import DetailsModal from './DetailsModal.vue';

export default {
  name: "ItemListItem",
  components: {
    DetailsModal,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    itemList: {
      type: Array,
      required: true,
    },
    isPickable: Boolean,
  },
  data() {
    return {
      itemDetails: false,
    };
  },

  methods: {
    addToBuild() {
      this.$emit("itemIsActive", this.item);
    },
    deleteItem() {
      this.$emit("deleteItem", this.item);
    },
  },
};
</script>

<style scoped lang="scss">
.selectable-card-btn {
  padding: 0;
  background: none;
}
.q-btn.trash {
  color: rgb(107, 0, 0);
  width: 20px;
}
p {
  font-size: .9rem;
}
</style>
