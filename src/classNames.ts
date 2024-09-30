import { 
    IClassNamesProp,
    IUseClassNamesArgs,
    IClassNamesObject
} from './classNames.types';

/**
 * Checks if string is a valid string
 * @param {IClassNamesProp} string 
 * @returns {boolean}
 */
const isValidString = (string: IClassNamesProp) : boolean =>  typeof string === 'string' && string !== "";

/**
 * Checks if array is a valid array
 * @param {IClassNamesProp} array 
 * @returns {boolean}
 */
const isValidArray = (array: IClassNamesProp) : boolean => Array.isArray(array) && !!array.length;

/**
 * Checks if object is a valid object
 * @param {IClassNamesProp} object 
 * @returns {boolean}
 */
const isValidObject = (object: IClassNamesProp) : boolean => typeof object === 'object' && !!Object.keys(object).length;

/**
 * Check if classNames is a valid format
 * @param {IClassNamesProp} classNames 
 * @returns {boolean} 
 */
const isValidData = (classNames: IClassNamesProp) : boolean => {
    if ( !classNames || !isValidString(classNames) || !isValidArray(classNames) || !isValidObject(classNames)) {
        return false;
    }
    return true;
}

/**
 * Adds string to the classNames set. If separation by " " found, adds each separated part individually.
 * @param {Set<string>} classNames 
 * @param {string} specificClassNames 
 * @returns {void}
 */
const addString = (classNames: Set<string>, specificClassNames: string) : void => {
    if (!specificClassNames) {
        return;
    }
    if (specificClassNames.includes(" ")) {
        addArray(classNames, specificClassNames.split(" "));
    }
    if (classNames.has(specificClassNames)) {
        return;
    }
    classNames.add(specificClassNames);
}

/**
 * Adds array to the classNames set. Trimming and filtering empty elements
 * @param {Set<string>} classNames 
 * @param {Array<IClassNamesProp>} specificClassNames 
 */
const addArray = (classNames: Set<string>, specificClassNames: Array<IClassNamesProp>) : void => {
    if (!specificClassNames || !specificClassNames.length) {
        return;
    }

    (specificClassNames
    .filter(className => isValidString(className)) as Array<string>)
    .map(className => className.trim())
    .forEach(className => {
        addString(classNames, className);
    })
}

/**
 * Adds each key of object to the classNames set if value for key is truthy.
 * @param {Set<string>} classNames 
 * @param {IClassNamesObject} specificClassNames 
 */
const addObject = (classNames: Set<string>, specificClassNames: IClassNamesObject) : void => {
    if (!isValidObject(specificClassNames)) {
        return;
    }

    Object.keys(specificClassNames).forEach(className => {
        if (!!specificClassNames[className]) {
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
const validArgs = (args: IUseClassNamesArgs) : boolean => {
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
const sanitizeArgs = (args: IUseClassNamesArgs) : IUseClassNamesArgs =>  {
    return args.filter((specificClassNames: IClassNamesProp) => isValidData(specificClassNames))
}

/**
 * Construct the string of classNames
 * @param {IUseClassNamesArgs} args 
 * @returns {string}
 */
const classNames = (...args: IUseClassNamesArgs) : string => {
    const classNames = new Set<string>();
    args.forEach((specificClassNames: IClassNamesProp) => {
        if (isValidString(specificClassNames)) {
            addString(classNames, specificClassNames as string);
            return;
        }
        if (isValidArray(specificClassNames)) {
            addArray(classNames, specificClassNames as Array<IClassNamesProp>);
            return;
        }
        if (isValidObject(specificClassNames)) {
            addObject(classNames, specificClassNames as IClassNamesObject);
        }
    });
    return [...classNames.values()].join(" ") as string;
}

/**
 * Cached version of the classNames function
 * @returns {Function}
 */
const memoizedClassNames = (func: typeof classNames) : Function => {
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