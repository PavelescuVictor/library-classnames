
type ObjectPayload = {
    [key: string]: boolean | 1;
}
type ArrayPayload = Array<string | ArrayPayload | ObjectPayload>
type Payload = string | ArrayPayload | ObjectPayload

class Validator {
    instance: any;
    constructor() {
        if (this.instance) {
            return this.instance;
        }
        else this.instance = this;
    }

    getInstance() {
        return this;
    }

    validate(payload: unknown) {
        if (payload === "" || payload === undefined) {
            return false;
        }
        return true;
    }
}

class StringValidator extends Validator {
    constructor() {
        super();
    }

    validate(payload: string) {
        if (!super.validate(payload)) {
            return false;
        }
        if (payload === " " || payload.replace(" ", "") === "") {
            return false;
        }
        return true;
    }
}

class ArrayValidator extends Validator {
    constructor() {
        super();
    }

    validate(payload: ArrayPayload) {
        if (!super.validate(payload)) {
            return false;
        }
        return true;
    }
}

class ObjectValidator extends Validator  {
    constructor() {
        super();
    }

    validate(payload: ObjectPayload) {
        if (!super.validate(payload)) {
            return false;
        }
        return true;
    }
}

class ValidateController {
    validator: Validator;
    constructor() {
        this.validator = new Validator();
    }

    setValidator(validator: Validator) {
        this.validator = validator;
    }

    validate(value: Payload) {
        if (typeof value === 'string') {
            this.setValidator(new StringValidator());
        }
        if (Array.isArray(value)) {
            this.setValidator(new ArrayValidator());
        }
        if (typeof value === 'object') {
            this.setValidator(new ObjectValidator());
        }
        return this.validator.validate(value);
    }
}

class Parser {
    instance: any;
    constructor() {
        if (this.instance) {
            return this.instance;
        }
        else this.instance = this;
    }

    getInstance() {
        return this;
    }

    parse(payload: Payload): Payload {
        return payload;
    }
}

class StringPayloadParser extends Parser {
    constructor() {
        super();
    }

    parse(payload: string): string {
        let parsedPayload = super.parse(payload as string) as string;
        return parsedPayload;
    }
}

class ArrayPayloadParser extends Parser {
    constructor() {
        super();
    }

    parse(payload: string) {
        let parsedPayload = super.parse(payload as string) as string;
        return parsedPayload;
    }
}

class ObjectPayloadParser extends Parser {
    constructor() {
        super();
    }

    validate(payload: string) {
        let parsedPayload = super.parse(payload as string) as string;
        return parsedPayload;
    }
}

class ParserController{
    parser: Parser = new Parser();
    validator: ValidateController = new ValidateController();

    constructor() {
    }

    setParser(parser: Parser) {
        this.parser = parser;
    }

    parse(...args:any) {
        args.forEach((arg: Payload) => {
            if (!this.validator.validate) {
                return;
            }
            if (typeof arg === "string") {
                this.setParser(new StringPayloadParser());
            }
            if (Array.isArray(arg)) {
                this.setParser(new ArrayPayloadParser());
            }
            if (typeof arg === "object") {
                this.setParser(new ObjectPayloadParser());
            }
        })
    }
}

class Classnames {
    classNames: Set<string>;
    parser: ParserController = new ParserController();
    constructor() {
        this.classNames = new Set<string>();
    }

    _getClassNames() {
        return this.classNames;
    }

    classnames(...args: any) {
        this.parser.parse(args);
        return this._getClassNames();
    }
}

export default new Classnames().classnames();