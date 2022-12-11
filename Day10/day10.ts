export const x = "";

const input = await Deno.readTextFile("input.txt");

function calculateSignalStrengths(input: string): number {
    let [cycle, x, i, signalStrength] = [0, 1, 0, 0];
    input.split("\r\n").forEach(line => {
        let inc = false;
        if (cycle > 240) {
            return;
        }
        if (line.includes("noop")) {
            cycle++;
        } else {
            cycle += 2;
            inc = true;
        }
        if (cycle > 19 && cycle % (40 * i + 20) == 0) {
            i++;
            signalStrength += x * cycle;
        } else if (cycle > 19 && cycle % (40 * i + 20) == 1) {
            i++;
            signalStrength += x * (cycle - 1);
        }
        
        if (inc) {
            x += parseInt(line.split(" ")[1]);
        }
    });
    return signalStrength;
}

function renderCRT(input: string): string[] {
    let [cycle, x, i] = [0, 1, 0];
    const crt = new Array<string>(6).fill("");
    input.split("\r\n").forEach(line => {
        let inc = false;
        if (cycle > 240) {
            return;
        }
        
        if (cycle - (40 * i) > 39) {
            i++;
        }
        crt[i] += Math.abs(x-crt[i].length) <= 1 ? "#" : ".";
        if (line.includes("noop")) {
            cycle++;
        } else {
            cycle += 2;
            if (cycle - (40 * i) > 40) {
                i++;
            }
            inc = true;
            crt[i] += Math.abs(x-crt[i].length) <= 1 ? "#" : ".";
        }
        
        if (inc) {
            x += parseInt(line.split(" ")[1]);
        }
    });
    return crt;
}

console.log("A) ", calculateSignalStrengths(input));
console.log("B) ", renderCRT(input));