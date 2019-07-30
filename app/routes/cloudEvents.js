const Unmarshaller02 = require("cloudevents-sdk/http/unmarshaller/v02");
const fetch = require('../utils/fetch');

const unmarshaller = new Unmarshaller02();

module.exports = (app, config) => app.post('/node/event', async (ctx, next) => {
  // console.log(ctx.request);
  // console.log(JSON.stringify(ctx));
  const { request } = ctx;
  // console.log(request.body)

  // fix: axios content-type not working
  if (!request.header['Content-Type']) request.header['Content-Type'] = 'application/json';
  // fix: invalid json response body at...
  if (request.header.host) delete request.header.host;

  await unmarshaller.unmarshall(request.body, request.header)
    .then(async cloudevent => {
      console.log('=========== start =============');
      console.info(config.api.event);
      console.info('header: ', JSON.stringify(request.header));
      console.info('cloudevent: ', JSON.stringify(cloudevent.format()));
      console.log('=========== end =============');
      // console.log(JSON.stringify(cloudevent.format(), null, 2), request.header);
      const cloudEventData = cloudevent.format();
      const data = await fetch(config.api.event, {
        method: 'POST',
        headers: request.header,
        body: JSON.stringify(cloudEventData),
      })
      // 根据事件类型返回所需数据
      // 如果需要对事件中的数据格式进行额外处理，可以通过`ce-my-extension`添加额外的数据处理
      // `ce-my-extension`值对应`/app/format`中的处理数据文件名
      // cool: event type mapping file name
      const filename = cloudEventData['my-extension'] || cloudEventData['type'];
      // 返回数据如果不需要处理则直接返回
      let _d = data;
      try {
        _d = require(`../format/${filename}`)(data);
      } catch (e) {}
      ctx.body = _d;
    })
    .catch(err => {
      // console.error('Error: ', err);
      ctx.body = {
        code: 20099,
        message: err || 'Event format error',
      }
    });
  await next();
})

/*
curl -X POST \
-d '{"specversion":"0.2","type":"com.github.pull.create","source":"https://github.com/cloudevents/spec/pull/123","id":"45c83279-c8a1-4db6-a703-b3768db93887","time":"2019-06-21T17:31:00Z","contenttype":"application/json","data":{"much":"wow"}}' \
-H 'Content-Type:application/cloudevents+json' http://localhost:9000/event
*/


// body: JSON.stringify({
//   "specversion" : "0.4-wip",
//   "type" : "getProductInfo",
//   "source" : "https://github.com/cloudevents/spec/pull",
//   "subject" : "123",
//   "id" : "A234-1234-1234",
//   "time" : "2018-04-05T17:31:00Z",
//   "comexampleextension1" : "value",
//   "comexampleextension2" : {
//       "othervalue": 5
//   },
//   "datacontenttype" : "text/xml",
//   "data" : "<much wow=\"xml\"/>"
// }),