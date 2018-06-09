<template>
	<transition name="slide">
		<music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
	</transition>
</template>

<script type="text/javascript">
	import {mapGetters} from 'vuex'
	import {getSingerDetail} from '@/api/singer'
	import {State_OK} from '@/api/config'
	import {createSong} from '@/assets/js/song'
	import MusicList from '@/views/music-list'

	export default {
		data() {
			return {
				songs: []
			}
		},
		computed: {
			...mapGetters(['singer']),
			title() {
				return this.singer.name
			},
			bgImage() {
				return this.singer.avatar
			}
		},
		created() {
			this._getDetail()
		},
		components: {
			MusicList
		},
		methods: {
			_getDetail() {
				if (!this.singer.id) {
					this.$router.push('/singer')
				}
				getSingerDetail(this.singer.id).then((res) => {
					if (res.code === State_OK) {
						this.songs = this._normalizeSongs(res.data.list)
					}
				})
			},
			_normalizeSongs(list) {
				let ret =[]
				list.forEach((item) => {
					let {musicData} = item
					if (musicData.songid && musicData.albumid) {
						ret.push(createSong(musicData))
					}
				})
				return ret
			}
		}
	}
</script>

<style lang="stylus">
	@import "~@/assets/stylus/variable"
	.slide-enter-active, .slide-leave-active
		transition: all .3s
	.slide-enter, .slide-leve-to
		transform:  translate3d(100%, 0, 0);
</style>