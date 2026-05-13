const ANCHOR_DATE = new Date(2026, 4, 11, 8, 0, 0);
const MARKET_OPEN_HOUR = 8;
const MARKET_CLOSE_HOUR = 16;
const DAY_MS = 24 * 60 * 60 * 1000;

export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function atStartOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function withMarketOpenTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), MARKET_OPEN_HOUR, 0, 0);
}

function scheduledFromPattern(patternDate) {
  if (patternDate.getDay() !== 0) {
    return {
      date: withMarketOpenTime(patternDate),
      originalDate: withMarketOpenTime(patternDate),
      exception: false,
    };
  }

  const saturday = addDays(patternDate, -1);
  return {
    date: withMarketOpenTime(saturday),
    originalDate: withMarketOpenTime(patternDate),
    exception: true,
  };
}

function withCloseTime(date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    MARKET_CLOSE_HOUR,
    0,
    0,
  );
}

function buildMarketDay(cycle) {
  const patternDate = addDays(ANCHOR_DATE, cycle * 8);
  const scheduled = scheduledFromPattern(patternDate);

  return {
    ...scheduled,
    closeTime: withCloseTime(scheduled.date),
    cycle,
  };
}

export function generateMarketDays(count = 18, fromDate = new Date()) {
  const fromStart = atStartOfDay(fromDate);
  const anchorStart = atStartOfDay(ANCHOR_DATE);
  const roughCycles = Math.floor((fromStart.getTime() - anchorStart.getTime()) / (8 * DAY_MS));
  let cycle = Math.max(0, roughCycles - 3);
  const days = [];

  while (days.length < count) {
    const marketDay = buildMarketDay(cycle);

    if (atStartOfDay(marketDay.date) >= fromStart) {
      days.push(marketDay);
    }

    cycle += 1;
  }

  return days;
}

export function generateMarketDaysRange(startDate, endDate) {
  const start = atStartOfDay(startDate);
  const end = atStartOfDay(endDate);
  const anchorStart = atStartOfDay(ANCHOR_DATE);
  const roughStartCycle = Math.floor((start.getTime() - anchorStart.getTime()) / (8 * DAY_MS));
  let cycle = Math.max(0, roughStartCycle - 2);
  const days = [];

  while (true) {
    const marketDay = buildMarketDay(cycle);
    const marketStart = atStartOfDay(marketDay.date);
    const patternStart = atStartOfDay(marketDay.originalDate);

    if (marketStart > end && patternStart > end) {
      break;
    }

    if (marketStart >= start && marketStart <= end) {
      days.push(marketDay);
    }

    cycle += 1;
  }

  return days;
}

export function getCountdownParts(targetDate, now = new Date()) {
  const remaining = Math.max(0, targetDate.getTime() - now.getTime());

  return {
    days: Math.floor(remaining / DAY_MS),
    hours: Math.floor((remaining % DAY_MS) / (60 * 60 * 1000)),
    minutes: Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000)),
    seconds: Math.floor((remaining % (60 * 1000)) / 1000),
  };
}

export function formatDateLong(date) {
  return `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function formatMonthYear(date) {
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatShortMonth(date) {
  return monthNames[date.getMonth()].slice(0, 3).toUpperCase();
}

export function daysUntil(date, now = new Date()) {
  const targetStart = atStartOfDay(date);
  const nowStart = atStartOfDay(now);
  return Math.round((targetStart.getTime() - nowStart.getTime()) / DAY_MS);
}

export function buildMonthGrid(year, month, marketDays, now = new Date()) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const todayStart = atStartOfDay(now);
  const cells = [];
  const marketByDay = new Map(
    marketDays
      .filter((item) => item.date.getFullYear() === year && item.date.getMonth() === month)
      .map((item) => [
        item.date.getDate(),
        {
          ...item,
          isPast: atStartOfDay(item.date) < todayStart,
          isToday: atStartOfDay(item.date).getTime() === todayStart.getTime(),
        },
      ]),
  );

  for (let i = 0; i < first.getDay(); i += 1) {
    cells.push({ key: `empty-start-${i}`, empty: true });
  }

  for (let day = 1; day <= last.getDate(); day += 1) {
    const date = new Date(year, month, day);
    cells.push({
      key: date.toISOString(),
      day,
      date,
      market: marketByDay.get(day),
      isSunday: date.getDay() === 0,
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({ key: `empty-end-${cells.length}`, empty: true });
  }

  return cells;
}

export function getWhatsAppMessage(nextMarketDay) {
  const date = formatDateLong(nextMarketDay.date);
  return encodeURIComponent(
    `Hi ITAM Market Bot, remind me before the next market day on ${date}.`,
  );
}
