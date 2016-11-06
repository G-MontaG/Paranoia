# Paranoia
Paranoia cross-platform application for information security written based on Node.js and Electron.js. Paranoia makes security closer and accessible for all users. Encryption with user-friendly interface, convenient key storage and secure connection between applications.

## About

#### File encryption module

Encrypts and decrypts files using user-defined password and salt.
  
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
