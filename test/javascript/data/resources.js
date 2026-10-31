"use strict";

const { Path } = require('../../../src');

class JavaScriptResource {
}

Path('/v1/javascript')(JavaScriptResource);

exports.JavaScriptResource = JavaScriptResource;

/* exports which aren't annotated classes are ignored */
exports.NotAnnotatedResource = class NotAnnotatedResource {
};
exports.VERSION = 1;
