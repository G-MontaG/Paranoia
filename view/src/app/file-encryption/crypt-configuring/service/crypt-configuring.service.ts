import {Injectable} from '@angular/core';

@Injectable()
export class CryptConfiguringService {
  public algorithms = [
    'aes-256-gcm',
    'aes-192-gcm',
    'aes-128-gcm',

    'aes-256-ctr',
    'aes-192-ctr',
    'aes-128-ctr',

    'aes-256-ofb',
    'aes-192-ofb',
    'aes-128-ofb',
    'blowfish-ofb',
    'camellia-256-ofb',
    'camellia-192-ofb',
    'camellia-128-ofb',

    'aes-256-cfb',
    'aes-192-cfb',
    'aes-128-cfb',
    'blowfish-cfb',
    'camellia-256-cfb',
    'camellia-192-cfb',
    'camellia-128-cfb',

    'aes-256-cbc',
    'aes-192-cbc',
    'aes-128-cbc',
    'blowfish-cbc',
    'camellia-256-cbc',
    'camellia-192-cbc',
    'camellia-128-cbc',

    'aes-256-xts'
  ];
  constructor() {
  }
}