import { type OpenAPIV3_1 as Source } from 'openapi-types';

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#callback-object
 */
export type CallbackObject = Record<string, PathItemObject> | ReferenceObject;

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#components-object
 */
export type ComponentsObject = {
  callbacks?: Record<string, Exclude<CallbackObject, ReferenceObject>>
  examples?: Record<string, Exclude<ExampleObject, ReferenceObject>>
  headers?: Record<string, Exclude<HeaderObject, ReferenceObject>>
  links?: Record<string, Exclude<LinkObject, ReferenceObject>>
  parameters?: Record<string, Exclude<ParameterObject, ReferenceObject>>
  pathItems?: Record<string, Exclude<PathItemObject, ReferenceObject>>
  requestBodies?: Record<string, Exclude<RequestBodyObject, ReferenceObject>>
  responses?: Record<string, Exclude<ResponseObject, ReferenceObject>>
  schemas?: Record<string, Exclude<SchemaObject, ReferenceObject>>
  securitySchemes?: Record<string, Exclude<SecuritySchemeObject, ReferenceObject>>
} & CustomProperties;

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#contact-object
 */
export type ContactObject = Source.ContactObject & CustomProperties;

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#discriminator-object
 */
export type DiscriminatorObject = Source.DiscriminatorObject & CustomProperties;

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#encoding-object
 */
export type EncodingObject = Source.EncodingObject & CustomProperties & {
  headers?: Record<string, HeaderObject>
};

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#example-object
 */
export type ExampleObject = (Source.ExampleObject & CustomProperties) | ReferenceObject;

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#external-documentation-object
 */
export type ExternalDocumentationObject = Source.ExternalDocumentationObject & CustomProperties;

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#header-object
 */
export type HeaderObject = ((ContentHeaderObject | SchemaHeaderObject) & CustomProperties) | ReferenceObject;
type ContentHeaderObject = Omit<Source.HeaderObject, 'content' | 'examples' | 'schema'> & {
  content?: Record<string, MediaTypeObject>
  examples?: Record<string, ExampleObject>
};
type SchemaHeaderObject = Omit<Source.HeaderObject, 'content' | 'examples' | 'schema'> & {
  examples?: Record<string, ExampleObject>
  schema?: SchemaObject
};

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#info-object
 */
export type InfoObject = Omit<Source.InfoObject, 'contact' | 'license'> & CustomProperties & {
  contact?: ContactObject
  license?: LicenseObject
};

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#license-object
 */
export type LicenseObject = Source.LicenseObject & CustomProperties;

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#link-object
 */
export type LinkObject = (Omit<Source.LinkObject, 'server'> & CustomProperties & {
  server?: ServerObject
}) | ReferenceObject;

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#media-type-object
 */
export type MediaTypeObject = Omit<Source.MediaTypeObject, 'encoding' | 'examples' | 'schema'> & CustomProperties & {
  encoding?: EncodingObject
  examples?: Record<string, ExampleObject>
  schema?: SchemaObject
};

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#oauth-flow-object
 */
export type OAuthFlowObject = AuthorizationCodeOAuthFlowObject | ClientCredentialsOAuthFlowObject | ImplicitOAuthFlowObject | PasswordOAuthFlowObject;
type AuthorizationCodeOAuthFlowObject = {
  authorizationUrl: string
  tokenUrl: string
  refreshUrl?: string
  scopes: Record<string, string>
} & CustomProperties;
type ClientCredentialsOAuthFlowObject = {
  tokenUrl: string
  refreshUrl?: string
  scopes: Record<string, string>
} & CustomProperties;
type ImplicitOAuthFlowObject = {
  authorizationUrl: string
  refreshUrl?: string
  scopes: Record<string, string>
} & CustomProperties;
type PasswordOAuthFlowObject = {
  tokenUrl: string
  refreshUrl?: string
  scopes: Record<string, string>
} & CustomProperties;

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#oauth-flows-object
 */
export type OAuthFlowsObject = {
  implicit?: ImplicitOAuthFlowObject
  password?: PasswordOAuthFlowObject
  clientCredentials?: ClientCredentialsOAuthFlowObject
  authorizationCode?: AuthorizationCodeOAuthFlowObject
} & CustomProperties;

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#openapi-object
 */
export type OpenAPIObject = Omit<Source.Document, 'components' | 'externalDocs' | 'info' | 'paths' | 'security' | 'servers' | 'tags' | 'webhooks'> & CustomProperties & {
  components?: ComponentsObject
  externalDocs?: ExternalDocumentationObject
  info: InfoObject
  paths?: PathsObject
  security?: SecurityRequirementObject[]
  servers?: ServerObject[]
  tags?: TagObject[]
  webhooks?: Record<string, PathItemObject>
};

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#operation-object
 */
export type OperationObject = Omit<Source.OperationObject, 'callbacks' | 'externalDocs' | 'parameters' | 'requestBody' | 'responses' | 'servers'> & CustomProperties & {
  callbacks?: Record<string, CallbackObject>
  externalDocs?: ExternalDocumentationObject
  parameters?: ParameterObject[]
  requestBody?: RequestBodyObject
  responses?: ResponsesObject
  servers?: ServerObject[]
};

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#parameter-object
 */
export type ParameterObject = (Omit<Source.ParameterObject, 'schema'> & CustomProperties & {
  schema?: SchemaObject
}) | ReferenceObject;

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#path-item-object
 */
export type PathItemObject = Omit<Source.PathItemObject, 'delete' | 'get' | 'head' | 'options' | 'parameters' | 'patch' | 'post' | 'put' | 'servers' | 'trace'> & CustomProperties & {
  delete?: OperationObject
  get?: OperationObject
  head?: OperationObject
  options?: OperationObject
  parameters?: ParameterObject[]
  patch?: OperationObject
  post?: OperationObject
  put?: OperationObject
  servers?: ServerObject[]
  trace?: OperationObject
};

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#paths-object
 */
export type PathsObject = Record<string, PathItemObject>;

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#reference-object
 */
export type ReferenceObject = Source.ReferenceObject & CustomProperties;

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#request-body-object
 */
export type RequestBodyObject = (Omit<Source.RequestBodyObject, 'content'> & CustomProperties & {
  content?: Record<string, MediaTypeObject>
}) | ReferenceObject;

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#response-object
 */
export type ResponseObject = (Omit<Source.ResponseObject, 'content' | 'headers' | 'links'> & CustomProperties & {
  content?: Record<string, MediaTypeObject>
  headers?: Record<string, HeaderObject>
  links?: Record<string, LinkObject>
}) | ReferenceObject;

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#responses-object
 */
export type ResponsesObject = Record<string, ResponseObject>;

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#schema-object
 */
export type SchemaObject = ((MixedTypeSchemaObject | SingleTypeSchemaObject) & CustomProperties) | ReferenceObject;
type MixedTypeSchemaObject = MixedTypeArraySchemaObject | MixedTypeNonArraySchemaObject;
type SingleTypeSchemaObject = SingleTypeArraySchemaObject | SingleTypeNonArraySchemaObject;
interface MixedTypeArraySchemaObject extends BaseSchemaObject {
  type: [Source.ArraySchemaObjectType | 'null']
  items: SchemaObject
};
interface MixedTypeNonArraySchemaObject extends BaseSchemaObject {
  type?: [Source.NonArraySchemaObjectType]
};
interface SingleTypeArraySchemaObject extends BaseSchemaObject {
  type: Source.ArraySchemaObjectType
  items: SchemaObject
};
interface SingleTypeNonArraySchemaObject extends BaseSchemaObject {
  type?: Source.NonArraySchemaObjectType
};
type BaseSchemaObject = Omit<Source.BaseSchemaObject, 'additionalProperties' | 'allOf' | 'anyOf' | 'discriminator' | 'examples' | 'externalDocs' | 'not' | 'oneOf' | 'properties' | 'xml'> & {
  additionalProperties?: boolean | SchemaObject
  allOf?: SchemaObject[]
  anyOf?: SchemaObject[]
  discriminator?: DiscriminatorObject
  externalDocs?: ExternalDocumentationObject
  examples?: Record<string, ExampleObject>
  not?: SchemaObject
  oneOf?: SchemaObject[]
  properties?: Record<string, SchemaObject>
  xml?: XMLObject
};

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#security-requirement-object
 */
export type SecurityRequirementObject = Source.SecurityRequirementObject;

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#security-scheme-object-0
 */
export type SecuritySchemeObject = (Exclude<Source.SecuritySchemeObject, Source.OAuth2SecurityScheme> & CustomProperties) | (Omit<Source.OAuth2SecurityScheme, 'flows'> & CustomProperties & {
  flows: OAuthFlowsObject
}) | ({
  type: 'mutualTLS'
  description?: string
} & CustomProperties) | ReferenceObject;

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#server-object
 */
export type ServerObject = Omit<Source.ServerObject, 'variables'> & CustomProperties & {
  variables?: Record<string, ServerVariableObject>
};

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#server-variable-object
 */
export type ServerVariableObject = Source.ServerVariableObject & CustomProperties;

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#tag-object
 */
export type TagObject = Omit<Source.TagObject, 'externalDocs'> & CustomProperties & {
  externalDocs?: ExternalDocumentationObject
};

/**
 * @see https://spec.openapis.org/oas/v3.1.1.html#xml-object
 */
export type XMLObject = Source.XMLObject & CustomProperties;

type CustomProperties = {
  [K in `x-${string}`]?: any;
};
