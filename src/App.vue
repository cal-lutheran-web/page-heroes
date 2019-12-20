<template>
  <main class="container">
    <div class="row">
      <section class="col-sm-12">
        <h1 class="section-title">Page Heroes</h1>
      </section>
      <section class="col-sm-12">
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

        <img :src="this.newImage" alt="feature" width="1280" height="342" />

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
const Pica = require("pica")();

export default {
  data() {
    return {
      oldImage: "",
      style: "",
      newImage: "",
      fileName: "",
      aspectRatio: 640/171,
      canvasWidth: 1280,
      canvasHeight: 342,
      refresh: 0
    };
  },
  components: {
    Cropper
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
      Pica.resize(canvas, zoomedCanvas)
        .then(function(result) {
          return Pica.toBlob(result, "image/jpeg", 0.9);
        })
        .then(function(blob) {
          let newFile = new FileReader();
          newFile.readAsDataURL(blob);

          newFile.onload = function() {
            $this.newImage = newFile.result;
          };
        });
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