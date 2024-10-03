 import { describe, it, expect } from 'vitest';
 import classnames from './classNames';

 describe("Testing Suite", () => {
    describe("General", () => {
        it("Should NOT ADD a class WHEN no arguments ARE PASSED as arguments", () => {
            expect(classnames()).toBe("");
        })

        it("Should NOT ADD a class WHEN a invalid argument IS PASSED as an argument", () => {
            expect(classnames(undefined)).toBe("");
            expect(classnames(-1)).toBe("");
            expect(classnames(0)).toBe("");
            expect(classnames(false)).toBe("");
            expect(classnames(true)).toBe("");
            expect(classnames(null)).toBe("");
            expect(classnames(NaN)).toBe("");
        })
    })

    describe("Using strings", () => {
        it("Should ADD a class WHEN a valid string IS PASSED as an argument", () => {
            expect(classnames("A")).toBe("A");
        })
    
        it("Should NOT ADD a class WHEN an empty string IS PASSED as an argument", () => {
            expect(classnames("")).toBe("");
        })
    
        it("Should add multiple valid string as classes", ()=> {
            expect(classnames("A B C")).toBe("A B C");
        })
    
        it ("Should NOT ADD class/classes WHEN a string containing one or many empty spaces IS PASSED as an argument", ()=> {
            expect(classnames(" ")).toBe("");
            expect(classnames(" ".repeat(5))).toBe("");
        })
    
        it("Should ONLY ADD ONE class WHEN a string containing multiple occurances of the same string value IS PASSED as an argument", () => {
            expect(classnames("A A A")).toBe("A");
        })

        it("Should ADD classes with trimming WHEN a valid stirng payload containing empty spaces before or after IS PASSED as an argument", () => {
            expect(classnames("A ")).toBe("A");
            expect(classnames(" A")).toBe("A");
            expect(classnames(`A${" ".repeat(5)}`)).toBe("A");
            expect(classnames(`${" ".repeat(5)}A`)).toBe("A");
        })
    })

    describe("Using arrays", () => {
        it("Should NOT ADD a class WHEN empty array IS PASSED as an argument", () => {
            expect(classnames([])).toBe("");
            expect(classnames(new Array())).toBe("");
        })
    
        it("Should ADD a class WHEN a valid payload inside an array IS PASSED as an argument", () => {
            expect(classnames([ "A" ])).toBe("A");
            expect(classnames([[ "A" ]])).toBe("A");
            expect(classnames([{ "A": true }])).toBe("A");
        })

        it("Should NOT ADD a class WHEN an invalid payload inside an array IS PASSED as an argument", () => {
            expect(classnames([ "" ])).toBe("");
            expect(classnames([ " " ])).toBe("");
            expect(classnames([ " ".repeat(5) ])).toBe("");
            expect(classnames([ new String() ])).toBe("");
            expect(classnames([ NaN ])).toBe("");
            expect(classnames([ false ])).toBe("");
            expect(classnames([ true ])).toBe("");
            expect(classnames([ -1 ])).toBe("");
            expect(classnames([ 0 ])).toBe("");
            expect(classnames([ {} ])).toBe("");
            expect(classnames([ new Object ])).toBe("");
            expect(classnames([ Object.create({}) ])).toBe("");
            expect(classnames([ undefined])).toBe("");
            expect(classnames([ null ])).toBe("");
            expect(classnames([ [] ])).toBe("");
            expect(classnames([ new Array() ])).toBe("");
        })

        it("Should ADD multiple classes WHEN an array containing multiple valid strings payload IS PASSED as an argument", () => {
            expect(classnames([ "A", "B", "C" ])).toBe("A B C");
            expect(classnames([ [ "A" ], [ "B"] , [ "C" ] ])).toBe("A B C");
            expect(classnames([ { "A": true }, { "B": true }, { "C": true } ])).toBe("A B C");
        })
    
        it("Should ONLY ADD ONE class WHEN an array containing multiple of the same valid string payload IS PASSED as an argument", () => {
            expect(classnames([ "A", "A", "A" ])).toBe("A");
            expect(classnames([ [ "A" ], [ "A"] , [ "A" ] ])).toBe("A");
            expect(classnames([ { "A": true }, { "A": true }, { "A": true } ])).toBe("A");
        })
    
        it("Should NOT ADD classes WHEN an array containing multiple of the same invalid payload IS PASSED as an argument", () => {
            expect(classnames([ "", "", "" ])).toBe("");
            expect(classnames([ " ", " ", " " ])).toBe("");
            expect(classnames([ " ".repeat(5)," ".repeat(5)," ".repeat(5), ])).toBe("");
            expect(classnames([ new String(), new String(), new String() ])).toBe("");
            expect(classnames([ NaN, NaN, NaN ])).toBe("");
            expect(classnames([ false, false, false ])).toBe("");
            expect(classnames([ true, true, true ])).toBe("");
            expect(classnames([ -1, -1, -1 ])).toBe("");
            expect(classnames([ 0, 0, 0 ])).toBe("");
            expect(classnames([ {}, {}, {} ])).toBe("");
            expect(classnames([ new Object(), new Object(), new Object() ])).toBe("");
            expect(classnames([ Object.create({}), Object.create({}), Object.create({}) ])).toBe("");
            expect(classnames([ undefined, undefined, undefined ])).toBe("");
            expect(classnames([ null, null, null ])).toBe("");
            expect(classnames([ [], [], [] ])).toBe("");
            expect(classnames([ new Array(), new Array(), new Array() ])).toBe("");        
        })
    
        it("Should NOT ADD classes WHEN an array containing a mix of payloads that are invalid payloads IS PASSED as an argument", () => {
            expect(classnames([
                "", 
                " ", 
                " ".repeat(5),
                new String(),
                NaN,
                false,
                true,
                -1,
                0,
                {},
                undefined,
                null,
                [],
                new Array(),
            ])).toBe("");
        })
    
        it.skip("Should ONLY ADD classes WHEN the array payloads are valid from the ones that ARE PASSED as an argument", () => {
            expect(classnames(
                [ "A" ],
                [
                    "", 
                    " ",
                    " ".repeat(5), 
                    new String(),
                    NaN,
                    false,
                    true,
                    -1,
                    0,
                    {},
                    new Object(),
                    Object.create({}),
                    undefined,
                    null,
                    [],
                    new Array(),
                ],
                [[ "B" ]],
                [{ "C": true }]
            )).toBe("A B C");
        })
    })
    
    describe("Using objects", () => {
        it("Should NOT ADD a class WHEN empty object IS PASSED as an argument", () => {
            expect(classnames({})).toBe("");
            expect(classnames(new Object)).toBe("");
            expect(classnames(Object.create({}))).toBe("");
        })
    
        it("Should ADD a class WHEN an object with a valid keys and valid value IS PASSED as an argument", () => {
            expect(classnames({ "A": true })).toBe("A");
            expect(classnames({ "A": 1 })).toBe("A");
        })
    
        it("Should NOT ADD a class WHEN an object with a valid key but invalid value IS PASSED as an argument", () => {
            expect(classnames({ "A": "" })).toBe("");
            expect(classnames({ "A": " " })).toBe("");
            expect(classnames({ "A": " ".repeat(5) })).toBe("");
            expect(classnames({ "A": "A" })).toBe("");
            expect(classnames({ "A": new String() })).toBe("");
            expect(classnames({ "A": NaN })).toBe("");
            expect(classnames({ "A": false })).toBe("");
            expect(classnames({ "A": -1 })).toBe("");
            expect(classnames({ "A": 0 })).toBe("");
            expect(classnames({ "A": {} })).toBe("");
            expect(classnames({ "A": new Object })).toBe("");
            expect(classnames({ "A": Object.create({}) })).toBe("");
            expect(classnames({ "A": undefined })).toBe("");
            expect(classnames({ "A": null })).toBe("");
            expect(classnames({ "A": [] })).toBe("");
            expect(classnames({ "A": new Array() })).toBe("");
        })
    
        it("Should NOT ADD a class WHEN an object with an empty key and true value IS PASSED as an argument", () => {
            expect(classnames({ "": true })).toBe("");
        })

        it("Should ADD a class WHEN an object payload with multiple valid keys and valid values IS PASSED as an argument", () => {
            expect(classnames({ 
                "A": true, 
                "B": true,
                "C": true
            })).toBe("A B C");
        })
    
        it("Should ADD a class WHEN an valid object payload with multiple keys with invalid values IS PASSED as an argument", () => {
            expect(classnames({ 
                "A": "", 
                "B": " ", 
                "C": " ".repeat(5),
                "D": "D",
                "E": new String(),
                "F": NaN,
                "G": false,
                "H": -1,
                "I": 0,
                "J": {},
                "K": new Object(),
                "L": Object.create({}),
                "M": undefined,
                "N": null,
                "O": [],
                "P": new Array(),
            })).toBe("");
        })
    
        it("Should ADD a class WHEN a object with multiple empty keys IS PASSED as an argument", () => {
            expect(classnames({ 
                "": true, 
                "": true,
                "": true
            })).toBe("");
        })
    
        it("Should ADD classes WHEN multiple valid object payloads ARE PASSED as arguments", () => {
            expect(classnames({ "A": true }, { "B": true }, { "C": true })).toBe("A B C");
        })
    
        it("Should NOT ADD classes WHEN multiple invalid object payloads ARE PASSED as arguments", () => {
            expect(classnames({ "A": false }, { "B": 0 }, { "C": undefined })).toBe("");
        })
    
        it("Should ONLY ADD a class WHEN a key-value pair is valid from the object containing multiple valid and not valid key-value pairs IS PASSED as an argument", () => {
            expect(classnames({ 
                "A": "", 
                "B": " ", 
                "C": " ".repeat(5),
                "D": "D",
                "E": new String(),
                "F": NaN,
                "G": false,
                "H": -1,
                "I": 0,
                "J": {},
                "K": new Object(),
                "L": Object.create({}),
                "M": undefined,
                "N": null,
                "O": [],
                "P": new Array(),
                "Q": 1,
                "R": true,
                "": true,
                [`${"".repeat(5)}`]: true,
            })).toBe("Q R");
        })
    })

    describe("Using deep nesting", () => {
        it("Should ADD a class WHEN a valid array payload inside an array IS PASSED as an argument", () => {
            expect(classnames([[ 'A' ]])).toBe("A");
            expect(classnames([[[[[ 'A' ]]]]])).toBe("A");
        })
    
        it("Should NOT ADD a class WHEN an invalid array payload inside an array IS PASSED as an argument", () => {
            expect(classnames([[  ]])).toBe("");
            expect(classnames([[[[[ ]]]]])).toBe("");
        })

        it("Should ADD a class WHEN a valid object payload inside an array IS PASSED as an argument", () => {
            expect(classnames([{ 'A': true }])).toBe("A");
        })
    
        it("Should NOT ADD a class WHEN an invalid object payload inside an array IS PASSED as an argument", () => {
            expect(classnames([{  }])).toBe("");
        })
    })
 });