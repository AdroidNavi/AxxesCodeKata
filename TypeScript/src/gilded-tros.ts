import { Item } from "./item";
import { categories, itemUpdater } from "./item-category";

export class GildedTros {
  constructor(public items: Array<Item>) {}

  public updateItems(): void {
    this.items = this.items.map((item) => {
      const itemCategory = categories.find((category) =>
        category.predicate(item)
      );
      return itemCategory ? itemCategory.updater(item) : itemUpdater(item, -1);
    });
  }
}
