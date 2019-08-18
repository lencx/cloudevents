# Cloudevents

* [CloudEvents](https://github.com/cloudevents)

```bash
yarn

# dev
# or `npm run dev`
yarn dev

# A Binary One
curl -X POST \
-d'{"a": 1, "b": 2}' \
-H'ce-specversion:0.3' \
-H'ce-type:com.github.pull.create' \
-H'ce-source:https://github.com/cloudevents/spec/pull/123' \
-H'ce-id:45c83279-c8a1-4db6-a703-b3768db93887' \
-H'ce-time:2019-06-21T17:31:00Z' \
http://localhost:8080/node/event
```

## ⚙️ Config

```js
// config/env/*.js: [dev, prd, ...]
module.exports = {
  api: {
    event: 'http://xxx.xxx.xxx',
  }
}
```

## 🔮 Feature

* proposal-optional-chaining
* format data: `/app/format/*`
