interface TimeBounds {
  min?: string | number;
  max?: string | number;
}

const timeToMinutes = (value: string | number | undefined) => {
  if (typeof value !== 'string') {
    return null;
  }

  const match = value.match(/^([01]\d|2[0-3]):([0-5]\d)$/);
  if (!match) {
    return null;
  }

  return Number(match[1]) * 60 + Number(match[2]);
};

const minutesToTime = (value: number) => {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export const clampTimeByBounds = (value: string, { min, max }: TimeBounds = {}) => {
  const valueMinutes = timeToMinutes(value);

  if (valueMinutes == null) {
    return value;
  }

  const minMinutes = timeToMinutes(min);
  const maxMinutes = timeToMinutes(max);

  if (minMinutes != null && valueMinutes < minMinutes) {
    return minutesToTime(minMinutes);
  }

  if (maxMinutes != null && valueMinutes > maxMinutes) {
    return minutesToTime(maxMinutes);
  }

  return value;
};
