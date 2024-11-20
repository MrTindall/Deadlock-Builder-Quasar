<template>
  <q-card class="hero" bordered>
    <q-card-section horizontal>
      <q-img class="col hero-icon-img" :src="hero.images.icon_hero_card"/>
      <q-card-actions vertical>
        <div class="text-h6 text-center">{{ hero.name }}</div>
        <q-btn
            flat
            label="Details ›"
            @click="heroDetailClick"
            class="text-h6"
            style="padding: 0; font-size: small;"
          />
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
  methods: {
    heroDetailClick() {
      // Placeholder, will eventually trigger Modal
      alert("Name: " + this.hero.name);
    },
  },
};
</script>
