import "@testing-library/jest-dom";

const v8 = require("v8") as typeof import("v8");
global.structuredClone = <T>(val: T): T => v8.deserialize(v8.serialize(val)) as T;
