import { ethers } from "hardhat";
import { CRYPTODEVS_NFT_CONTRACT_ADDRESS } from "../constants/index";

// FakeNFTMarketplace deployed to:  0xab21171C5FCBB1FfBeDCFb29Ec5f205e415bd6a1
// CryptoDevsDAO deployed to:  0xefB6d421c091232469E75c844e5FbF428E4E0549

async function main() {
    // Deploy the FakeNFTMarketplace contract first
    const FakeNFTMarketplace = await ethers.getContractFactory("FakeNFTMarketplace");
    const fakeNftMarketplace = await FakeNFTMarketplace.deploy();
    await fakeNftMarketplace.deployed();

    console.log("FakeNFTMarketplace deployed to: ", fakeNftMarketplace.address);

    // Now deploy the CryptoDevsDAO contract
    const CryptoDevsDAO = await ethers.getContractFactory("CryptoDevsDAO");
    // As always, `deploy()` accepts the constructor args
    const cryptoDevsDAO = await CryptoDevsDAO.deploy(fakeNftMarketplace.address, CRYPTODEVS_NFT_CONTRACT_ADDRESS, {
        // This assumes your account has at least 0.1 ETH in its account
        value: ethers.utils.parseEther("0.1"),
    });
    await cryptoDevsDAO.deployed();

    console.log("CryptoDevsDAO deployed to: ", cryptoDevsDAO.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
