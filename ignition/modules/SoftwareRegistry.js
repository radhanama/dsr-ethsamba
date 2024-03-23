const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const SoftwareRegistryModule = buildModule("SoftwareRegistryModule", (m) => {
  const SoftwareRegistry = m.contract("SoftwareRegistry");

  return { SoftwareRegistry };
});

module.exports = SoftwareRegistryModule;
