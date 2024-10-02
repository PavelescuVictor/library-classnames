import { 
    IClassNamesArg,
    IUseClassNamesArgs,
    IClassNamesObject
} from './classNames.types';

/**
 * Checks if string is a valid string
 * @param {IClassNamesArg} string 
 * @returns {boolean}
 */
const isValidString = (string: IClassNamesArg): boolean =>  typeof string === 'string' && string !== "";

/**
 * Checks if array is a valid array
 * @param {IClassNamesArg} array 
 * @returns {boolean}
 */
const isValidArray = (array: IClassNamesArg): boolean => Array.isArray(array) && !!array.length;

/**
 * Checks if object is a valid object
 * @param {IClassNamesArg} object 
 * @returns {boolean}
 */
const isValidObject = (object: IClassNamesArg): boolean => typeof object === 'object' && !!Object.keys(object).length;

/**
 * Check if classNames is a valid format
 * @param {IClassNamesArg} arg
 * @returns {boolean} 
 */
const isValidArg = (arg: IClassNamesArg): boolean => {
    if ( !arg || !isValidString(arg) || !isValidArray(arg) || !isValidObject(arg)) {
        return false;
    }
    return true;
}

/**
 * Adds string to the classNames set. If separation by " " found, adds each separated part individually.
 * @param {Set<string>} classNames 
 * @param {string} payload 
 * @returns {void}
 */
const addString = (classNames: Set<string>, payload: string): void => {
    if (!payload) {
        return;
    }
    if (payload.includes(" ")) {
        addArray(classNames, payload.split(" "));
    }
    if (classNames.has(payload)) {
        return;
    }
    classNames.add(payload);
}

/**
 * Adds array to the classNames set. Trimming and filtering empty elements
 * @param {Set<string>} classNames 
 * @param {Array<IClassNamesArg>} payload 
 */
const addArray = (classNames: Set<string>, payload: Array<IClassNamesArg>): void => {
    if (!payload || !payload.length) {
        return;
    }

    (payload
    .filter(className => isValidString(className)) as Array<string>)
    .map(className => className.trim())
    .forEach(className => {
        addString(classNames, className);
    })
}

/**
 * Adds each key of object to the classNames set if value for key is truthy.
 * @param {Set<string>} classNames 
 * @param {IClassNamesObject} payload 
 */
const addObject = (classNames: Set<string>, payload: IClassNamesObject): void => {
    if (!isValidObject(payload)) {
        return;
    }

    Object.keys(payload).forEach(className => {
        if (!!payload[className]) {
            addString(classNames, className);
            return;
        }
        classNames.delete(className);
    })
}

/**
 * Check if there are arguments passed.
 * @param {IUseClassNamesArgs} args 
 * @returns {boolean}
 */
const validArgs = (args: IUseClassNamesArgs): boolean => {
    if (!args.length) {
        return false;
    }
    return true;
}

/**
 * Sanitizes list of arguments. Removing the ones that are not valid
 * @param {IUseClassNamesArgs} args 
 * @returns {IUseClassNamesArgs} santizied list of args after removing the ones that are not valid
 */
const sanitizeArgs = (args: IUseClassNamesArgs): IUseClassNamesArgs => args.filter((arg: IClassNamesArg) => isValidArg(arg));

/**
 * Construct the string of classNames
 * @param {IUseClassNamesArgs} args 
 * @returns {string}
 */
const classNames = (...args: IUseClassNamesArgs): string => {
    const classNames = new Set<string>();
    args.forEach((arg: IClassNamesArg) => {
        if (isValidString(arg)) {
            addString(classNames, arg as string);
            return;
        }

        if (isValidArray(arg)) {
            addArray(classNames, arg as Array<IClassNamesArg>);
            return;
        }

        if (isValidObject(arg)) {
            addObject(classNames, arg as IClassNamesObject);
        }
    });
    return [...classNames.values()].join(" ") as string;
}

/**
 * Cached version of the classNames function
 * @returns {Function}
 */
const memoizedClassNames = (func: typeof classNames): Function => {
    const _cache = new Map<string, string>();
    
    /**
     * @param {Array<IUseClassNamesArgs>} args - Arrays of arguments passed to the classNames function
     * @returns {string} the classnames as a formatted string joined by " "
     */
    return (...args: IUseClassNamesArgs) : string => {
        if (!validArgs(args)) {
            return "";
        }

        const newArgs = sanitizeArgs(args);
        if (!validArgs(args)) {
            return "";
        }

        const key = JSON.stringify(args);
        if (_cache.has(key)) {
            return _cache.get(key) || "";
        }

        const results = func.apply(this, newArgs)
        _cache.set(key, results);
        return results;
    }
};

export default memoizedClassNames(classNames);