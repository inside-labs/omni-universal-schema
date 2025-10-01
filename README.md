# Omni Universal Schema

Central OpenAPI 3.1 schema for Inside Labs services. This package provides a shared API schema that can be imported and used across all Inside Labs applications for consistent API definitions.

## Features

- 🎯 **Central Schema**: Single source of truth for API definitions across all services
- 📦 **NPM Package**: Easy installation via GitHub Packages
- 🔧 **TypeScript Support**: Full TypeScript definitions and helper functions
- 📚 **Swagger UI**: Built-in documentation viewer
- ✅ **Validation**: Automatic schema validation in CI/CD
- 🏷️ **Versioned**: Semantic versioning with automatic publishing

## Installation

### Prerequisites

1. Configure npm to authenticate with GitHub Packages:

```bash
# Create or edit ~/.npmrc
echo "@inside-labs:registry=https://npm.pkg.github.com" >> ~/.npmrc
```

2. Authenticate with GitHub Packages using a personal access token:

```bash
npm login --scope=@inside-labs --registry=https://npm.pkg.github.com
```

### Install the Package

```bash
# Using npm
npm install @inside-labs/omni-universal-schema

# Using yarn
yarn add @inside-labs/omni-universal-schema
```

## Usage

### Import the Schema

```typescript
// Import the entire schema
import { schema } from '@inside-labs/omni-universal-schema';

// Import specific utilities
import { 
  schema, 
  getSchemaVersion, 
  getPaths, 
  getTags,
  getSchemaComponent,
  getServers
} from '@inside-labs/omni-universal-schema';

// Use the schema
console.log('Schema version:', getSchemaVersion());
console.log('Available paths:', getPaths());
console.log('Available tags:', getTags());
```

### Example Usage in Express.js

```typescript
import express from 'express';
import { schema, getSchemaComponent } from '@inside-labs/omni-universal-schema';

const app = express();

// Use schema components for validation
const OrderSchema = getSchemaComponent('Order');

app.get('/api/schema', (req, res) => {
  res.json(schema);
});

app.get('/api/orders', (req, res) => {
  // Your orders logic here, following the schema
  res.json({
    data: [],
    pagination: {
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 0,
      hasNext: false,
      hasPrev: false
    }
  });
});
```

### Example Usage with OpenAPI Generators

```typescript
import { schema } from '@inside-labs/omni-universal-schema';
import { writeFileSync } from 'fs';

// Export schema for code generation tools
writeFileSync('api-schema.json', JSON.stringify(schema, null, 2));

// Use with openapi-generator-cli
// npx openapi-generator-cli generate -i api-schema.json -g typescript-axios -o ./src/api-client
```

## API Documentation

### View Swagger UI

The schema includes a built-in Swagger UI for easy viewing and testing:

1. Clone this repository
2. Install dependencies: `yarn install`
3. Start the documentation server: `yarn serve`
4. Open http://localhost:3000 in your browser

### Available Helper Functions

#### `getSchemaVersion(): string`
Returns the current schema version.

#### `getPaths(): string[]`
Returns an array of all available API paths.

#### `getTags(): string[]`
Returns an array of all available tags.

#### `getComponents(): object`
Returns all schema components (schemas, responses, parameters, etc.).

#### `getSchemaComponent(name: string): object`
Returns a specific schema component by name.

#### `getServers(): object[]`
Returns the list of available servers.

#### `validateSchema(): boolean`
Validates the schema structure (throws error if invalid).

## Current Schema

The schema currently includes the following endpoints:

### Orders
- `GET /orders` - List orders with filtering and pagination
- `GET /orders/{orderId}` - Get a specific order by ID

### Data Models
- **Order**: Complete order information with items, addresses, and payment details
- **OrderItem**: Individual items within an order
- **Address**: Shipping and billing address structure
- **PaginationMeta**: Standard pagination metadata
- **ErrorResponse**: Standard error response format

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/inside-labs/omni-universal-schema.git
cd omni-universal-schema

# Install dependencies
yarn install
```

### Available Scripts

```bash
# Build the TypeScript code
yarn build

# Watch mode for development
yarn dev

# Validate the OpenAPI schema
yarn validate

# Lint the OpenAPI schema
yarn lint

# Serve the Swagger UI documentation
yarn serve

# Prepare for publishing (runs validation and build)
yarn prepare
```

### File Structure

```
omni-universal-schema/
├── src/
│   ├── schema.yaml          # OpenAPI 3.1 schema definition
│   └── index.ts            # TypeScript exports and utilities
├── docs/
│   └── index.html          # Swagger UI documentation
├── dist/                   # Compiled TypeScript output
├── .github/
│   └── workflows/          # CI/CD workflows
├── package.json
├── tsconfig.json
└── README.md
```

### Making Changes

1. **Update the Schema**: Edit `src/schema.yaml` to add or modify API definitions
2. **Validate**: Run `yarn validate` to ensure the schema is valid
3. **Build**: Run `yarn build` to compile TypeScript
4. **Test**: Verify your changes work by importing the schema in a test project
5. **Document**: Update this README if you add new features or change usage

### Publishing

The package is automatically published to GitHub Packages when changes are pushed to the `main` branch. The CI/CD pipeline will:

1. Validate the schema
2. Run tests
3. Build the package
4. Bump the patch version
5. Publish to GitHub Packages
6. Commit the version bump

## Schema Standards

When contributing to the schema, please follow these guidelines:

- Use OpenAPI 3.1 specification
- Follow RESTful API conventions
- Include comprehensive descriptions for all endpoints and models
- Use consistent naming conventions (camelCase for properties)
- Include examples where helpful
- Use appropriate HTTP status codes
- Follow semantic versioning for schema changes

## Support

For questions, issues, or feature requests:

1. Check existing [GitHub Issues](https://github.com/inside-labs/omni-universal-schema/issues)
2. Create a new issue if needed
3. Contact the Inside Labs API team

## License

This project is licensed under the MIT License - see the package.json file for details.