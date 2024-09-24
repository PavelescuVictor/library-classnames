import { 
    IClassNamesProp,
    IUseClassNamesArgs,
    IClassNamesObject
} from './classNames.types';

/**
 * 
 * @param specificClassNames 
 * @returns True if 
 */
const isValidData = (specificClassNames: IClassNamesProp): boolean => {
    if (
        !specificClassNames || 
        (typeof specificClassNames === 'string' && specificClassNames === "") || 
        (Array.isArray(specificClassNames) && !specificClassNames.length) ||
        (typeof specificClassNames === 'object' && !Object.keys(specificClassNames).length)
    ) {
        return false;
    }
    return true;
}

/**
 * 
 * @param classNames 
 * @param specificClassNames 
 * @returns 
 */
const appendString = (classNames: Set<string>, specificClassNames: string) => {
    if (!specificClassNames) {
        return;
    }

    if (specificClassNames.includes(" ")) {
        appendArray(classNames, specificClassNames.split(" "));
    }

    classNames.add(specificClassNames);
}

/**
 * 
 * @param classNames 
 * @param specificClassNames 
 * @returns 
 */
const appendArray = (classNames: Set<string>, specificClassNames: Array<string>) => {
    if (!specificClassNames || !specificClassNames.length) {
        return;
    }

    specificClassNames
    .map(className => className.trim())
    .filter(className => className)
    .forEach(className => {
        appendString(classNames, className);
    })

    return;
}

/**
 * 
 * @param classNames 
 * @param specificClassNames 
 * @returns 
 */
const appendObject = (classNames: Set<string>, specificClassNames: IClassNamesObject) => {
    if (!specificClassNames || !Object.keys(specificClassNames).length) {
        return;
    }

    Object.keys(specificClassNames).forEach(className => {
        if (specificClassNames[className]) {
            appendString(classNames, className);
            return;
        }

        classNames.delete(className);
    })
}

/**
 * 
 * @returns 
 */
const memoizedClassNames = () => {
    const cache = new Map();
    
    return (...args: IUseClassNamesArgs) => {
        if (cache.has(args)) {
            return cache.get(args);
        }

        const classNames = new Set<string>();

        if (!args.length) {
            return "";
        }

        const newArgs = args.filter((specificClassNames: IClassNamesProp) => isValidData(specificClassNames))
        newArgs.forEach((specificClassNames: IClassNamesProp) => {
            if (typeof specificClassNames === 'string') {
                appendString(classNames, specificClassNames);
                return;
            }

            if (Array.isArray(specificClassNames)) {
                appendArray(classNames, specificClassNames);
                return;
            }

            if (typeof specificClassNames === 'object') {
                appendObject(classNames, specificClassNames);
            }
        });

        const results = [...classNames.values()].join(" ") as string;
        cache.set(args, results);
        return results;
    }
};

export default memoizedClassNames();