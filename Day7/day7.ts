export const x = "";

const input = await Deno.readTextFile("input.txt");


class FileObject {
    name: string;
    fSize: number;
    children: FileObject[];
    parent: FileObject | null = null;

    constructor(name: string, fSize: number, children: FileObject[], parent: FileObject | null = null) {
        this.name = name;
        this.fSize = fSize;
        this.children = children;
        this.parent = parent;
    }

    get size(): number {
        const calcSize = this.fSize + this.children.reduce((acc, file) => acc + file.size, 0);
        return calcSize;
    }

    addChildren(child: FileObject) {
        if (!this.children.includes(child)) {
            this.children.push(child);
        }
    }
}

function parseInput(input: string): FileObject {
    const mainDir: FileObject = new FileObject("/", 0, []);
    let currentDir: FileObject = mainDir;
    input.split("\r\n").forEach((line) => {
        if (line.startsWith("$ ")) {
            if (line.includes("cd")) {
                if (line.includes("..")) {
                    if (currentDir.parent) {
                        currentDir = currentDir.parent;
                    }
                } else {
                    if (line.includes("/")) {
                        currentDir = mainDir;
                    } else {
                        const dirName = line.split(" ").pop()!;
                        const newDir = new FileObject(dirName, 0, [], currentDir);
                        currentDir.addChildren(newDir);
                        currentDir = newDir;
                    }
                }
            }
        } else {
            const [size, name] = line.split(" ");
            const newFile = new FileObject(name, ((size == "dir")? 0 : parseInt(size)), [], currentDir);
            currentDir.addChildren(newFile);
        }
    });
    return mainDir;
}

function calculateInputMarker(input: string): number {
    const mainDir = parseInput(input);
    let size = 0;
    const dirs: FileObject[] = [mainDir];
    while (dirs.length > 0) {
        const dir = dirs.pop()!;
        if (dir.size <= 100000) {
            size += dir.size;
        }
        dirs.push(...dir.children.filter((x) => x.fSize === 0));
    }
    return size;
}

function calculateDirToDelete(input: string): number {
    const mainDir = parseInput(input);
    const spaceNeeded = 30000000 - (70000000 - mainDir.size);
    console.log("space needed: ", spaceNeeded);
    const dirs: FileObject[] = [mainDir];
    const dirsToDelete: FileObject[] = [];
    while (dirs.length > 0) {
        const dir = dirs.pop()!;
        if (dir.size >= spaceNeeded) {
            dirsToDelete.push(dir);
        }
        dirs.push(...dir.children.filter((x) => x.fSize === 0));
    }
    return dirsToDelete.reduce((f1, f2) => f1.size < f2.size ? f1 : f2).size;
}

console.log("A) ", calculateInputMarker(input));
console.log("B) ", calculateDirToDelete(input));