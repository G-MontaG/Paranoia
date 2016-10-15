export interface appConfig {
  fileManagementConfig: {
    encryptRoot: string,
    decryptRoot: string
  },
  keyStorageConfig: {
    root: string
  },
  connectionConfig: {
    root: string
  }
}