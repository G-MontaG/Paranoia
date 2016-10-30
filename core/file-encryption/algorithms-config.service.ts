import _ = require('lodash');

export class AlgorithmConfigService {

  private static config = [
    {
      algorithm: "aes-256-gcm",
      requireTag: true,
      keyLength: 32,
      ivLength: 12,
      tagLength: 16
    },
    {
      algorithm: "aes-192-gcm",
      requireTag: true,
      keyLength: 24,
      ivLength: 12,
      tagLength: 16
    },
    {
      algorithm: "aes-128-gcm",
      requireTag: true,
      keyLength: 16,
      ivLength: 12,
      tagLength: 16
    },
    {
      algorithm: "aes-256-ctr",
      requireTag: false,
      keyLength: 32,
      ivLength: 16
    },
    {
      algorithm: "aes-192-ctr",
      requireTag: false,
      keyLength: 24,
      ivLength: 16
    },
    {
      algorithm: "aes-128-ctr",
      requireTag: false,
      keyLength: 16,
      ivLength: 16
    },
    {
      algorithm: "aes-256-ofb",
      requireTag: false,
      keyLength: 32,
      ivLength: 16
    },
    {
      algorithm: "aes-192-ofb",
      requireTag: false,
      keyLength: 24,
      ivLength: 16
    },
    {
      algorithm: "aes-128-ofb",
      requireTag: false,
      keyLength: 16,
      ivLength: 16
    },
    {
      algorithm: "blowfish-ofb",
      requireTag: false,
      keyLength: 16,
      ivLength: 8
    },
    {
      algorithm: "camellia-256-ofb",
      requireTag: false,
      keyLength: 32,
      ivLength: 16
    },
    {
      algorithm: "camellia-192-ofb",
      requireTag: false,
      keyLength: 24,
      ivLength: 16
    },
    {
      algorithm: "camellia-128-ofb",
      requireTag: false,
      keyLength: 16,
      ivLength: 16
    },
    {
      algorithm: "aes-256-cfb",
      requireTag: false,
      keyLength: 32,
      ivLength: 16
    },
    {
      algorithm: "aes-192-cfb",
      requireTag: false,
      keyLength: 24,
      ivLength: 16
    },
    {
      algorithm: "aes-128-cfb",
      requireTag: false,
      keyLength: 16,
      ivLength: 16
    },
    {
      algorithm: "blowfish-cfb",
      requireTag: false,
      keyLength: 16,
      ivLength: 8
    },
    {
      algorithm: "camellia-256-cfb",
      requireTag: false,
      keyLength: 32,
      ivLength: 16
    },
    {
      algorithm: "camellia-192-cfb",
      requireTag: false,
      keyLength: 24,
      ivLength: 16
    },
    {
      algorithm: "camellia-128-cfb",
      requireTag: false,
      keyLength: 16,
      ivLength: 16
    },
    {
      algorithm: "aes-256-cbc",
      requireTag: false,
      keyLength: 32,
      ivLength: 16
    },
    {
      algorithm: "aes-192-cbc",
      requireTag: false,
      keyLength: 24,
      ivLength: 16
    },
    {
      algorithm: "aes-128-cbc",
      requireTag: false,
      keyLength: 16,
      ivLength: 16
    },
    {
      algorithm: "blowfish-cbc",
      requireTag: false,
      keyLength: 16,
      ivLength: 8
    },
    {
      algorithm: "camellia-256-cbc",
      requireTag: false,
      keyLength: 32,
      ivLength: 16
    },
    {
      algorithm: "camellia-192-cbc",
      requireTag: false,
      keyLength: 24,
      ivLength: 16
    },
    {
      algorithm: "camellia-128-cbc",
      requireTag: false,
      keyLength: 16,
      ivLength: 16
    },
    {
      algorithm: "aes-256-gcm",
      requireTag: true,
      keyLength: 32,
      ivLength: 12,
      tagLength: 16
    }
  ];

  public static getConfig(algorithm: string): AlgorithmConfig {
    let index = _.findIndex(this.config, (item) => {
      return item.algorithm === algorithm;
    });
    return this.config[index];
  }
}

export interface AlgorithmConfig {
  algorithm: string
  requireTag: boolean,
  keyLength: number,
  ivLength: number
}