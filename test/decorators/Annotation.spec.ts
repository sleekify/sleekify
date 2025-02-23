import { execSync } from 'node:child_process';
import path from 'node:path';
import _ from 'lodash';
import { Annotation, Path } from '../../src';
import { execSyncWithOutput } from '../helper';

function decorator (value: any) {
  return function (target: any, propertyKey?: string, _descriptor?: PropertyDescriptor): any {
    Annotation.set(target, propertyKey, decorator, value);
  };
};

Annotation.register(decorator, 'b82c7ea3-d235-46b6-aeec-3a6848fc9c36');

function notInheritedDecorator (value: any) {
  return function (target: any, propertyKey?: string, _descriptor?: PropertyDescriptor): any {
    Annotation.set(target, propertyKey, notInheritedDecorator, value);
  };
};

Annotation.register(notInheritedDecorator, '23d1c2f8-22ad-4eb2-80f3-a26f95b0b5d5', { isInherited: false });

function notAdditiveDecorator (value: any) {
  return function (target: any, propertyKey?: string, _descriptor?: PropertyDescriptor): any {
    Annotation.set(target, propertyKey, notAdditiveDecorator, value);
  };
};

Annotation.register(notAdditiveDecorator, '8884b470-7a4a-4d82-8429-43a9fa4881ff', { isAdditive: false });

function notRegisteredDecorator (value: any) {
  return function (target: any, propertyKey?: string, _descriptor?: PropertyDescriptor): any {
    Annotation.set(target, propertyKey, notRegisteredDecorator, value);
  };
};

describe('Annotation', () => {
  it('When initialized, an error is thrown', async () => {
    expect(() => new Annotation()).toThrow(
      new Error('Annotation cannot be instantiated')
    );
  });

  it('When retrieving the value of a non-registered decorator, the annotation is not found', () => {
    class TargetClass {
    }

    expect(Annotation.exists(TargetClass, undefined, notRegisteredDecorator)).toBe(false);
    expect(Annotation.get(TargetClass, undefined, notRegisteredDecorator)).toBeUndefined();
  });

  it('When a non-registered decor is applied to a class, then an error is thrown', () => {
    expect(() => {
      @notRegisteredDecorator(1)
      class TargetClass { // eslint-disable-line @typescript-eslint/no-unused-vars
      }
    }).toThrow(
      new Error('The annotation has not been registered')
    );
  });

  [
    {
      description: 'an object',
      value1: { a: 1 },
      value2: { b: 2 }
    },
    {
      description: 'a boolean',
      value1: true,
      value2: false
    },
    {
      description: 'a numeric',
      value1: 10,
      value2: 20
    },
    {
      description: 'a string',
      value1: 'abc',
      value2: 'def'
    },
    {
      description: 'an undefined',
      value1: undefined,
      value2: undefined
    }
  ].forEach(value => {
    [
      {
        description: 'decorator',
        decorator,
        isInerited: true,
        isAdditive: true
      },
      {
        description: 'non-inhertied decorator',
        decorator: notInheritedDecorator,
        isInerited: false,
        isAdditive: true
      },
      {
        description: 'non-additive decorator',
        decorator: notAdditiveDecorator,
        isInerited: true,
        isAdditive: false
      }
    ].forEach(test => {
      it(`When ${value.description} ${test.description} is not applied to a class, the annotation is not found`, () => {
        class TargetClass {
          targetMethod (): void {
          }
        }

        expect(Annotation.exists(TargetClass, undefined, test.decorator)).toBe(false);
        expect(Annotation.get(TargetClass, undefined, test.decorator)).toBeUndefined();
      });

      it(`When ${value.description} ${test.description} is applied to a class, the annotation can be read`, () => {
        @test.decorator(value.value1)
        class TargetClass {
          targetMethod (): void {
          }
        }

        expect(Annotation.exists(TargetClass, undefined, test.decorator)).toBe(true);
        expect(Annotation.get(TargetClass, undefined, test.decorator)).toStrictEqual(value.value1);
      });

      if (test.isInerited) {
        it(`When ${value.description} ${test.description} is applied to a parent class, the annotation can be read`, () => {
          @test.decorator(value.value1)
          class ParentClass {
            targetMethod (): void {
            }
          }

          class ChildClass extends ParentClass {
            targetMethod (): void {
            }
          }

          expect(Annotation.exists(ParentClass, undefined, test.decorator)).toBe(true);
          expect(Annotation.get(ParentClass, undefined, test.decorator)).toStrictEqual(value.value1);
          expect(Annotation.exists(ChildClass, undefined, test.decorator)).toBe(true);
          expect(Annotation.get(ChildClass, undefined, test.decorator)).toStrictEqual(value.value1);
        });
      } else {
        it(`When ${value.description} ${test.description} is applied to a parent class, the annotation is not found`, () => {
          @test.decorator(value.value1)
          class ParentClass {
            targetMethod (): void {
            }
          }

          class ChildClass extends ParentClass {
            targetMethod (): void {
            }
          }

          expect(Annotation.exists(ParentClass, undefined, test.decorator)).toBe(true);
          expect(Annotation.get(ParentClass, undefined, test.decorator)).toStrictEqual(value.value1);
          expect(Annotation.exists(ChildClass, undefined, test.decorator)).toBe(false);
          expect(Annotation.get(ChildClass, undefined, test.decorator)).toBeUndefined();
        });
      }

      if (test.isInerited && test.isAdditive && _.isObject(value.value1) && _.isObject(value.value2)) {
        it(`When ${value.description} ${test.description} is applied to a child and parent class, the annotation values are merged`, () => {
          @test.decorator(value.value1)
          class ParentClass {
            targetMethod (): void {
            }
          }

          @test.decorator(value.value2)
          class ChildClass extends ParentClass {
            targetMethod (): void {
            }
          }

          expect(Annotation.exists(ParentClass, undefined, test.decorator)).toBe(true);
          expect(Annotation.get(ParentClass, undefined, test.decorator)).toStrictEqual(value.value1);
          expect(Annotation.exists(ChildClass, undefined, test.decorator)).toBe(true);
          expect(Annotation.get(ChildClass, undefined, test.decorator)).toStrictEqual({
            ...value.value1 as Record<string, any>,
            ...value.value2 as Record<string, any>
          });
        });
      } else {
        it(`When ${value.description} ${test.description} is applied to a child and parent class, the annotation values are not merged`, () => {
          @test.decorator(value.value1)
          class ParentClass {
            targetMethod (): void {
            }
          }

          @test.decorator(value.value2)
          class ChildClass extends ParentClass {
            targetMethod (): void {
            }
          }

          expect(Annotation.exists(ParentClass, undefined, test.decorator)).toBe(true);
          expect(Annotation.get(ParentClass, undefined, test.decorator)).toStrictEqual(value.value1);
          expect(Annotation.exists(ChildClass, undefined, test.decorator)).toBe(true);
          expect(Annotation.get(ChildClass, undefined, test.decorator)).toStrictEqual(value.value2);
        });
      }

      it(`When ${value.description} ${test.description} is applied to a class method which does not exist, the annotation is not found`, () => {
        class TargetClass {
        }

        Annotation.set(TargetClass, 'targetMethod', test.decorator, true);

        expect(Annotation.exists(TargetClass, 'targetMethod', test.decorator)).toBe(false);
        expect(Annotation.get(TargetClass, 'targetMethod', test.decorator)).toBeUndefined();
      });

      it(`When ${value.description} ${test.description} is not applied to a class method, the annotation is not found`, () => {
        class TargetClass {
          targetMethod (): void {
          }
        }

        expect(Annotation.exists(TargetClass, 'targetMethod', test.decorator)).toBe(false);
        expect(Annotation.get(TargetClass, 'targetMethod', test.decorator)).toBeUndefined();
      });

      it(`When ${value.description} ${test.description} is not applied to a class and not a class method, the annotation is not found`, () => {
        @test.decorator(value.value1)
        class TargetClass {
          targetMethod (): void {
          }
        }

        expect(Annotation.exists(TargetClass, 'targetMethod', test.decorator)).toBe(false);
        expect(Annotation.get(TargetClass, 'targetMethod', test.decorator)).toBeUndefined();
      });

      it(`When ${value.description} ${test.description} is applied to a class method, the annotation can be read`, () => {
        class TargetClass {
          @test.decorator(value.value1)
          targetMethod (): void {
          }
        }

        expect(Annotation.exists(TargetClass, 'targetMethod', test.decorator)).toBe(true);
        expect(Annotation.get(TargetClass, 'targetMethod', test.decorator)).toStrictEqual(value.value1);
      });

      if (test.isInerited) {
        it(`When ${value.description} ${test.description} is applied to a parent class method, the annotation can be read`, () => {
          class ParentClass {
            @test.decorator(value.value1)
            targetMethod (): void {
            }
          }

          class ChildClass extends ParentClass {
            targetMethod (): void {
            }
          }

          expect(Annotation.exists(ParentClass, 'targetMethod', test.decorator)).toBe(true);
          expect(Annotation.get(ParentClass, 'targetMethod', test.decorator)).toStrictEqual(value.value1);
          expect(Annotation.exists(ChildClass, 'targetMethod', test.decorator)).toBe(true);
          expect(Annotation.get(ChildClass, 'targetMethod', test.decorator)).toStrictEqual(value.value1);
        });
      } else {
        it(`When ${value.description} ${test.description} is applied to a parent class method, the annotation is not found`, () => {
          class ParentClass {
            @test.decorator(value.value1)
            targetMethod (): void {
            }
          }

          class ChildClass extends ParentClass {
            targetMethod (): void {
            }
          }

          expect(Annotation.exists(ParentClass, 'targetMethod', test.decorator)).toBe(true);
          expect(Annotation.get(ParentClass, 'targetMethod', test.decorator)).toStrictEqual(value.value1);
          expect(Annotation.exists(ChildClass, 'targetMethod', test.decorator)).toBe(false);
          expect(Annotation.get(ChildClass, 'targetMethod', test.decorator)).toBeUndefined();
        });
      }

      if (test.isInerited && test.isAdditive && _.isObject(value.value1) && _.isObject(value.value2)) {
        it(`When ${value.description} ${test.description} is applied to a child and parent class method, the annotation values are merged`, () => {
          class ParentClass {
            @test.decorator(value.value1)
            targetMethod (): void {
            }
          }

          class ChildClass extends ParentClass {
            @test.decorator(value.value2)
            targetMethod (): void {
            }
          }

          expect(Annotation.exists(ParentClass, 'targetMethod', test.decorator)).toBe(true);
          expect(Annotation.get(ParentClass, 'targetMethod', test.decorator)).toStrictEqual(value.value1);
          expect(Annotation.exists(ChildClass, 'targetMethod', test.decorator)).toBe(true);
          expect(Annotation.get(ChildClass, 'targetMethod', test.decorator)).toStrictEqual({
            ...value.value1 as Record<string, any>,
            ...value.value2 as Record<string, any>
          });
        });
      } else {
        it(`When ${value.description} ${test.description} is applied to a child and parent class method, the annotation values are not merged`, () => {
          class ParentClass {
            @test.decorator(value.value1)
            targetMethod (): void {
            }
          }

          class ChildClass extends ParentClass {
            @test.decorator(value.value2)
            targetMethod (): void {
            }
          }

          expect(Annotation.exists(ParentClass, 'targetMethod', test.decorator)).toBe(true);
          expect(Annotation.get(ParentClass, 'targetMethod', test.decorator)).toStrictEqual(value.value1);
          expect(Annotation.exists(ChildClass, 'targetMethod', test.decorator)).toBe(true);
          expect(Annotation.get(ChildClass, 'targetMethod', test.decorator)).toStrictEqual(value.value2);
        });
      }

      it(`When ${value.description} ${test.description} is not applied to a static class method, the annotation is not found`, () => {
        class TargetClass {
          static targetMethod (): void {
          }
        }

        expect(Annotation.exists(TargetClass, 'targetMethod', test.decorator)).toBe(false);
        expect(Annotation.get(TargetClass, 'targetMethod', test.decorator)).toBeUndefined();
      });

      it(`When ${value.description} ${test.description} is applied to a static class method, the annotation can be read`, () => {
        class TargetClass {
          @test.decorator(value.value1)
          static targetMethod (): void {
          }
        }

        expect(Annotation.exists(TargetClass, 'targetMethod', test.decorator)).toBe(true);
        expect(Annotation.get(TargetClass, 'targetMethod', test.decorator)).toStrictEqual(value.value1);
      });

      if (test.isInerited) {
        it(`When ${value.description} ${test.description} is applied to a parent static class method, the annotation can be read`, () => {
          class ParentClass {
            @test.decorator(value.value1)
            static targetMethod (): void {
            }
          }

          class ChildClass extends ParentClass {
            static targetMethod (): void {
            }
          }

          expect(Annotation.exists(ParentClass, 'targetMethod', test.decorator)).toBe(true);
          expect(Annotation.get(ParentClass, 'targetMethod', test.decorator)).toStrictEqual(value.value1);
          expect(Annotation.exists(ChildClass, 'targetMethod', test.decorator)).toBe(true);
          expect(Annotation.get(ChildClass, 'targetMethod', test.decorator)).toStrictEqual(value.value1);
        });
      } else {
        it(`When ${value.description} ${test.description} is applied to a parent static class method, the annotation is not found`, () => {
          class ParentClass {
            @test.decorator(value.value1)
            static targetMethod (): void {
            }
          }

          class ChildClass extends ParentClass {
            static targetMethod (): void {
            }
          }

          expect(Annotation.exists(ParentClass, 'targetMethod', test.decorator)).toBe(true);
          expect(Annotation.get(ParentClass, 'targetMethod', test.decorator)).toStrictEqual(value.value1);
          expect(Annotation.exists(ChildClass, 'targetMethod', test.decorator)).toBe(false);
          expect(Annotation.get(ChildClass, 'targetMethod', test.decorator)).toBeUndefined();
        });
      }

      if (test.isInerited && test.isAdditive && _.isObject(value.value1) && _.isObject(value.value2)) {
        it(`When ${value.description} ${test.description} is applied to a child and parent static class method, the annotation values are merged`, () => {
          class ParentClass {
            @test.decorator(value.value1)
            static targetMethod (): void {
            }
          }

          class ChildClass extends ParentClass {
            @test.decorator(value.value2)
            static targetMethod (): void {
            }
          }

          expect(Annotation.exists(ParentClass, 'targetMethod', test.decorator)).toBe(true);
          expect(Annotation.get(ParentClass, 'targetMethod', test.decorator)).toStrictEqual(value.value1);
          expect(Annotation.exists(ChildClass, 'targetMethod', test.decorator)).toBe(true);
          expect(Annotation.get(ChildClass, 'targetMethod', test.decorator)).toStrictEqual({
            ...value.value1 as Record<string, any>,
            ...value.value2 as Record<string, any>
          });
        });
      } else {
        it(`When ${value.description} ${test.description} is applied to a child and parent static class method, the annotation values are not merged`, () => {
          class ParentClass {
            @test.decorator(value.value1)
            static targetMethod (): void {
            }
          }

          class ChildClass extends ParentClass {
            @test.decorator(value.value2)
            static targetMethod (): void {
            }
          }

          expect(Annotation.exists(ParentClass, 'targetMethod', test.decorator)).toBe(true);
          expect(Annotation.get(ParentClass, 'targetMethod', test.decorator)).toStrictEqual(value.value1);
          expect(Annotation.exists(ChildClass, 'targetMethod', test.decorator)).toBe(true);
          expect(Annotation.get(ChildClass, 'targetMethod', test.decorator)).toStrictEqual(value.value2);
        });
      }
    });
  });

  it('When searching for classes in a child path, then the classes are found', async () => {
    const classesArray = await Annotation.getClassesAnnotatedWith('./data', Path);
    const pathArray: string[] = [];

    for (const clazz of classesArray) {
      const path = Annotation.get(clazz, undefined, Path);

      pathArray.push(path.path);
    }

    expect(pathArray.sort()).toStrictEqual([
      '/v1/products',
      '/v1/users',
      '/v1/users/{id}/products'
    ]);
  });

  it('When searching for classes in a parent path, then the classes are found', async () => {
    const classesArray = await Annotation.getClassesAnnotatedWith('../data', Path);
    const pathArray: string[] = [];

    for (const clazz of classesArray) {
      const path = Annotation.get(clazz, undefined, Path);

      pathArray.push(path.path);
    }

    expect(pathArray.sort()).toStrictEqual([
      '/v1/products',
      '/v1/users',
      '/v1/users/{id}/products'
    ]);
  });

  it('When searching for classes in a sibling path, then the classes are found', async () => {
    const classesArray = await Annotation.getClassesAnnotatedWith('./', Path);
    const pathArray: string[] = [];

    for (const clazz of classesArray) {
      const path = Annotation.get(clazz, undefined, Path);

      pathArray.push(path.path);
    }

    expect(pathArray.sort()).toStrictEqual([
      '/v1/products',
      '/v1/users',
      '/v1/users/{id}/products'
    ]);
  });

  it('When searching for inline JavaScript classes, then the classes are found', async () => {
    const examplePath = `examples${path.sep}typescript${path.sep}inline`;

    execSyncWithOutput(`cd ${examplePath} && npm ci --prefer-offline`);
    execSyncWithOutput(`cd ${examplePath} && npm run build`);

    let output = execSync(`cd ${examplePath} && node src${path.sep}index.js`);

    expect(output.toString()).toBe("[ '/v1/products', '/v1/users', '/v1/users/{id}/products' ]\n");

    output = execSync(`cd ${examplePath} && ts-node src${path.sep}index.ts`);

    expect(output.toString()).toBe("[ '/v1/products', '/v1/users', '/v1/users/{id}/products' ]\n");
  }, 30000);

  it('When searching for JavaScript classes in outDir, then the classes are found', async () => {
    const examplePath = `examples${path.sep}typescript${path.sep}separate`;

    execSyncWithOutput(`cd ${examplePath} && npm ci --prefer-offline`);
    execSyncWithOutput(`cd ${examplePath} && npm run build`);

    let output = execSync(`cd ${examplePath} && node dist${path.sep}src${path.sep}index.js`);

    expect(output.toString()).toBe("[ '/v1/products', '/v1/users', '/v1/users/{id}/products' ]\n");

    output = execSync(`cd ${examplePath} && ts-node src${path.sep}index.ts`);

    expect(output.toString()).toBe("[ '/v1/products', '/v1/users', '/v1/users/{id}/products' ]\n");
  }, 30000);
});
