import { Annotation } from '../../src/decorators/Annotation';

export class EmptyMethodDecoratorSpec {
  decorator: (...args: any) => any;
  name: string;

  constructor (decorator: (...args: any) => any) {
    const decoratorString = decorator.toString();

    this.decorator = decorator;
    this.name = decoratorString.slice(9, decoratorString.indexOf('('));
  }

  describe (callback: () => void): void {
    describe(`${this.name} decorator`, () => {
      const decorator = this.decorator;

      it('When not applied to a class method, the annotation is not found', () => {
        class TargetClass {
          targetMethod (): void {
          }
        }

        expect(Annotation.get(TargetClass, 'targetMethod', this.decorator)).toBeUndefined();
        expect(Annotation.exists(TargetClass, 'targetMethod', this.decorator)).toBe(false);
      });

      it('When applied to a class method, the annotation can be read', () => {
        class TargetClass {
          @decorator
          targetMethod (): void {
          }
        }

        expect(Annotation.exists(TargetClass, 'targetMethod', this.decorator)).toBe(true);
        expect(Annotation.get(TargetClass, 'targetMethod', this.decorator)).toBeUndefined();
      });

      it('When applied to a parent and child class method, the annotation can be read', () => {
        class ParentClass {
          @decorator
          parentMethod (): void {
          }
        }

        class ChildClass extends ParentClass {
          @decorator
          childMethod (): void {
          }

          parentMethod (): void {
          }
        }

        expect(Annotation.exists(ParentClass, 'parentMethod', this.decorator)).toBe(true);
        expect(Annotation.get(ParentClass, 'parentMethod', this.decorator)).toBeUndefined();
        expect(Annotation.exists(ChildClass, 'parentMethod', this.decorator)).toBe(true);
        expect(Annotation.get(ChildClass, 'parentMethod', this.decorator)).toBeUndefined();
        expect(Annotation.exists(ChildClass, 'childMethod', this.decorator)).toBe(true);
        expect(Annotation.get(ChildClass, 'childMethod', this.decorator)).toBeUndefined();
      });

      it('When applied to a parent class method, the annotation can be read', () => {
        class ParentClass {
          @decorator()
          parentMethod (): void {
          }
        }

        class ChildClass extends ParentClass {}

        expect(Annotation.exists(ParentClass, 'parentMethod', this.decorator)).toBe(true);
        expect(Annotation.get(ParentClass, 'parentMethod', this.decorator)).toBeUndefined();
        expect(Annotation.exists(ChildClass, 'parentMethod', this.decorator)).toBe(true);
        expect(Annotation.get(ChildClass, 'parentMethod', this.decorator)).toBeUndefined();
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
          @decorator
          static targetMethod (): void {
          }
        }

        expect(Annotation.exists(TargetClass, 'targetMethod', this.decorator)).toBe(true);
        expect(Annotation.get(TargetClass, 'targetMethod', this.decorator)).toBeUndefined();
      });

      it('When applied to a parent and child static class method, the annotation can be read', () => {
        class ParentClass {
          @decorator
          static parentMethod (): void {
          }
        }

        class ChildClass extends ParentClass {
          @decorator
          static childMethod (): void {
          }

          static parentMethod (): void {
          }
        }

        expect(Annotation.exists(ParentClass, 'parentMethod', this.decorator)).toBe(true);
        expect(Annotation.get(ParentClass, 'parentMethod', this.decorator)).toBeUndefined();
        expect(Annotation.exists(ChildClass, 'parentMethod', this.decorator)).toBe(true);
        expect(Annotation.get(ChildClass, 'parentMethod', this.decorator)).toBeUndefined();
        expect(Annotation.exists(ChildClass, 'childMethod', this.decorator)).toBe(true);
        expect(Annotation.get(ChildClass, 'childMethod', this.decorator)).toBeUndefined();
      });

      callback();
    });
  }
}
