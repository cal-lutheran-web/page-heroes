<template>

	<div class="short-item">
		<div class="short-item-aside" id="profile-preview">
			<!-- <i id="placeholder-spinner" class="icon-loading loading-spinner hide"></i> -->
			<img :src="img" />
		</div>
		<div class="short-item-content">
		<header>Department Staff</header>
		<p><i class="icon-user"></i> <em>Job Title</em><br>
		<i class="icon-mail"></i> <a href="">email@callutheran.edu</a><br>
		<i class="icon-phone"></i> 555-1234</p>
		</div>
	</div>

</template>

<script>

	import Vue from "vue";

	export default {
		name: 'ShortItem',
		props: ['img'],
	}

</script>