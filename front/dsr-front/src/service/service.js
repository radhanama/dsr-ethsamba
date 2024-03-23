import Web3 from 'web3';

// Mock contract address and ABI
const contractAddress = '0x123abc...';
const contractAbi = [
  {
    "constant": false,
    "inputs": [
      {"name": "combinatedFilesHash", "type": "bytes32"},
      {"name": "ipfsCid", "type": "string"},
      {"name": "authorName", "type": "string"},
      {"name": "authorEmail", "type": "string"}
    ],
    "name": "createRecord",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {"name": "hashRecord", "type": "uint256"},
      {"name": "newOwner", "type": "address"}
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{"name": "ownerAddress", "type": "address"}],
    "name": "getRecordsByOwner",
    "outputs": [{"name": "", "type": "tuple[]", "components": [
      {"name": "owner", "type": "address"},
      {"name": "sha256Hash", "type": "bytes32"},
      {"name": "ipfsCid", "type": "string"},
      {"name": "authorName", "type": "string"},
      {"name": "authorEmail", "type": "string"},
      {"name": "blockTimestamp", "type": "uint256"}
    ]}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{"name": "sha256Hash", "type": "bytes32"}],
    "name": "getRecordByHash",
    "outputs": [{"name": "", "type": "tuple", "components": [
      {"name": "owner", "type": "address"},
      {"name": "sha256Hash", "type": "bytes32"},
      {"name": "ipfsCid", "type": "string"},
      {"name": "authorName", "type": "string"},
      {"name": "authorEmail", "type": "string"},
      {"name": "blockTimestamp", "type": "uint256"}
    ]}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

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
      // Mocked contract instance
      this.contract = new this.web3.eth.Contract(contractAbi, contractAddress);
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