<template>
	<div class="no-result">
		<div class="no-result-icon"></div>
		<p class="no-result-text">{{title}}</p>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			title: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="stylus">
	@import "~@/assets/stylus/variable"
	@import "~@/assets/stylus/mixin"
	
	.no-result
		text-align: center
		.no-result-icon
			width: 86px
			height: 90px
			margin: 0 auto
			bg-image('./../assets/images/no-result')
			background-size: 86px 90px
		.no-result-text
			margin-top: 30px
			font-size: $font-size-medium
			color: $color-text-d
</style>