[**patreon-dl**](../README.md)

***

[patreon-dl](../README.md) / DownloaderBootstrapData

# Type Alias: DownloaderBootstrapData\<T\>

> **DownloaderBootstrapData**\<`T`\> = `T`\[`"type"`\] *extends* `"product"` ? [`ProductDownloaderBootstrapData`](../interfaces/ProductDownloaderBootstrapData.md) : `T`\[`"type"`\] *extends* `"post"` ? [`PostDownloaderBootstrapData`](../interfaces/PostDownloaderBootstrapData.md) : `never`

Defined in: [src/downloaders/Bootstrap.ts:55](https://github.com/patrickkfkan/patreon-dl/blob/85b45f808a4c4af13ab0b40464fd970e53880f7d/src/downloaders/Bootstrap.ts#L55)

## Type Parameters

### T

`T` *extends* [`DownloaderType`](DownloaderType.md)
