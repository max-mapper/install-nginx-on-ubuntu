# install-nginx-on-ubuntu

[![NPM](https://nodei.co/npm/install-nginx-on-ubuntu.png)](https://nodei.co/npm/install-nginx-on-ubuntu/)

Installs Nginx on Ubuntu over SSH. Also starts Nginx and configures `upstart` to start and monitor Nginx on startup.

Uses the [Nginx PPA](https://launchpad.net/~nginx/+archive/development)

Tested w/ Ubuntu 13.04 x64, but should work with other modern Ubuntus. YMMV. Took about 17 seconds to install and start nginx on a fresh Ubuntu droplet on Digital Ocean

## CLI usage

```
npm install install-nginx-on-ubuntu -g
install-nginx-on-ubuntu root@coolsite.com
```

assumptions:

- you have your keys setup correctly so that passwordless login works with the SSH user + server passed in
- you are logging in as a user who is either root or can sudo without entering a password (goal of this module is to be fully automated)

## JS usage

```
var installScript = require('install-nginx-on-ubuntu')
```

`installScript` is a string containing the shell commands to install nginx, newline separated. Execute it somewhere!

### see also

- https://github.com/DamonOehlman/ngineer
- https://github.com/maxogden/install-node-on-ubuntu
