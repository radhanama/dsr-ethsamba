class SoftwareRegistryMockService {
  constructor() {
    this.records = [];
    this.ownerRecordsMap = {};
    this.hashRecordMap = {};
    this.status = '';
  }

  async connectBlockchain() {
    // Simulated connection to blockchain
    this.status = 'Conexão estabelecida com sucesso (simulado)';
  }

  async createRecord(combinatedFilesHash, authorName, authorEmail) {
    // Simulated creation of record
    const timestamp = Date.now();
    const newRecord = {
      owner: '0x1234567890123456789012345678901234567890',
      sha256Hash: combinatedFilesHash,
      authorName: authorName,
      authorEmail: authorEmail,
      blockTimestamp: timestamp
    };
    const recordsSize = this.records.length;
    this.records.push(newRecord);
    if (!this.ownerRecordsMap[newRecord.owner]) {
      this.ownerRecordsMap[newRecord.owner] = [];
    }
    this.ownerRecordsMap[newRecord.owner].push(recordsSize);
    this.hashRecordMap[newRecord.sha256Hash] = recordsSize;
    this.status = 'Registro criado com sucesso (simulado)';
  }

  async transferOwnership(hashRecord, newOwner) {
    // Simulated transfer of ownership
    const record = this.records[hashRecord];
    if (record) {
      record.owner = newOwner;
      this.status = 'Propriedade transferida com sucesso (simulado)';
    } else {
      this.status = 'Erro ao transferir propriedade (simulado)';
    }
  }

  async getRecordsByOwner(ownerAddress) {
    // Simulated retrieval of records by owner
    return this.ownerRecordsMap[ownerAddress] || [];
  }

  async getRecordByHash(sha256Hash) {
    // Simulated retrieval of record by hash
    const recordIndex = this.hashRecordMap[sha256Hash];
    if (recordIndex !== undefined) {
      return this.records[recordIndex];
    } else {
      return null;
    }
  }
}

export default SoftwareRegistryService;