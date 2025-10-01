import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

// Using CommonJS __dirname which is available in our target environment

/**
 * The OpenAPI schema as a JavaScript object
 */
export interface OpenAPISchema {
  openapi: string;
  info: {
    title: string;
    description: string;
    version: string;
    contact?: {
      name?: string;
      url?: string;
      email?: string;
    };
    license?: {
      name: string;
      url?: string;
    };
  };
  servers?: Array<{
    url: string;
    description?: string;
  }>;
  paths: Record<string, any>;
  components?: {
    schemas?: Record<string, any>;
    responses?: Record<string, any>;
    parameters?: Record<string, any>;
    securitySchemes?: Record<string, any>;
  };
  security?: Array<Record<string, any>>;
  tags?: Array<{
    name: string;
    description?: string;
  }>;
}

/**
 * Load the OpenAPI schema from YAML file
 */
function loadSchema(): OpenAPISchema {
  const schemaPath = path.join(__dirname, 'schema.yaml');
  
  try {
    const schemaContent = fs.readFileSync(schemaPath, 'utf8');
    const parsedSchema = yaml.load(schemaContent) as OpenAPISchema;
    
    if (!parsedSchema) {
      throw new Error('Failed to parse schema YAML');
    }
    
    return parsedSchema;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to load schema: ${error.message}`);
    }
    throw new Error('Failed to load schema: Unknown error');
  }
}

/**
 * The OpenAPI schema as a JavaScript object
 * This is loaded once when the module is imported
 */
export const schema: OpenAPISchema = loadSchema();

/**
 * Get the schema version
 */
export const getSchemaVersion = (): string => schema.info.version;

/**
 * Get all available paths from the schema
 */
export const getPaths = (): string[] => Object.keys(schema.paths);

/**
 * Get all available tags from the schema
 */
export const getTags = (): string[] => 
  schema.tags?.map(tag => tag.name) || [];

/**
 * Get all schema components
 */
export const getComponents = () => schema.components;

/**
 * Get a specific schema component by name
 */
export const getSchemaComponent = (name: string) => 
  schema.components?.schemas?.[name];

/**
 * Get server URLs
 */
export const getServers = () => schema.servers || [];

/**
 * Validate that the schema is a valid OpenAPI 3.1 schema
 */
export const validateSchema = (): boolean => {
  if (!schema.openapi) {
    throw new Error('Missing openapi version');
  }
  
  if (!schema.openapi.startsWith('3.1')) {
    throw new Error('Schema must be OpenAPI 3.1');
  }
  
  if (!schema.info || !schema.info.title || !schema.info.version) {
    throw new Error('Missing required info fields');
  }
  
  if (!schema.paths) {
    throw new Error('Missing paths');
  }
  
  return true;
};

// Validate schema on import
validateSchema();

/**
 * Export the schema as the default export for convenience
 */
export default schema;

// OpenAPISchema interface is already exported above
