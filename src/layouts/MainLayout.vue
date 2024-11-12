<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="height: 100px;">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Deadlock Builder App
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item v-for="item in items" :key="item">
          <q-card style="width: 100%; height: 100px;">
            {{ item }}
          </q-card>

        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({
  name: 'MainLayout'
})

const leftDrawerOpen = ref(false)
const items = ref([1, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 5])

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>
