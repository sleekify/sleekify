export interface ErrorOptions { cause?: Error };

/**
 * The base class for all HTTP errors.
 */
export class WebApplicationError extends Error {
  private static reasonMap: Record<string, string> = {};
  private readonly statusCode: number;

  constructor (status: number, message?: string, options?: ErrorOptions) {
    super(message, options);
    this.statusCode = status;
  }

  public get status (): number {
    return this.statusCode;
  }

  public get reason (): string {
    let reason = WebApplicationError.reasonMap[this.statusCode];

    if (reason === undefined) {
      reason = this.constructor.name
        .replace('Error', '')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
      WebApplicationError.reasonMap[this.statusCode] = reason;
    }

    return reason;
  }
}

/**
 * The base class for all HTTP 4XX errors which indicate the client's request
 * is invalid and cause the error.
 */
export class ClientWebApplicationError extends WebApplicationError {
}

/**
 * HTTP 400 - The server cannot or will not process the request due to an
 * apparent client error (e.g., malformed request syntax, size too large,
 * invalid request message framing, or deceptive request routing).
 */
export class BadRequestError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(400, message);
  }
}

/**
 * HTTP 401 - Similar to 403 Forbidden, but specifically for use when
 * authentication is required and has failed or has not yet been provided. The
 * response must include a WWW-Authenticate header field containing a challenge
 * applicable to the requested resource.
 */
export class UnauthorizedError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(401, message);
  }
}

/**
 * HTTP 402 - Reserved for future use. The original intention was that this
 * code might be used as part of some form of digital cash or micropayment
 * scheme, as proposed, for example, but that has not yet happened, and this
 * code is not widely used.
 */
export class PaymentRequiredError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(402, message);
  }
}

/**
 * HTTP 403 - The request contained valid data and was understood by the
 * server, but the server is refusing action. This may be due to the user not
 * having the necessary permissions for a resource or needing an account of
 * some sort, or attempting a prohibited action.
 */
export class ForbiddenError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(403, message);
  }
}

/**
 * HTTP 404 - The requested resource could not be found but may be available in
 * the future. Subsequent requests by the client are permissible.
 */
export class NotFoundError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(404, message);
  }
}

/**
 * HTTP 405 - A request method is not supported for the requested resource; for
 * example, a GET request on a form that requires data to be presented via
 * POST, or a PUT request on a read-only resource.
 */
export class MethodNotAllowedError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(405, message);
  }
}

/**
 * HTTP 406 - The requested resource is capable of generating only content not
 * acceptable according to the Accept headers sent in the request.
 */
export class NotAcceptableError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(406, message);
  }
}

/**
 * HTTP 407 - The client must first authenticate itself with the proxy.
 */
export class ProxyAuthenticationRequiredError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(407, message);
  }
}

/**
 * HTTP 408 - The server timed out waiting for the request. According to HTTP
 * specifications: "The client did not produce a request within the time that
 * the server was prepared to wait. The client MAY repeat the request without
 * modifications at any later time."
 */
export class RequestTimeoutError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(408, message);
  }
}

/**
 * HTTP 409 - Indicates that the request could not be processed because of
 * conflict in the current state of the resource, such as an edit conflict
 * between multiple simultaneous updates.
 */
export class ConflictError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(409, message);
  }
}

/**
 * HTTP 410 - Indicates that the resource requested was previously in use but
 * is no longer available and will not be available again. This should be used
 * when a resource has been intentionally removed and the resource should be
 * purged.
 */
export class GoneError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(410, message);
  }
}

/**
 * HTTP 411 - The request did not specify the length of its content, which is
 * required by the requested resource.
 */
export class LengthRequiredError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(411, message);
  }
}

/**
 * HTTP 412 - The server does not meet one of the preconditions that the
 * requester put on the request header fields.
 */
export class PreconditionFailedError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(412, message);
  }
}

/**
 * HTTP 413 - The request is larger than the server is willing or able to
 * process. Previously called "Request Entity Too Large".
 */
export class PayloadTooLargeError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(413, message);
  }
}

/**
 * HTTP 414 - The URI provided was too long for the server to process. Often
 * the result of too much data being encoded as a query-string of a GET
 * request, in which case it should be converted to a POST request.
 */
export class URITooLongError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(414, message);
  }
}

/**
 * HTTP 415 - The request entity has a media type which the server or resource
 * does not support. For example, the client uploads an image as image/svg+xml,
 * but the server requires that images use a different format.
 */
export class UnsupportedMediaTypeError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(415, message);
  }
}

/**
 * HTTP 416 - The client has asked for a portion of the file (byte serving),
 * but the server cannot supply that portion.
 */
export class RangeNotSatisfiableError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(416, message);
  }
}

/**
 * HTTP 417 - The server cannot meet the requirements of the Expect
 * request-header field.
 */
export class ExpectationFailedError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(417, message);
  }
}

/**
 * HTTP 418 - This code was defined in 1998 as one of the traditional IETF
 * April Fools' jokes, in RFC 2324, Hyper Text Coffee Pot Control Protocol, and
 * is not expected to be implemented by actual HTTP servers. The RFC specifies
 * this code should be returned by teapots requested to brew coffee.
 */
export class IAmATeapotError extends ClientWebApplicationError {
  private readonly reasonString = "I'm a Teapot";

  constructor (message?: string, options?: ErrorOptions) {
    super(418, message);
  }

  public get reason (): string {
    return this.reasonString;
  }
}

/**
 * HTTP 421 - The request was directed at a server that is not able to produce
 * a response (for example because of connection reuse).
 */
export class MisdirectedRequestError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(421, message);
  }
}

/**
 * HTTP 422 - The request was well-formed (i.e., syntactically correct) but
 * could not be processed.
 */
export class UnprocessableContentError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(422, message);
  }
}

/**
 * HTTP 423 - The resource that is being accessed is locked.
 */
export class LockedError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(423, message);
  }
}

/**
 * HTTP 424 - The request failed because it depended on another request and
 * that request failed
 */
export class FailedDependencyError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(424, message);
  }
}

/**
 * HTTP 425 - Indicates that the server is unwilling to risk processing a
 * request that might be replayed.
 */
export class TooEarlyError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(425, message);
  }
}

/**
 * HTTP 426 - The client should switch to a different protocol such as TLS/1.3,
 * given in the Upgrade header field.
 */
export class UpgradeRequiredError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(426, message);
  }
}

/**
 * HTTP 428 - The origin server requires the request to be conditional.
 * Intended to prevent the 'lost update' problem, where a client GETs a
 * resource's state, modifies it, and PUTs it back to the server, when
 * meanwhile a third party has modified the state on the server, leading to a
 * conflict.
 */
export class PreconditionRequiredError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(428, message);
  }
}

/**
 * HTTP 429 - The user has sent too many requests in a given amount of time.
 * Intended for use with rate-limiting schemes.
 */
export class TooManyRequestsError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(429, message);
  }
}

/**
 * HTTP 431 - The server is unwilling to process the request because either an
 * individual header field, or all the header fields collectively, are too
 * large.
 */
export class RequestHeaderFieldsTooLargeError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(431, message);
  }
}

/**
 * HTTP 451 - A server operator has received a legal demand to deny access to a
 * resource or to a set of resources that includes the requested resource.
 */
export class UnavailableForLegalReasonsError extends ClientWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(451, message);
  }
}

/**
 * The base class for all HTTP 5XX errors which indicate the server encoutered
 * a non-recoverable error.
 */
export class ServerWebApplicationError extends WebApplicationError {
}

/**
 * HTTP 500 - A generic error message, given when an unexpected condition was
 * encountered and no more specific message is suitable.
 */
export class InternalServerError extends ServerWebApplicationError {
  private readonly reasonString = 'Internal Server Error';

  constructor (message?: string, options?: ErrorOptions) {
    super(500, message);
  }

  public get reason (): string {
    return this.reasonString;
  }
}

/**
 * HTTP 501 - The server either does not recognize the request method, or it
 * lacks the ability to fulfil the request. Usually this implies future
 * availability (e.g., a new feature of a web-service API).
 */
export class NotImplementedError extends ServerWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(501, message);
  }
}

/**
 * HTTP 502 - The server was acting as a gateway or proxy and received an
 * invalid response from the upstream server.
 */
export class BadGatewayError extends ServerWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(502, message);
  }
}

/**
 * HTTP 503 - The server cannot handle the request (because it is overloaded or
 * down for maintenance). Generally, this is a temporary state.
 */
export class ServiceUnavailableError extends ServerWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(503, message);
  }
}

/**
 * HTTP 504 - The server was acting as a gateway or proxy and did not receive a
 * timely response from the upstream server.
 */
export class GatewayTimeoutError extends ServerWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(504, message);
  }
}

/**
 * HTTP 505 - The server does not support the HTTP version used in the request.
 */
export class HTTPVersionNotSupportedError extends ServerWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(505, message);
  }
}

/**
 * HTTP 506 - Transparent content negotiation for the request results in a
 * circular reference.
 */
export class VariantAlsoNegotiatesError extends ServerWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(506, message);
  }
}

/**
 * HTTP 507 - The server is unable to store the representation needed to
 * complete the request.
 */
export class InsufficientStorageError extends ServerWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(507, message);
  }
}

/**
 * HTTP 508 - The server detected an infinite loop while processing the
 * request.
 */
export class LoopDetectedError extends ServerWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(508, message);
  }
}

/**
 * HTTP 510 - Further extensions to the request are required for the server to
 * fulfil it.
 */
export class NotExtendedError extends ServerWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(510, message);
  }
}

/**
 * HTTP 511 - The client needs to authenticate to gain network access. Intended
 * for use by intercepting proxies used to control access to the network.
 */
export class NetworkAuthenticationRequiredError extends ServerWebApplicationError {
  constructor (message?: string, options?: ErrorOptions) {
    super(511, message);
  }
}
