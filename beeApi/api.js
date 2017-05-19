var router = require('koa-router')();
var request = require('request');
var config = require('../config/config');
var device = require('../config/server.json')['device'];
router.get('/:route/:api', async function (ctx, next) {
	let beeconfig;
	let beeApi;
	if (device === 'DEV') {
			beeconfig = config['beeTestDB'];
	 } else {
		 	beeconfig = config['beeDB'];
	 }
	let headers =  {
		'X-LC-Id': beeconfig['appId'],
		'X-LC-Key': beeconfig['appKey'],
	}

	beeApi = config['beeApi'][ctx.params.api];
	if(ctx.params.api == 'detail') {
		beeApi = `${beeApi}${ctx.query.objectId}`;
	}
	let options = {
		method: 'get',
		uri: beeApi,
		headers
	}
	var data;
	try {
		data = await getData(options);
	} catch(err) {
		console.error(err);
	}
	data = data  && JSON.parse(data);
	ctx.status = 200;
	ctx.body = data;
})

function getData(options) {
	return new Promise((resolve, reject) => {
		request(options, (err, res, body) => {
			if(err) {
				reject(err);
			} else {
				resolve(body)
			}
		})
	})
}
module.exports = router;
