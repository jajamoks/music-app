<template>
	<div class="recommend" ref="recommend">
		<scroll ref="scroll" class="recommend-content" :data="diskList">
			<div>
				<div v-if="recommends.length" class="slider-wrapper">
					<slider>
						<div v-for="item in recommends">
							<a :href="item.linkUrl">
								<img class="needsclick" @load="loadIma()" :src="item.picUrl">
							</a>
						</div>
					</slider>
				</div>
				<div class="recommend-list">
					<h1 class="list-title">热门歌单推荐</h1>
					<ul>
						<li @click="selectItem(item)" v-for="item in diskList" class="item">
							<div class="icon">
								<img width="60" height="60" v-lazy="item.imgurl">
							</div>
							<div class="text">
								<h2 class="name" v-html="item.creator.name"></h2>
								<p class="desc" v-html="item.dissname"></p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="loading-container" v-show="!diskList.length">
				<loading></loading>
			</div>
		</scroll>
		<router-view></router-view>
	</div>
</template>

<script type="text/javascript">
	import Slider from '@/components/slider'
	import {getRecommend, getDiskList} from '@/api/recommend'
	import {State_OK} from '@/api/config'
	import axios from 'axios'
	import Scroll from '@/components/scroll'
	import Loading from '@/components/loading'
	import {playlistMixin} from '@/assets/js/mixin'
	import {mapMutations} from 'vuex'

	export default {
		mixins: [playlistMixin],
		data() {
			return {
				recommends: [],
				diskList: []
			}
		},
		created() {
			this._getRecommend()
			this._getDiskList()
		},
		methods: {
			...mapMutations({
				setDisc: 'SET_DISC'
			}),
			selectItem(item) {
				this.$router.push({
					path: `/recommend/${item.dissid}`
				})
				this.setDisc(item)
			},
			handlePlaylist(playList) {
				const bottom = playList.length > 0 ? '60px': ''
				this.$refs.recommend.style.bottom = bottom
				this.$refs.scroll.refresh()
			},
			_getRecommend() {
				getRecommend().then((res) => {
					if (res.code === State_OK) {
						this.recommends = res.data.slider
					}
				})
			},
			_getDiskList() {
				getDiskList().then((res) => {
					if (res.code === State_OK) {
						this.diskList = res.data.list
					}
				})
			},
			loadIma() {
				if (!this.checkLoading) {
					this.$refs.scroll.refresh()
					this.checkLoading = true
				}
			}
		},
		components: {
			Slider,
			Scroll,
			Loading
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~@/assets/stylus/variable"

	.recommend
		position: fixed
		width: 100%
		top: 88px;
		bottom: 0
		.recommend-content
			height: 100%
			overflow: hidden
			.slider-wrapper
				position: relative
				width: 100%
				overflow: hidden
			.recommend-list
				.list-title
					height: 65px
					line-height: 65px
					text-align: center
					font-size: $font-size-medium
					color: $color-theme
				.item
					display: flex
					box-sizing: border-box
					align-items: center
					padding: 0 20px 20px 20px
					.icon
						flex: 0 0 60px
						width: 60px
						padding-right: 20px
					.text
						display: flex
						flex-direction: column
						justify-content: center
						flex: 1
						line-height: 20px
						overflow: hidden
						font-size: $font-size-medium
						.name
							margin-bottom: 10px
							color: $color-text
						.desc
							color: $color-text-d
			.loading-container
				position: absolute
				width: 100%
				top: 50%
				-webkit-transform: translateY(-50%);
				   -moz-transform: translateY(-50%);
				    -ms-transform: translateY(-50%);
				     -o-transform: translateY(-50%);
				        transform: translateY(-50%);

</style>