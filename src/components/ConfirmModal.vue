<template>
  <q-dialog backdrop-filter="blur(4px) desaturate(-150%)" ref="modal">
    <q-card>
      <q-card-section
        style="justify-content: space-between;">
        <div style="display: flex; justify-content: center;">
          <h6>Are you sure you want to delete this build?</h6>

        </div>
      </q-card-section>
      <q-card-actions class="flex justify-end">
        <div>
          <q-btn flat label="Confirm" size="md" class="q-ma-sm" color="red" v-close-popup @click="removeBuild"/>
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
      setTimeout(() => {
        this.$emit("removeBuild");
      }, 100);
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
  background-color: $primary-dark;
}

.q-dialog {
  
}
</style>