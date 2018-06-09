<template>
	<transition name="slide">
		<music-list :rank="rank" :title="title" :bgImage="bgImage" :songs="songs"></music-list>
	</transition>
</template>

<script type="text/javascript">
	import MusicList from '@/views/music-list'
	import {mapGetters} from 'vuex'
	import {getMusicList} from '@/api/singer'
	import {createSong} from '@/assets/js/song'

	export default {
		components: {
			MusicList
		},
		computed: {
			title() {
				return this.topList.topTitle
			},
			bgImage() {
				return this.topList.picUrl
			},
			...mapGetters([
				'topList'
				])
		},
		created() {
			this._getMusicList()
		},
		data() {
			return {
				songs: [],
				rank: true
			}
		},
		methods: {
			_getMusicList() {
				if (!this.topList.id) {
					this.$router.push('/rank')
					return
				}
				getMusicList(this.topList.id).then((res) => {
					if (res.code === 0) {
						this.songs = this._normalizeSongs(res.songlist)
					}
				})
			},
			_normalizeSongs(list) {
				let ret = []
				list.forEach((item) => {
					const musicData = item.data
					if (musicData.songid && musicData.albummid) {
						ret.push(createSong(musicData))
					}
				})
				return ret
			}

		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>