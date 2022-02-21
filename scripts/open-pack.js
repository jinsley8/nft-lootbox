import { sdk } from "./helpers.js";

async function main() {
  const packModuleAddress = '0x125AdB4f360075bb3A98e2Bb64D829e6dcfA0102';
  const packModule = sdk.getPackModule(packModuleAddress);

  console.log('Opening the pack...');
  const opened = await packModule.open('0');
  console.log('Opened the pack!');
  console.log(opened);
}

try {
  await main();
} catch (error) {
  console.error("Error opening the pack", error);
  process.exit(1);
}