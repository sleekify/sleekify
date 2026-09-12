import { execSync } from 'node:child_process';

export const execSyncWithOutput = (command: string): void => {
  try {
    execSync(command);
  } catch (e) {
    if ((e as any)?.stdout !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      console.log((e as any)?.stdout.toString());
    }
    throw e;
  }
};
