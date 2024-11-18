<template>
  <div>
    <!-- Display the filtered items -->
    <ul>
      <li v-for="item in filteredItems" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
export default defineComponent({
  setup() {},
});
</script>
