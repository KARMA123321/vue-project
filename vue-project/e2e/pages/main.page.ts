import { expect, test, type Page } from "@playwright/test";
import BasePage from "./base.page.js";
import CardList from "@/components/card-list.js";
import AddCardModal from "@/components/add-card-modal.js";

export default class MainPage extends BasePage {
  readonly cardList = new CardList(this.page.locator(".card-list-wrapper"));
  private readonly _addCardModal = new AddCardModal(this.page.locator(".modal"));

  constructor(page: Page) {
    super(page, "/main");
  }

  async addCard(title: string, content: string): Promise<number> {
    const initialCardsCount = await this.cardList.getCardsCount();

    await test.step(`Add card with title "${title}" and content "${content}"`, async () => {
      await this.cardList.addCardButton.click();
      await this._addCardModal.fillForm(title, content);
      await this._addCardModal.saveButton.click();
    });

    return initialCardsCount;
  }

  async checkCardAdded(title: string, content: string, previousCardsCount: number): Promise<void> {
    await test.step(`Check that card was added`, async () => {
      const newCard = (await this.cardList.getCards())[previousCardsCount];

      expect(await this.cardList.getCards()).toHaveLength(previousCardsCount + 1);
      expect(newCard!.title).toHaveText(title);
      expect(newCard!.content).toHaveText(content);
    });
  }
}
