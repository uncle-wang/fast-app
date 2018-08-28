import nativeApi from './nativeapi';

const apis = {

	...nativeApi,
	/**
	 * 获取网络状态
	 * @return {String}
	 */
	getNetworkType: () => {

		return nativeJs.getNetworkType();
	},

	/**
	 * 设置屏幕方向
	 * @param {int} [direction] [设置屏幕方向, 0-横屏 1-竖屏 2-自动旋转]
	 */
	setOrientation: (direction) => {

		nativeJs.setScreenOrientation(direction);
	},

	/**
	 * 禁止手机休眠
	 */
	suspendSleep: () => {

		nativeJs.suspendSleep();
	},

	/**
	 * 震动
	 */
	vibration: () => {

		nativeJs.vibration();
	},

	/**
	 * 登录
	 * @param {bool} [refresh] [是否刷新页面，默认false]
	 */
	startLogin: (refresh = false) => {

		nativeJs.doStartLogin(refresh);
	},

	/**
	 * 获取imei
	 */
	getImei: () => {

		return nativeJs.getImei();
	},

	/**
	 * 获取用户信息
	 */
	getUserInfo: () => {

		const info = nativeJs.getLoginInfo();
		return JSON.parse(info);
	},

	/**
	 * 判断登录状态
	 */
	isLogin: () => {

		return nativeJs.isLogin();
	},

	/**
	 * 判断应用是否安装
	 * @param {string} [packagename] [app包名]
	 */
	isInstalled: (packagename) => {

		return nativeJs.isInstalled(packagename);
	},

	/**
	 * 重新登录
	 */
	reLogin: () => {

		nativeJs.reLoginAccount();
	},

	/**
	 * 全局事件注册
	 * @param {string} [cmd] [事件名称]
	 * @param {function} [callback] [回调函数]
	 */
	bind: (cmd, callback) => {

		nativeApi.bind(cmd, callback);
	},
};

export default apis;
