# deg-converter

Convert geographic coordinates between decimal degrees and degree/minute(/second) string formats.

## Install

```sh
npm install @canterbury-air-patrol/deg-converter
```

## Usage

```ts
import {
  degreesToDM,
  degreesToDMS,
  DMToDegrees,
  DMSToDegrees
} from '@canterbury-air-patrol/deg-converter'

degreesToDM(43.5, 'lat')          // "43 30.000 N"
degreesToDM(-172.5, 'lon')        // "172 30.000 W"

degreesToDMS(43.508333, 'lat')    // "43 30 30.0 N"
degreesToDMS(-43.508333, 'lat')   // "43 30 30.0 S"

DMToDegrees('43 30 N')            // 43.5
DMSToDegrees('43 30 30 W')        // -43.508333...
```

The parsers accept the direction letter as a leading or trailing token,
either with or without a space (`'N 43 30'`, `'N43 30'`, `'43 30 N'`,
`'43 30N'`).

## API

### `degreesToDM(degs: number, axis: 'lat' | 'lon'): string`
Format decimal degrees as `D M.mmm Dir`. Throws `RangeError` if `degs`
is non-finite or outside `±90` (lat) / `±180` (lon).

### `degreesToDMS(degs: number, axis: 'lat' | 'lon'): string`
Format decimal degrees as `D M S.s Dir`. Same range rules as
`degreesToDM`.

### `DMToDegrees(dm: string): number`
Parse a degree/minute string into decimal degrees. Requires exactly
two numeric parts plus an optional `N`/`S`/`E`/`W` direction. Throws
`SyntaxError` on malformed input.

### `DMSToDegrees(dms: string): number`
Parse a degree/minute/second string. Requires exactly three numeric
parts. Throws `SyntaxError` on malformed input.

## License

MIT
