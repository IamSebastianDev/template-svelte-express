/** @format */

const assertEnvironment = (): boolean => !(typeof process === 'object' && String(process) === '[object process]');

export type Environment = 'development' | 'production';
export const environment = {
    get current(): 'development' | 'production' {
        let environment: Environment = 'development';

        if (assertEnvironment()) {
            if (window && (window as any).environment) {
                environment = (window as any).environment as Environment;
            }
        } else {
            if (process.env.NODE_ENV) {
                environment = process.env.NODE_ENV as Environment;
            }
        }

        return environment;
    },
};
