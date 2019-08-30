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
					classname="cropper"
					:src="this.img"
					:stencilProps="{
						aspectRatio: 2/3,
					}"
					@change="cropChange"
				></Cropper>

			</section>
			<section class="col-sm-12">
				<h2>Preview</h2>

				<ShortItem :img="this.image" v-if="this.style == 'profile'" />

			</section>
			<section v-if="this.image" class="col-sm-12">
				<a :href="this.image" download="image.jpg" class="btn green btn-large">Download</a>
			</section>
		</div>
	</main>

</template>

<script>

	import Vue from "vue";
	import { Cropper } from 'vue-advanced-cropper';
	import ShortItem from './ShortItem.vue';

	export default {
		data(){
			return {
				img: '',
				style: '',
				image: '',
				coordinates: {
					width: 0,
					height: 0,
					left: 0,
					top: 0
				},
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
					this.img = e.target.result;
				}
				reader.readAsDataURL(e.target.files[0]);
			},
			cropChange({coordinates, canvas}) {
				this.coordinates = coordinates;
				this.image = canvas.toDataURL();
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