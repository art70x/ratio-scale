# Ratio Scale

A lightweight TypeScript utility for calculating corresponding values from a ratio.

## Installation

```sh
pnpm add ratio-scale
```

## Usage

```js
import { ratio } from 'ratio-scale'
```

### Basic calculation

```js
ratio(400, '4:3') // 300
```

The input value represents the first part of the ratio. The function calculates the corresponding second value.

### Default ratio

The default ratio is `1:1`.

```js
ratio(400) // 400
```

### Reverse calculation

Pass `-1` to calculate in the opposite direction.

```js
ratio(300, '4:3', -1) // 400
```

### Custom precision

Results are rounded to 2 decimal places by default. Set `precision` to change the number of decimal places.

```js
ratio(100, '3:2') // 66.67

ratio(100, '3:2', 1, {
  precision: 4,
}) // 66.6667
```

## API

### `ratio(value, definition?, direction?, options?)`

| Parameter    | Type           | Default  | Description                    |
| ------------ | -------------- | -------- | ------------------------------ |
| `value`      | `number`       | Required | The known value.               |
| `definition` | `string`       | `"1:1"`  | Ratio in `"a:b"` format.       |
| `direction`  | `1 \| -1`      | `1`      | Calculation direction.         |
| `options`    | `RatioOptions` | `{}`     | Optional calculation settings. |

### Direction

- `1`: Calculate from the first ratio component to the second.
- `-1`: Calculate from the second ratio component to the first.

### `RatioOptions`

| Property    | Type     | Default | Description                                                            |
| ----------- | -------- | ------- | ---------------------------------------------------------------------- |
| `precision` | `number` | `2`     | Decimal places in the returned result. Accepts integers from 0 to 100. |

## Formula

For a ratio `a:b` and a known value `x`:

Forward direction (`1`):

\[
\text{result} = x \times \frac{b}{a}
\]

Reverse direction (`-1`):

\[
\text{result} = x \times \frac{a}{b}
\]

## Validation

The function checks the following inputs:

- `value` must be a finite number.
- `definition` must use the `"a:b"` format.
- Both ratio components must be positive, finite numbers.
- `direction` must be `1` or `-1`.
- `precision` must be an integer between 0 and 100.
- The calculated result must be finite.

Invalid inputs throw a `TypeError` or `RangeError`.

## Development

Run tests:

```sh
vp test
```

Run formatting, linting, and type checks:

```sh
vp check
```

Build the package:

```sh
vp pack
```

## License

[MIT](https://github.com/art70x/ratio-scale/blob/main/LICENSE)

Copyright (c) 2026 [Art70x](https://art70x.github.io)
