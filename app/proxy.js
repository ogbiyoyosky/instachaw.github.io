'use strict';

const isInDevelopmentMode = process.env.NODE_ENV !== 'production';

const localServerUrl = 'http://localhost:3333/api/';
const remoteServerUrl = 'http://localhost:3333/api/';

const target = isInDevelopmentMode ? localServerUrl: remoteServerUrl;

export default devProxy = {
	'/api': {
		target,
		pathRewrite: { '^/api': '/' },
		changeOrigin: true
	}
}