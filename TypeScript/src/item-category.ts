import { Item } from "./item";

const BdawgKeychain = "B-DAWG Keychain";
const GoodWine = "Good Wine";
const BackstagePasses = "Backstage passes";
const CodeSmellItemNames = [
  "Duplicate Code",
  "Long Methods",
  "Ugly Variable Names",
];

type ItemCategory = {
  predicate: (item: Item) => boolean;
  updater: (item: Item) => Item;
};

export const categories: ItemCategory[] = [
  {
    predicate: (item) => item.name === BdawgKeychain,
    updater: (item) => ({ ...item, quality: 80 }),
  },
  {
    predicate: (item) => item.name === GoodWine,
    updater: (item) => itemUpdater(item, 1),
  },
  {
    predicate: (item) => item.name.startsWith(BackstagePasses),
    updater: (item) => backstagePassesUpdater(item),
  },
  {
    predicate: (item) => CodeSmellItemNames.includes(item.name),
    updater: (item) => itemUpdater(item, -2),
  },
];

const backstagePassesUpdater = (item: Item): Item => {
  const { sellIn } = item;
  if (sellIn <= 0) {
    return { ...item, sellIn: sellIn - 1, quality: 0 };
  }

  if (sellIn <= 5) {
    return itemUpdater(item, 3);
  }

  if (sellIn <= 10) {
    return itemUpdater(item, 2);
  }

  return itemUpdater(item, 1);
};

export const itemUpdater = (item: Item, qualityDelta: number): Item => {
  const qualityPlusDelta =
    item.quality + (item.sellIn <= 0 ? qualityDelta * 2 : qualityDelta);

  const newQuality = Math.max(0, Math.min(50, qualityPlusDelta));

  return {
    name: item.name,
    sellIn: item.sellIn - 1,
    quality: newQuality,
  };
};
