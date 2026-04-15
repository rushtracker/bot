import { ActionRowBuilder, blockQuote, codeBlock, ContainerBuilder, heading, MediaGalleryBuilder, orderedList, SeparatorBuilder, SeparatorSpacingSize, subtext, TextDisplayBuilder, unorderedList } from 'discord.js';
import config from '../config.js';

import Section from './Section.js';

export default class Container {
  #builder;
  #footer;

  constructor({ footer = true } = {}) {
    this.#builder = new ContainerBuilder();
    this.#footer = footer;
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
    return this.#text(blockQuote(content));
  }

  addUnorderedList(items) {
    return this.#text(unorderedList(items));
  }

  addOrderedList(items) {
    return this.#text(orderedList(items));
  }

  addCodeBlock(language, content) {
    return this.#text(codeBlock(language, content));
  }

  addSeparator(spacing = SeparatorSpacingSize.Small) {
    this.#builder.addSeparatorComponents(
      new SeparatorBuilder()
      .setSpacing(spacing)
    );

    return this;
  }

  addGallery(urls) {
    this.#builder.addMediaGalleryComponents(
      new MediaGalleryBuilder()
      .addItems(urls.map((url) => ({ media: url })))
    );

    return this
  }

  addSection(fn) {
    const section = new Section();
    fn(section);

    this.#builder.addSectionComponents(section.toJSON());

    return this;
  }

  addRow(components) {
    this.#builder.addActionRowComponents(
      new ActionRowBuilder()
      .addComponents(components)
    )
  }

  setColor(color) {
    this.#builder.setAccentColor(color);

    return this;
  }

  toJSON() {
    const { footer: DEFAULT_FOOTER } = config;

    if (this.#footer) {
      this.addSeparator().addSubText(DEFAULT_FOOTER)
      this.#footer = false;
    }

    return this.#builder.toJSON();
  }
}
