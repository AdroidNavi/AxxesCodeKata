import { Item } from "./item";

const CodeSmellItemNames = [
  "Duplicate Code",
  "Long Methods",
  "Ugly Variable Names",
];

export class GildedTros {
  constructor(public items: Array<Item>) {}

  private updateItem(item: Item, qualityChange: number): Item {
    const realQualityChange =
      item.sellIn <= 0 ? qualityChange * 2 : qualityChange;
    const newQuality = Math.max(
      0,
      Math.min(50, item.quality + realQualityChange)
    );

    return {
      ...item,
      sellIn: item.sellIn - 1,
      quality: newQuality,
    };
  }

  public updateItems(): void {
    this.items = this.items.map((item) => {
      const { name, sellIn } = item;
      if (name === "B-DAWG Keychain") {
        return { ...item, quality: 80 };
      }

      if (name === "Good Wine") {
        return this.updateItem(item, 1);
      }

      if (name.startsWith("Backstage passes")) {
        if (sellIn <= 0) {
          return { ...item, sellIn: sellIn - 1, quality: 0 };
        }

        if (sellIn <= 5) {
          return this.updateItem(item, 3);
        }

        if (sellIn <= 10) {
          return this.updateItem(item, 2);
        }

        return this.updateItem(item, 1);
      }

      if (CodeSmellItemNames.includes(name)) {
        return this.updateItem(item, -2);
      }

      return this.updateItem(item, -1);
    });
  }
}
