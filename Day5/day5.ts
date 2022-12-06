export const x = "";

const input = await Deno.readTextFile("input.txt");

function handleInput(input: string): [string[][], string] {
    const [ starting, procedure ] = input.split("\r\n\r\n");
    const stacks: string[] = new Array(starting.split("\r\n").length).fill("");

    starting.split("\r\n").slice(0, -1).forEach(row => {
        let i = 0;
        while (i < row.length) {
            if (row[i+1] != " ") {
                stacks[i/4] += row[i+1];
            } else {
                stacks[i/4] += " ";
            }
            i += 4;
        }
    });

    return [stacks.map((x) => x.split("").reverse().filter((y) => y != " ")), procedure];
}

function calculateTopCrates(input: string): string {
    const [stack, procedure] = handleInput(input);
    
    procedure.split("\r\n").forEach((command) => {
        const [amount, current, target] = command.split(" ").filter((x) => !isNaN(+x)).map((x) => Number(x));

        for (let i = 0; i < amount; i++) {
            const crate = stack[current-1].pop() ?? "";
            stack[target-1].push(crate);
        }
    });
    return stack.map((x) => x[x.length-1]).reduce((a, b) => String(a) + String(b));
}

function calculateCrateMover9001(input: string): string {
    const [stack, procedure] = handleInput(input);
    
    procedure.split("\r\n").forEach((command) => {
        const [amount, current, target] = command.split(" ").filter((x) => !isNaN(+x)).map((x) => Number(x));

        const removedElements = stack[current-1].splice(-amount);
        stack[target-1].push(...removedElements);
    });
    return stack.map((x) => x[x.length-1]).reduce((a, b) => String(a) + String(b));
}

console.log("A) ", calculateTopCrates(input));
console.log("B) ", calculateCrateMover9001(input));