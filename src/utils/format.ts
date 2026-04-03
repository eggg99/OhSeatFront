export function formatNumberWithComma(
  value: number | string,
  unit = '명'
): string {
  if (value === null || value === undefined || value === '') return `0${unit}`;

  const num = Number(value);
  if (Number.isNaN(num)) return `0${unit}`;

  return `${num.toLocaleString()} ${unit}`;
}

export const formatDateTime = (dateTime: string) => {
  const [date, time] = dateTime.split("T");
  return {
    date,
    time: time?.slice(0, 5) ?? "",
  };
};

export const formatDateDot = (dateValue?: string | null) => {
  if (!dateValue) return "";

  return String(dateValue)
    .split(/[ T]/)[0]
    .replace(/-/g, ".");
};
