"use strict";

const { Annotation } = require('../../src');

/* searches for annotated classes from a JavaScript caller */
exports.getClassesAnnotatedWith = (relativePath, decorator) => Annotation.getClassesAnnotatedWith(relativePath, decorator);
