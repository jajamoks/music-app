<template>
	<transition name="slide">
		<music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
	</transition>
</template>

<script type="text/javascript">
	import MusicList from '@/views/music-list'
	import {mapGetters} from 'vuex'
	import {State_OK} from '@/api/config'
	import axios from 'axios'
	import {createSong} from '@/assets/js/song'

	export default {
		data() {
			return {
				songs: []
			}
		},
		computed: {
			title() {
				return this.disc.dissname
			},
			bgImage() {
				return this.disc.imgurl
			},
			...mapGetters([
				'disc'
			])
		},
		components: {
			MusicList
		},
		created() {
			this._getSongList()
		},
		methods: {
			_getSongList() {
				if (!this.disc.dissid) {
					this.$router.push('/recommend')
					return
				}
				const data = {
				    disstid: this.disc.dissid,
				    type: 1,
				    json: 1,
				    utf8: 1,
				    onlysong: 0,
				    platform: 'yqq',
				    hostUin: 0,
				    needNewCode: 0,
				    g_tk: 1719607427,
					inCharset: 'utf-8',
					outCharset: 'utf-8',
					notice: 0,
					format: 'json'
				  }
				axios.get('/api/getSongList', {
					params: data
				}).then((res) => {
					this.songs = this._normalizeSongs(res.data.cdlist[0].songlist)				
				})
			},
			_normalizeSongs(list) {
				let ret = []
				list.forEach((musicData) => {
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
	.slide-enter-active, .slide-leave-active
		transition: all .3s
		
	.slide-enter, .slide-leave-to
		transform: translate3d(100%, 0, 0)
</style>