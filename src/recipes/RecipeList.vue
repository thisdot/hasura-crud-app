<template>
  <div class="recipes">
    <div class="container">
      <div class="row content">
        <div class="col-md-12">
          <h2 class="text-center">Recipes</h2>
        </div>
      </div>
      <div class="row one-recipe" v-for="(recipe, index) in recipes" :key="index">
        <div class="col-md-8 recipe-header">
          <router-link to="google.com" class="recipe-title">{{ recipe.name }}</router-link>
          <p class="recipe-description">{{ recipe.description }}</p>
        </div>
        <div class="col-md-4 text-center">
          <div class="recipe-details">
            <span class="label">Servings: </span><span>{{ recipe.number_of_servings }}</span> | <span class="label">Calories: </span><span>{{ recipe.calories_per_serving   }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>  	
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'RecipeList',
  computed: {
    ...mapState('recipes', { recipes: 'all' })
  },
  mounted() {
    this.$store.dispatch('recipes/fetch');
  }
};
</script>

<style scoped>
.content {
  margin-bottom: 50px;
}
.recipe-header {
  text-align: center;
}
.recipe-header .recipe-title {
  padding: 2px;
  font-size: 1.25rem;
  color: #373C42;
}
.recipe-description {
  font-size: 0.9rem;
}
.one-recipe span {
  font-size: 0.8rem;
}
.one-recipe {
  margin-bottom: 30px;
}
.recipe-details {
  background-color: #eee;
  border-radius: 10px;
}
.recipe-details .label {
  font-weight: bold;
  font-size: 0.8rem;  
}
@media screen and (min-width: 768px) {
  .recipe-details {
    padding: 10px;
    width: 200px;
  }
  .recipe-header {
    border-bottom: 1px solid #eee;
  }
  .recipe-header {
    text-align: justify;
  }
}
</style>
