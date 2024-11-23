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
      <q-toolbar-title> DeadSmith </q-toolbar-title>
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
          @update:model-value="handleTabChange"
        >
          <q-tab name="build" label="Build" />
          <q-tab name="weapons" label="Weapons" />
          <q-tab name="vitality" label="Vitality" />
          <q-tab name="spirit" label="Spirit" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="build">
            <PanelTab
              :name="'Builder'"
              :itemList="builtItems"
              @deleteItem="deleteItem"
            />
          </q-tab-panel>

          <q-tab-panel name="weapons">
            <PanelTab
              :name="'Weapons'"
              :itemList="weaponItems"
              @itemIsActive="addToBuild"
              @deleteItem="deleteItem"
            />
          </q-tab-panel>

          <q-tab-panel name="vitality">
            <PanelTab
              :name="'Vitality'"
              :itemList="vitalityItems"
              @itemIsActive="addToBuild"
              @deleteItem="deleteItem"
            />
          </q-tab-panel>

          <q-tab-panel name="spirit">
            <PanelTab
              :name="'Spirit'"
              :itemList="spiritItems"
              @itemIsActive="addToBuild"
              @deleteItem="deleteItem"
            />
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
const builtItems = ref([]);
const tab = ref("build");
const allItems = ref([]);

// async functions
async function getAllItems() {
  let url = `https://assets.deadlock-api.com/v2/items`;
  let config = {
    params: {
      language: "english",
      client_version: "5368",
    },
  };

  try {
    const response = await axios.get(url, config);
    allItems.value = response.data;
    addIsActive(allItems.value);
    // console.log(items.value);
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
    addIsActive(heros.value);
    console.log(heros.value)
  } catch (error) {
    console.error("Error fetching data from Deadlock API:", error);
  } finally {
    console.log("Done");
  }
}

// functions
function addIsActive(arr) {
  arr.forEach((element) => {
    element.isActive = false;
  });
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function handleTabChange(newTab) {
  const slotTypeMapping = {
    build: "builder",
    weapons: "weapon",
    vitality: "vitality",
    spirit: "spirit",
  };

  const slotType = slotTypeMapping[newTab];
  if (slotType) {
    items.value = allItems.value.filter(
      (item) => item.item_slot_type === slotType && item.shopable === true
    );
  } else {
    items.value = [];
  }
}

function addToBuild(item) {
  const foundItem = items.value.find((i) => i.id === item.id);
  if (foundItem) {
    const existingItem =
      builtItems.value.find((i) => i.id === foundItem.id) ?? null;
    if (!existingItem) {
      item.isActive = true;
      builtItems.value.push(item);
    }
  }
}

function deleteItem(item) {
  const index = builtItems.value.findIndex((i) => i.id === item.id);
  if (index !== -1) {
    builtItems.value.splice(index, 1);
  }

  const foundItem = allItems.value.find((i) => i.id === item.id);
  if (foundItem) {
    foundItem.isActive = false;
  }
}

// Mounted
onMounted(() => {
  searchHeros();
  getAllItems();
});

// Computed Properties
const filteredHeros = computed(() => {
  return heros.value
    .filter((hero) => hero.in_development === false)
    .sort((a, b) => a.name.localeCompare(b.name));
});

function filterAndSortItems(slotType) {
  return computed(() => {
    return allItems.value
      .filter(
        (item) => item.item_slot_type === slotType && item.shopable === true
      )
      .sort((a, b) => {
        const costDifference = a.cost - b.cost;
        return costDifference !== 0
          ? costDifference
          : a.name.localeCompare(b.name);
      });
  });
}

const weaponItems = filterAndSortItems("weapon");
const vitalityItems = filterAndSortItems("vitality");
const spiritItems = filterAndSortItems("spirit");
</script>

<style lang="scss">
  .q-tabs {
    height: 50px;
  }
</style>
