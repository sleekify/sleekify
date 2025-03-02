# <img src="https://github.com/sleekify/assets/blob/main/resources/sleekify.png" height="27"> Sleekify

This project's goal is to simplify the development of REST web services in NodeJS by bringing the best of the Java API for RESTful Web Services (JAX-RS) to TypeScript.
This is possible since TypeScript decorators may be used in a manner similar to Java annotations.
This project allows you to apply decorators to your resource classes to identify your REST resources and associate them with OpenAPI definitions.
This allows you to maintain your API documentation alongside your code using typed definitions.
If you ever had to maintain a large OpenAPI specification by hand, this should grab your attention.
Your API documentation will both match the OpenAPI specification's schema and be generated from your code.

## Versions

| Sleekify | Node.js | OpenAPI Specification |
| -------- | ------- | --------------------- |
| 1.0.0+   | 20      | 3.1.1                 |

## Getting Started

Follow the instructions provided by each integration:

- Fastify: https://github.com/sleekify/sleekify-fastify

## API Reference

### Introduction

<sub>_src/v1/users.ts_</sub>
```TypeScript
@Path('/v1/users')
@Schema({
  $ref: '#/components/schemas/user'
})
export class UsersIdResource {
  @GET()
  async getMany () {
    // TODO: your read user code here
  }

  @POST()
  async createOne () {
    // TODO: your create user code here
  }
}
```

This simplified example shows how the decorators are intended to be used.
Each class represents a REST resource which is identified by a path.
The resource class's methods provide the operations or actions you may execute on the resource.
It's not required, but it is generally a good practice to have the class file path match the resource's relative path.

### Decorator Inheritance

The example above was simple, but when you start fully documenting your API, the OpenAPI definitions can become overwhelming.
Decorator inheritance allows you to split the OpenAPI definitions across a resource class hierarchy.

<sub>_src/v1/AbstractSingleResource.ts_</sub>
```TypeScript
@Components({
  parameters: {
    id: {
      description: 'The identifier of the resource',
      name: 'id',
      in: 'path',
      required: true,
      schema: {
        $ref: '#/components/schemas/id'
      }
    }
  },
  schemas: {
    id: {
      description: 'The id path parameter schema',
      type: ['integer']
    }
  }
})
export abstract class AbstractSingleResource {
  @GET({
    responses: {
      400: {
        $ref: '#/components/responses/400'
      },
      401: {
        $ref: '#/components/responses/401'
      },
      403: {
        $ref: '#/components/responses/403'
      },
      404: {
        $ref: '#/components/responses/404'
      },
      500: {
        $ref: '#/components/responses/500'
      }
    }
  })
  async getOne () {
    // TODO: your generic read code here
  }
}
```

Your base classes can provide all of the common documentation, while your subclasses may be more specialized for each individual resource.
This pattern works since REST APIs usually follow a consistent interface.
The values you provide for the decorators are additive which allows you add or replace properties in the OpenAPI definitions.
If you ever need to remove a property from an OpenAPI definition, then you will need to define a new base class.

<sub>_src/v1/users.ts_</sub>
```TypeScript
@Components({
  schemas: {
    user: {
      type: ['object'],
      properties: {
        id: {
          type: ['number']
        },
        name: {
          type: ['string']
        }
      }
    }
  }
})
@Path({
  path: '/v1/users/{id}',
  parameters: [
    {
      $ref: '#/components/parameters/id'
    }
  ]
})
@Schema({
  $ref: '#/components/schemas/user'
})
export class UsersIdResource extends AbstractSingleResource {
  @GET({
    description: 'Retrieve a single user by ID'
  })
  async getOne () {
    return await super.getOne();
  }
}
```

In the example above, `UserIdResource` will inherit the `@GET` responses from `AbstractSingleResource` and add its own description for the GET operation.


### Class Decorators

| Decorator | OpenAPI Schema | Description |
| - | - | - |
| @Components   | [Components Object](https://spec.openapis.org/oas/v3.1.1.html#components-object)  | This allows you to define re-usable components which may be referenced via [Reference Object](https://spec.openapis.org/oas/v3.1.1.html#reference-object) links like `"#/components/parameters/id"`.  The components only need to be defined once and may be used by other resource classes. |
| @Consumes | N/A | This decorator may be included on a resource class to select media types when using `@Schema` to set the request body schema.  The default media type is `application/json` so this is only required for other media types. |
| @Path | [Path Item Object](https://spec.openapis.org/oas/v3.1.1.html#path-item-object) | This decorator allows you to provide the `string` relative path or a path item object with an additional `path` property for the relative path. |
| @Produces | N/A | This decorator may be included on a resource class to select media types when using `@Schema` to set the successful response body schema.  The default media type is `application/json` so this is only required for other media types. |
| @Schema | [Schema Object](https://spec.openapis.org/oas/v3.1.1.html#schema-object) | This decorator allows you to provide the resource's schema for request body and successful response bodies.  The request body schema is set automatically for POST, PUT, and PATCH if your operation object's request body is not set. The response body schema is set for 200 or 201 response objects which don't have content set.  If there no 200-level response objects a 200 response object will be added for you.  This is intended for common use cases only. |

### Method Decorators

| Decorator | OpenAPI Schema | Description |
| - | - | - |
| @Consumes | N/A | See the class decorator description.  If this is placed on the method it takes precedence over the class decorator. |
| @DELETE | [Operation Object](https://spec.openapis.org/oas/v3.1.1.html#operation-object) | This decorator may be placed on a resource class method to associate that method with the HTTP DELETE method. |
| @GET | [Operation Object](https://spec.openapis.org/oas/v3.1.1.html#operation-object) | This decorator may be placed on a resource class method to associate that method with the HTTP GET method. |
| @HEAD | [Operation Object](https://spec.openapis.org/oas/v3.1.1.html#operation-object) | This decorator may be placed on a resource class method to associate that method with the HTTP HEAD method. |
| @OPTIONS | [Operation Object](https://spec.openapis.org/oas/v3.1.1.html#operation-object) | This decorator may be placed on a resource class method to associate that method with the HTTP OPTIONS method. |
| @PATCH | [Operation Object](https://spec.openapis.org/oas/v3.1.1.html#operation-object) | This decorator may be placed on a resource class method to associate that method with the HTTP PATCH method. |
| @POST | [Operation Object](https://spec.openapis.org/oas/v3.1.1.html#operation-object) | This decorator may be placed on a resource class method to associate that method with the HTTP POST method. |
| @Produces | N/A | See the class decorator description.  If this is placed on the method it takes precedence over the class decorator. |
| @PUT | [Operation Object](https://spec.openapis.org/oas/v3.1.1.html#operation-object) | This decorator may be placed on a resource class method to associate that method with the HTTP PUT method. |
| @Schema | [Schema Object](https://spec.openapis.org/oas/v3.1.1.html#schema-object) | See the class decorator description.  If this is placed on the method it takes precedence over the class decorator. |
| @TRACE | [Operation Object](https://spec.openapis.org/oas/v3.1.1.html#operation-object) | This decorator may be placed on a resource class method to associate that method with the HTTP TRACE method. |

### OpenAPI Types

This project also provides you with types for all of the OpenAPI schema objects.
All of the types follow a consistent naming pattern which matches the schema names in [OpenAPI Specification v3.1.1](https://spec.openapis.org/oas/v3.1.1.html).
For example, if you need the type for the Operation Object schema, then you would import `OperationObject`.

```javascript
import { type OperationObject } from '@sleekify/sleekify';
```

### The Annotation Utility

This utility allows you to search for classes which have an Sleekify decorator or inspect individual classes and class methods for decorators.

| Method | Description |
| - | - |
| Annotation.exists(target, propertyKey, decorator) | Indicates whether the annotation exists on the class or property. |
| Annotation.get(target, propertyKey, decorator) | Gets the annotation's value. |
| Annotation.getClassesAnnotatedWith(relativePath, decorator) | Finds classes annotated with the decoration by searching files recursively under the provided relative path.  The classes must be exported as a named exports since default exports aren't supported. |

### Web Application Errors

These web application errors are provided since throwing errors is the best approach for generating error responses.
It prevents HTTP concerns from leaking into other application layers and allows you to take advantage of error chaining via the error `cause` property.
You may define your own error handler to serialize errors into error responses which keeps error formatting in a single code location.

#### Client Errors

| Error | HTTP Status Code | Description |
| - | - | - |
| BadRequestError | 400 | A general error for invalid client requests |
| UnauthorizedError | 401 | Indicates the client hasn't been authenticated |
| PaymentRequiredError | 402 | |
| ForbiddenError | 403 | Indicates that an authenticated client is not authorized |
| NotFoundError | 404 | The resource was not found |
| MethodNotAllowedError | 405 | The resource does not support the given HTTP method |
| NotAcceptableError | 406 | The resource doesn't produce requested media type |
| ProxyAuthenticationRequiredError | 407 | |
| RequestTimeoutError | 408 | The server timed out during the request |
| ConflictError | 409 | Indicates that the server detected an edit conflict |
| GoneError | 410 | Used to indicate a previously supported resource is no longer available |
| LengthRequiredError | 411 | |
| PreconditionFailedError | 412 | Indicates an `If-Match` conflict for servers which support `ETag` headers |
| PayloadTooLargeError | 413 | |
| URITooLongError | 414 | |
| UnsupportedMediaTypeError | 415 | The resource doesn't consume requested media type |
| RangeNotSatisfiableError | 416 | |
| ExpectationFailedError | 417 | |
| IAmATeapotError | 418 | |
| MisdirectedRequestError | 421 | |
| UnprocessableContentError | 422 | Indicates a validation error where the request had the correct syntax, but invalid semantics |
| LockedError | 423 | |
| FailedDependencyError | 424 | |
| TooEarlyError | 425 | |
| UpgradeRequiredError | 426 | |
| PreconditionRequiredError | 428 | |
| RequestHeaderFieldsTooLargeError | 431 | |
| UnavailableForLegalReasonsError | 451 | |

#### Server Errors

| Error | HTTP Status Code | Description |
| - | - | - |
| InternalServerError | 500 | A general server error |
| NotImplementedError | 501 | The resource operation isn't implemented yet |
| BadGatewayError | 502 | |
| ServiceUnavailableError | 503 | The server is in a temporary state where it can't handle requests |
| GatewayTimeoutError | 504 | |
| HTTPVersionNotSupportedError | 505 | |
| VariantAlsoNegotiatesError | 506 | |
| InsufficientStorageError | 507 | |
| LoopDetectedError | 508 | |
| NotExtendedError | 510 | |
| NetworkAuthenticationRequiredError | 511 |
