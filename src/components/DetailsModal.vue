<template>
    <q-dialog backdrop-filter="blur(4px) desaturate(-150%)" ref="modal">
    <q-card>
        <q-card-section class="row items-center text-h6 background-color">
          {{ item.name }}
        </q-card-section>

        <q-card-actions class="flex justify-between">
          <div>
            <q-btn flat label="Cancel" size="md" class="q-ma-sm" color="secondary" v-close-popup/>
          </div>
        </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: "DetailsModal",
  data() {
    return {
      
    };
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onOpen() {
      
    },
  }
};
</script>
<style scoped lang="scss">
.q-card {
    background-color: $primary-dark;
    width: 600px;
    max-width: 90vw;
    height: 600px;
    max-height: 90vh;
}
.background-color {
    background-color: $primary;
}
</style>