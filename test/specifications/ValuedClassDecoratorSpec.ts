import { Annotation } from '../../src/decorators/Annotation';

export class ValuedClassDecoratorSpec {
  decorator: (...args: any) => any;
  decoratorValue1: any;
  decoratorValue2: any;
  name: string;

  constructor (decorator: (...args: any) => any, decoratorValue1: any, decoratorValue2: any) {
    const decoratorString = decorator.toString();

    this.decorator = decorator;
    this.decoratorValue1 = decoratorValue1;
    this.decoratorValue2 = decoratorValue2;
    this.name = decoratorString.slice(9, decoratorString.indexOf('('));
  }

  describe (callback: () => void): void {
    describe(`${this.name} decorator`, () => {
      const decorator = this.decorator;

      it('When not applied to a class, the annotation is not found', () => {
        class TargetClass {
          targetMethod (): void {
          }
        }

        expect(Annotation.exists(TargetClass, undefined, this.decorator)).toBe(false);
        expect(Annotation.get(TargetClass, undefined, this.decorator)).toBeUndefined();
      });

      it('When applied to a class, the annotation can be read', () => {
        @decorator(this.decoratorValue1)
        class TargetClass {
          targetMethod (): void {
          }
        }

        expect(Annotation.exists(TargetClass, undefined, this.decorator)).toBe(true);
        expect(Annotation.get(TargetClass, undefined, this.decorator)).toStrictEqual(this.decoratorValue1);
      });

      it('When applied to a child and parent class, the annotation can be read', () => {
        @decorator(this.decoratorValue1)
        class ParentClass {
          targetMethod (): void {
          }
        }

        @decorator(this.decoratorValue2)
        class ChildClass {
          targetMethod (): void {
          }
        }

        expect(Annotation.exists(ParentClass, undefined, this.decorator)).toBe(true);
        expect(Annotation.get(ParentClass, undefined, this.decorator)).toStrictEqual(this.decoratorValue1);
        expect(Annotation.exists(ChildClass, undefined, this.decorator)).toBe(true);
        expect(Annotation.get(ChildClass, undefined, this.decorator)).toStrictEqual(this.decoratorValue2);
      });

      callback();
    });
  }
}
