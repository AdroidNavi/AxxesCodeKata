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
    ${"Duplicate Code"}                  | ${10}  | ${9}           | ${8}
    ${"Duplicate Code"}                  | ${0}   | ${-1}          | ${6}
    ${"Long Methods"}                    | ${10}  | ${9}           | ${8}
    ${"Long Methods"}                    | ${0}   | ${-1}          | ${6}
    ${"Ugly Variable Names"}             | ${10}  | ${9}           | ${8}
    ${"Ugly Variable Names"}             | ${0}   | ${-1}          | ${6}
  `(
    "sellIn $sellIn day(s) | $name",
    ({ name, sellIn, expectedSellIn, expectedQuality }) => {
      const app: GildedTros = new GildedTros([
        new Item(name, sellIn, 10),
        new Item(name, sellIn, 10),
        new Item(name, sellIn, 10),
      ]);

      app.updateItems();

      expect(app.items).toEqual([
        new Item(name, expectedSellIn, expectedQuality),
        new Item(name, expectedSellIn, expectedQuality),
        new Item(name, expectedSellIn, expectedQuality),
      ]);
    }
  );

  it.each`
    name
    ${"Test Item"}
    ${"Duplicate Code"}
    ${"Long Methods"}
    ${"Ugly Variable Names"}
  `("quality never drops below 0 | $name", ({ name }) => {
    const app: GildedTros = new GildedTros([new Item(name, 10, 0)]);

    app.updateItems();

    expect(app.items).toEqual([new Item(name, 9, 0)]);
  });

  it.each`
    name
    ${"Good Wine"}
    ${"Backstage passes for Re:Factor"}
    ${"Backstage passes for HAXX"}
    ${"Backstage passes for Test Event"}
  `("quality never goes over 50 | $name", ({ name }) => {
    const app: GildedTros = new GildedTros([new Item(name, 10, 50)]);

    app.updateItems();

    expect(app.items).toEqual([new Item(name, 9, 50)]);
  });
});
