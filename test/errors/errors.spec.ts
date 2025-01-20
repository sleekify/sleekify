import {
  BadGatewayError,
  BadRequestError,
  ConflictError,
  ExpectationFailedError,
  FailedDependencyError,
  ForbiddenError,
  GatewayTimeoutError,
  GoneError,
  HTTPVersionNotSupportedError,
  IAmATeapotError,
  InsufficientStorageError,
  InternalServerError,
  LengthRequiredError,
  LockedError,
  LoopDetectedError,
  MethodNotAllowedError,
  MisdirectedRequestError,
  NetworkAuthenticationRequiredError,
  NotAcceptableError,
  NotExtendedError,
  NotFoundError,
  NotImplementedError,
  PayloadTooLargeError,
  PaymentRequiredError,
  PreconditionFailedError,
  PreconditionRequiredError,
  ProxyAuthenticationRequiredError,
  RangeNotSatisfiableError,
  RequestHeaderFieldsTooLargeError,
  RequestTimeoutError,
  ServiceUnavailableError,
  TooEarlyError,
  TooManyRequestsError,
  UnauthorizedError,
  UnavailableForLegalReasonsError,
  UnprocessableContentError,
  UnsupportedMediaTypeError,
  UpgradeRequiredError,
  URITooLongError,
  VariantAlsoNegotiatesError
} from '../../src';

describe('errors', () => {
  describe('client errors', () => {
    [
      {
        error: BadRequestError,
        status: 400,
        reason: 'Bad Request'
      },
      {
        error: UnauthorizedError,
        status: 401,
        reason: 'Unauthorized'
      },
      {
        error: PaymentRequiredError,
        status: 402,
        reason: 'Payment Required'
      },
      {
        error: ForbiddenError,
        status: 403,
        reason: 'Forbidden'
      },
      {
        error: NotFoundError,
        status: 404,
        reason: 'Not Found'
      },
      {
        error: MethodNotAllowedError,
        status: 405,
        reason: 'Method Not Allowed'
      },
      {
        error: NotAcceptableError,
        status: 406,
        reason: 'Not Acceptable'
      },
      {
        error: ProxyAuthenticationRequiredError,
        status: 407,
        reason: 'Proxy Authentication Required'
      },
      {
        error: RequestTimeoutError,
        status: 408,
        reason: 'Request Timeout'
      },
      {
        error: ConflictError,
        status: 409,
        reason: 'Conflict'
      },
      {
        error: GoneError,
        status: 410,
        reason: 'Gone'
      },
      {
        error: LengthRequiredError,
        status: 411,
        reason: 'Length Required'
      },
      {
        error: PreconditionFailedError,
        status: 412,
        reason: 'Precondition Failed'
      },
      {
        error: PayloadTooLargeError,
        status: 413,
        reason: 'Payload Too Large'
      },
      {
        error: URITooLongError,
        status: 414,
        reason: 'URI Too Long'
      },
      {
        error: UnsupportedMediaTypeError,
        status: 415,
        reason: 'Unsupported Media Type'
      },
      {
        error: RangeNotSatisfiableError,
        status: 416,
        reason: 'Range Not Satisfiable'
      },
      {
        error: ExpectationFailedError,
        status: 417,
        reason: 'Expectation Failed'
      },
      {
        error: IAmATeapotError,
        status: 418,
        reason: "I'm a Teapot"
      },
      {
        error: MisdirectedRequestError,
        status: 421,
        reason: 'Misdirected Request'
      },
      {
        error: UnprocessableContentError,
        status: 422,
        reason: 'Unprocessable Content'
      },
      {
        error: LockedError,
        status: 423,
        reason: 'Locked'
      },
      {
        error: FailedDependencyError,
        status: 424,
        reason: 'Failed Dependency'
      },
      {
        error: TooEarlyError,
        status: 425,
        reason: 'Too Early'
      },
      {
        error: UpgradeRequiredError,
        status: 426,
        reason: 'Upgrade Required'
      },
      {
        error: PreconditionRequiredError,
        status: 428,
        reason: 'Precondition Required'
      },
      {
        error: TooManyRequestsError,
        status: 429,
        reason: 'Too Many Requests'
      },
      {
        error: RequestHeaderFieldsTooLargeError,
        status: 431,
        reason: 'Request Header Fields Too Large'
      },
      {
        error: UnavailableForLegalReasonsError,
        status: 451,
        reason: 'Unavailable For Legal Reasons'
      }
    ].forEach(test => {
      it(`${test.error.name} has status code ${test.status}`, () => {
        // When
        const ErrorConstructor = test.error;
        const error = new ErrorConstructor('message');

        // Then
        expect(error.message).toBe('message');
        expect(error.status).toBe(test.status);
        expect(error.reason).toBe(test.reason);
      });
    });
  });

  describe('server errors', () => {
    [
      {
        error: InternalServerError,
        status: 500,
        reason: 'Internal Server Error'
      },
      {
        error: NotImplementedError,
        status: 501,
        reason: 'Not Implemented'
      },
      {
        error: BadGatewayError,
        status: 502,
        reason: 'Bad Gateway'
      },
      {
        error: ServiceUnavailableError,
        status: 503,
        reason: 'Service Unavailable'
      },
      {
        error: GatewayTimeoutError,
        status: 504,
        reason: 'Gateway Timeout'
      },
      {
        error: HTTPVersionNotSupportedError,
        status: 505,
        reason: 'HTTP Version Not Supported'
      },
      {
        error: VariantAlsoNegotiatesError,
        status: 506,
        reason: 'Variant Also Negotiates'
      },
      {
        error: InsufficientStorageError,
        status: 507,
        reason: 'Insufficient Storage'
      },
      {
        error: LoopDetectedError,
        status: 508,
        reason: 'Loop Detected'
      },
      {
        error: NotExtendedError,
        status: 510,
        reason: 'Not Extended'
      },
      {
        error: NetworkAuthenticationRequiredError,
        status: 511,
        reason: 'Network Authentication Required'
      }
    ].forEach(test => {
      it(`${test.error.name} has status code ${test.status}`, () => {
        // When
        const ErrorConstructor = test.error;
        const error = new ErrorConstructor('message');

        // Then
        expect(error.message).toBe('message');
        expect(error.status).toBe(test.status);
        expect(error.reason).toBe(test.reason);
      });
    });
  });
});
