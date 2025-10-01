# Omni Universal Schema

Central OpenAPI 3.1 schema for Inside Labs services. A shared API schema that can be imported and used across all Inside Labs applications.

## Installation

Configure authentication for GitHub Packages:

```bash
# Add to ~/.npmrc or .yarnrc.yml
echo "@inside-labs:registry=https://npm.pkg.github.com" >> ~/.npmrc
```

Install the package:

```bash
npm install @inside-labs/omni-universal-schema
# or
yarn add @inside-labs/omni-universal-schema
```

## Usage

```typescript
import { schema, getSchemaVersion, getPaths } from '@inside-labs/omni-universal-schema';

console.log('Schema version:', getSchemaVersion());
console.log('Available paths:', getPaths());
```

## Development

```bash
# Setup
git clone https://github.com/inside-labs/omni-universal-schema.git
cd omni-universal-schema
yarn install

# Available commands
yarn build      # Build TypeScript
yarn validate   # Validate OpenAPI schema
yarn serve      # Start Swagger UI (http://localhost:3000)
```

## Publishing

Packages are automatically published to GitHub Packages when pushed to `main`. Manual publishing requires proper `.yarnrc.yml` configuration with authentication token.

## Current Schema

- **Orders API**: List and retrieve orders with pagination
- **Data Models**: Order, OrderItem, Address, PaginationMeta, ErrorResponse

## License

MIT
