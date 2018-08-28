import {compatible} from './tools';
import api from './api';
if (compatible()) {
	window.Platform = api;
}
