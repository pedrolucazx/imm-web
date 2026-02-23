import "@testing-library/jest-dom";

// Chakra UI v3 uses structuredClone internally; JSDOM 26 does not expose it.
// We provide a v8-backed implementation so serialization behaves correctly.
const v8 = require("v8") as typeof import("v8");
global.structuredClone = <T>(val: T): T => v8.deserialize(v8.serialize(val)) as T;
