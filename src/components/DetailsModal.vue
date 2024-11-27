<template>
  <q-dialog backdrop-filter="blur(4px) desaturate(-150%)" ref="modal">
    <q-card :class="[item.item_slot_type + '-dark']">
      <q-card-section :class="['row items-center', 'text-h6', item.item_slot_type]">
        {{ item.name }}
        <br />
        ${{ item.cost }}
      </q-card-section>

      <q-card-section v-if="item.component_items && item.component_items.length" :class="['row items-center', 'text-h6']">
        Component of: {{ getComponentName(item, itemList) }}
      </q-card-section>

      <q-card-section :class="['row items-center', 'text-h6', [item.item_slot_type + '-darker']]">
        Passive
      </q-card-section>


      <div class="q-pa-md q-mb-sm">
        <div v-if="item.descriptionPassive" class="q-pb-sm">
          {{ item.descriptionPassive }}
        </div>
        <div v-if="item.properties.AbilityCooldown?.value > 0" class="q-pb-sm">
            Ability Cooldown {{ item.properties.AbilityCooldown.value }} s
        </div>
      </div>
    

      <q-card-section v-if="item.activation !== 'passive'" :class="['row items-center', 'text-h6', [item.item_slot_type + '-darker']]" class="q-pb-sm">
        Active
      </q-card-section>
      <div class="q-pa-md">
        <div v-if="item.descriptionActive">
          {{ item.descriptionActive }}
        </div>
      </div>

      <q-card-actions class="flex justify-end">
        <div>
          <q-btn flat label="Cancel" size="md" class="q-ma-sm" color="white" v-close-popup />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>



<script>
export default {
  name: "DetailsModal",
  props: {
    item: {
      type: Object,
      required: true,
    },
    itemList: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getComponentName(item, arr) {
      if (item.component_items && item.component_items.length > 0) {
        const componentName = item.component_items[0];
        const foundItem = arr.find((element) => 
          element.class_name === componentName
        );
        return foundItem ? foundItem.name : "Unknown Component";
      }
      return "No component";
    },
  },
};
</script>

<style scoped lang="scss">
.q-card {
  width: 600px;
  max-width: 90vw;
  height: 600px;
  max-height: 90vh;
}
</style>