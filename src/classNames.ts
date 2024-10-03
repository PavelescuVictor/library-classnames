import { 
    IClassNamesArg,
    IUseClassNamesArgs,
    IClassNamesObject
} from './classNames.types';

const SPACE_CHARACTER = " "

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
const isValidObject = (object: IClassNamesArg): boolean =>  typeof object === 'object' && object && !!Object.keys(object).length;

/**
 * Check if classNames is a valid format
 * @param {IClassNamesArg} arg
 * @returns {boolean} 
 */
const isValidArg = (arg: IClassNamesArg): boolean => {
    if (!arg) {
        return false;
    }
    if (!isValidString(arg) && !isValidArray(arg) && !isValidObject(arg)) {
        return false;
    }
    return true;
}

/**
 * Adds string to the classNames set. If separation by @constant SPACE_CHARACTER found, adds each separated part individually.
 * @param {Set<string>} classNames 
 * @param {string} payload 
 * @returns {void}
 */
const addString = (classNames: Set<string>, payload: string): void => {
    if (!payload || typeof payload !== 'string' || !payload.replace(SPACE_CHARACTER, "").length) {
        return;
    }
    const trimmedPayload = payload.trim();
    if (trimmedPayload.includes(SPACE_CHARACTER)) {
        addArray(classNames, trimmedPayload.split(SPACE_CHARACTER));
        return;
    }
    if (classNames.has(trimmedPayload)) {
        return;
    }
    classNames.add(trimmedPayload);
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

    payload
    .forEach(item => {
        if (isValidString(item)) {
            addString(classNames, item as string);
            return;
        }
        if (isValidArray(item)) {
            addArray(classNames, item as Array<IClassNamesArg>);
            return;
        }
        if (isValidObject(item)) {
            addObject(classNames, item as IClassNamesObject);
            return;
        }
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
        if (payload[className] === 1 || payload[className] === true) {
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
    return [...classNames.values()].join(SPACE_CHARACTER) as string;
}

/**
 * Cached version of the classNames function
 * @returns {Function}
 */
const memoizedClassNames = (func: typeof classNames): Function => {
    const _cache = new Map<string, string>();
    /**
     * @param {Array<IUseClassNamesArgs>} args - Arrays of arguments passed to the classNames function
     * @returns {string} the classnames as a formatted string joined by @constant SPACE_CHARACTER
     */
    return (...args: IUseClassNamesArgs) : string => {
        if (!validArgs(args)) {
            return "";
        }

        const newArgs = sanitizeArgs(args);
        if (!validArgs(newArgs)) {
            return "";
        }
        
        const key = JSON.stringify(args);
        if (_cache.has(key)) {
            return _cache.get(key) || "";
        }

        const results = func.apply(this, newArgs);
        _cache.set(key, results);
        return results;
    }
};

export default memoizedClassNames(classNames);
