import { Item } from "../src/item";
import { GildedTros } from "../src/gilded-tros";

describe("GildedTros", () => {
  it.each`
    name                                 | sellIn | expectedSellIn | expectedQuality
    ${"Test Item"}                       | ${10}  | ${9}           | ${9}
    ${"Test Item"}                       | ${0}   | ${-1}          | ${8}
    ${"Good Wine"}                       | ${10}  | ${9}           | ${11}
    ${"B-DAWG Keychain"}                 | ${10}  | ${10}          | ${80}
    ${"Backstage passes for Re:Factor"}  | ${11}  | ${10}          | ${11}
    ${"Backstage passes for Re:Factor"}  | ${10}  | ${9}           | ${12}
    ${"Backstage passes for Re:Factor"}  | ${6}   | ${5}           | ${12}
    ${"Backstage passes for Re:Factor"}  | ${5}   | ${4}           | ${13}
    ${"Backstage passes for Re:Factor"}  | ${0}   | ${-1}          | ${0}
    ${"Backstage passes for HAXX"}       | ${11}  | ${10}          | ${11}
    ${"Backstage passes for HAXX"}       | ${10}  | ${9}           | ${12}
    ${"Backstage passes for HAXX"}       | ${6}   | ${5}           | ${12}
    ${"Backstage passes for HAXX"}       | ${5}   | ${4}           | ${13}
    ${"Backstage passes for HAXX"}       | ${0}   | ${-1}          | ${0}
    ${"Backstage passes for Test Event"} | ${11}  | ${10}          | ${11}
    ${"Backstage passes for Test Event"} | ${10}  | ${9}           | ${12}
    ${"Backstage passes for Test Event"} | ${6}   | ${5}           | ${12}
    ${"Backstage passes for Test Event"} | ${5}   | ${4}           | ${13}
    ${"Backstage passes for Test Event"} | ${0}   | ${-1}          | ${0}
  `(
    "sellIn $sellIn day(s) | $name",
    ({ name, sellIn, expectedSellIn, expectedQuality }) => {
      const items: Item[] = [new Item(name, sellIn, 10)];
      const app: GildedTros = new GildedTros(items);

      app.updateQuality();

      expect(app.items).toEqual([
        new Item(name, expectedSellIn, expectedQuality),
      ]);
    }
  );

  it.each`
    name           | expectedSellIn | expectedQuality
    ${"Test Item"} | ${9}           | ${0}
  `(
    "quality never drops below 0 | $name",
    ({ name, expectedSellIn, expectedQuality }) => {
      const items: Item[] = [new Item(name, 10, 0)];
      const app: GildedTros = new GildedTros(items);

      app.updateQuality();

      expect(app.items).toEqual([
        new Item(name, expectedSellIn, expectedQuality),
      ]);
    }
  );

  it.each`
    name                                 | expectedSellIn | expectedQuality
    ${"Good Wine"}                       | ${9}           | ${50}
    ${"Backstage passes for Re:Factor"}  | ${9}           | ${50}
    ${"Backstage passes for HAXX"}       | ${9}           | ${50}
    ${"Backstage passes for Test Event"} | ${9}           | ${50}
  `(
    "quality never goes over 50 | $name",
    ({ name, expectedSellIn, expectedQuality }) => {
      const items: Item[] = [new Item(name, 10, 50)];
      const app: GildedTros = new GildedTros(items);

      app.updateQuality();

      expect(app.items).toEqual([
        new Item(name, expectedSellIn, expectedQuality),
      ]);
    }
  );
});
