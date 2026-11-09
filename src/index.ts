export type RatioDirection = 1 | -1

export interface RatioOptions {
  /** Number of decimal places in the returned result. Defaults to `2`. */
  precision?: number
}

/**
 * Calculates the corresponding value using a ratio.
 *
 * The first ratio component corresponds to `value`; the second component
 * determines the returned value when `direction` is `1`.
 *
 * @param value - The known numeric value.
 * @param definition - The ratio in `"a:b"` format. Defaults to `"1:1"`.
 * @param direction - `1` calculates from `a` to `b`; `-1` calculates from `b` to `a`. Defaults to `1`.
 * @param options - Optional calculation settings, including decimal precision.
 * @returns The calculated value rounded to the requested precision.
 *
 * @throws {TypeError} If the value is not finite, the ratio format is invalid,
 * or the direction is not `1` or `-1`.
 * @throws {RangeError} If a ratio component is not positive, the precision is
 * outside the range `0`–`100`, or the result is not finite.
 *
 * @example
 * ratio(400, "4:3"); // 300
 *
 * @example
 * ratio(300, "4:3", -1); // 400
 *
 * @example
 * ratio(400); // 400
 *
 * @example
 * ratio(100, "3:2", 1, { precision: 4 }); // 66.6667
 */
export function ratio(
  value: number,
  definition = '1:1',
  direction: RatioDirection = 1,
  options: RatioOptions = {},
): number {
  if (!Number.isFinite(value)) {
    throw new TypeError('Value must be a finite number.')
  }

  const match = /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?)$/.exec(definition)

  if (!match) {
    throw new TypeError(`Invalid ratio: "${definition}". Expected a:b.`)
  }

  const a = Number(match[1])
  const b = Number(match[2])

  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new RangeError('Ratio components must be finite numbers.')
  }

  if (a <= 0 || b <= 0) {
    throw new RangeError('Ratio components must be positive.')
  }

  if (direction !== 1 && direction !== -1) {
    throw new TypeError('Direction must be 1 or -1.')
  }

  const precision = options.precision ?? 2

  if (!Number.isInteger(precision) || precision < 0 || precision > 100) {
    throw new RangeError('Precision must be between 0 and 100.')
  }

  const result = direction === 1 ? value * (b / a) : value * (a / b)

  if (!Number.isFinite(result)) {
    throw new RangeError('Calculated result exceeds the supported range.')
  }

  return Number(result.toFixed(precision))
}
