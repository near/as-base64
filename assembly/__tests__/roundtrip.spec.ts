import { encode, decode } from '..';


function roundtripTest(inputString: string): void {
  const inputBuf = String.UTF8.encode(inputString);
  const input = inputBuf.byteLength > 0 ? Uint8Array.wrap(inputBuf) : new Uint8Array(0);
  expect(String.UTF8.decode(decode(encode(input)).buffer)).toBe(inputString);
}

describe("Round trip", () => {
  it("should handle empty object", () => {
    roundtripTest("{}");
  });

  it("should handle int32", () => {
    roundtripTest('{"int":4660}');
  });

  it("should handle int32Sign", () => {
    roundtripTest('{"int":-4660}');
  });

  it("should handle true", () => {
    roundtripTest('{"val":true}');
  });

  it("should handle false", () => {
    roundtripTest('{"val":false}');
  });

  it("should handle null", () => {
    roundtripTest('{"val":null}');
  });

  it("should handle string", () => {
    roundtripTest('{"str":"foo"}');
  });

  it("should handle string escaped", () => {
    roundtripTest(
      '"\\"\\\\\\/\\n\\t\\b\\r\\t"');
  });

  it("should handle string unicode escaped simple", () => {
    roundtripTest('"\\u0022"');
  });

  it("should handle string unicode escaped", () => {
   roundtripTest('"Полтора Землекопа"');
   
  });

  it("should multiple keys", () => {
    roundtripTest('{"str":"foo","bar":"baz"}');
  });

  it("should handle nested objects", () => {
    roundtripTest('{"str":"foo","obj":{"a":1,"b":-123456}}');
  });

  it("should handle empty array", () => {
    roundtripTest("[]");
  });

  it("should handle array", () => {
    roundtripTest("[1,2,3]");
  });

  it("should handle nested arrays", () => {
    roundtripTest("[[1,2,3],[4,[5,6]]]");
  });

  it("should handle nested objects and arrays", () => {
    roundtripTest('{"str":"foo","arr":[{"obj":{"a":1,"b":-123456}}]}');
  });

  it("should handle whitespace", () => {
    roundtripTest(' { "str":"foo","obj": {"a":1, "b" :\n -123456} } ');
  });
});

function testBase64(original: string, expectedEncoding: string): void {
  let bytes = String.UTF8.encode(original);
  let encoded = encode(Uint8Array.wrap(bytes));
  expect<string>(encoded).toBe(expectedEncoding);
  let decoded = decode(encoded);
  expect<string>(String.UTF8.decode(decoded.buffer)).toBe(original);
}


describe('base64 encoding/decoding', (): void => {
  it('hello world', (): void => {
      testBase64('hello, world', 'aGVsbG8sIHdvcmxk');
  });

  it('test pad 1', (): void => {
      testBase64('some string', 'c29tZSBzdHJpbmc=');
  });

  it('test pad 2', (): void => {
      testBase64('some long string', 'c29tZSBsb25nIHN0cmluZw==');
  });

  it('test invalid', (): void => {
      const encoded = "eyJuYW1lIjogIlR3aW4gRmxhbWVzICM0OS4gQWx5c29uICYgQ291cnRuZXkgQWxpYW5vIiwiaW1hZ2UiOiAiaHR0cHM6Ly9hcndlYXZlLm5ldC9vMDhSUVBTTnNoSzYybmNFc0NsRjRpWjNiMVpKYnRCSFdMTU54NVhfVFI0IiwiYWx0X2ltYWdlIjogImh0dHBzOi8vaXBmcy5pby9pcGZzL1FtTm1rdGNuMmRuQU5KaTI1Z0ZpYndtRVZ2ZVNZU3NBaGdLN01Ld1dBSnoyZXYiLCJkZXNjcmlwdGlvbiI6ICJUaXRsZTogQWx5c29uICYgQ291cnRuZXkgQWxpYW5vXG5cbkFydGlzdDogSnVzdGluIEF2ZXJzYW5vXG5cbk1lZGl1bTogQy00MSBQaG90b2dyYXBoaWMgUHJpbnRcblxuRGltZW5zaW9uczogMTbigJ0geCAyMOKAnVxuXG5QcmljZTogJDEsMDAwXG5cbkVkaXRpb246IDFcLzFcblxuWWVhcjogMjAxOFxuXG5BZGRpdGlvbmFsIEluZm9ybWF0aW9uOiBUd2lucyBhcmUgdGhvdWdodCB0byBicmluZyBsdWNrIHRvIHRob3NlIHdobyBzZWUgdGhlbSBhbmQgdG91Y2ggdGhlbSwgYW5kIHRoZXkgYXJlIHNob3dlcmVkIHdpdGggZ2lmdHMgYW5kIG1vbmV5IGZyb20gc3RyYW5nZXJzLiBUaGV5IGFyZSByZWdhcmRlZCBhcyBiZWFyZXJzIG9mIGhhcHBpbmVzcywgZ29vZCBsdWNrIGFuZCByaWNoZXMgZm9yIHRoZWlyIHBhcmVudHMsIGJ1dCBhbHNvIGFzIGZhbWlsaWFycyBvZiB0aGUgZ29kcywgd2l0aCBleHRyYW9yZGluYXJ5IHBvd2Vycy4iLCJwb3dlcmVkQnkiOiJodHRwczovL3d3dy5uYW1lbGVzcy5pby8ifQ,";
      let decoded = decode(encoded);
      expect(decoded).toStrictEqual(new Uint8Array(0))
  });
});