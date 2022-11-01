import { Item } from "./item";

export class GildedTros {
  constructor(public items: Array<Item>) {}

  public updateQuality(): void {
    for (let i = 0; i < this.items.length; i++) {
      if (
        this.items[i].name != "Good Wine" &&
        !this.items[i].name.startsWith("Backstage passes")
      ) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != "B-DAWG Keychain") {
            this.items[i].quality = this.items[i].quality - 1;
          } else {
            this.items[i].quality = 80;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;

          if (this.items[i].name.startsWith("Backstage passes")) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }

            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }

      if (this.items[i].name != "B-DAWG Keychain") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Good Wine") {
          if (!this.items[i].name.startsWith("Backstage passes")) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != "B-DAWG Keychain") {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }
  }
}
