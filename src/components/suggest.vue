<template>
	<scroll ref="suggest" class="suggest" :data="result" :pullup="pullup" @scrollToEnd="searchMore" :beforeScroll="beforeScroll" @beforeScroll="listScroll">
		<ul class="suggest-list">
			<li @click="selectItem(item)" class="suggest-item" v-for="item in result">
				<div class="icon">
					<i :class="getIconCls(item)"></i>
				</div>
				<div class="name">
					<p class="text" v-html="getDisplayName(item)"></p>
				</div>
			</li>
			<loading v-show="hasMore"></loading>
		</ul>
		<div v-show="!hasMore && !result.length" class="no-result-wrapper">
			<no-result title="抱歉，暂无搜索结果"></no-result>
		</div>
	</scroll>
</template>

<script type="text/javascript">
	import {search} from '@/api/search'
	import {createSong} from '@/assets/js/song'
	import Scroll from './scroll'
	import Loading from '@/components/loading'
	import Singer from '@/assets/js/singer'
	import {mapMutations, mapActions} from 'vuex'
	import NoResult from '@/components/no-result'

	const TYPE_SINGER = 'singer'
	const perpage = 20
	export default {
		components: {
			Scroll,
			Loading,
			NoResult
		},
		props: {
			query: {
				type: String,
				default: ''
			},
			showSinger: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				page: 1,
				result: [],
				pullup: true,
				hasMore: true,
				beforeScroll: true
			}
		},
		methods: {
			...mapMutations({
				setSinger: 'SET_SINGER'
			}),
			...mapActions([
				'insertSong'
			]),
			listScroll() {
				this.$emit('listScroll')
			},
			selectItem(item) {
				if (item.type === TYPE_SINGER) {
					const singer = new Singer({
						id: item.singermid,
						name: item.singername
					})
					this.$router.push({
						path: `/search/${singer.id}`
					})
					this.setSinger(singer)
				} else {
					this.insertSong(item)
				}
				this.$emit('select')
			},
			refresh() {
				this.$refs.suggest.refresh()
			},
			search() {
				this.page = 1
				this.hasMore = true
				this.$refs.suggest.scrollTo(0, 0)
				search(this.query, this.page, this.showSinger, perpage).then((res) => {
					if (res.code === 0) {
						this.result = this._genResult(res.data)
						this.checkMore(res.data)
					}
				})
			},
			searchMore() {
				if (!this.hasMore) {
					return
				}
				this.page++
				search(this.query, this.page, this.showSinger, perpage).then((res) => {
					if (res.code === 0) {
						this.result = this.result.concat(this._genResult(res.data))
						this.checkMore(res.data)
					}
				})
			},
			checkMore(data) {
				const song = data.song
				if (!song.list.length || (song.curnum + song.curpage * perpage) >= song.totalnum) {
					this.hasMore = false
				}
			},
			_genResult(data) {
				let ret = []
				if (data.zhida && data.zhida.singerid) {
					ret.push({...data.zhida, ...{type: TYPE_SINGER}})
				}
				if (data.song) {
					ret = ret.concat(this._normalizeSongs(data.song.list))
				}
				return ret
			},
			getIconCls(item) {
				if (item.type === TYPE_SINGER) {
					return 'icon-mine'
				}else {
					return 'icon-music'
				}
			},
			getDisplayName(item) {
				if (item.type === TYPE_SINGER) {
					return item.singername
				}else {
					return `${item.name}-${item.singer}`
				}
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
		},
		watch: {
			query() {
				this.search()
			}
		}
	}
</script>

<style lang="stylus">
	@import "~@/assets/stylus/variable"
	@import "~@/assets/stylus/mixin"
	
	.suggest
		height: 100%
		overflow: hidden
		.suggest-list
			padding: 0 30px
			.suggest-item
				display: flex
				align-items: center
				padding-bottom: 20px
			.icon
				flex: 0 0 30px
				width: 30px
				[class^="icon-"]
					font-size: 14px
					color: $color-text-d
			.name
				flex: 1
				font-size: $font-size-medium
				color: $color-text-d
				overflow: hidden
				.text
					no-wrap()
		.no-result-wrapper
			position: absolute
			width: 100%
			top: 50%
			transform: translateY(-50%)
</style>