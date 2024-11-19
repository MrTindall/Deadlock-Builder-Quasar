<template>
  <q-list>
    <q-item v-for="hero in heroList" :key="hero.id"> 
      <HeroListItem :hero="hero"></HeroListItem>
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
};
</script>
