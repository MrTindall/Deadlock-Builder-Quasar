<template>
  <q-header elevated>
    <q-toolbar style="height: 100px" >
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
        v-if="!startBuild"
      />
      <q-toolbar-title> <h4>DeadSmith</h4> </q-toolbar-title>
    </q-toolbar>
  </q-header>

  <q-drawer v-model="leftDrawerOpen" show-if-above bordered v-if="!startBuild">
    <HeroList :heroList="filteredHeros" @heroIsActive="selectHero"></HeroList>
  </q-drawer>

  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 100%">
      <div v-if="!startBuild" class="heroDetailCard">
        <div class="primaryColorBar" style="">
          Hero Details
        </div>
        <div  style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 6px; padding: 10px;">
          <h4 style="margin: 0; margin-bottom: 6px;">{{ selectedHero }}</h4>
          <div style="min-width: 200px; width: 400px; display: flex; flex-direction: row; justify-content: space-between; align-items: center;" v-if="selectedHero !== 'Select a Hero'">
            <q-select 
              filled 
              v-model="model" 
              :options="options" 
              label="Select a Build" 
              bg-color="primary" 
              color="white"
              label-color="white"
              style="width: 100%;" 
            />
            <q-btn color="primary" label="Build" style="height: 56px; width: 148px; margin-left: 8px; " @click="toggleStartBuild"/>
          </div> 
        </div> 

        <!-- first page content -->
        <div v-show="selectedHero !== 'Select a Hero'" class="q-pa-md">
          <div><h5 class="q-ma-sm">Recommmended Upgrades</h5></div>
          <PanelTab :itemList="recommendedItems" />
        </div>
      </div>
      <div v-else>
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
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap; margin-bottom: 15px;">
              <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 6px;">
                <h4 style="margin: 0; margin-bottom: 6px;">{{ selectedHero }}</h4>
                
                <div style="display: flex; justify-content: end;">
                  <div style="display: flex; justify-content: space-between; flex-wrap: wrap; margin-bottom: 15px;">
                    <q-input
                      filled
                      v-model="buildName"
                      label="Enter Build Name"
                      label-color="primary"
                      bg-color="primary-dark"
                      class="q-mr-md"
                      input-style="color: white"
                    />
                    <q-btn v-show="buildName !== ''" color="primary" label="Save" style="height: 56px; width: 148px;" @click="saveBuild"/>
                  </div>
                </div>
                 
              </div>        
            </div>

              <PanelTab
                :itemList="builtItems"
                :heroList="heroRecommendedItems"
                @deleteItem="deleteItem"
              />
            </q-tab-panel>

            <q-tab-panel name="weapons">
              <PanelTab
                :name="'Weapons'"
                :itemList="weaponItems"
                :heroList="heroRecommendedItems"
                @itemIsActive="addToBuild"
                @deleteItem="deleteItem"
              />
            </q-tab-panel>

            <q-tab-panel name="vitality">
              <PanelTab
                :name="'Vitality'"
                :itemList="vitalityItems"
                :heroList="heroRecommendedItems"
                @itemIsActive="addToBuild"
                @deleteItem="deleteItem"
              />
            </q-tab-panel>

            <q-tab-panel name="spirit">
              <PanelTab
                :name="'Spirit'"
                :itemList="spiritItems"
                :heroList="heroRecommendedItems"
                @itemIsActive="addToBuild"
                @deleteItem="deleteItem"
              />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
      
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
const heroRecommendedItems = ref([]);
const builtItems = ref([]);
const tab = ref("build");
const allItems = ref([]);
let selectedHero = ref("Select a Hero")
const startBuild = ref(false);
const buildName = ref('')


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
    addDescToItems(allItems.value, itemDescriptions)
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

function selectHero(hero) {
  if (!hero.isActive) {
    heros.value.forEach((h) => (h.isActive = false));
    hero.isActive = true;
    selectedHero.value = hero.name;
    heroRecommendedItems.value = heros.value.filter((h) => h.name === selectedHero.value);
    heroRecommendedItems.value = heroRecommendedItems.value[0].recommended_upgrades;
    heroRecommendedItems.value = allItems.value.filter(item =>
      heroRecommendedItems.value.some(name => item.class_name === name)
    );
  } else {
    hero.isActive = false;
    selectedHero.value = "Select a Hero";
    heroRecommendedItems.value = [];
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
function addDescToItems(itemArr, itemDescArr) {
  itemDescArr.forEach(item => {
    const foundItem = itemArr.find((i) => i.class_name === item.name)
    if(foundItem) {
      if(item.descriptionPassive) {
        foundItem.descriptionPassive = item.descriptionPassive;
      }
      if(item.descriptionActive) {
        foundItem.descriptionActive = item.descriptionActive;
      }
    }
  });
}
function toggleStartBuild() {
  if(selectedHero !== 'Select a Hero') {
    startBuild.value = !startBuild.value;
  }
}

function saveBuild() {
  // will need to add logic
  startBuild.value = !startBuild.value;
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

const recommendedItems = computed(() => {
  return heroRecommendedItems.value.sort((a, b) => {
    const costDifference = a.cost - b.cost;
    return costDifference !== 0
      ? costDifference
      : a.name.localeCompare(b.name);
  });
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
  {name:'upgrade_hollow_point_rounds', descriptionPassive: 'Passive: When you are above 60% health, deal additional Weapon Damage.'},
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
  {name:'upgrade_thermal_detonator', descriptionActive: 'Active: Throw a flash that explodes on contact, creating an area that does increasing Spirit Damage per second and causes enemies to recieve additional Weapon Damage from your team. Deals 40% less DPS vs non-heroes'},
  {name:'upgrade_dps_aura', descriptionPassive: 'Passive: Provide Fire Rate to nearby player minions.', descriptionActive: 'Active: Provides bonus Movement Speed and Fire Rate to you and nearby allies'},
  {name:'upgrade_warp_stone', descriptionPassive: '', descriptionActive: 'Active: Teleport straight ahead, gaining Bullet Resist.'},
  {name:'upgrade_banshee_slugs', descriptionPassive: 'Passive: Headshots reduce targets Bullet and Spirit Resist.'},
  {name:'upgrade_fervor', descriptionPassive: 'Passive: While you are below 50% health, you gain stat bonuses.'},
  {name:'upgrade_glass_cannon', descriptionPassive: 'Passive: Each hero kill grants permanent Weapon Damage (up to a max of 7 times). Death results in the loss of 1 stack.'},
  {name:'upgrade_critshot', descriptionPassive: 'Passive: Your bullets have a chance to be empowered, causing them to  deal bonus damage and Slow on hit'},
  {name:'upgrade_ricochet', descriptionPassive: 'Passive: Your bullets will ricochet on enemies near your target, applying any bullet procs and dealing percentage of the original damage.'},
  {name:'upgrade_cloaking_device_active', descriptionActive: 'Active: Become Stealthed. Whenever you take damage while Stealthed you get briefly revealed.Attacking or using an ability will end your stealth and start an ambush, temporarily granting you bonus Fire Rate and Spirit Power'},
  {name:'upgrade_tech_overflow', descriptionPassive: 'Passive: Gain bonus Spirit Power by charging up with your bullets on enemy heroes.'},
  {name:'upgrade_silencer', descriptionActive: 'Active: For the next 4s, all your bullets immediately apply Silence. Silence prevents targets from using abilities.'},
  {name:'upgrade_surging_power', descriptionActive: 'Active: Grants Lifesteal, Fire Rate, and Ammo. This added Ammo is not limited by your max magazine size.'},
  {name:'upgrade_lifestrike_gauntlets', descriptionPassive: 'Passive: Your melee attacks heal you for 80% of the Melee Damage dealt plus 90. This heal is 30% effective vs non-heroes.'},
  {name:'upgrade_health_stimpak',  descriptionActive: 'Active: Grant Regen and Sprint Speed to the target. Gets dispelled if you take damage from enemy players or objectives. Can be self-cast.'},
  {name:'upgrade_regenerating_bullet_shield', descriptionPassive: 'Passive: When you have a Bullet Shield, gain Weapon Damage and Fire Rate.'},
  {name:'upgrade_debuff_reducer', descriptionPassive: 'Passive: Reduces the duration of all negative effects applied to you. '},
  {name:'upgrade_magic_shield', descriptionPassive: 'Passive: While you have a Spirit Shield, gain bonus Spirit Power and Cooldown Reduction.'},
  {name:'upgrade_cardio_calibrator', descriptionPassive: 'Passive: Reduces the effects of enemy Movement Slow'},
  {name:'upgrade_healbane', descriptionPassive: 'Passive: Your Spirit Damage applies Healing Reduction. If an enemy hero dies under this effect, you receive a large heal.'},
  {name:'upgrade_healing_booster', descriptionPassive: 'Passive: Increases the effectiveness of your Healing and increases your resistance to healing reduction.'},
  {name:'upgrade_vex_barrier', descriptionPassive: 'Passive: Automatically deploy temporary Bullet and Spirit Shields when you are movement locked, Stunned, Chained, Immobilized, or Slept.'},
  {name:'upgrade_savior', descriptionActive: 'Active: Provide the target with Bullet Shield, Spirit Shield, and Movement Speed. Can be self-cast.'},
  {name:'upgrade_restorative_locket', descriptionPassive: 'Passive: When an enemy uses an ability within 50m range from you, store one Restoration Stack.', descriptionActive: 'Active: Consume all stacks to heal target ally. If used at the max stacks it replenishes a stamina point on the target. Can be self-cast.'},
  {name:'upgrade_return_fire', descriptionActive: 'Active: Automatically fire a bullet towards any attacker who damages you with their abilities or weapon.'},
  {name:'upgrade_chonky', descriptionPassive: 'Passive: After not taking damage for 10s, gain 4% Max Health Regen. When you are above 75% health, you have bonus Weapon Damage and Movement Speed.'},
  {name:'upgrade_boxing_glove', descriptionPassive: 'Passive: Your Melee Attack applies Movement Slow and heals you for 55% of the Melee Damage dealt plus 110. This heal is 40% effective vs non-heroes.'},
  {name:'upgrade_superior_stamina', descriptionPassive: 'Passive: Increases the number of Air Dashes and Air Jumps that can be performed before landing from 1 to 2.'},
  {name:'upgrade_veil_walker', descriptionPassive: 'Passive: Walking through a cosmic veil grants you Stealth, increased Movement Speed, restores all Bullet and Spirit Shields, and grants bonus Fire Rate for your next magazine.'},
  {name:'upgrade_reduce_debuff_duration', descriptionPassive: 'Passive: Reduces the duration of all negative effects applied to you.', descriptionActive: 'Active (45s): Purge all negative effects currently applied to you. If any effects were removed, gain a movement speed bonus and 10% max HP. Cannot be used while Stunned or Slept.'},
  {name:'upgrade_rocket_booster', descriptionActive: 'Active: Launch yourself high into the air. While in the air, you can use the active again to drop down faster. Cannot be used for 5s if attacked by enemy Hero.'},
  {name:'upgrade_metal_skin', descriptionActive: 'Active: Become immune to bullets and melee attacks.'},
  {name:'upgrade_rescue_beam', descriptionActive: 'Active: Heals a target allied hero and yourself for a percentage of Max Health. Once while healing, you can Pull the target towards you. Can be self-cast.'},
  {name:'upgrade_inhibitor', descriptionPassive: 'Passive: Your bullets apply Movement Slow and reduce the targets outgoing damage on hit.'},
  {name:'upgrade_siphon_bullets', descriptionPassive: 'Passive: Your bullets temporarily steal Max HP from enemies. Enemies regain their stolen health when the debuff expires. Permanently steal one stack of health if a siphoned target dies and lose 2 stacks if you die.'},
  {name:'upgrade_colossus', descriptionActive: 'Active: Gain Bullet and Spirit Resist, and slow the movement and dash speed of enemies nearby. Your model size grows by 20%.'},
  {name:'upgrade_phantom_strike', descriptionActive: 'Active: Teleport to an enemy target, applying Disarm, Slow, and dealing damage. 3s Disarm & Slow Duration'},
  {name:'upgrade_unstoppable', descriptionActive: 'Active: Supress negative status effects and become Immune to Stun, Silence, Sleep, Root, and Disarm.'},
  {name:'upgrade_ammo_scavenger', descriptionPassive: 'Passive: Any time you secure or deny a Soul you get ammo back and gain stacking Spirit Power. 2 Ammo Per Soul. 1 Spirit Power Per Soul'},
  {name:'upgrade_magic_burst', descriptionPassive: 'Passive: Abilities deal bonus Spirit Damage if they deal 80 damage or more in a single hit. '},
  {name:'upgrade_magic_reach', descriptionPassive: 'Increases the range and effect radius of your abilities and items.'},
  {name:'upgrade_acolytes_glove', descriptionPassive: 'Passive: When you perform a Light or Heavy Melee attack against a hero, deal extra Spirit Damage with the attack and reduce the targets Spirit Resist.'},
  {name:'upgrade_infuser', descriptionActive: 'Active: Gain Spirit Power and Spirit Lifesteal.'},
  {name:'upgrade_bullet_resist_shredder', descriptionPassive: 'Passive: Reduces Bullet Resist on enemies when you deal Spirit Damage.'},
  {name:'upgrade_arcane_extension', descriptionPassive: 'Increases the Duration of your abilities and items.'},
  {name:'upgrade_magic_tempo', descriptionPassive: 'Reduces the Cooldown of your abilities and items.'},
  {name:'upgrade_magic_vulnerability', descriptionPassive: 'Passive: When the target takes Spirit Damage, they have their Spirit Resist reduced. '},
  {name:'upgrade_quick_silver', descriptionPassive: 'Passive: Imbue an ability with bonus Spirit Damage on the first hit. When the ability is used, your weapon is reloaded and has a Fire Rate bonus for that clip. '},
  {name:'upgrade_suppressor', descriptionPassive: 'Passive: When you deal Spirit Damage to enemies, you also apply Fire Rate Slow. '},
  {name:'upgrade_cold_front', descriptionPassive: '', descriptionActive: 'Active: Release an expanding ice blast that deals Spirit Damage and Slows targets it hits. 75 + (1.5 * Spirit Power) Spirit Damage'},
  {name:'upgrade_rupture', descriptionActive: 'Active: Reduces healing received of targeted enemy and inflicts damage over time of their current health. Decays damage is non-lethal. '},
  {name:'upgrade_containment', descriptionActive: 'Active: Deals Spirit Damage and Slows targets movement and dashes. Also Silences their movement-based items and abilities. Does not affect targets stamina usage. 40 + (0.59 * Spirit Power) Spirit Damage'},
  {name:'upgrade_withering_whip', descriptionActive: 'Active: Target an enemy to apply Fire Rate Slow and reduce their Bullet Resist. '},
  {name:'upgrade_magic_shock', descriptionPassive: 'Passive: Abilities deal bonus Spirit Damage if they deal 175 damage or more in a single hit. Targets are immune to the effects of Improved Burst for 5s after taking damage from it.'},
  {name:'upgrade_magic_slow', descriptionPassive: 'Passive: If a target takes Spirit damage, they have their Movement Speed and Fire Rate reduced. '},
  {name:'upgrade_imbued_duration_extender', descriptionPassive: 'Increases the duration of your abilities and items.'},
  {name:'upgrade_magic_storm', descriptionPassive: 'Passive: Imbue an ability with permanent Spirit Power. When that ability is used, gain bonus Movement Speed. +34 Imbued Ability Spirit Power'},
  {name:'upgrade_tech_damage_pulse', descriptionPassive: 'Passive: Periodically deals Spirit Damage to the 2 closest enemies nearby. 40 + (0.24 * Spirit Power) Spirit Damage'},
  {name:'upgrade_self_bubble', descriptionActive: 'Active: You enter a void state and become untargetable and invincible for a short duration, during which you cannot move or perform any actions. Afterwards you instantly reload and gain bonus Spirit Power.'},
  {name:'upgrade_target_stun', descriptionActive: 'Active: Target is knocked down and Stunned after a 2s delay, interrupting and temporarily preventing them from taking any action. '},
  {name:'upgrade_targeted_silence', descriptionActive: 'Active: Fires a projectile which silences and damages the target. Silence does not interrupt channeling abilities. '},
  {name:'upgrade_diviners_kevlar', descriptionPassive: 'Passive: Upon casting an ultimate ability gain temporary Bullet Shield, Spirit Shield, and Spirit Power. '},
  {name:'upgrade_escalating_exposure', descriptionPassive: 'Passive: Dealing Spirit Damage applies a stacking Spirit Amp that increases your Spirit Damage to the target.'},
  {name:'upgrade_tech_bleed', descriptionPassive: 'Passive: Cooldown Imbue an ability to apply slow in a radius around the target and deal an additional percentage of the damage dealt to enemies around the target after a short delay. '},
  {name:'upgrade_glitch', descriptionActive: 'Active: Curses an enemy - interrupting, Siliencing, Disarming, and preventing item usage. '},
  {name:'upgrade_ability_power_shard', descriptionActive: 'Active: Reset the cooldown of your most recently used non-ultimate ability.'},
  {name:'upgrade_magic_carpet', descriptionActive: 'Active: Summon a Magic Carpet that will fly you away and gain Bullet and Spirit Shields. Cannot use abilities while the carpet is being summoned. While flying you are immune to slows and doing any action will dismiss the carpet. '},
  {name:'upgrade_ability_refresher', descriptionActive: 'Active: Reset the cooldown of all your abilities and restore all your charges'},
];
</script>

<style lang="scss">
  .q-tabs {
    height: 50px;
  }  
</style>
