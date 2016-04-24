import debug from 'debug'

export default function logger(name) {
  if (window) window.DEBUG = debug
  return debug(`tapclock:${name}`)
}
