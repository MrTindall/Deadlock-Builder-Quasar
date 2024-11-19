<template>
  <q-card class="hero" flat bordered>
    <q-card-section horizontal>
      <q-img class="col hero-icon-img" :src="hero.images.icon_hero_card"/>
      <q-card-actions vertical class="justify-around q-px-md">
        <div class="text-h6 text-center">{{ hero.name }}</div>
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "HeroListItem",
  components: {},
  props: {
    hero: {
      type: Object,
    }
  },
};
</script>
