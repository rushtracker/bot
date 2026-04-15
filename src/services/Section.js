import { SectionBuilder, TextDisplayBuilder, ThumbnailBuilder, heading, quote, subtext, unorderedList, orderedList } from 'discord.js';

export default class Section {
  #builder;

  constructor() {
    this.#builder = new SectionBuilder;
  }

  #text(content) {
    this.#builder.addTextDisplayComponents(
      new TextDisplayBuilder()
      .setContent(content)
    );

    return this;
  }

  addHeading(level, content) {
    return this.#text(heading(content, level));
  }

  addText(content) {
    return this.#text(content);
  }

  addSubText(content) {
    return this.#text(subtext(content));
  }

  addQuoteText(content) {
    return this.#text(quote(content));
  }

  addUnorderedList(items) {
    return this.#text(unorderedList(items));
  }

  addOrderedList(items) {
    return this.#text(orderedList(items));
  }

  addCodeBlock(language, code) {
    return this.#text(codeBlock(language, code));
  }

  setButton(button) {
    this.#builder.setButtonAccessory(button);

    return this;
  }

  setThumbnail(url) {
    this.#builder.setThumbnailAccessory(
      new ThumbnailBuilder()
      .setURL(url)
    );

    return this;
  }

  toJSON() {
    return this.#builder.toJSON();
  }
}
