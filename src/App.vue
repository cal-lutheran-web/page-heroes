<template>
  <main class="container">
    <div class="row">
      <section class="col-sm-12">
        <h1 class="section-title">Image Resizer</h1>
      </section>
      <section class="col-sm-12">
        <h2>Choose a Style of Image</h2>

        <select v-model="style">
          <option value></option>
          <option value="profile">Profile</option>
          <option value="featured-col">Featured Column</option>
        </select>
      </section>
      <section class="col-sm-12" v-if="this.style">
        <h2>Upload an Image</h2>

        <label for="upload-select">Select a file to upload</label>
        <input type="file" class="cropit-image-input" id="upload-select" @change="handleFileChange" />
      </section>

      <section class="col-sm-12" v-if="this.oldImage">
        <h2>Make Edits</h2>

        <Cropper
          ref="cropImg"
          class="cropper"
          :src="this.oldImage"
          :stencilProps="{ aspectRatio: this.aspectRatio }"
          @change="cropChange"
        ></Cropper>
      </section>
      <section class="col-sm-12" v-if="this.newImage">
        <h2>Preview</h2>

        <div id="preview-area" v-if="this.style === 'profile'">
          <ShortItem :img="this.newImage" />
        </div>
        <div id="preview-area" v-else-if="this.style === 'featured-col'">
          <FeaturedCol :img="this.newImage" />
        </div>
      </section>
      <section v-if="this.newImage" class="col-sm-12">
        <a :href="this.newImage" download="image.jpg" class="btn green btn-large">Download</a>
      </section>
    </div>
  </main>
</template>

<script>
import Vue from "vue";
import { Cropper } from "vue-advanced-cropper";
import ShortItem from "./ShortItem.vue";
import FeaturedCol from "./FeaturedCol.vue";
const Pica = require("pica")();

export default {
  data() {
    return {
      oldImage: "",
      style: "",
      newImage: "",
      imageTypes: ["profile", "featured-col"],
      aspectRatio: "",
      canvasWidth: "",
      canvasHeight: ""
    };
  },
  components: {
    Cropper,
    ShortItem,
    FeaturedCol
  },
  methods: {
    handleFileChange(e) {
      var reader = new FileReader();
      reader.onload = e => {
        this.oldImage = e.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    },
    cropChange({ coordinates, canvas }) {
      // get current Vue object
      var $this = this;

      // make a new canvas object to throw image into
      var zoomedCanvas = document.createElement("canvas");
      zoomedCanvas.width = $this.canvasWidth;
      zoomedCanvas.height = $this.canvasHeight;

      // use Pica library to resize image down, then assign to Vue data
      Pica.resize(canvas, zoomedCanvas).then(function(result) {
        console.log(result);
        $this.newImage = result.toDataURL();
      });
    }
  },
  watch: {
    style(data) {
      if (data == "profile") {
        this.canvasWidth = 200;
        this.canvasHeight = 300;
        this.aspectRatio = 2 / 3;
      }

      if (data == "featured-col") {
        this.canvasWidth = 556;
        this.canvasHeight = 315;
        this.aspectRatio = 16 / 9;
      }
    }
  }
};
</script>


<style scoped>
.cropper {
  max-width: 40%;
  margin: auto;
}
</style>