import { Item } from "../src/item";
import { GildedTros } from "../src/gilded-tros";

it("GildedTrosTest", () => {
  const items: Item[] = [new Item("Good Wine", 10, 10)];
  const app: GildedTros = new GildedTros(items);
  app.updateQuality();
  expect(app.items[0].name).toEqual("Good Wine");
  expect(app.items[0].quality).toEqual(11);
  expect(app.items[0].sellIn).toEqual(9);
});
