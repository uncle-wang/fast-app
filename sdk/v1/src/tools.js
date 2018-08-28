/**
 * 检查sdk与app版本是否兼容
 * @param minVersion {int} [sdk所需的最低app版本]
 * @return {bool}
 */
const compatible = (minVersion) => {

	const platformVersion = nativeJs.getVersionCode();
	if (platformVersion < minVersion) {
		alert('版本过低，即将执行requestUpdate');
		nativeJs.requestUpdate();
		return false;
	}
	return true;
};

/**
 * 生成一个不重复的id
 * @return {string}
 */
const getUniqueId = () => {
	let d = new Date().getTime();
	const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		const r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return uuid;
};

export {compatible, getUniqueId};
