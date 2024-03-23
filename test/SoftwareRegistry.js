const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("SoftwareRegistry", function () {
    async function deploySoftwareResgistryFixture() {

        function stringToByteArray(inputString) {
            const result = new Uint8Array(inputString.length / 2);

            for (let i = 0; i < inputString.length; i += 2) {
                result[i / 2] = parseInt(inputString.substr(i, 2), 16);
            }

            return result;
        }

        const [addr0, addr1, addr2] = await ethers.getSigners();
        const softwareRegistry = await ethers.deployContract("SoftwareRegistry");
        const hashString = "a5f4f02d5f3995b9c4a8895c96a22e48f2ef69600e72a6a8f596a8d09c6ab003"
        const sampleRecord = {
            hash: stringToByteArray(hashString),
            description: "Another bobba framework",
            authorName: "John Doe",
            authorEmail: "john.doe@catmail.com"
        };
        return { softwareRegistry, sampleRecord, hashString, stringToByteArray, addr0, addr1, addr2 };
    }

    it("Should returns the newly added registration", async function () {
        const { softwareRegistry, sampleRecord, hashString, addr0 } = await loadFixture(
            deploySoftwareResgistryFixture);

        expect(await softwareRegistry.getRecordsByOwner(addr0.address)).to.deep.equals(
            []);

        await softwareRegistry.createRecord(sampleRecord.hash,
            sampleRecord.description, sampleRecord.authorName, sampleRecord.authorEmail);

        const result = await softwareRegistry.getRecordsByOwner(addr0.address)

        expect(result).to.have.lengthOf(1);
        expect(result[0].slice(0, -1)).to.deep.equals([
            addr0.address,
            "0x" + hashString,
            sampleRecord.description,
            sampleRecord.authorName,
            sampleRecord.authorEmail]);
    })

    it("Should fail because hash is invalid", async function () {
        const { softwareRegistry, sampleRecord, stringToByteArray } = await loadFixture(
            deploySoftwareResgistryFixture);

        await expect(softwareRegistry.createRecord(
            stringToByteArray("0000000000000000000000000000000000000000000000000000000000000000"),
            sampleRecord.description,
            sampleRecord.authorName,
            sampleRecord.authorEmail)).to.be.revertedWith("Invalid SHA256 hash");
    })

    it("Should fail because description is too long", async function () {
        const { softwareRegistry, sampleRecord } = await loadFixture(
            deploySoftwareResgistryFixture);

        await expect(softwareRegistry.createRecord(
            sampleRecord.hash,
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod " +
            "tempor incididunt ut labore et dolore magna aliqua. Vivamus condimentum " +
            "lacus nec eros consectetur, eu scelerisque odio mollis.",
            sampleRecord.authorName,
            sampleRecord.authorEmail)).to.be.revertedWith("Description exceeds max length");
    })

    it("Should fail because authorName is too long", async function () {
        const { softwareRegistry, sampleRecord } = await loadFixture(
            deploySoftwareResgistryFixture);

        await expect(softwareRegistry.createRecord(
            sampleRecord.hash,
            sampleRecord.description,
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor viverra tortor.",
            sampleRecord.authorEmail)).to.be.revertedWith("Author name exceeds max length");
    })

    it("Should fail because authorEmail is too long", async function () {
        const { softwareRegistry, sampleRecord } = await loadFixture(
            deploySoftwareResgistryFixture);

        await expect(softwareRegistry.createRecord(
            sampleRecord.hash,
            sampleRecord.description,
            sampleRecord.authorName,
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor viverra tortor."
        )).to.be.revertedWith("Author email exceeds max length");
    })
});
