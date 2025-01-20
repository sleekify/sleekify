import { Schema } from '../../src';
import { ValuedClassAndMethodDecoratorSpec } from '../specifications/ValuedClassAndMethodDecoratorSpec';

const specification = new ValuedClassAndMethodDecoratorSpec(Schema, {
  $ref: '#/components/schemas/firstSchema'
}, {
  $ref: '#/components/schemas/firstSchema'
});

specification.describe(() => {
});
