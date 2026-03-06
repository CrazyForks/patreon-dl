[**patreon-dl**](../README.md)

***

[patreon-dl](../README.md) / Logger

# Class: `abstract` Logger

Defined in: [src/utils/logging/Logger.ts:9](https://github.com/patrickkfkan/patreon-dl/blob/85b45f808a4c4af13ab0b40464fd970e53880f7d/src/utils/logging/Logger.ts#L9)

## Extended by

- [`ChainLogger`](ChainLogger.md)
- [`ConsoleLogger`](ConsoleLogger.md)

## Constructors

### Constructor

> **new Logger**(): `Logger`

#### Returns

`Logger`

## Methods

### end()

> **end**(): `Promise`\<`void`\>

Defined in: [src/utils/logging/Logger.ts:12](https://github.com/patrickkfkan/patreon-dl/blob/85b45f808a4c4af13ab0b40464fd970e53880f7d/src/utils/logging/Logger.ts#L12)

#### Returns

`Promise`\<`void`\>

***

### log()

> `abstract` **log**(`entry`): `void`

Defined in: [src/utils/logging/Logger.ts:10](https://github.com/patrickkfkan/patreon-dl/blob/85b45f808a4c4af13ab0b40464fd970e53880f7d/src/utils/logging/Logger.ts#L10)

#### Parameters

##### entry

[`LogEntry`](../interfaces/LogEntry.md)

#### Returns

`void`
