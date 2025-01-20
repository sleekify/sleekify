import { Annotation, Path } from '@sleekify/sleekify';
import { sync5 } from 'node-sync';
import util from 'node:util';

async function run (): Promise<object[]> {
  return await Annotation.getClassesAnnotatedWith('./v1', Path);
}

const runCallback = util.callbackify(run);

const runGenerator = sync5.co(function * () {
  return yield * sync5.lift(runCallback)();
});

sync5.proc(runGenerator)()({}, (error: any, result?: object[] ) => {
  if (error != null) {
    console.error(error);
  } else if (result != null) {
    const pathArray: string[] = [];

    for (const clazz of result) {
      const pathItemObject = Annotation.get(clazz, undefined, Path);

      pathArray.push(pathItemObject.path);
    }

    console.log(pathArray.sort());
  }
});
