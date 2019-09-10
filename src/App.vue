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
          :key="this.refresh"
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
        <a :href="this.newImage" :download="this.fileName" class="btn green btn-large">Download</a>
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
      fileName: "",
      imageTypes: ["profile", "featured-col"],
      aspectRatio: "",
      canvasWidth: "",
      canvasHeight: "",
      refresh: 0
    };
  },
  components: {
    Cropper,
    ShortItem,
    FeaturedCol
  },
  methods: {
    handleFileChange(e) {
      this.fileName = e.target.files[0].name;
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
        Vue.set(this, "canvasWidth", 200);
        Vue.set(this, "canvasHeight", 300);
        Vue.set(this, "aspectRatio", 2 / 3);
      }

      if (data == "featured-col") {
        Vue.set(this, "canvasWidth", 556);
        Vue.set(this, "canvasHeight", 312);
        Vue.set(this, "aspectRatio", 16 / 9);
      }

      this.resfresh = 1;
    }
  }
};
</script>


<style scoped>
.cropper {
  max-width: 40%;
  margin: auto;
}
main {
  margin-bottom: 8rem;
}
</style>