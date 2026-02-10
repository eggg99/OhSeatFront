export function formatNumberWithComma(
  value: number | string,
  unit = '명'
): string {
  if (value === null || value === undefined || value === '') return `0${unit}`;

  const num = Number(value);
  if (Number.isNaN(num)) return `0${unit}`;

  return `${num.toLocaleString()} ${unit}`;
}