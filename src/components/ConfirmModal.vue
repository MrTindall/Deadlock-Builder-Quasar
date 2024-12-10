<template>
  <q-dialog backdrop-filter="blur(4px) desaturate(-150%)" ref="modal">
    <q-card :class="[item.item_slot_type + '-dark']">
      <q-card-section :class="['row items-center', 'text-h6', item.item_slot_type]"
        style="justify-content: space-between;">
        <div>

        </div>
      </q-card-section>
      <q-card-actions class="flex justify-end">
        <div>
          <q-btn flat label="Confirm" size="md" class="q-ma-sm" color="white" v-close-popup @click="removeBuild"/>
          <q-btn flat label="Cancel" size="md" class="q-ma-sm" color="white" v-close-popup />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>



<script>
export default {
  name: "ConfirmModal",

  methods: {
    removeBuild() {
      this.$emit("removeBuld", this.item);
    },
  },
};
</script>

<style scoped lang="scss">
.q-card {
  width: 600px;
  max-width: 90vw;
  height: fit-content;
  max-height: 90vh;
}
</style>