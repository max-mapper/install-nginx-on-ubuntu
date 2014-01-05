#!/usr/bin/env node

var spawn = require('child_process').spawn
var script = require('./')
var fs = require('fs')
var path = require('path')
var target = process.argv[2]
var hostOverrides = ['-o', 'UserKnownHostsFile=/dev/null', '-o', 'StrictHostKeyChecking=no']

if (!target) return console.error('Usage: install-nginx-on-ubuntu root@server')

installConf(function(code) {
  if (code) return console.error('Conf install returned error code', code)
  installNginx(function(code) {
    if (code) return console.error('Nginx install returned error code', code)
    console.log('Nginx is now running')
  })
})

function installNginx(cb) {
  var ssh = spawn('ssh', hostOverrides.concat(target))

  ssh.stdout.pipe(process.stdout)
  ssh.stderr.pipe(process.stderr)

  ssh.on('exit', function(code, signal) {
    console.log('Nginx installed', {code: code, signal: signal})
    if (cb) cb(code)
  })

  var scriptStream = fs.createReadStream(path.join(__dirname, 'install.sh'))
  scriptStream.pipe(ssh.stdin)  
}

function installConf(cb) {
  console.log('Writing nginx.conf...')
  var conf = path.join(__dirname, 'nginx.conf')
  var remotePath = '/etc/init/nginx.conf'
  var scp = spawn('scp', hostOverrides.concat([conf, target + ':' + remotePath]))

  scp.stdout.pipe(process.stdout)
  scp.stderr.pipe(process.stderr)

  scp.on('exit', function(code, signal) {
    console.log('Wrote nginx.conf', {code: code, signal: signal})
    if (cb) cb(code)
  })
}
