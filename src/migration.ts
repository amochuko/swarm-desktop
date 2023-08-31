import { configYamlExists, deleteKeyFromConfigYaml, readConfigYaml, writeConfigYaml } from './config'

export function runMigrations() {
  if (!configYamlExists()) {
    return
  }

  const config = readConfigYaml()

  if (config['storage-incentives-enable'] === undefined) {
    writeConfigYaml({ 'storage-incentives-enable': false })
  }

  if (config['swap-endpoint'] && !config['blockchain-rpc-endpoint']) {
    writeConfigYaml({ 'blockchain-rpc-endpoint': config['swap-endpoint'] })
  }

  if (config['chain-enable'] !== undefined) {
    deleteKeyFromConfigYaml('chain-enable')
  }

  if (config['block-hash'] !== undefined) {
    deleteKeyFromConfigYaml('block-hash')
  }

  if (config.transaction !== undefined) {
    deleteKeyFromConfigYaml('transaction')
  }

  if (config['use-postage-snapshot'] !== false && config['use-postage-snapshot'] !== 'false') {
    writeConfigYaml({ 'use-postage-snapshot': false })
  }
}
