<template>
	<div class="search">
		<div class="search-box-wrapper">
			<search-box ref="searchBox" @query="onQueryChange"></search-box>
		</div>
		<div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
			<scroll :refreshDelay="refreshDelay" ref="shortcut" class="shortcut" :data="shortcut">
				<div>
					<div class="hot-key">
						<h1 class="title">热门搜索</h1>
						<ul>
							<li @click="addQuery(item.k)" class="item" v-for="item in hotKey">
								<span>{{item.k}}</span>
							</li>
						</ul>
					</div>
					<div class="search-history" v-show="searchHistory.length">
						<h1 class="title">
							<span class="text">历史</span>
							<span class="clear" @click="showConfirm">
								<i class="icon-clear"></i>
							</span>
						</h1>
						<search-list @delete="deleteOne" @select="addQuery" :searches="searchHistory"></search-list>
					</div>
				</div>
			</scroll>
		</div>
		<div ref="searchResult" class="search-result" v-show="query">
			<suggest ref="suggest" @select="saveSearch" @listScroll="blurInput" :query="query"></suggest>
		</div>
		<confirm ref="confirm" text="确定清空所有纪录吗?" confirmBtnText="确定" @confirm="clearAll"></confirm>
		<router-view></router-view>
	</div>
</template>

<script type="text/javascript">
	import SearchBox from '@/components/search-box'
	import {getHotKey} from '@/api/search'
	import Suggest from '@/components/suggest'
	import {mapActions, mapGetters} from 'vuex'
	import SearchList from '@/components/search-list'
	import Confirm from "@/components/confirm"
	import Scroll from "@/components/scroll"
	import {playlistMixin} from "@/assets/js/mixin"

	export default {
		mixin: [playlistMixin],
		data() {
			return {
				hotKey: [],
				query: '',
				refreshDelay: 100
			}
		},
		components: {
			SearchBox,
			Suggest,
			SearchList,
			Confirm,
			Scroll
		},
		created() {
			this._getHotKey()
		},
		watch: {
			query(newQuery) {
				if (!newQuery) {
					setTimeout(()=>{
						this.$refs.shortcut.refresh()
					}, 20)
				}
			}
		},
		computed: {
			...mapGetters(['searchHistory']),
			shortcut() {
				return this.hotKey.concat(this.searchHistory)
			}
		},
		methods: {
			...mapActions(['saveSearchHistory', 'deleteSearchHistory', 'clearSearchHistory']),
			blurInput() {
				this.$refs.searchBox.blur()
			},
			_getHotKey() {
				getHotKey().then((res) => {
					if (res.code === 0) {
						this.hotKey = res.data.hotkey.slice(0, 10)
					}
				})
			},
			addQuery(query) {
				this.$refs.searchBox.setQuery(query)
			},
			onQueryChange(query) {
				this.query = query
			},
			saveSearch() {
				this.saveSearchHistory(this.query)
			},
			deleteOne(item) {
				this.deleteSearchHistory(item)
			},
			clearAll() {
				this.clearSearchHistory()
			},
			showConfirm() {
				this.$refs.confirm.show()
			},
			handlePlaylist(playlist) {
				const bottom = playlist.length > 0 ? '60px' : ''
				this.$refs.shortcutWrapper.style.bottom = bottom
				this.$refs.shortcut.refresh()
				this.$refs.searchResult.style.bottom = bottom
				this.$refs.suggest.refresh()
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "~@/assets/stylus/variable"
	@import "~@/assets/stylus/mixin"

	.search
		.search-box-wrapper
			margin: 20px
		.shortcut-wrapper
			position: fixed
			top: 178px
			bottom: 0
			width: 100%
			.shortcut
				height: 100%
				overflow: hidden
				.hot-key
					margin: 0 20px 20px 20px
					.title
						margin-bottom: 20px
						font-size: $font-size-medium
						color: $color-text-l
					.item
						display: inline-block
						padding: 5px 10px
						margin: 0 20px 10px 0
						border-radius: 6px
						background: $color-highlight-background
						font-size: $font-size-medium
						color: $color-text-d
				.search-history
					position: relative
					margin: 0 20px
					.title
						display: flex
						align-items: center
						height: 40px
						font-size: $font-size-medium
						color: $color-text-l
						.text
							flex: 1
						.clear
							extend-click()
							.icon-clear
								font-size: $font-size-medium
								color: $color-text-d
		.search-result
			position: fixed
			width: 100%
			top: 178px
			bottom: 0
</style>