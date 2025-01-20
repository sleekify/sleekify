import { Components } from '../../src';
import { ValuedClassDecoratorSpec } from '../specifications/ValuedClassDecoratorSpec';

const specification = new ValuedClassDecoratorSpec(Components, {
  parameters: {
    pageSize: {
      name: 'pageSize',
      in: 'query',
      description: 'The page size',
      required: false,
      schema: {
        type: 'integer',
        format: 'int32'
      }
    }
  }
}, {
  parameters: {
    pageSize: {
      name: 'pageNumber',
      in: 'query',
      description: 'The page number',
      required: false,
      schema: {
        type: 'integer',
        format: 'int32'
      }
    }
  }
});

specification.describe(() => {
});
