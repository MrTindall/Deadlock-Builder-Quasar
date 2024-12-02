<template>
  <q-dialog backdrop-filter="blur(4px) desaturate(-150%)" ref="modal">
    <q-card :class="[item.item_slot_type + '-dark']">
      <q-card-section :class="['row items-center', 'text-h6', item.item_slot_type]" style="justify-content: space-between;">
      <div>
        {{ item.name }}
        <br />
        ${{ item.cost }}
      </div>
      <div v-if="item.item_slot_type == 'weapon'">
        <div v-if="item.item_tier === 1" style="text-align: right;">
          +6% Weapon Damage
        </div>
        <div v-else-if="item.item_tier === 2" style="text-align: right;">
          +10% Weapon Damage
        </div>
        <div v-else-if="item.item_tier === 3" style="text-align: right;">
          +10% Weapon Damage
        </div>
        <div v-else-if="item.item_tier === 4" style="text-align: right;">
          +18% Weapon Damage
        </div>
      </div>
      <div v-else-if="item.item_slot_type == 'vitality'">
        <div v-if="item.item_tier === 1" style="text-align: right;">
          +11% Base Health
        </div>
        <div v-else-if="item.item_tier === 2" style="text-align: right;">
          +14% Base Health
        </div>
        <div v-else-if="item.item_tier === 3" style="text-align: right;">
          +17% Base Health
        </div>
        <div v-else-if="item.item_tier === 4" style="text-align: right;">
          +20% Base Health
        </div>
      </div>
      <div v-else-if="item.item_slot_type == 'spirit'">
        <div v-if="item.item_tier === 1" style="text-align: right;">
          +4 Spirit Power
        </div>
        <div v-else-if="item.item_tier === 2" style="text-align: right;">
          +8 Spirit Power
        </div>
        <div v-else-if="item.item_tier === 3" style="text-align: right;">
          +12 Spirit Power
        </div>
        <div v-else-if="item.item_tier === 4" style="text-align: right;">
          +16 Spirit Power
        </div>
      </div>
    
  </q-card-section>

      <q-card-section v-if="item.component_items && item.component_items.length" :class="['row items-center', 'text-h6']">
        Component of: {{ getComponentName(item, itemList) }}
      </q-card-section>

      <q-card-section :class="['row items-center', 'text-h6', [item.item_slot_type + '-darker']]">
        Passive
      </q-card-section>


      <div class="q-pa-md q-mb-sm">
        <div v-if="item.descriptionPassive" class="q-pb-sm">
          {{ item.descriptionPassive }}
        </div>
        <div v-if="item.properties.AbilityCooldown?.value > 0" class="q-pb-sm">
            Ability Cooldown {{ item.properties.AbilityCooldown.value }}s
        </div>
        <div v-if="item.properties.AbilityCastDelay?.value > 0" class="q-pb-sm">
            Ability Cast Delay {{ item.properties.AbilityCastDelay.value }}s
        </div>
        <div v-if="item.properties.AbilityDuration?.value > 0" class="q-pb-sm">
            Ability Duration {{ item.properties.AbilityDuration.value }}s
        </div>
        <div v-if="item.properties.BonusAbilityCharges?.value > 0" class="q-pb-sm">
            + {{ item.properties.BonusAbilityCharges.value }} Bonus Ability Charge(s) 
        </div>
        <div v-if="item.properties.CooldownReductionOnChargedAbilities?.value > 0" class="q-pb-sm">
            + {{ item.properties.CooldownReductionOnChargedAbilities.value }}% Cooldown on Charged Abilities 
        </div>
        <div v-if="item.properties.BonusHealth?.value > 0" class="q-pb-sm">
            + {{ item.properties.BonusHealth.value }} Bonus Health 
        </div>
        <div v-if="item.properties.BonusHealthRegen?.value > 0" class="q-pb-sm">
            + {{ item.properties.BonusHealthRegen.value }} Health Regen
        </div>
        <div v-if="item.properties.AbilityLifestealPercentHero?.value > 0" class="q-pb-sm">
            + {{ item.properties.AbilityLifestealPercentHero.value }}% Spirit Lifesteal
        </div>
        <div v-if="item.properties.BaseAttackDamagePercent?.value > 0" class="q-pb-sm">
            + {{ item.properties.BaseAttackDamagePercent.value }}% Weapon Damage 
        </div>
        <div v-if="item.properties.BonusMeleeDamagePercent?.value > 0" class="q-pb-sm">
            + {{ item.properties.BonusMeleeDamagePercent.value }}% Melee Damage 
        </div>
        <div v-if="item.properties.TechPower?.value > 0" class="q-pb-sm">
            + {{ item.properties.TechPower.value }} Spirit Power
        </div>
        <div v-if="item.properties.Stamina?.value > 0" class="q-pb-sm">
            + {{ item.properties.Stamina.value }} Stamina charge(s)
        </div>
        <div v-if="item.properties.BonusClipSizePercent?.value > 0" class="q-pb-sm">
            + {{ item.properties.BonusClipSizePercent.value }}% Ammo
        </div>
        <div v-if="item.properties.BonusFireRate?.value > 0" class="q-pb-sm">
            + {{ item.properties.BonusFireRate.value }}% Fire Rate
        </div>
        <div v-if="item.properties.HeadShotBonusDamage?.value > 0" class="q-pb-sm">
            + {{ item.properties.HeadShotBonusDamage.value }} Bonus Headshot Damage
        </div>
        <div v-if="item.properties.BulletResist?.value > 0" class="q-pb-sm">
            {{ item.properties.BulletResist.value }}% Bullet Resist
        </div>
        <div v-if="item.properties.TechResist?.value" class="q-pb-sm">
            {{ item.properties.TechResist.value }}% Spirit Resist
        </div>
        <div v-if="item.properties.TechArmorDamageReduction?.value" class="q-pb-sm">
            {{ item.properties.TechArmorDamageReduction.value }}% Spirit Resist on Spirit Damage
        </div>
        <div v-if="item.properties.MagicIncreasePerStack?.value > 0" class="q-pb-sm">
            +{{ item.properties.MagicIncreasePerStack.value }} Spirit Amp per Stack
        </div>
        <div v-if="item.properties.MaxStacks?.value > 0" class="q-pb-sm">
            {{ item.properties.MaxStacks.value }} Max Stacks
        </div>
        <div v-if="item.properties.ProcCooldown?.value > 0" class="q-pb-sm">
            {{ item.properties.ProcCooldown.value }}s Proc Cooldown
        </div>
        <div v-if="item.properties.AttackDamageWhenShielded?.value > 0" class="q-pb-sm">
            + {{ item.properties.AttackDamageWhenShielded.value }}% Attack Damage When Shielded
        </div>
        <div v-if="item.properties.BulletShieldMaxHealth?.value > 0" class="q-pb-sm">
            + {{ item.properties.BulletShieldMaxHealth.value }} Bullet Shield
        </div>
        <div v-if="item.properties.FireRateWhenShielded?.value > 0" class="q-pb-sm">
            + {{ item.properties.FireRateWhenShielded.value }}% Fire Rate When Shielded
        </div>
        <div v-if="item.properties.BonusSpiritWithMagicShield?.value > 0" class="q-pb-sm">
            + {{ item.properties.BonusSpiritWithMagicShield.value }} Spirit While Shielded
        </div>
        <div v-if="item.properties.CooldownReductionWithShield?.value > 0" class="q-pb-sm">
            + {{ item.properties.CooldownReductionWithShield.value }}% Cooldown Reduction While Shielded
        </div>
        <div v-if="item.properties.TechShieldMaxHealth?.value > 0" class="q-pb-sm">
            + {{ item.properties.TechShieldMaxHealth.value }} Spirit Shield
        </div>
        <div v-if="item.properties.BonusMoveSpeed?.value" class="q-pb-sm">
            + {{ item.properties.BonusMoveSpeed.value }} Move Speed
        </div>
        <div v-if="item.properties.BonusSprintSpeed?.value" class="q-pb-sm">
            + {{ item.properties.BonusSprintSpeed.value }} Sprint Speed
        </div>
        <div v-if="item.properties.SlowResistancePercent?.value" class="q-pb-sm">
            + {{ item.properties.SlowResistancePercent.value }}% Slow Resistance
        </div>
        <div v-if="item.properties.TechDamagePercent?.value > 0" class="q-pb-sm">
            + {{ item.properties.TechDamagePercent.value }}% Spirit Damage (Conditional)
        </div>
        <div v-if="item.properties.MovementSpeedSlow?.value > 0" class="q-pb-sm">
            + {{ item.properties.MovementSpeedSlow.value }}% Movement Speed Slow
        </div>
        <div v-if="item.properties.DelayDuration?.value > 0" class="q-pb-sm">
            {{ item.properties.DelayDuration.value }}s Delay Duration
        </div>
        <div v-if="item.properties.Radius?.value" class="q-pb-sm">
            {{ item.properties.Radius.value }} Radius
        </div>
        <div v-if="item.properties.TechRadiusMultiplier?.value > 0" class="q-pb-sm">
            + {{ item.properties.TechRadiusMultiplier.value }}% Radius
        </div>
        <div v-if="item.properties.TechRangeMultiplier?.value" class="q-pb-sm">
            + {{ item.properties.TechRangeMultiplier.value }}% Range
        </div>
        <div v-if="item.properties.CooldownReduction?.value" class="q-pb-sm">
            + {{ item.properties.CooldownReduction.value }}% Cooldown Reduction
        </div>
        <div v-if="item.properties.BonusAbilityDurationPercent?.value" class="q-pb-sm">
            + {{ item.properties.BonusAbilityDurationPercent.value }}% Duration
        </div>
        <div v-if="item.properties.ImbuedBonusDuration?.value" class="q-pb-sm">
            + {{ item.properties.ImbuedBonusDuration.value }}% Imbued Duration
        </div>
        <div v-if="item.properties.NonImbuedBonusDuration?.value" class="q-pb-sm">
            + {{ item.properties.NonImbuedBonusDuration.value }}% Non-Imbued Duration
        </div>

        <div v-if="item.properties.ImbuedCooldownReduction?.value" class="q-pb-sm">
            + {{ item.properties.ImbuedCooldownReduction.value }}% Imbued Cooldown Reduction
        </div>
        <div v-if="item.properties.NonImbuedCooldownReduction?.value" class="q-pb-sm">
            + {{ item.properties.NonImbuedCooldownReduction.value }}% Non-Imbued Cooldown Reduction
        </div>
        <div v-if="item.properties.ImbuedTechPower?.value > 0" class="q-pb-sm">
            + {{ item.properties.ImbuedTechPower.value }}% Imbued Spirit Power
        </div>
        <div v-if="item.properties.MovementSpeedBonusDuration?.value > 0" class="q-pb-sm">
            {{ item.properties.MovementSpeedBonusDuration.value }}s Move Speed Duration
        </div>
        <div v-if="item.properties.ProcBonusMagicDamage?.value > 0" class="q-pb-sm">
            + {{ item.properties.ProcBonusMagicDamage.value }} Bonus Spirit Damage
        </div>
        <div v-if="item.properties.BonusHeavyMeleeDamage?.value > 0" class="q-pb-sm">
            + {{ item.properties.BonusHeavyMeleeDamage.value }}% Bonus Melee Damage
        </div>
        <div v-if="item.properties.MeleeDistanceScale?.value > 0" class="q-pb-sm">
            + {{ item.properties.MeleeDistanceScale.value }}% Bonus Melee Distance
        </div>
        <div v-if="item.properties.LongRangeBonusWeaponPower?.value > 0" class="q-pb-sm">
            + {{ item.properties.LongRangeBonusWeaponPower.value }}% Long Range Weapon Damage
        </div>
        <div v-if="item.properties.LongRangeBonusWeaponPowerMinRange?.value" class="q-pb-sm">
            {{ item.properties.LongRangeBonusWeaponPowerMinRange.value }} Minium Distance
        </div>

        <div v-if="item.properties.CloseRangeBonusWeaponPower?.value" class="q-pb-sm">
            + {{ item.properties.CloseRangeBonusWeaponPower.value }} % Close Range Weapon Damage
        </div>
        <div v-if="item.properties.CloseRangeBonusDamageRange?.value" class="q-pb-sm">
            {{ item.properties.CloseRangeBonusDamageRange.value }} Max Distance
        </div>
        <div v-if="item.properties.NonPlayerBonusWeaponPower?.value" class="q-pb-sm">
            + {{ item.properties.NonPlayerBonusWeaponPower.value }}% NPC Damage
        </div>
        <div v-if="item.properties.NonPlayerBulletResist?.value" class="q-pb-sm">
            + {{ item.properties.NonPlayerBulletResist.value }}% NPC Damage Resist
        </div>
      </div>
    

      <q-card-section v-if="item.activation !== 'passive'" :class="['row items-center', 'text-h6', [item.item_slot_type + '-darker']]" class="q-pb-sm">
        Active
      </q-card-section>
      <div class="q-pa-md">
        <div v-if="item.descriptionActive" class="q-pb-sm">
          {{ item.descriptionActive }}
        </div>
        <div v-if="item.properties.RegenDuration?.value > 0" class="q-pb-sm">
            {{ item.properties.RegenDuration.value }}s Regen Duration
        </div>
        <div v-if="item.properties.TotalHealthRegen?.value > 0" class="q-pb-sm">
            {{ item.properties.TotalHealthRegen.value }} Total Health Regen
        </div>
        <div v-if="item.properties.BonusClipDuration?.value > 0" class="q-pb-sm">
            {{ item.properties.BonusClipDuration.value }}s Bonus Ammo Duration
        </div>
        <div v-if="item.properties.ActiveBonusMoveSpeed?.value" class="q-pb-sm">
            + {{ item.properties.ActiveBonusMoveSpeed.value }} Move Speed (Conditional)
        </div>
      </div>

      <q-card-actions class="flex justify-end">
        <div>
          <q-btn flat label="Cancel" size="md" class="q-ma-sm" color="white" v-close-popup />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>



<script>
export default {
  name: "DetailsModal",
  props: {
    item: {
      type: Object,
      required: true,
    },
    itemList: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getComponentName(item, arr) {
      if (item.component_items && item.component_items.length > 0) {
        const componentName = item.component_items[0];
        const foundItem = arr.find((element) => 
          element.class_name === componentName
        );
        return foundItem ? foundItem.name : "Unknown Component";
      }
      return "No component";
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
}
</style>