import Web3 from 'web3';
import SoftwareRegistryContract from './contracts/SoftwareRegistry.json';

class SoftwareRegistryService {
  constructor() {
    this.web3 = null;
    this.contract = null;
    this.accounts = [];
    this.status = '';
  }

  async connectBlockchain() {
    try {
      this.web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
      this.accounts = await this.web3.eth.getAccounts();
      const networkId = await this.web3.eth.net.getId();
      const deployedNetwork = SoftwareRegistryContract.networks[networkId];
      this.contract = new this.web3.eth.Contract(
        SoftwareRegistryContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      this.status = 'Conexão estabelecida com sucesso';
    } catch (error) {
      console.error('Erro ao conectar à rede Ethereum. Verifique se o MetaMask ou Ganache está instalado e em execução.');
      this.status = 'Erro ao conectar à rede Ethereum';
    }
  }

  async createRecord(combinatedFilesHash, ipfsCid, authorName, authorEmail) {
    if (!this.contract) return;
    try {
      await this.contract.methods.createRecord(
        this.web3.utils.fromAscii(combinatedFilesHash),
        ipfsCid,
        authorName,
        authorEmail,
      ).send({ from: this.accounts[0] });
      this.status = 'Registro criado com sucesso';
    } catch (error) {
      console.error('Erro ao criar registro:', error);
      this.status = 'Erro ao criar registro';
    }
  }

  async transferOwnership(hashRecord, newOwner) {
    if (!this.contract) return;
    try {
      await this.contract.methods.transferOwnership(hashRecord, newOwner).send({ from: this.accounts[0] });
      this.status = 'Propriedade transferida com sucesso';
    } catch (error) {
      console.error('Erro ao transferir propriedade:', error);
      this.status = 'Erro ao transferir propriedade';
    }
  }

  async getRecordsByOwner(ownerAddress) {
    if (!this.contract) return [];
    try {
      return await this.contract.methods.getRecordsByOwner(ownerAddress).call();
    } catch (error) {
      console.error('Erro ao obter registros por proprietário:', error);
      return [];
    }
  }

  async getRecordByHash(sha256Hash) {
    if (!this.contract) return {};
    try {
      return await this.contract.methods.getRecordByHash(sha256Hash).call();
    } catch (error) {
      console.error('Erro ao obter registro por hash:', error);
      return {};
    }
  }
}

export default SoftwareRegistryService;
