import { GET } from '../../src';
import { ValuedMethodDecoratorSpec } from '../specifications/ValuedMethodDecoratorSpec';

const specification = new ValuedMethodDecoratorSpec(GET, {
  description: 'First Description'
}, {
  description: 'Second Description'
});

specification.describe(() => {
});
