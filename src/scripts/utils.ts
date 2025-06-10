export const makeRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const shuffleArray = (array: unknown[]): unknown[] => {
  let curIndex = array.length;
  const newArray = [...array];

  while (curIndex) {
    const randomIdx = Math.floor(Math.random() * curIndex);
    curIndex--;

    [newArray[curIndex], newArray[randomIdx]] = [
      newArray[randomIdx],
      newArray[curIndex],
    ];
  }

  return newArray;
};

export const LEVELS = {
  critical: {
    background: "#A00D21",
    color: "#FFE1DF",
    text: "кринж",
    rgb: "160, 13, 33",
  },
  high: {
    background: "#F84F53",
    color: "#FFE1DF",
    text: "хуй",
    text2: "хай",
    rgb: "248, 79, 83",
  },
  low: {
    background: "#FCD054",
    color: "#382E1B",
    text: "пупупу",
    rgb: "252, 208, 84",
  },
  medium: {
    background: "#FE9B60",
    color: "#48251F",
    text: "медиум",
    rgb: "254, 155, 96",
  },
  negligible: {
    background: "#FDE397",
    color: "#382E1B",
    text: "неглигибле",
    rgb: "253, 227, 151",
  },
  ok: { background: "#1DA189", color: "#C0F0E7", rgb: "29, 161, 137" },
};

export const renderLevel = (level: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const item = LEVELS[level]! as Record<string, string>;
  return `<div class="level" style="background-color: ${
    item.background
  }; color: ${item.color}">${
    item.text2 ? `<i>${item.text}</i>${item.text2}` : item.text
  }</div>`;
};
