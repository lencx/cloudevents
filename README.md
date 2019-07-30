# Cloudevents

* [CloudEvents](https://github.com/cloudevents)

```bash
yarn

# dev
# or `npm run dev`
yarn dev

# A Binary One
curl -X POST \
-d'{"aa": 1, "bb": 2}' \
-H'ce-specversion:0.2' \
-H'ce-type:com.github.pull.create' \
-H'ce-source:https://github.com/cloudevents/spec/pull/123' \
-H'ce-id:45c83279-c8a1-4db6-a703-b3768db93887' \
-H'ce-time:2019-06-21T17:31:00Z' \
http://localhost:8080/node/event
```

## 规范

* `/app/format`中存放对应事件的数据处理逻辑，返回处理后的结果(文件名与事件类型或扩展参数一一对应)
