import _ = require('lodash');
import {ipcMain} from "electron";
const crypto = require('crypto');

export class AlgorithmConfigService {

  private algorithmList = [];

  constructor() {
    let supportedList = crypto.getCiphers();
    _.forEach(this.config, (configItem) => {
      if(_.findIndex(supportedList, function(item) {
          return item === configItem.algorithm;
        }) > -1) {
        this.algorithmList.push(configItem);
      }
    });
    this.sendAlgorithmList();
  }

  private config = [
    {
      algorithm: 'aes-256-gcm',
      name: 'AES 256 GCM',
      requireTag: true,
      keyLength: 32,
      ivLength: 32,
      tagLength: 16
    },
    {
      algorithm: "aes-192-gcm",
      name: 'AES 192 GCM',
      requireTag: true,
      keyLength: 24,
      ivLength: 24,
      tagLength: 16
    },
    {
      algorithm: "aes-128-gcm",
      name: 'AES 128 GCM',
      requireTag: true,
      keyLength: 16,
      ivLength: 16,
      tagLength: 16
    },

    {
      algorithm: "aes-256-xts",
      name: 'AES 256 XTS',
      requireTag: false,
      keyLength: 64,
      ivLength: 16
    },
    {
      algorithm: "aes-128-xts",
      name: 'AES 128 XTS',
      requireTag: false,
      keyLength: 32,
      ivLength: 16
    },

    {
      algorithm: "aes-256-ctr",
      name: 'AES 256 CTR',
      requireTag: false,
      keyLength: 32,
      ivLength: 16
    },
    {
      algorithm: "aes-192-ctr",
      name: 'AES 192 CTR',
      requireTag: false,
      keyLength: 24,
      ivLength: 16
    },
    {
      algorithm: "aes-128-ctr",
      name: 'AES 128 CTR',
      requireTag: false,
      keyLength: 16,
      ivLength: 16
    },

    // {
    //   algorithm: "rc4",
    //   name: 'RC4',
    //   requireTag: false,
    //   keyLength: 32,
    //   ivLength: 32
    // },

    {
      algorithm: "aes-256-ofb",
      name: 'AES 256 OFB',
      requireTag: false,
      keyLength: 32,
      ivLength: 16
    },
    {
      algorithm: "aes-192-ofb",
      name: 'AES 192 OFB',
      requireTag: false,
      keyLength: 24,
      ivLength: 16
    },
    {
      algorithm: "aes-128-ofb",
      name: 'AES 128 OFB',
      requireTag: false,
      keyLength: 16,
      ivLength: 16
    },
    {
      algorithm: "bf-ofb",
      name: 'Blowfish OFB',
      requireTag: false,
      keyLength: 32,
      ivLength: 8
    },
    {
      algorithm: "camellia-256-ofb",
      name: 'Camellia 256 OFB',
      requireTag: false,
      keyLength: 32,
      ivLength: 16
    },
    {
      algorithm: "camellia-192-ofb",
      name: 'Camellia 192 OFB',
      requireTag: false,
      keyLength: 24,
      ivLength: 16
    },
    {
      algorithm: "camellia-128-ofb",
      name: 'Camellia 128 OFB',
      requireTag: false,
      keyLength: 16,
      ivLength: 16
    },
    {
      algorithm: "rc2-ofb",
      name: 'RC2 OFB',
      requireTag: false,
      keyLength: 32,
      ivLength: 8
    },
    {
      algorithm: "cast5-ofb",
      name: 'CAST5 OFB',
      requireTag: false,
      keyLength: 16,
      ivLength: 8
    },
    {
      algorithm: "des-ede3-ofb",
      name: 'DES EDE3 OFB',
      requireTag: false,
      keyLength: 24,
      ivLength: 8
    },
    {
      algorithm: "des-ede-ofb",
      name: 'DES EDE OFB',
      requireTag: false,
      keyLength: 16,
      ivLength: 8
    },
    {
      algorithm: "des-ofb",
      name: 'DES OFB',
      requireTag: false,
      keyLength: 8,
      ivLength: 8
    },

    {
      algorithm: "aes-256-cfb",
      name: 'AES 256 CFB',
      requireTag: false,
      keyLength: 32,
      ivLength: 16
    },
    {
      algorithm: "aes-192-cfb",
      name: 'AES 192 CFB',
      requireTag: false,
      keyLength: 24,
      ivLength: 16
    },
    {
      algorithm: "aes-128-cfb",
      name: 'AES 128 CFB',
      requireTag: false,
      keyLength: 16,
      ivLength: 16
    },
    {
      algorithm: "bf-cfb",
      name: 'Blowfish CFB',
      requireTag: false,
      keyLength: 32,
      ivLength: 8
    },
    {
      algorithm: "camellia-256-cfb",
      name: 'Camellia 256 CFB',
      requireTag: false,
      keyLength: 32,
      ivLength: 16
    },
    {
      algorithm: "camellia-192-cfb",
      name: 'Camellia 192 CFB',
      requireTag: false,
      keyLength: 24,
      ivLength: 16
    },
    {
      algorithm: "camellia-128-cfb",
      name: 'Camellia 128 CFB',
      requireTag: false,
      keyLength: 16,
      ivLength: 16
    },
    {
      algorithm: "rc2-cfb",
      name: 'RC2 CFB',
      requireTag: false,
      keyLength: 32,
      ivLength: 8
    },
    {
      algorithm: "cast5-cfb",
      name: 'CAST5 CFB',
      requireTag: false,
      keyLength: 16,
      ivLength: 8
    },
    {
      algorithm: "des-ede3-cfb",
      name: 'DES EDE3 CFB',
      requireTag: false,
      keyLength: 24,
      ivLength: 8
    },
    {
      algorithm: "des-ede-cfb",
      name: 'DES EDE CFB',
      requireTag: false,
      keyLength: 16,
      ivLength: 8
    },
    {
      algorithm: "des-cfb",
      name: 'DES CFB',
      requireTag: false,
      keyLength: 8,
      ivLength: 8
    },

    {
      algorithm: "aes-256-cbc",
      name: 'AES 256 CBC',
      requireTag: false,
      keyLength: 32,
      ivLength: 16
    },
    {
      algorithm: "aes-192-cbc",
      name: 'AES 192 CBC',
      requireTag: false,
      keyLength: 24,
      ivLength: 16
    },
    {
      algorithm: "aes-128-cbc",
      name: 'AES 128 CBC',
      requireTag: false,
      keyLength: 16,
      ivLength: 16
    },
    {
      algorithm: "bf-cbc",
      name: 'Blowfish CBC',
      requireTag: false,
      keyLength: 32,
      ivLength: 8
    },
    {
      algorithm: "camellia-256-cbc",
      name: 'Camellia 256 CBC',
      requireTag: false,
      keyLength: 32,
      ivLength: 16
    },
    {
      algorithm: "camellia-192-cbc",
      name: 'Camellia 192 CBC',
      requireTag: false,
      keyLength: 24,
      ivLength: 16
    },
    {
      algorithm: "camellia-128-cbc",
      name: 'Camellia 128 CBC',
      requireTag: false,
      keyLength: 16,
      ivLength: 16
    },
    {
      algorithm: "rc2-cbc",
      name: 'RC2 CBC',
      requireTag: false,
      keyLength: 32,
      ivLength: 8
    },
    {
      algorithm: "cast5-cbc",
      name: 'CAST5 CBC',
      requireTag: false,
      keyLength: 16,
      ivLength: 8
    },
    {
      algorithm: "desx-cbc",
      name: 'DESX CBC',
      requireTag: false,
      keyLength: 24,
      ivLength: 8
    },
    {
      algorithm: "des-ede3-cbc",
      name: 'DES EDE3 CBC',
      requireTag: false,
      keyLength: 24,
      ivLength: 8
    },
    {
      algorithm: "des-ede-cbc",
      name: 'DES EDE CBC',
      requireTag: false,
      keyLength: 16,
      ivLength: 8
    },
    {
      algorithm: "des-cbc",
      name: 'DES CBC',
      requireTag: false,
      keyLength: 8,
      ivLength: 8
    },

    {
      algorithm: "aes-256-ecb",
      name: 'AES 256 ECB',
      requireTag: false,
      keyLength: 32,
      ivLength: 0
    },
    {
      algorithm: "aes-192-ecb",
      name: 'AES 192 ECB',
      requireTag: false,
      keyLength: 24,
      ivLength: 0
    },
    {
      algorithm: "aes-128-ecb",
      name: 'AES 128 ECB',
      requireTag: false,
      keyLength: 16,
      ivLength: 0
    },
    {
      algorithm: "bf-ecb",
      name: 'Blowfish ECB',
      requireTag: false,
      keyLength: 32,
      ivLength: 0
    },
    {
      algorithm: "rc2-ecb",
      name: 'RC2 ECB',
      requireTag: false,
      keyLength: 32,
      ivLength: 0
    },
    {
      algorithm: "cast5-ecb",
      name: 'CAST5 ECB',
      requireTag: false,
      keyLength: 16,
      ivLength: 0
    },
    {
      algorithm: "des-ecb",
      name: 'DES ECB',
      requireTag: false,
      keyLength: 8,
      ivLength: 0
    }
  ];

  public getConfig(algorithm: string): AlgorithmConfig {
    let index = _.findIndex(this.config, (item) => {
      return item.algorithm === algorithm;
    });
    return this.config[index];
  }

  public sendAlgorithmList() {
    ipcMain.on(`cryptConfiguringGetAlgorithms`, (event, arg) => {
      event.sender.send('cryptConfiguringGetAlgorithms-reply', this.algorithmList);
    });
  }
}

export const algorithmConfigService = new AlgorithmConfigService();

export interface AlgorithmConfig {
  algorithm: string
  requireTag: boolean,
  keyLength: number,
  ivLength: number
  tagLength?: number
}