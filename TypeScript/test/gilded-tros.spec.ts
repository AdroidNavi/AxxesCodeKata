import { Item } from "../src/item";
import { GildedTros } from "../src/gilded-tros";

it.each`
  name                                | expectedQuality | expectedSellIn
  ${"Good Wine"}                      | ${11}           | ${9}
  ${"B-DAWG Keychain"}                | ${10}           | ${10}
  ${"Backstage passes for Re:Factor"} | ${12}           | ${9}
  ${"Backstage passes for HAXX"}      | ${11}           | ${9}
`(
  "GildedTros | one day | $name",
  ({ name, expectedQuality, expectedSellIn }) => {
    const items: Item[] = [new Item(name, 10, 10)];
    const app: GildedTros = new GildedTros(items);

    app.updateQuality();

    expect(app.items).toEqual([
      new Item(name, expectedSellIn, expectedQuality),
    ]);
  }
);
