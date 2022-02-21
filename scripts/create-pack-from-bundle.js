import { readFileSync } from 'fs';
import { sdk } from './helpers.js';

async function main() {
  const bundleModuleAddress = '0x2968075A94c354d71D8681e2c725391999FdD028';
  const bundleModule = sdk.getBundleModule(bundleModuleAddress);

  const packModuleAddress = '0x125AdB4f360075bb3A98e2Bb64D829e6dcfA0102';
  const packModule = sdk.getPackModule(packModuleAddress);

  console.log('Getting all NFTs from bundle...');
  const nftsInBundle = await bundleModule.getAll();

  console.log('NFTs in bundle:');
  console.log(nftsInBundle);

  console.log('Creating a pack containing the NFTs from bundle...');
  const created = await packModule.create({
    assetContract: bundleModuleAddress,
    metadata: {
      name: 'Ludicrous Landscapes',
      image: readFileSync('./assets/ludicrous-landscapes.png'),
    },
    assets: nftsInBundle.map(nft => ({
      tokenId: nft.metadata.id,
      amount: nft.supply,
    })),
  });

  console.log('Pack created!')
  console.log(created);
}

try {
  await main();
} catch (error) {
  console.error("Error minting the NFTs", error);
  process.exit(1);
}