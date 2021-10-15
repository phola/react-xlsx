const Cell = require("./Cell")
// @ponicode
describe("Cell.mapCell", () => {
    test("0", () => {
        let callFunction = () => {
            Cell.mapCell([56784, "bc23a9d531064583ace8f67dad60f6bb", 12], "https://api.telegram.org/bot")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            Cell.mapCell([56784, 56784, 56784], "https://croplands.org/app/a/reset?token=")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            Cell.mapCell(["a1969970175", 987650, 12], "https://croplands.org/app/a/confirm?t=")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            Cell.mapCell([12345, 12, 987650], "https://twitter.com/path?abc")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            Cell.mapCell(["a1969970175", 12345, "a1969970175"], "https://twitter.com/path?abc")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            Cell.mapCell(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("componentWillMount", () => {
    let inst

    beforeEach(() => {
        inst = new Cell.Cell()
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentWillMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("componentDidMount", () => {
    let inst

    beforeEach(() => {
        inst = new Cell.Cell()
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})
