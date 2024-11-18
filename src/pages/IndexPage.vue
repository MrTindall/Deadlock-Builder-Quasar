<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 100%;">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
          
        >
          <q-tab name="build" label="Build" class="q-pb-md q-pt-sm"/>
          <q-tab name="weapons" label="Weapons" />
          <q-tab name="vitality" label="Vitality" />
          <q-tab name="spirit" label="Spirit" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated style="height: 80vh;">
          <q-tab-panel name="build">
            <div class="text-h6">Build</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="weapons">
            <div class="text-h6">Weapons</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="vitality">
            <div class="text-h6">Vitality</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="spirit">
            <div class="text-h6">Spirit</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({
  name: 'IndexPage'
})

const tab = ref('build')  // Initialize the active tab to "build"
</script>
