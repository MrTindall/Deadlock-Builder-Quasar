<template>

</template>

<script>

export default {
  name: "HeroListItem",
  components: {
    ItemListItem,
  },
  props: {
    itemList: {
      type: Array,
      required: true,
    },
    itemClass: {
      type: String,
      default: "",
    },
  },
};
</script>
