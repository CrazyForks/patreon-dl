[**patreon-dl**](../README.md)

***

[patreon-dl](../README.md) / DownloadTaskSkipReason

# Type Alias: DownloadTaskSkipReason

> **DownloadTaskSkipReason** = `object` & \{ `existingDestFilePath`: `string`; `name`: `"destFileExists"`; \} \| \{ `destFilename`: `string`; `itemType`: `"image"` \| `"audio"` \| `"attachment"`; `name`: `"includeMediaByFilenameUnfulfilled"`; `pattern`: `string`; \} \| \{ `name`: `"dependentTaskNotCompleted"`; \} \| \{ `name`: `"other"`; \}

Defined in: [src/downloaders/task/DownloadTask.ts:25](https://github.com/patrickkfkan/patreon-dl/blob/85b45f808a4c4af13ab0b40464fd970e53880f7d/src/downloaders/task/DownloadTask.ts#L25)

## Type declaration

### message

> **message**: `string`
