<template>
  <q-btn 
    flat 
    unelevated 
    class="full-width selectable-card-btn" 
    @click="selectHero"
  >
    <q-card class="hero" bordered>
      <q-card-section horizontal>
        <q-img class="col hero-icon-img" :src="hero.images.icon_hero_card" />
        <q-card-actions vertical>
          <div class="q-pb-lg flex justify-end">
            <q-icon v-if="hero.complexity === 1" name="thumb_up" />
            <q-icon v-else/>
          </div>
          <div class="text-h6 text-center">{{ hero.name }}</div>
          <q-btn
            flat
            label="Details ›"
            @click.stop="heroDetailClick"
            class="text-h6"
            style="padding: 0; font-size: small;"
          />
          
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-btn>
</template>

<script>
export default {
  name: "HeroListItem",
  components: {},
  props: {
    hero: {
      type: Object,
    },
  },
  methods: {
    heroDetailClick() {
      // Placeholder, will eventually trigger Modal
      alert("Name: " + this.hero.name);
    },
    selectHero() {
      this.$emit("heroIsActive", this.hero);
    },
  },
};
</script>

<style scoped lang="scss">
.selectable-card-btn {
  padding: 0;
}

.q-icon {
  color: $primary;
}
</style>
