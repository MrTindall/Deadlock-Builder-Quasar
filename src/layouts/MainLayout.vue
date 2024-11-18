<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="height: 100px">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Deadlock Builder App </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item v-for="hero in heros" :key="hero.id">
          <q-card>
            {{ hero.name }}
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
import { ref, onMounted } from 'vue';
import axios from 'axios';

defineOptions({
  name: "MainLayout",
});

const leftDrawerOpen = ref(false);
const items = ref([]);
const heros = ref([]);

async function searchItems() {
  let slotType = "vitality";
  let url = "https://assets.deadlock-api.com/v2/items/by-slot-type/" + slotType;
  let config = {
    params: {
      slot_type: slotType,
      language: 'english',
      client_version: '5349',
    },
  };

  try {
    const response = await axios.get(url, config);
    items.value = response.data;
  } catch (error) {
    console.error("Error fetching data from Deadlock API:", error);
  } finally {
    console.log('Done');
  }
}

async function searchHeros() {
  let url = "https://assets.deadlock-api.com/v2/heroes";
  let config = {
    params: {
      only_active: 'true',
      language: 'english',
      client_version: '5368',
    },
  };

  try {
    const response = await axios.get(url, config);
    console.log(response)
    heros.value = response.data;
  } catch (error) {
    console.error("Error fetching data from Deadlock API:", error);
  } finally {
    console.log('Done');
  }
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

// Call the function when the component is mounted
onMounted(() => {
  searchItems();
  searchHeros();
});
</script>
