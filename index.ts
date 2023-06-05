import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import { keyboard, Key } from "@nut-tree/nut-js";

async function main() {
  keyboard.config.autoDelayMs = 0;

  const ports = await SerialPort.list();

  const port = new SerialPort({
    path: ports.find((port) => port.productId === 'ea60')?.path ?? '',
    baudRate: 115200,
  }, function(err) {
    if (err) {
      return console.log('Error: ', err.message)
    }
  })

  const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))

  port.on("open", function() {
    console.log("-- Connection opened --");
    parser.on("data", async function(data: string) {
      console.log(data);
      handleKeys(data);
    });
  });

  let old = [false, false, false, false];

  async function handleKeys(data: string) {
    const values: Array<boolean> = data.split(" ").map((d) => d === '1')

    if (values[0]) keyboard.pressKey(Key.Left)
    else if (old[0] != values[0]) keyboard.releaseKey(Key.Left)
    if (values[1]) keyboard.pressKey(Key.Up)
    else if (old[1] != values[1]) keyboard.releaseKey(Key.Up)
    if (values[2]) keyboard.pressKey(Key.Right)
    else if (old[2] != values[2]) keyboard.releaseKey(Key.Right)
    if (values[3]) keyboard.pressKey(Key.Down)
    else if (old[3] != values[3]) keyboard.releaseKey(Key.Down)

    old = values;
  }
}


main();
