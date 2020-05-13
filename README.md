# as-base64
Base64 encoder / decoder for AssemblyScript.

Adapted from https://gist.github.com/Juszczak/63e6d9e01decc850de03


# Usage

```ts
import { encode, decode } from "as-base64";

const input = "c29tZSBzdHJpbmc=";

assert(input = enocde(decode(input));
```
