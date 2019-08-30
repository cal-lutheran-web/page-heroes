<template>
	
	<main class="container">
		<div class="row">
			<section class="col-sm-12">
				<h1 class="section-title">Image Resizer</h1>

				<h2>Upload an Image</h2>

				<label for="upload-select">Select a file to upload</label>
                <input type="file" class="cropit-image-input" id="upload-select" @change="handleFileChange" />

			</section>
			<section class="col-sm-12">
				<h2>Choose a Style of Image</h2>

				<select v-model="style">
					<option value=""></option>
					<option value="profile">Profile</option>
				</select>

			</section>
			<section class="col-sm-12">
				<h2>Make Edits</h2>

				<Cropper
					ref="cropImg"
					classname="cropper"
					:src="this.oldImage"
					:stencilProps="{
						aspectRatio: 2/3,
					}"
					@change="cropChange"
				></Cropper>

			</section>
			<section class="col-sm-12">
				<h2>Preview</h2>

				<ShortItem :img="this.newImage" v-if="this.style == 'profile'" />

			</section>
			<section v-if="this.newImage" class="col-sm-12">
				<a :href="this.newImage" download="image.jpg" class="btn green btn-large">Download</a>
			</section>
		</div>
	</main>

</template>

<script>

	import Vue from "vue";
	import { Cropper } from 'vue-advanced-cropper';
	import ShortItem from './ShortItem.vue';
	const Pica = require('pica')();

	export default {
		data(){
			return {
				oldImage: '',
				style: '',
				newImage: ''
			}
		},
		components: {
			Cropper,
			ShortItem
		},
		methods: {
			handleFileChange(e){
				var reader = new FileReader();
				reader.onload = (e) => {
					this.oldImage = e.target.result;
				}
				reader.readAsDataURL(e.target.files[0]);
			},
			cropChange({coordinates, canvas}) {

				// get current Vue object
				var $this = this;

				// make a new canvas object to throw image into
				var zoomedCanvas = document.createElement('canvas');
				zoomedCanvas.width = 200;
				zoomedCanvas.height = 300;
				
				// use Pica library to resize image down, then assign to Vue data
				Pica.resize(canvas, zoomedCanvas)
					.then(function(result){
						console.log(result);
						$this.newImage = result.toDataURL();
					});

			},
		}
	}

</script>


<style scoped>

	.cropper {
		max-width: 400px;
		margin: auto;
	}

</style>