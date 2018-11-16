<template>
  <div>
    <div class="text-center">
      <h1>Welcome to Yummy Food!</h1>
      <p>
        This is a sample application accompanying an article on Hasura GraphQL
        Engine. The article is published in three parts.
      </p>
    </div>
    <ul class="parts">
      <li><a href="">Part 1</a></li>
      <li><a href="">Part 2</a></li>
      <li><a href="">Part 3</a></li>
    </ul>
    <div class="techs">
      <h3 class="text-center">Technologies used in this sample application:</h3>
      <ul>
        <li><a href="">Vue.js</a></li>
        <li>Authentication/Authorization with <a href="">auth0</a></li>
        <li><a href="">Hasura GraphQL Engine</a></li>
        <li><a href="">Apollo Client for Vue.js</a></li>
        <li><a href="">Heroku</a> to host Hasura Engine</li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home"
};
</script>

<style scoped>
.parts {
  display: flex;
  justify-content: space-around;
  padding: 0;
  margin: 20px 0 0 0;
}

.parts li {
  list-style-type: none;
}

.parts li a {
  padding: 10px;
  color: #333;
}
.parts li a:hover {
  text-decoration: none;
  border-bottom: solid 2px #333;
}

.techs {
  margin: 30px auto;
}

.techs h3 {
  font-size: 1.25rem;
}

.techs > ul {
  display: block;
}

@media screen and (max-width: 768px) {
  .parts {
    display: block;
  }

  .parts li {
    display: block;
    padding: 10px;
  }

  .techs {
    width: 100%;
    padding: 0;
  }
}

@media screen and (min-width: 769px) {
  .techs {
    width: 80%;
  }
}
</style>
