import fs from "fs";
import { network } from "hardhat";

async function main() {
  const { ethers } = await network.connect();

  const addresses = JSON.parse(
    fs.readFileSync(
      "ignition/deployments/chain-31337/deployed_addresses.json",
      "utf8"
    )
  );

  const contractAddress =
    addresses["ValidEatLogModule#ValidEatLog"];

  const contract = await ethers.getContractAt(
    "ValidEatLog",
    contractAddress
  );

  const message = process.argv[2];

  if (!message) {
    throw new Error("Bitte eine Nachricht angeben.");
  }

  await contract.addLog(message);

  console.log(await contract.getLogs());
}

main();