[**patreon-dl**](../README.md)

***

[patreon-dl](../README.md) / ProductDownloaderBootstrapData

# Interface: ProductDownloaderBootstrapData

Defined in: [src/downloaders/Bootstrap.ts:14](https://github.com/patrickkfkan/patreon-dl/blob/85b45f808a4c4af13ab0b40464fd970e53880f7d/src/downloaders/Bootstrap.ts#L14)

## Extends

- [`BootstrapData`](BootstrapData.md)

## Properties

### productFetch

> **productFetch**: \{ `productId`: `string`; `type`: `"single"`; \} \| \{ `campaignId?`: `string`; `type`: `"byShop"`; `vanity`: `string`; \} \| \{ `filePath`: `string`; `type`: `"byFile"`; \}

Defined in: [src/downloaders/Bootstrap.ts:16](https://github.com/patrickkfkan/patreon-dl/blob/85b45f808a4c4af13ab0b40464fd970e53880f7d/src/downloaders/Bootstrap.ts#L16)

***

### targetURL

> **targetURL**: `string`

Defined in: [src/downloaders/Bootstrap.ts:11](https://github.com/patrickkfkan/patreon-dl/blob/85b45f808a4c4af13ab0b40464fd970e53880f7d/src/downloaders/Bootstrap.ts#L11)

#### Inherited from

[`BootstrapData`](BootstrapData.md).[`targetURL`](BootstrapData.md#targeturl)

***

### type

> **type**: `"product"`

Defined in: [src/downloaders/Bootstrap.ts:15](https://github.com/patrickkfkan/patreon-dl/blob/85b45f808a4c4af13ab0b40464fd970e53880f7d/src/downloaders/Bootstrap.ts#L15)

#### Overrides

[`BootstrapData`](BootstrapData.md).[`type`](BootstrapData.md#type)
