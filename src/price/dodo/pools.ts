export type Pool = {
    pair: [string, string]
    address:  string
    exists: boolean
}

export const DODOPOOLS: Pool[] = [
    {
        pair: ['WBTC', 'USDC'],
        address: '0xe020008465cD72301A18b97d33D73bF44858A4b7',
        exists: true
    },
    {
        pair: ['WETH', 'USDC'],
        address: '0x5333Eb1E32522F1893B7C9feA3c263807A02d561',
        exists: true
    },
    {
        pair: ['WMATIC', 'USDC'],
        address: '0x10Dd6d8A29D489BEDE472CC1b22dc695c144c5c7',
        exists: true
    },
    {
        pair: ['USDT', 'USDC'],
        address: '0xA0020444b98f67B77a3d6dE6E66aF11c87da086e',
        exists: true
    },
    {
        pair: ['WETH', 'WMATIC'],
        address: '',
        exists: false
    }
]