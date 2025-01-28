import { Annotation } from '../../src/decorators/Annotation';

export class ValuedMethodDecoratorSpec {
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

      it('When not applied to a class method, the annotation cannot be read', () => {
        class TargetClass {
          targetMethod (): void {
          }
        }

        expect(Annotation.exists(TargetClass, 'targetMethod', this.decorator)).toBe(false);
        expect(Annotation.get(TargetClass, 'targetMethod', this.decorator)).toBeUndefined();
      });

      it('When applied to a class method, the annotation can be read', () => {
        class TargetClass {
          @decorator(this.decoratorValue1)
          targetMethod (): void {
          }
        }

        expect(Annotation.exists(TargetClass, 'targetMethod', this.decorator)).toBe(true);
        expect(Annotation.get(TargetClass, 'targetMethod', this.decorator)).toStrictEqual(this.decoratorValue1);
      });

      it('When applied to a parent and child class method, the annotation can be read', () => {
        class ParentClass {
          @decorator(this.decoratorValue1)
          parentMethod (): void {
          }
        }

        class ChildClass extends ParentClass {
          @decorator(this.decoratorValue2)
          childMethod (): void {
          }

          parentMethod (): void {
          }
        }

        expect(Annotation.exists(ParentClass, 'parentMethod', this.decorator)).toBe(true);
        expect(Annotation.get(ParentClass, 'parentMethod', this.decorator)).toStrictEqual(this.decoratorValue1);
        expect(Annotation.exists(ChildClass, 'parentMethod', this.decorator)).toBe(true);
        expect(Annotation.get(ChildClass, 'parentMethod', this.decorator)).toStrictEqual(this.decoratorValue1);
        expect(Annotation.exists(ChildClass, 'childMethod', this.decorator)).toBe(true);
        expect(Annotation.get(ChildClass, 'childMethod', this.decorator)).toStrictEqual(this.decoratorValue2);
      });

      it('When applied to a parent class method, the annotation can be read', () => {
        class ParentClass {
          @decorator(this.decoratorValue1)
          parentMethod (): void {
          }
        }

        class ChildClass extends ParentClass {}

        expect(Annotation.exists(ParentClass, 'parentMethod', this.decorator)).toBe(true);
        expect(Annotation.get(ParentClass, 'parentMethod', this.decorator)).toStrictEqual(this.decoratorValue1);
        expect(Annotation.exists(ChildClass, 'parentMethod', this.decorator)).toBe(true);
        expect(Annotation.get(ChildClass, 'parentMethod', this.decorator)).toStrictEqual(this.decoratorValue1);
      });

      it('When not applied to a static class method, the annotation is not found', () => {
        class TargetClass {
          static targetMethod (): void {
          }
        }

        expect(Annotation.exists(TargetClass, 'targetMethod', this.decorator)).toBe(false);
        expect(Annotation.get(TargetClass, 'targetMethod', this.decorator)).toBeUndefined();
      });

      it('When applied to a static class method, the annotation can be read', () => {
        class TargetClass {
          @decorator(this.decoratorValue1)
          static targetMethod (): void {
          }
        }

        expect(Annotation.exists(TargetClass, 'targetMethod', this.decorator)).toBe(true);
        expect(Annotation.get(TargetClass, 'targetMethod', this.decorator)).toStrictEqual(this.decoratorValue1);
      });

      it('When applied to a parent and child static class method, the annotation can be read', () => {
        class ParentClass {
          @decorator(this.decoratorValue1)
          static parentMethod (): void {
          }
        }

        class ChildClass extends ParentClass {
          @decorator(this.decoratorValue2)
          static childMethod (): void {
          }

          static parentMethod (): void {
          }
        }

        expect(Annotation.exists(ParentClass, 'parentMethod', this.decorator)).toBe(true);
        expect(Annotation.get(ParentClass, 'parentMethod', this.decorator)).toStrictEqual(this.decoratorValue1);
        expect(Annotation.exists(ChildClass, 'parentMethod', this.decorator)).toBe(true);
        expect(Annotation.get(ChildClass, 'parentMethod', this.decorator)).toStrictEqual(this.decoratorValue1);
        expect(Annotation.exists(ChildClass, 'childMethod', this.decorator)).toBe(true);
        expect(Annotation.get(ChildClass, 'childMethod', this.decorator)).toStrictEqual(this.decoratorValue2);
      });

      callback();
    });
  }
}
