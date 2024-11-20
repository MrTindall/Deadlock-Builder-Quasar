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
    <HeroList :heroList="filteredHeros"></HeroList>
  </q-drawer>

  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 100%">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="light"
          align="justify"
          narrow-indicator
          style="height: 50px"
          @update:model-value="handleTabChange"
        >
          <q-tab name="build" label="Build" />
          <q-tab name="weapons" label="Weapons" />
          <q-tab name="vitality" label="Vitality" />
          <q-tab name="spirit" label="Spirit" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="build">
            <div class="text-h6">Builder</div>
          </q-tab-panel>

          <q-tab-panel name="weapons">
            <PanelTab :name="'Weapons'" :itemList="filteredItems" :itemClass="'weapons'" />
          </q-tab-panel>

          <q-tab-panel name="vitality">
            <PanelTab :name="'Vitality'" :itemList="filteredItems" :itemClass="'vitality'" />
          </q-tab-panel>

          <q-tab-panel name="spirit">
            <PanelTab :name="'Spirit'" :itemList="filteredItems" :itemClass="'spirit'" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import PanelTab from "src/components/PanelTab.vue";
import HeroList from "src/components/HeroList.vue";

defineOptions({
  name: "IndexPage",
});

// Variables
const leftDrawerOpen = ref(false);
const items = ref([]);
const heros = ref([]);
const tab = ref("build");

// Methods
async function searchItems(slotType) {
  let url = `https://assets.deadlock-api.com/v2/items/by-slot-type/${slotType}`;
  let config = {
    params: {
      slot_type: slotType,
      language: "english",
      client_version: "5368",
    },
  };

  try {
    const response = await axios.get(url, config);
    items.value = response.data;
    console.log(items.value);
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

// Handles tab changes
function handleTabChange(newTab) {
  const slotTypeMapping = {
    build: "builder",
    weapons: "weapon",
    vitality: "vitality",
    spirit: "spirit",
  };

  const slotType = slotTypeMapping[newTab] || "weapon";
  searchItems(slotType);
}

// Mounted
onMounted(() => {
  searchItems("builder");
  searchHeros();
});

// Computed Properties
const filteredHeros = computed(() => {
  return heros.value
    .filter((hero) => hero.in_development === false)
    .sort((a, b) => a.name.localeCompare(b.name));
});

const filteredItems = computed(() => {
  return items.value
    .filter((item) => item.shopable === true)
    .sort((a, b) => {
      const costDifference = a.cost - b.cost;
      if (costDifference !== 0) {
        return costDifference;
      }
      return a.name.localeCompare(b.name);
    });
});
</script>
