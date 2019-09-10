<template>
  <div class="three-column-feature">
    <div class="row flexrow">
      <div class="col-sm-4">
        <div class="wrap-16x9">
          <img :src="img" alt="feature" width="556" height="315" />
        </div>
        <h3>Featured Title</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, quis facilis quod soluta aut doloribus magnam labore eos dolore blanditiis doloremque, perferendis vitae asperiores sed ea! Sapiente quibusdam temporibus totam.</p>
      </div>

      <div class="col-sm-4">
        <div class="wrap-16x9 bg-offwhite"></div>
        <h3>Featured Title</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, quis facilis quod soluta aut doloribus magnam labore eos dolore blanditiis doloremque, perferendis vitae asperiores sed ea! Sapiente quibusdam temporibus totam.</p>
      </div>

      <div class="col-sm-4">
        <div class="wrap-16x9 bg-offwhite"></div>
        <h3>Featured Title</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, quis facilis quod soluta aut doloribus magnam labore eos dolore blanditiis doloremque, perferendis vitae asperiores sed ea! Sapiente quibusdam temporibus totam.</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "FeaturedCol",
  props: ["img"]
};
</script>