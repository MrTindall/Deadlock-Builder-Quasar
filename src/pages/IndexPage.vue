<template>
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
      <q-item v-for="hero in filteredHeros" :key="hero.id">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-img
              class="col hero-icon-img"
              :src="hero.images.icon_hero_card"
            />
            <q-card-actions vertical class="justify-around q-px-md">
              <div class="text-h6 text-center">{{ hero.name }}</div>
            </q-card-actions>
          </q-card-section>
        </q-card>
      </q-item>
    </q-list>
  </q-drawer>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 100%">
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
          <q-tab name="build" label="Build" class="q-pb-md q-pt-sm" />
          <q-tab name="weapons" label="Weapons" />
          <q-tab name="vitality" label="Vitality" />
          <q-tab name="spirit" label="Spirit" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated style="height: 80vh">
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
import { ref, computed, onMounted } from "vue";
import axios from "axios";

defineOptions({
  name: "IndexPage",
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
      language: "english",
      client_version: "5349",
    },
  };

  try {
    const response = await axios.get(url, config);
    items.value = response.data;
  } catch (error) {
    console.error("Error fetching data from Deadlock API:", error);
  } finally {
    console.log("Done");
  }
}

async function searchHeros() {
  let url = "https://assets.deadlock-api.com/v2/heroes";
  let config = {
    params: {
      only_active: "true",
      language: "english",
      client_version: "5368",
    },
  };

  try {
    const response = await axios.get(url, config);
    console.log(response.data);
    heros.value = response.data;
  } catch (error) {
    console.error("Error fetching data from Deadlock API:", error);
  } finally {
    console.log("Done");
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

// Correctly define computed property
const filteredHeros = computed(() => {
  return heros.value.filter((hero) => hero.needs_testing === false);
});

const filteredItems = computed(() => {
  return heros.value.filter((item) => item.shopable === true);
});

const tab = ref("build"); // Initialize the active tab to "build"
</script>
