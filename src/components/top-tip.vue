<template>
	<transition name="drop">
		<div class="top-tip" v-show="showFlag" @click.stop="hide">
			<slot></slot>
		</div>
	</transition>
</template>

<script type="text/javascript">
	export default {
		data() {
			return{
				showFlag: false
			}
		},
		methods: {
			show() {
				this.showFlag = true
				clearTimeout(this.timer)
				this.timer = setTimeout(()=>{
					this.hide()
				}, 2000)
			},
			hide() {
				this.showFlag = false
			}
		}
	}
</script>

<style lang="stylus">
	@import "~@/assets/stylus/variable"
	
	.top-tip
		position: fixed
		top: 0
		width: 100%
		z-index: 500
		background: $color-dialog-background
		&.drop-enter-active, &.drop-leave-active
			transition: all .3s
		&.drop-enter, &.drop-leave-to
			transform: translate3d(0, -100%, 0)
</style>