# Paranoia
Paranoia cross-platform application for information security written based on Node.js and Electron.js. Paranoia makes security closer and accessible for all users. Encryption with user-friendly interface, convenient key storage and secure connection between applications.

## About

#### File encryption module

Encrypts and decrypts files using user-defined password and salt.
Supported algorithms:

- GCM mode (recommended)
  - aes-256-gcm
  - aes-192-gcm
  - aes-128-gcm
- CTR mode
  - aes-256-ctr
  - aes-192-ctr
  - aes-128-ctr
- OFB mode
  - aes-256-ofb
  - aes-192-ofb
  - aes-128-ofb
  - blowfish-ofb
  - camellia-256-ofb
  - camellia-192-ofb
  - camellia-128-ofb
- CFB mode
  - aes-256-cfb
  - aes-192-cfb
  - aes-128-cfb
  - blowfish-cfb
  - camellia-256-cfb
  - camellia-192-cfb
  - camellia-128-cfb
- CBC mode
  - aes-256-cbc
  - aes-192-cbc
  - aes-128-cbc
  - blowfish-cbc
  - camellia-256-cbc
  - camellia-192-cbc
  - camellia-128-cbc
- XTS mode
  - aes-256-xts (maybe)
  
#### Key storage

Save and manage keys of the file encryption module or web services like google, facebook, etc.

#### Connection module

Secure TLS connection to share our key or manually sending messeges using RSA protection. 

## Install

At the moment the application is alpha version and not ready for installation.

## Build

Application require in global:

- Node.js `v6.7.0` or higher
- NPM `v3.10.3` or higher
- Electron last version
- Gulp `v3.9.1` or higher

Prebuild 

```
cd path/to/project
npm i
```

Build

```
npm run core
npm run view
```

Run

```
npm run start
```

## License

Arthur Osipenko, [G-MontaG](https://github.com/G-MontaG).

arthur.osipenko@gmail.com

Licensed under an Apache-2 license.
