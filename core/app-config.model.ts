export interface appConfig {
  fileManagementConfig: {
    root: {
      encrypt: string,
      decrypt: string
    }
  },
  keyStorageConfig: {
    root: string
  },
  connectionConfig: {
    root: string
  }
}