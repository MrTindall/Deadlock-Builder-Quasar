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
    console.log(allItems.value);
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
    // console.log(heros.value)
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

const itemDescriptions = [
  {name:'upgrade_close_range', descriptionPassive: 'Passive: Deal additional Weapon Damage when in close range to your target.'},
  {name:'upgrade_headshot_booster', descriptionPassive: 'Passive: Deal bonus Weapon Damage with headshots'},
  {name:'upgrade_hollow_point_rounds', description: 'Passive: When you are above 60% health, deal additional Weapon Damage.'},
  {name:'upgrade_medic_bullets', descriptionPassive: 'Passive: Your next bullet will heal you based on what target you hit.'},
  {name:'upgrade_active_reload', descriptionPassive: 'Passive: While reloading, pressing [R] during the highlighted portion will instantly finish your reload and grant you Fire Rate and Bullet Lifesteal.'},
  {name:'upgrade_berserker', descriptionPassive: 'Passive: Your Weapon Damage increases as you take sustained damage.'},
  {name:'upgrade_kinetic_sash', descriptionPassive: 'Passive: Your nest Dash-Jump does not cost an extra stamina and you gain Fire Rate and bonus Ammo until your next reload. Lasts up to 7s.'},
  {name:'upgrade_long_range', descriptionPassive: 'Passive: Deal additional Weapon Damage when beyond a minimum distance from your target.'},
  {name:'upgrade_melee_charge', descriptionPassive: 'Passive: Your next Heavy Melee attack against an enemy deals increased damage and either reload your weapon instantly or give you up to +100% bonus ammo. Only activates when Bonus Ammo is not full.'},
  {name:'upgrade_crackshot', descriptionPassive: 'Passive: Your next bullet deals bonus Spirit Damage.'},
  {name:'upgrade_slowing_bullets', descriptionPassive: 'Passive: Your bullets apply Movement Slow.'},
  {name:'upgrade_tech_defense_shredders', descriptionPassive: 'Passive: Your bullets apply a debuff that amplifies your Spirit Damage against the target and grants you Spirit Lifesteal against them.'},
  {name:'upgrade_fleetfoot_boots', descriptionPassive: 'Passive: Removes the Movement Speed penalty while shooting. Gain Movement Speed and Ammo.'},
  {name:'upgrade_burst_fire', descriptionPassive: 'Passive: Briefly gain Fire Rate and Move Speed when one of your bullets hits an enemy hero.'},
  {name:'upgrade_reinforcing_casings', descriptionPassive: 'Passive: Grants Bullet Resist when your bullets hit an enemy hero. Each shot can only grant one stack.'},
  {name:'upgrade_headhunter', descriptionPassive: 'Passive: Landing a headshot deals bonus damage, heals you for a portion of your Max HP, and briefly grants you bonus move speed.'},
  {name:'upgrade_bullet_armor_reduction_aura', descriptionPassive: 'Passive: Reduce nearby enemies Bullet Resist and Fire Rate. If there is only one enemy hero nearby, this effect is tripled.'},
  {name:'upgrade_intensifying_clip', descriptionPassive: 'Passive: Increases Weapon Damage as you continuously fire your weapon.'},
  {name:'upgrade_close_quarter_combat', descriptionPassive: 'Passive: When in close range to your target, gain Weapon Damage and your bullets apply a Movement Slow.'},
  {name:'upgrade_pristine_emblem', descriptionPassive: 'Passive: Your attacks have additional Weapon Damage against enemies above 50% health.'},
  {name:'upgrade_sharpshooter', descriptionPassive: 'Passive: Deal additional Weapon Damage when beyond minimum distance from your target.'},
  {name:'upgrade_chain_lightning', descriptionPassive: 'Passive: Your bullets have a chance to shock your target. The shock will jump to a nearby enemy.'},
  {name:'upgrade_toxic_bullets', descriptionPassive: 'Passive: Your bullets build up a Bleed on enemies causing them to lose a percentage of their current health over time. Also applies Healing Reduction on the bleeding target.'},
  {name:'upgrade_thermal_detonator', descriptionActive: 'Active (28s): Throw a flash that explodes on contact, creating an area that does increasing Spirit Damage per second and causes enemies to recieve additional Weapon Damage from your team. Deals 40% less DPS vs non-heroes'},
  {name:'upgrade_dps_aura', descriptionPassive: 'Passive: Provide Fire Rate to nearby player minions.', descriptionActive: 'Active: Provides bonus Movement Speed and Fire Rate to you and nearby allies'},
  {name:'upgrade_warp_stone', descriptionPassive: '', descriptionActive: 'Active: Teleport straight ahead, gaining Bullet Resist.'},
  {name:'upgrade_banshee_slugs', descriptionPassive: 'Passive: Headshots reduce targets Bullet and Spirit Resist.'},
  {name:'upgrade_fervor', descriptionPassive: 'Passive: While you are below 50% health, you gain stat bonuses.'},
  {name:'upgrade_glass_cannon', descriptionPassive: 'Passive: Each hero kill grants permanent Weapon Damage (up to a max of 7 times). Death results in the loss of 1 stack.'},
  {name:'upgrade_critshot', descriptionPassive: 'Passive: Your bullets have a chance to be empowered, causing them to  deal bonus damage and Slow on hit'},
  {name:'upgrade_ricochet', descriptionPassive: 'Passive: Your bullets will ricochet on enemies near your target, applying any bullet procs and dealing percentage of the original damage.'},
  {name:'upgrade_cloaking_device_active', descriptionActive: 'Active: Become Stealthed. Whenever you take damage while Stealthed you get briefly revealed.Attacking or using an ability will end your stealth and start an ambush, temporarily granting you bonus Fire Rate and Spirit Power'},
  {name:'upgrade_tech_overflow', descriptionPassive: 'Passive: Gain bonus Spirit Power by charging up with your bullets on enemy heroes.'},
  {name:'upgrade_silencer', descriptionActive: 'Active (36s): For the next 4s, all your bullets immediately apply Silence. Silence prevents targets from using abilities.'},
  {name:'upgrade_surging_power', descriptionActive: 'Active (30s): Grants Lifesteal, Fire Rate, and Ammo. This added Ammo is not limited by your max magazine size.'},
  {name:'', descriptionPassive: '', descriptionActive: ''},
  {name:'', descriptionPassive: '', descriptionActive: ''},
  {name:'', descriptionPassive: '', descriptionActive: ''},
  {name:'', descriptionPassive: '', descriptionActive: ''},
  {name:'', descriptionPassive: '', descriptionActive: ''},
  {name:'', descriptionPassive: '', descriptionActive: ''},
  {name:'', descriptionPassive: '', descriptionActive: ''},
  {name:'', descriptionPassive: '', descriptionActive: ''},
  {name:'', descriptionPassive: '', descriptionActive: ''},
  
];
</script>

<style lang="scss">
  .q-tabs {
    height: 50px;
  }
</style>
