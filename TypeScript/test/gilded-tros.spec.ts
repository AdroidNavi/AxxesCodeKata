import { Item } from "../src/item";
import { GildedTros } from "../src/gilded-tros";

describe("GildedTros", () => {
  it.each`
    name                                | expectedSellIn | expectedQuality
    ${"Good Wine"}                      | ${9}           | ${11}
    ${"B-DAWG Keychain"}                | ${10}          | ${80}
    ${"Backstage passes for Re:Factor"} | ${9}           | ${12}
    ${"Backstage passes for HAXX"}      | ${9}           | ${12}
  `("sellIn 10 days | $name", ({ name, expectedSellIn, expectedQuality }) => {
    const items: Item[] = [new Item(name, 10, 10)];
    const app: GildedTros = new GildedTros(items);

    app.updateQuality();

    expect(app.items).toEqual([
      new Item(name, expectedSellIn, expectedQuality),
    ]);
  });
});
