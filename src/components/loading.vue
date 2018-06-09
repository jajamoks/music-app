<template>
	<div class="loading">
		<img src="@/assets/images/loading.gif" width="24" height="24">
		<p class="desc">{{title}}</p>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			title: {
				type: String,
				default: 'Loading...'
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~@/assets/stylus/variable"
	
	.loading
		width: 100%
		text-align: center
		.desc
			line-height: 20px
			font-size: $font-size-small
			color: $color-text-l
</style>