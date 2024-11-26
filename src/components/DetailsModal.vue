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

      <q-card-section v-if="item.activation === 'passive'" :class="['row items-center', 'text-h6', [item.item_slot_type + '-darker']]">
        Passive
      </q-card-section>
      <q-card-section v-else :class="['row items-center', 'text-h6', [item.item_slot_type + '-darker']]">
        Active
      </q-card-section>

      <div class="q-pa-md">
        <div v-for="(property, key) in item.properties" :key="key" class="property">
          <!-- Exclude 'AbilityUnitTargetLimit' -->
          <div v-if="property.value > 0 && key !== 'AbilityUnitTargetLimit'" class="property-row">
            {{ formatKey(key) }}: {{ formatValue(property) }}
          </div>
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
    formatKey(key) {
      // Format the property key to display it nicely (e.g., camelCase -> "Camel Case")
      return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    },
    formatValue(property) {
      // Handle formatting for different property values
      if (property.display_units) {
        return `${property.value} ${this.getDisplayUnit(property.display_units)}`;
      }
      return property.value;
    },
    getDisplayUnit(unit) {
      const unitMap = {
        "EDisplayUnit_Meters": "m",
        "EDisplayUnit_MetersPerSecond": "m/s",
        "EDisplayUnit_Normal": "",
      };
      return unitMap[unit] || '';
    }
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