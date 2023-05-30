import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import {keyboard, Key} from "@nut-tree/nut-js";

keyboard.config.autoDelayMs = 0;

const port = new SerialPort({
    path: 'COM8',
    baudRate: 115200,
})

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))

port.on("open", function() {
    console.log("-- Connection opened --");
    parser.on("data", async function(data: string) {
        console.log(data);
        handleKeys(data);  
    });
});

async function handleKeys(data: string) {
    const values: Array<boolean> = data.split(" ").map((d) => d === '1')
    if(values[0]) keyboard.pressKey(Key.Left)
    else keyboard.releaseKey(Key.Left) 
    if(values[1]) keyboard.pressKey(Key.Up)
    else keyboard.releaseKey(Key.Up) 
    if(values[2]) keyboard.pressKey(Key.Right)
    else keyboard.releaseKey(Key.Right) 
    if(values[3]) keyboard.pressKey(Key.Down)
    else keyboard.releaseKey(Key.Down) 
}