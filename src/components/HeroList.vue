<template>

</template>

<script>

export default {
  name: "HeroList",
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
