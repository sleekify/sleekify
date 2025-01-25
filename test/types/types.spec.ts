import { type SchemaObject, type OperationObject, type PathItemObject, type CallbackObject, type ComponentsObject, type ContactObject, type DiscriminatorObject, type EncodingObject, type ExampleObject, type ExternalDocumentationObject, type HeaderObject, type InfoObject, type LicenseObject, type LinkObject, type MediaTypeObject, type OAuthFlowObject, type OAuthFlowsObject, type OpenAPIObject, type ParameterObject, type PathsObject, type ReferenceObject, type RequestBodyObject, type ResponseObject, type ResponsesObject, type SecurityRequirementObject, type SecuritySchemeObject, type ServerObject, type ServerVariableObject, type TagObject, type XMLObject } from '../../src';

/* eslint-disable @typescript-eslint/no-unused-vars */

describe('Types', () => {
  it('When custom properties are applied to CallbackObject, then they are allowed', () => {
    const callbackObject1: CallbackObject = {
      '{$request.query.queryUrl}': {
        'x-custom': true,
        get: {}
      },
      '/my/url?id={$request.body.id}': {
        'x-custom': true,
        $ref: '#/components/pathItems/callback2'
      }
    };
  });

  it('When custom properties are applied to ComponentsObject, then they are allowed', () => {
    const componentsObject1: ComponentsObject = {
      'x-custom': true,
      callbacks: {
        myCallback1: {
          '{$request.query.queryUrl}': {
            'x-custom': true,
            get: {}
          }
        }
      }
    };

    const componentsObject2: ComponentsObject = {
      examples: {
        myExample1: {
          'x-custom': true,
          value: 0
        }
      }
    };

    const componentsObject3: ComponentsObject = {
      headers: {
        myHeader1: {
          'x-custom': true,
          content: {}
        }
      }
    };

    const componentsObject4: ComponentsObject = {
      links: {
        myLink1: {
          'x-custom': true,
          operationId: 'getUsers'
        }
      }
    };

    const componentsObject5: ComponentsObject = {
      parameters: {
        myParameter1: {
          'x-custom': true,
          name: 'myParameter1',
          in: 'query'
        }
      }
    };

    const componentsObject6: ComponentsObject = {
      pathItems: {
        myPathItem1: {
          'x-custom': true,
          get: {}
        }
      }
    };

    const componentsObject7: ComponentsObject = {
      requestBodies: {
        requestBody1: {
          'x-custom': true,
          content: {}
        }
      }
    };

    const componentsObject8: ComponentsObject = {
      responses: {
        200: {
          'x-custom': true,
          description: 'my description'
        }
      }
    };

    const componentsObject9: ComponentsObject = {
      schemas: {
        mySchema1: {
          'x-custom': true,
          type: ['object']
        }
      }
    };

    const componentsObject10: ComponentsObject = {
      securitySchemes: {
        default: {
          type: 'oauth2',
          flows: {}
        }
      }
    };
  });

  it('When custom properties are applied to ContactObject, then they are allowed', () => {
    const contactObject1: ContactObject = {
      'x-custom': true,
      name: 'Bob',
      url: '/my/url',
      email: 'noreply@email.com'
    };

    const contactObject2: ContactObject = {
      'x-custom': true
    };
  });

  it('When custom properties are applied to DiscriminatorObject, then they are allowed', () => {
    const discriminatorObject1: DiscriminatorObject = {
      'x-custom': true,
      propertyName: 'id',
      mapping: {
        id: 'userId'
      }
    };

    const discriminatorObject2: DiscriminatorObject = {
      'x-custom': true,
      propertyName: 'id'
    };
  });

  it('When custom properties are applied to EncodingObject, then they are allowed', () => {
    const encodingObject1: EncodingObject = {
      'x-custom': true,
      contentType: 'image/png, image/jpeg',
      headers: {
        myHeader: {
          'x-custom': true,
          content: {}
        }
      }
    };

    const encodingObject2: EncodingObject = {
      'x-custom': true
    };
  });

  it('When custom properties are applied to ExampleObject, then they are allowed', () => {
    const exampleObject1: ExampleObject = {
      'x-custom': true,
      summary: 'my summary',
      description: 'my description',
      value: 0,
      externalValue: '/test'
    };

    const exampleObject2: ExampleObject = {
      'x-custom': true
    };
  });

  it('When custom properties are applied to ExternalDocumentationObject, then they are allowed', () => {
    const externalDocumentationObject1: ExternalDocumentationObject = {
      'x-custom': true,
      description: 'my description',
      url: '/test'
    };

    const externalDocumentationObject2: ExternalDocumentationObject = {
      'x-custom': true,
      url: '/test'
    };
  });

  it('When custom properties are applied to HeaderObject, then they are allowed', () => {
    const header1: HeaderObject = {
      'x-custom': true,
      description: 'my description',
      required: true,
      deprecated: true,
      style: 'simple',
      explode: true,
      schema: {
        'x-custom': true
      },
      example: '1',
      examples: {
        example1: {
          'x-custom': true
        }
      }
    };

    const header2: HeaderObject = {
      'x-custom': true,
      description: 'my description',
      required: true,
      deprecated: true,
      style: 'simple',
      explode: true,
      content: {
        'application/json': {
          'x-custom': true
        }
      },
      example: '1',
      examples: {
        example1: {
          'x-custom': true
        }
      }
    };

    const header3: HeaderObject = {
      'x-custom': true
    };
  });

  it('When custom properties are applied to InfoObject, then they are allowed', () => {
    const infoObject1: InfoObject = {
      title: 'my title',
      summary: 'my summary',
      description: 'my description',
      termsOfService: 'my terms of service',
      contact: {
        'x-custom': true
      },
      license: {
        'x-custom': true,
        name: 'MIT'
      },
      version: '1.0.0'
    };

    const infoObject2: InfoObject = {
      title: 'my title',
      version: '1.0.0'
    };
  });

  it('When custom properties are applied to LicenseObject, then they are allowed', () => {
    const licenseObject1: LicenseObject = {
      'x-custom': true,
      name: 'my name',
      identifier: 'my identifier',
      url: '/my/url'
    };

    const licenseObject2: LicenseObject = {
      'x-custom': true,
      name: 'my name'
    };
  });

  it('When custom properties are applied to LinkObject, then they are allowed', () => {
    const linkObject1: LinkObject = {
      'x-custom': true,
      operationRef: '/my/operation/',
      operationId: 'myOperationId',
      parameters: {
        myParameter1: {
          'x-custom': true
        }
      },
      requestBody: 'my body',
      description: 'my description',
      server: {
        'x-custom': true,
        url: '/my/url'
      }
    };

    const linkObject2: LinkObject = {
      'x-custom': true
    };
  });

  it('When custom properties are applied to MediaTypeObject, then they are allowed', () => {
    const mediaTypeObject1: MediaTypeObject = {
      'x-custom': true,
      schema: {
        'x-custom': true
      },
      example: 0,
      examples: {
        example1: {
          'x-custom': true,
          value: 0
        }
      },
      encoding: {
        'x-custom': true
      }
    };
  });

  it('When custom properties are applied to OAuthFlowObject, then they are allowed', () => {
    const oAuthFlowObject1: OAuthFlowObject = {
      'x-custom': true,
      authorizationUrl: '/my/authorization/url',
      tokenUrl: '/my/token/url',
      refreshUrl: 'my/refresh/url',
      scopes: {
        'write: user': 'Modify users'
      }
    };

    const oAuthFlowObject2: OAuthFlowObject = {
      'x-custom': true,
      authorizationUrl: '/my/authorization/url',
      scopes: {
        'write: user': 'Modify users'
      }
    };

    const oAuthFlowObject3: OAuthFlowObject = {
      'x-custom': true,
      tokenUrl: '/my/token/url',
      scopes: {
        'write: user': 'Modify users'
      }
    };
  });

  it('When custom properties are applied to OAuthFlowsObject, then they are allowed', () => {
    const oAuthFlowsObject1: OAuthFlowsObject = {
      'x-custom': true,
      authorizationCode: {
        'x-custom': true,
        authorizationUrl: '/my/authorization/url',
        tokenUrl: '/my/token/url',
        refreshUrl: 'my/refresh/url',
        scopes: {
          'write: user': 'Modify users'
        }
      },
      clientCredentials: {
        'x-custom': true,
        tokenUrl: '/my/token/url',
        refreshUrl: 'my/refresh/url',
        scopes: {
          'write: user': 'Modify users'
        }
      },
      implicit: {
        'x-custom': true,
        authorizationUrl: '/my/authorization/url',
        refreshUrl: 'my/refresh/url',
        scopes: {
          'write: user': 'Modify users'
        }
      },
      password: {
        'x-custom': true,
        tokenUrl: '/my/token/url',
        refreshUrl: 'my/refresh/url',
        scopes: {
          'write: user': 'Modify users'
        }
      }
    };

    const oAuthFlowsObject2: OAuthFlowsObject = {
      'x-custom': true,
      authorizationCode: {
        'x-custom': true,
        authorizationUrl: '/my/authorization/url',
        tokenUrl: '/my/token/url',
        scopes: {
          'write: user': 'Modify users'
        }
      },
      clientCredentials: {
        'x-custom': true,
        tokenUrl: '/my/token/url',
        scopes: {
          'write: user': 'Modify users'
        }
      },
      implicit: {
        'x-custom': true,
        authorizationUrl: '/my/authorization/url',
        scopes: {
          'write: user': 'Modify users'
        }
      },
      password: {
        'x-custom': true,
        tokenUrl: '/my/token/url',
        scopes: {
          'write: user': 'Modify users'
        }
      }
    };
  });

  it('When custom properties are applied to OpenAPIObject, then they are allowed', () => {
    const openAPIObject1: OpenAPIObject = {
      openapi: '3.1.1',
      info: {
        'x-custom': true,
        title: 'my title',
        version: '1.0.0'
      },
      jsonSchemaDialect: '/my/url',
      servers: [
        {
          'x-custom': true,
          url: '/my/url'
        }
      ],
      paths: {
        '/users': {
          'x-custom': true
        }
      },
      webhooks: {
        webhook1: {
          'x-custom': true
        }
      },
      components: {
        'x-custom': true
      },
      security: [
        {
          default: []
        }
      ],
      tags: [
        {
          'x-custom': true,
          name: 'default'
        }
      ],
      externalDocs: {
        'x-custom': true,
        url: '/my/url'
      }
    };

    const openAPIObject2: OpenAPIObject = {
      openapi: '3.1.1',
      info: {
        'x-custom': true,
        title: 'my title',
        version: '1.0.0'
      }
    };
  });

  it('When custom properties are applied to OperationObject, then they are allowed', () => {
    const operationObject1: OperationObject = {
      'x-custom': true,
      tags: ['default'],
      summary: 'my summary',
      description: 'my description',
      externalDocs: {
        'x-custom': true,
        url: 'my/url'
      },
      operationId: 'myOperationId',
      parameters: [
        {
          'x-custom': true,
          name: 'id1',
          in: 'path'
        }
      ],
      requestBody: {
        'x-custom': true
      },
      responses: {
        200: {
          'x-custom': true,
          description: 'my description'
        }
      },
      callbacks: {
        myCallback1: {
          '{$request.query.queryUrl}': {
            'x-custom': true,
            get: {}
          }
        }
      },
      deprecated: false,
      security: [
        {
          default: []
        }
      ],
      servers: [
        {
          'x-custom': true,
          url: '/my/url'
        }
      ]
    };

    const operationObject3: OperationObject = {
      'x-custom': true
    };
  });

  it('When custom properties are applied to ParameterObject, then they are allowed', () => {
    const parameterObject1: ParameterObject = {
      'x-custom': true,
      name: 'parameter1',
      in: 'query',
      description: 'my description',
      required: false,
      deprecated: false,
      allowEmptyValue: true
    };

    const parameterObject2: ParameterObject = {
      'x-custom': true,
      name: 'parameter1',
      in: 'query'
    };
  });

  it('When custom properties are applied to PathItemObject, then they are allowed', () => {
    const pathItemObject1: PathItemObject = {
      'x-custom': true,
      summary: 'my summary',
      description: 'my description',
      get: {
        'x-custom': true
      },
      put: {
        'x-custom': true
      },
      post: {
        'x-custom': true
      },
      delete: {
        'x-custom': true
      },
      options: {
        'x-custom': true
      },
      head: {
        'x-custom': true
      },
      patch: {
        'x-custom': true
      },
      trace: {
        'x-custom': true
      },
      servers: [
        {
          'x-custom': true,
          url: '/my/url'
        }
      ],
      parameters: [
        {
          'x-custom': true,
          name: 'id1',
          in: 'path'
        }
      ]
    };

    const pathItemObject2: PathItemObject = {
      'x-custom': true
    };
  });

  it('When custom properties are applied to PathsObject, then they are allowed', () => {
    const pathsObject1: PathsObject = {
      '/my/path': {
        'x-custom': true
      }
    };
  });

  it('When custom properties are applied to ReferenceObject, then they are allowed', () => {
    const referenceObject1: ReferenceObject = {
      'x-custom': true,
      $ref: '#/components/schemas/mySchema1'
    };
  });

  it('When custom properties are applied to RequestBodyObject, then they are allowed', () => {
    const requestBodyObject1: RequestBodyObject = {
      'x-custom': true,
      description: 'my description',
      content: {
        'application/json': {
          'x-custom': true
        }
      },
      required: true
    };

    const requestBodyObject2: RequestBodyObject = {
      'x-custom': true
    };
  });

  it('When custom properties are applied to ResponseObject, then they are allowed', () => {
    const responseObject1: ResponseObject = {
      'x-custom': true,
      description: 'my description',
      headers: {
        header1: {
          'x-custom': true
        }
      },
      content: {
        'application/json': {
          'x-custom': true
        }
      },
      links: {
        link1: {
          'x-custom': true
        }
      }
    };

    const responseObject2: ResponseObject = {
      'x-custom': true,
      description: 'my description'
    };
  });

  it('When custom properties are applied to ResponsesObject, then they are allowed', () => {
    const responsesObject1: ResponsesObject = {
      200: {
        'x-custom': true,
        description: 'my description'
      }
    };
  });

  it('When custom properties are applied to SchemaObject, then they are allowed', () => {
    const schema1: SchemaObject = {
      'x-custom': true,
      type: ['array'],
      items: {
        'x-custom': true,
        type: ['object'],
        properties: {
          name: {
            'x-custom': true,
            type: ['string']
          }
        }
      }
    };

    const schema2: SchemaObject = {
      'x-custom': true,
      type: ['object'],
      properties: {
        name: {
          'x-custom': true,
          type: ['string']
        }
      }
    };

    const schema3: SchemaObject = {
      'x-custom': true,
      type: 'array',
      items: {
        'x-custom': true,
        type: 'object',
        properties: {
          name: {
            'x-custom': true,
            type: 'string'
          }
        }
      }
    };

    const schema4: SchemaObject = {
      'x-custom': true,
      type: 'object',
      properties: {
        name: {
          'x-custom': true,
          type: 'string'
        }
      }
    };

    const schema5: SchemaObject = {
      'x-custom': true,
      $ref: '#/components/schemas/schema5'
    };

    const schema6: SchemaObject = {
      'x-custom': true,
      allOf: [{
        'x-custom': true
      }],
      anyOf: [{
        'x-custom': true
      }],
      oneOf: [{
        'x-custom': true
      }],
      not: {
        'x-custom': true
      },
      additionalProperties: {
        'x-custom': true
      },
      discriminator: {
        'x-custom': true,
        propertyName: 'type'
      },
      examples: {
        example1: {
          'x-custom': true
        }
      },
      externalDocs: {
        'x-custom': true,
        url: '/my/url'
      },
      xml: {
        'x-custom': true
      }
    };

    const schema7: SchemaObject = {
      additionalProperties: true
    };
  });

  it('When standard properties are applied to SchemaObject, then they are allowed', () => {
    const securityRequirementObject1: SecurityRequirementObject = {
      default: ['read', 'write']
    };
  });

  it('When custom properties are applied to SecuritySchemeObject, then they are allowed', () => {
    const securitySchemeObject1: SecuritySchemeObject = {
      'x-custom': true,
      type: 'apiKey',
      description: 'my description',
      name: 'my-api-key',
      in: 'header'
    };

    const securitySchemeObject2: SecuritySchemeObject = {
      'x-custom': true,
      type: 'http',
      description: 'my description',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    };

    const securitySchemeObject3: SecuritySchemeObject = {
      'x-custom': true,
      type: 'mutualTLS',
      description: 'my description'
    };

    const securitySchemeObject4: SecuritySchemeObject = {
      'x-custom': true,
      type: 'oauth2',
      description: 'my description',
      flows: {
        'x-custom': true
      }
    };

    const securitySchemeObject5: SecuritySchemeObject = {
      'x-custom': true,
      type: 'openIdConnect',
      description: 'my description',
      openIdConnectUrl: '/my/url'
    };
  });

  it('When custom properties are applied to ServerObject, then they are allowed', () => {
    const serverObject1: ServerObject = {
      'x-custom': true,
      url: '/my/url',
      description: 'my description',
      variables: {
        variable1: {
          'x-custom': true,
          default: '0'
        }
      }
    };

    const serverObject2: ServerObject = {
      'x-custom': true,
      url: '/my/url'
    };
  });

  it('When custom properties are applied to ServerVariableObject, then they are allowed', () => {
    const serverVariableObject1: ServerVariableObject = {
      'x-custom': true,
      enum: ['value1', 'value2'],
      default: '0',
      description: 'my description'
    };

    const serverVariableObject2: ServerVariableObject = {
      'x-custom': true,
      default: '0'
    };
  });

  it('When custom properties are applied to TagObject, then they are allowed', () => {
    const tagObject1: TagObject = {
      'x-custom': true,
      name: 'my tag',
      description: 'my description',
      externalDocs: {
        'x-custom': true,
        url: '/my/url'
      }
    };

    const tagObject2: TagObject = {
      'x-custom': true,
      name: 'my tag'
    };
  });

  it('When custom properties are applied to XMLObject, then they are allowed', () => {
    const xmlObject1: XMLObject = {
      'x-custom': true,
      name: 'my name',
      namespace: 'my namespace',
      prefix: 'my prefix',
      attribute: true,
      wrapped: true
    };

    const xmlObject2: XMLObject = {
      'x-custom': true
    };
  });
});
