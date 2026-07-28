import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ValidEatLogModule = buildModule("ValidEatLogModule", (m) => {

  const validEatLog = m.contract("ValidEatLog");

  return { validEatLog };
});

export default ValidEatLogModule;