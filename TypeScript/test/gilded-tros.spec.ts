import { Item } from "../src/item";
import { GildedTros } from "../src/gilded-tros";

describe("GildedTros", () => {
  it.each`
    name                                | expectedQuality | expectedSellIn
    ${"Good Wine"}                      | ${11}           | ${9}
    ${"B-DAWG Keychain"}                | ${80}           | ${10}
    ${"Backstage passes for Re:Factor"} | ${12}           | ${9}
    ${"Backstage passes for HAXX"}      | ${12}           | ${9}
  `("sellIn 10 days | $name", ({ name, expectedQuality, expectedSellIn }) => {
    const items: Item[] = [new Item(name, 10, 10)];
    const app: GildedTros = new GildedTros(items);

    app.updateQuality();

    expect(app.items).toEqual([
      new Item(name, expectedSellIn, expectedQuality),
    ]);
  });
});
