import jsonp from '@/assets/js/jsonp'
import {commonParams, options} from './config'

export function getSingerList() {
	const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
	const data = Object.assign({}, commonParams, {
		channel: 'singer',
		page: 'list',
		key: 'all_all_all',
		pagesize: 100,
		pagenum: 1,
		hostUin: 0,
		needNewCode: 0,
		platform: 'yqq',
		g_tk: 1664029744
	})
	return jsonp(url, data, options)
}

export function getSingerDetail(singerId) {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

	const data = Object.assign({}, commonParams, {
		hostUin: 0,
		needNewCode: 0,
		platform: 'yqq',
		order: 'listen',
		begin: 0,
		num: 100,
		songstatus: 1,
		singermid: singerId,
		g_tk: 1664029744
	})

	return jsonp(url, data, options)
}

export function getTopList() {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
	const data = Object.assign({}, commonParams, {
		platform: 'h5',
		needNewCode: 1
	})
	return jsonp(url, data, options)
}

export function getMusicList(topid) {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

	const data = Object.assign({}, commonParams, {
		topid,
		page: 'detail',
		type: 'top',
		tpl: 3,
		platform: 'h5',
		needNewCode: 1,
	})

	return jsonp (url, data, options)
}