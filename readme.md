# serde-fns

![test](https://github.com/ehmpathy/serde-fns/workflows/test/badge.svg)
![publish](https://github.com/ehmpathy/serde-fns/workflows/publish/badge.svg)

simple shapes and procedures for serde with a pit-of-success

# install

```sh
npm install serde-fns
```

# use

for example

```ts
import { isSerialJSON, SerialJSON } from 'serde-fns';

const words = '{"hello":"world"}';
const isValid = isSerialJSON.assess(words);
const json: SerialJSON = isSerialJSON.assure(words);
const obj = deSerialJSON(json)
```
