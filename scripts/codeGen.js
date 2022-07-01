const { AsyncGenerator, loadRemoteSchema } = require("graphql-ts-client-codegen");
const path = require("path");

const generator = new AsyncGenerator({
  schemaLoader: async () => {
    return loadRemoteSchema("http://localhost:8545/graphql");
  },
  targetDir: path.join(__dirname, "../src/__generated"),
  scalarTypeMap: {
      "Bytes32": "string",
      "Address": "string",
      "BigInt": "string",
      "Bytes": "string"
  }
});

generator.generate();