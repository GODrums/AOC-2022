export const x = "";

const input = await Deno.readTextFile("input.txt");


function calculateWorriedMonkeys(input: string): number {
    const monkeys: Monkey[] = [];
    input.split("\r\n\r\n").forEach(monkey => {
        const lines = monkey.split("\r\n");
        const items = lines[1].split(": ")[1].split(", ").map(x => parseInt(x));
        const operation = (old: number) => {
            const op: string = lines[2].split("old ")[1].split(" ")[0];
            const factor = lines[2].split("old ")[1].split(" ")[1];
            switch (factor) {
                case "old":
                    switch (op) {
                        case "*":
                            return old * old;
                    }
                    break;
                default:
                    switch (op) {
                        case "+":
                            return old + parseInt(factor);
                        case "*":
                            return old * parseInt(factor);
                    }
                    break;
            }
            return 0;
        };
        const divisor = parseInt(lines[3].split("by ")[1]);
        const test = (x: number) => {
            const targets = [parseInt(lines[4].split("monkey ")[1]), parseInt(lines[5].split("monkey ")[1])];
            return x % divisor === 0 ? targets[0] : targets[1];
        };
        monkeys.push(new Monkey(items, operation, test, divisor));
    });
    for (let i = 0; i < 20; i++) {
        monkeys.forEach(monkey => {
            monkey.items.forEach(item => {
                const newItem = Math.floor(monkey.operation(item) / 3);
                monkeys[monkey.test(newItem)].items.push(newItem);
            });
            monkey.inspected += monkey.items.length;
            monkey.items = [];
        });
    }
    return monkeys.sort((a, b) => b.inspected - a.inspected).slice(0, 2).reduce((a, b) => a * b.inspected, 1);
}

function calculateBigWorriedMonkeys(input: string): number {
    const monkeys: Monkey[] = [];
    input.split("\r\n\r\n").forEach(monkey => {
        const lines = monkey.split("\r\n");
        const items = lines[1].split(": ")[1].split(", ").map(x => parseInt(x));
        const operation = (old: number) => {
            const op: string = lines[2].split("old ")[1].split(" ")[0];
            const factor = lines[2].split("old ")[1].split(" ")[1];
            switch (factor) {
                case "old":
                    switch (op) {
                        case "*":
                            return old * old;
                    }
                    break;
                default:
                    switch (op) {
                        case "+":
                            return old + parseInt(factor);
                        case "*":
                            return old * parseInt(factor);
                    }
                    break;
            }
            return 0;
        };
        const divisor = parseInt(lines[3].split("by ")[1]);
        const test = (x: number) => {
            const targets = [parseInt(lines[4].split("monkey ")[1]), parseInt(lines[5].split("monkey ")[1])];
            return x % divisor === 0 ? targets[0] : targets[1];
        };
        monkeys.push(new Monkey(items, operation, test, divisor));
    });

    const superModulo = monkeys.reduce((prev, monkey) => monkey.divisor * prev, 1);

    for (let i = 0; i < 10000; i++) {
        monkeys.forEach(monkey => {
            monkey.items.forEach(item => {
                const newItem = monkey.operation(item) % superModulo;
                monkeys[monkey.test(newItem)].items.push(newItem);
            });
            monkey.inspected += monkey.items.length;
            monkey.items = [];
        });
    }
    return monkeys.sort((a, b) => b.inspected - a.inspected).slice(0, 2).reduce((a, b) => a * b.inspected, 1);
}

class Monkey {
    // worry level of each item
    items: number[];
    // operation for each turn
    operation: (old: number) => number;
    // executes test and returns monkey to throw to
    test: (x: number) => number;
    // times inspected
    inspected = 0;
    divisor: number;

    constructor(items: number[], operation: (old: number) => number, test: (x: number) => number, divisor: number) {
        this.items = items;
        this.operation = operation;
        this.test = test;
        this.divisor = divisor;
    }
}

console.log("A) ", calculateWorriedMonkeys(input));
console.log("B) ", calculateBigWorriedMonkeys(input));