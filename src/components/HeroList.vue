<template>
  <q-list>
    <q-item v-for="hero in heroList" :key="hero.id"> 
      <HeroListItem :hero="hero" @heroIsActive="selectHero"></HeroListItem>
    </q-item>
  </q-list>
</template>

<script>
import HeroListItem from "./HeroListItem.vue";
export default {
  name: "HeroList",
  components: {
    HeroListItem,
  },
  props: {
    heroList: {
      type: Array,
      Required: true,
    },
  },
  methods: {
    selectHero(hero) {
      this.$emit("heroIsActive", hero);
    },
  },
};
</script>
