<template>
	<transition name="slide">
		<div class="user-center">
			<div class="back" @click.stop="back">
				<i class="icon-back"></i>
			</div>
			<div class="switches-wrapper">
				<switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></switches>
			</div>
			<div class="play-btn" ref="playBtn" @click.stop="random">
				<i class="icon-play"></i>
				<span class="text">播放全部</span>
			</div>
			<div class="list-wrapper" ref="listWrapper">
				<scroll ref="favoriteList" class="list-scroll" v-if="currentIndex === 0" :data="favoriteList">
					<div class="list-inner">
						<song-list @select="selectSong" :songs="favoriteList"></song-list>
					</div>
				</scroll>
				<scroll ref="playList" class="list-scroll" v-if="currentIndex === 1" :data="playHistory">
					<div class="list-inner">
						<song-list @select="selectSong" :songs="playHistory"></song-list>
					</div>
				</scroll>
			</div>
			<div class="no-result-wrapper" v-show="noResult">
				<no-result :title="noResultDesc"></no-result>
			</div>
		</div>
	</transition>
</template>

<script type="text/javascript">
	import Switches from '@/components/switches'
	import {mapGetters, mapActions} from 'vuex'
	import Scroll from '@/components/scroll'
	import SongList from '@/components/song-list'
	import Song from '@/assets/js/song'
	import {playlistMixin} from '@/assets/js/mixin'
	import NoResult from '@/components/no-result'

	export default {
		mixins: [playlistMixin],
		data(){
			return {
				currentIndex: 0,
				switches: [
					{name: '我喜欢的'},
					{name: '最近听的'}
				]
			}
		},
		computed: {
			...mapGetters(['favoriteList', 'playHistory']),
			noResult() {
				if (this.currentIndex === 0) {
					return !this.favoriteList.length
				} else {
					return !this.playHistory.length
				}
			},
			noResultDesc() {
				if (this.currentIndex === 0) {
					return '暂无收藏歌曲'
				} else {
					return '你还没有听过歌曲'
				}
			}
		},
		components: {
			Switches,
			Scroll,
			SongList,
			NoResult
		},
		methods: {
			...mapActions(['insertSong', 'randomPlay']),
			switchItem(index) {
				this.currentIndex = index
			},
			selectSong(song) {
				this.insertSong(new Song(song))
			},
			back() {
				this.$router.back()
			},
			random() {
				let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory
				if (list.length === 0) {
					return
				}
				list = list.map((song) => {
					return new Song(song)
				})
				this.randomPlay({list})
			},
			handlePlaylist(playlist) {
				const bottom = playlist.length > 0 ? '60px' : ''
				this.$refs.listWrapper.style.bottom = bottom
				this.$refs.favoriteList && this.$refs.favoriteList.refresh()
				this.$refs.playlist && this.$refs.playlist.refresh()
			}
		}
	}
</script>

<style lang="stylus">
	@import "~@/assets/stylus/variable"
	
	.user-center
		position: fixed
		top: 0
		bottom: 0
		z-index: 100
		width: 100%
		background: $color-background
		&.slide-enter-active, &.slide-leave-active
			transition: all .3s
		&.slide-enter, &.slide-leave-to
			transform: translate3d(100%, 0, 0)
		.back
			position: absolute
			top: 0
			left: 6px
			z-index: 50px
			.icon-back
				display: block
				padding: 10px
				font-size: $font-size-large-x
				color: $color-theme
		.switches-wrapper
			margin: 10px 0 30px 0
		.play-btn
			box-sizing: border-box
			width: 135px
			padding: 7px 0
			margin: 0 auto
			text-align: center
			border: 1px solid $color-text-l
			color: $color-text-l
			border-radius: 100px
			font-size: 0
			.icon-play
				display: inline-block
				vertical-align: middle
				margin-right: 6px
				font-size: $font-size-medium-x
			.text
				display: inline-block
				vertical-align: middle
				font-size: $font-size-small
		.list-wrapper
			position: absolute
			top: 110px
			bottom: 0
			width: 100%
			.list-scroll
				height: 100%
				overflow: hidden
				.list-inner
					padding: 20px 30px
		.no-result-wrapper
			position: absolute
			width: 100%
			top: 50%
			transform: translateY(-50%)
</style>