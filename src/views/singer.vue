<template>
	<div class="singer" ref="singer">
		<list-view @select="selectSinger" :data='singers' ref='list'></list-view>
		<router-view></router-view>
	</div>
</template>

<script type="text/javascript">
	import {getSingerList} from '@/api/singer'
	import {State_OK} from '@/api/config'
	import Singer from '@/assets/js/singer'
	import ListView from '@/components/listview'
	import {mapMutations} from 'vuex'
	import {playlistMixin} from '@/assets/js/mixin'

	const HOT_NAME = '热门'
	const HOT_SINGER_lEN = 10

	export default {
		mixins: [playlistMixin],
		data() {
			return {
				singers: []
			}
		},
		created() {
			this._getSingerList()
		},
		components: {
			ListView
		},
		methods: {
			handlePlaylist(playList) {
				const bottom = playList.length > 0 ? '60px': ''
				this.$refs.singer.style.bottom = bottom
				this.$refs.list.refresh()
			},
			selectSinger(singer) {
				this.$router.push({
					path: `/singer/${singer.id}`
				})
				this.setSinger(singer)
			},
			_getSingerList() {
				getSingerList().then((res) => {
					if (res.code === State_OK) {
						this.singers = this._normalizeSinger(res.data.list)
					}
				})
			},
			_normalizeSinger(list) {
				let map = {
					hot: {
						title: HOT_NAME,
						items: []
					}
				}
				list.forEach((item, index) => {
					if (index < HOT_SINGER_lEN) {
						map.hot.items.push(new Singer({
							id: item.Fsinger_mid,
							name: item.Fsinger_name,
						}))
					}
					const key = item.Findex
					if (!map[key]) {
						map[key] = {
							title: key,
							items: []
						}
					}
					map[key].items.push(new Singer({
						id: item.Fsinger_mid,
						name: item.Fsinger_name
					}))
				})

				let hot = []
				let ret = []
				for (let key in map) {
					let val = map[key]
					if (val.title.match(/[a-zA-Z]/)) {
						ret.push(val)
					} else if (val.title === HOT_NAME) {
						hot.push(val)
					}
				}
				ret.sort((a, b) => {
					return a.title.charCodeAt(0) - b.title.charCodeAt(0)
				})
				return hot.concat(ret)
			},
			...mapMutations({
				setSinger: 'SET_SINGER'
			})
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.singer
		position: fixed
		top: 88px
		bottom: 0
		width: 100%
</style>