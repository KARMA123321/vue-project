import { Locator } from "@playwright/test"
import Card from "./card.js";
import BaseComponent from "./base-component.js";

export default class CardList extends BaseComponent {
  readonly addCardButton = this.element.locator(".add-card");
  
  constructor(element: Locator) {
    super(element);
  }

  async getCards() {
    const cardsLocators = await this.element.locator(".card").all();

    return cardsLocators.map((card) => new Card(card));
  }

  async getCardsCount() {
    const cards = await this.getCards();

    return cards.length;
  }
}