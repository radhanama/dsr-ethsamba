import { ethers } from 'ethers';
import SoftwareRegistryContract from '../assets/contracts/SoftwareRegistry.json';

class SoftwareRegistryService {
  constructor() {
    this.provider = null;
    this.contract = null;
    this.signer = null;
    this.accounts = [];
    this.status = '';
  }

  async connectBlockchain() {
    try {
      this.provider = new ethers.BrowserProvider(window.ethereum); // Use browser provider
      await this.provider.send("eth_requestAccounts", []); // Request MetaMask accounts
      this.signer = await this.provider.getSigner();
      this.accounts = await this.provider.listAccounts();
      const deployedNetwork = "0xAc089b14eb458A5c33F204B315336b4C41Af67bd";
      this.contract = new ethers.Contract(
        deployedNetwork,
        SoftwareRegistryContract.abi,
        this.provider
      ).connect(this.signer);
      this.status = 'Conexão estabelecida com sucesso';
    } catch (error) {
      console.error('Erro ao conectar à rede Ethereum. Verifique se o MetaMask está instalado e conectado.');
      this.status = 'Erro ao conectar à rede Ethereum';
    }
  }

  stringToByteArray(inputString) {
    const result = new Uint8Array(inputString.length / 2);

    for (let i = 0; i < inputString.length; i += 2) {
      result[i / 2] = parseInt(inputString.substr(i, 2), 16);
    }

    return result;
  }

  async createRecord(combinatedFilesHash, description, authorName, authorEmail) {
    debugger
    if (!this.contract) return;
    try {
      await this.contract.createRecord(
        this.stringToByteArray(combinatedFilesHash),
        description,
        authorName,
        authorEmail
      );
      this.status = 'Registro criado com sucesso';
    } catch (error) {
      console.error('Erro ao criar registro:', error);
      this.status = 'Erro ao criar registro';
    }
  }

  async getRecordsByOwner(ownerAddress) {
    if (!this.contract) return [];
    try {
      const records = await this.contract.getRecordsByOwner(ownerAddress);
      return records;
    } catch (error) {
      console.error('Erro ao obter registros por proprietário:', error);
      return [];
    }
  }

  async getRecordByHash(sha256Hash) {
    if (!this.contract) return {};
    try {
      const record = await this.contract.getRecordByHash(sha256Hash);
      return record;
    } catch (error) {
      console.error('Erro ao obter registro por hash:', error);
      return {};
    }
  }

  async getLastNRecords(n) {
    if (!this.contract) return [];
    try {
      const records = await this.contract.getLastNRecords(n);
      return records;
    } catch (error) {
      console.error('Erro ao obter os últimos registros:', error);
      return [];
    }
  }
}

export default SoftwareRegistryService;
