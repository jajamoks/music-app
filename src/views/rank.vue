<template>
	<div class="rank" ref="rank">
		<scroll :data="topList" class="toplist" ref="toplist">
			<ul>
				<li class="item" v-for="item in topList" @click="selectItem(item)">
					<div class="icon">
						<img width="100" height="100" v-lazy="item.picUrl"/>
					</div>
					<ul class="songlist">
						<li class="song" v-for="(song, index) in item.songList">
							<span>{{index + 1}}</span>
							<span>{{song.songname}}-{{song.singername}}</span>
						</li>
					</ul>
				</li>
			</ul>
			<div class="loading-container" v-show="!topList.length">
				<loading></loading>
			</div>
		</scroll>
		<router-view></router-view>
	</div>
</template>

<script type="text/javascript">
	import {getTopList} from '@/api/singer'
	import Scroll from '@/components/scroll'
	import Loading from '@/components/loading'
	import {playlistMixin} from '@/assets/js/mixin'
	import {mapMutations} from 'vuex'

	export default {
		mixins: [playlistMixin],
		components: {
			Scroll,
			Loading
		},
		created() {
			this._getTopList()
		},
		data() {
			return {
				topList: []
			}
		},
		methods: {
			_getTopList() {
				getTopList().then((res) => {
					if (res.code === 0) {
						this.topList = res.data.topList
					}
				})
			},
			handlePlaylist(playlist) {
				const bottom = playlist.length? '60px' : ''
				this.$refs.rank.style.bottom = bottom
				this.$refs.toplist.refresh()
			},
			selectItem(item) {
				this.$router.push({
					path: `/rank/${item.id}`
				})
				this.setTopList(item)
			},
			...mapMutations({
				setTopList: 'SET_TOP_LIST'
			})
		}
	}
</script>

<style lang="stylus">
	@import "~@/assets/stylus/variable"
	@import "~@/assets/stylus/mixin"
	
	.rank
		position: fixed
		top: 88px
		bottom: 0
		width: 100%
		.toplist
			height: 100%
			overflow: hidden
			.item
				display: flex
				margin: 0 20px
				padding-top: 20px
				height: 100px
				&:last-child
					padding-bottom: 20px
				.icon
					flex: 0 0 100px
					width: 100px
					height: 100px
				.songlist
					flex: 1
					display: flex
					flex-direction: column
					justify-content: center
					padding: 0 20px
					height: 100px
					overflow: hidden				
					background: $color-highlight-background
					font-size: $font-size-small				
					.song
						no-wrap()
						line-height: 26px
			.loading-container
				position: absolute
				width: 100%
				top: 50%
				transform: translateY(-50%)
</style>		
