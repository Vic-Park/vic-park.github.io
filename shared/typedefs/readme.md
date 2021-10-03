# JSON Typedefs

## Why use JSON Typedefs?

JSON Typedefs (JTD) are a solution to the following list of needs:

1. Object validation: for example, when parsing the Google Sheet and creating the entry objects, if a row is empty, we don't want it to break our website when we try and access an undefined property.
2. TypeScript Typings: To make developing easier, we want to have adequate TypeScript support with the entry types.
3. Reduce unnecessary effort: instead of implementing our own custom validator, ensuring that the TypeScript types are in sync with the validators, etc., it's better to use a standardized way of solving all these problems that only rely on one source of truth.

The alternative to JSON Typedefs is JSON Schema, but JSON Schema is very verbose (especially when it comes to required properties) and it's also very complex. JSON Typedef is a very simple format that beginners can learn in less than 5 minutes.

Unfortunately, to generate TypeScript typings (i.e. for `pnpm gen-types` to work), you'll need to manually install `jtd-codegen`. Luckily, the installation process is very straight-forward.

[Install JSON Codegen](https://jsontypedef.com/docs/jtd-codegen/#installing-jtd-codegen)

[Learn JSON Typedefs in 5 minutes](https://jsontypedef.com/docs/jtd-in-5-minutes/)

**Note:** We're using YAML to write our JSON Typedefs because YAML supports comments and is a more human-readable format. Since `jtd-codegen` doesn't natively support YAML, we convert the YAML to JSON right before generating the TypeScript types (see the TypeScript generation script at `scripts/gen-types.ts`).
