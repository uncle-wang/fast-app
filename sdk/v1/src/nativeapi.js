import {getUniqueId} from './tools';

// 回调池
let callbackPools = {};
// 全局事件，目前只支持 'onRecvMsg'
let cmdCallback = {};

const callNativeApi = ({cmd, commandId, params = {}}) => {

	if (commandId) {
		params.commandId = commandId;
	}
	nativeJs.callNativeApi(cmd, JSON.stringify(params));
};

const apis = {

	/**
	 * 就绪，可以开始
	 * @param {function} [callback] [开始游戏业务的回调]
	 */
	ready: (callback) => {
		const commandId = getUniqueId();
		callbackPools[commandId] = callback;
		callNativeApi({cmd: 'game.ready', commandId});
	},
	/**
	 * 请求数据
	 */
	requestGameinfo: (callback) => {
		const commandId = getUniqueId();
		callbackPools[commandId] = callback;
		callNativeApi({cmd: 'game.infoReq', commandId});
	},
	/**
	 * 展示广告
	 * @param {function} [callback] [用户关闭广告的回调]
	 */
	showAds: (callback) => {
		if (callback) {
			const commandId = getUniqueId();
			callbackPools[commandId] = callback;
			callNativeApi({cmd: 'ads.show', commandId});
		}
		else {
			callNativeApi({cmd: 'ads.show'});
		}
	},
	/**
	 * 请求广告
	 * @param {function} [callback] [请求广告的回调]
	 */
	requestAds: (callback) => {
		if (callback) {
			const commandId = getUniqueId();
			callbackPools[commandId] = callback;
			callNativeApi({cmd: 'ads.req', commandId});
		}
		else {
			callNativeApi({cmd: 'ads.req'});
		}
	},
	/**
	 * 广播
	 */
	broadcast: (data) => {
		callNativeApi({cmd: 'game.broadcast'});
	},
	/**
	 * 结束游戏并发送结束数据
	 */
	finishRequest: (data, callback) => {
		if (callback) {
			const commandId = getUniqueId();
			callbackPools[commandId] = callback;
			callNativeApi({cmd: 'game.finishReq', commandId});
		}
		else {
			callNativeApi({cmd: 'game.finishReq'});
		}
	},
	/**
	 * 强制退出
	 */
	forceQuit: () => {
		callNativeApi({cmd: 'game.forceQuit'});
	},
	/**
	 * 全局事件注册
	 */
	bind: (cmd, callback) => {
		if (callback) {
			if (cmd === 'onRecvMsg') {
				cmdCallback[cmd] = callback;
			}
		}
	},
};

window.__bp = {
	msgChannel: {
		onRecv: (cmd, params) => {
			const data = JSON.parse(params);
			const {commandId} = data;
			let callback;
			if (cmdCallback[cmd]) {
				callback = cmdCallback[cmd];
			}
			else {
				delete data['commandId'];
				if (callbackPools[commandId]) {
					callback = callbackPools[commandId];
				}
			}
			callback && callback(data);
		},
	}
};

export default apis;
