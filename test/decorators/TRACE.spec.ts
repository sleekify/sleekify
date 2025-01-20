import { TRACE } from '../../src';
import { ValuedMethodDecoratorSpec } from '../specifications/ValuedMethodDecoratorSpec';

const specification = new ValuedMethodDecoratorSpec(TRACE, {
  description: 'First Description'
}, {
  description: 'Second Description'
});

specification.describe(() => {
});
