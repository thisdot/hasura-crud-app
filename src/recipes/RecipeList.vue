<template>
  <div class=""></div>
</template>

<script>
export default {
  name: "RecipeList",
  mounted() {
    this.$store.dispatch("recipes/fetch");
  }
};
</script>

<style scoped></style>
