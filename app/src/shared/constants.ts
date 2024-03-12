export const Constants = Object.freeze({
  EXPLORER_BASE_URL: 'https://explorer.axiom.xyz/v2/sepolia/',

  UNISWAP_UNIV_ROUTER_SEPOLIA: '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD'.toLowerCase(),
  UNIV3_POOL_UNI_WETH0: '0x224Cc4e5b50036108C1d862442365054600c260C'.toLowerCase(),
  UNIV3_POOL_UNI_WETH1: '0x287B0e934ed0439E2a7b1d5F0FC25eA2c24b64f7'.toLowerCase(),

  AXIOM_GAME_DEMO: '0x429bc03fe0d9cbb868638e326b4767caa4a023c9',
  GAME_SCORE: '0x031339Eb7CB8732de7B25Ec0a0767E34938C0a63',

  // Swap (address sender, address recipient, int256 amount0, int256 amount1, uint160 sqrtPriceX96, uint128 liquidity, int24 tick)
  EVENT_SCHEMA: '0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67',
  ELIGIBLE_BLOCK_HEIGHT: 4000000,
  CHAIN_ID_SEPOLIA: 11155111,
});
