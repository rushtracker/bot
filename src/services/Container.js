import { SectionBuilder, TextDisplayBuilder, ThumbnailBuilder, ContainerBuilder, SeparatorSpacingSize, SeparatorBuilder, MediaGalleryBuilder, ActionRowBuilder } from 'discord.js';

import config from '../config.js';

const fmt = {
  h1: (t) => `# ${t}`,
  h2: (t) => `## ${t}`,
  h3: (t) => `### ${t}`,
  sub: (t) => `-# ${t}`,
  bullet: (...items) => items.flat().map((i) => `- ${i}`).join('\n'),
  numbered: (...items) => items.flat().map((i, n) => `${n + 1}. ${i}`).join('\n'),
  quote: (t) => `> ${t}`,
  code: (t, lang = '') => `\`\`\`${lang}\n${t}\n\`\`\``,
  inline: (t) => `\`${t}\``,
  bold: (t) => `**${t}**`,
  italic: (t) => `*${t}*`,
  strike: (t) => `~~${t}~~`,
  spoil: (t) => `||${t}||`,
  mask: (t, url) => `[${t}](${url})`
};

class Section extends SectionBuilder {
  #text(content) {
    return this.addTextDisplayComponents(
      new TextDisplayBuilder()
      .setContent(content)
    );
  }

  text(content) {
    return this.#text(content);
  }

  h1(content) {
    return this.#text(fmt.h1(content));
  }

  h2(content) {
    return this.#text(fmt.h2(content));
  }

  h3(content) {
    return this.#text(fmt.h3(content));
  }
  
  sub(content) {
    return this.#text(fmt.sub(content));
  }

  quote(content) {
    return this.#text(fmt.quote(content));
  }

  list(...items) {
    return this.#text(fmt.bullet(...items));
  }

  numbered(...items) {
    return this.#text(fmt.numbered(...items));
  }

  thumbnail(url) {
    return this.setThumbnailAccessory(
      new ThumbnailBuilder()
      .setURL(url)
    );
  }

  button(btn) {
    return this.setButtonAccessory(btn);
  }
}

class Container extends ContainerBuilder {
  #footer;

  constructor({ footer = true } = {}) {
    super();
    this.#footer = footer;
  }

  #text(content) {
    return this.addTextDisplayComponents(
      new TextDisplayBuilder()
      .setContent(content)
    );
  }

  text(content) {
    return this.#text(content);
  }

  h1(content) {
    return this.#text(fmt.h1(content));
  }

  h2(content) {
    return this.#text(fmt.h2(content));
  }

  h3(content) {
    return this.#text(fmt.h3(content));
  }
  
  sub(content) {
    return this.#text(fmt.sub(content));
  }

  quote(content) {
    return this.#text(fmt.quote(content));
  }

  list(...items) {
    return this.#text(fmt.bullet(...items));
  }

  numbered(...items) {
    return this.#text(fmt.numbered(...items));
  }

  separator(spacing = SeparatorSpacingSize.Small) {
    return this.addSeparatorComponents(
      new SeparatorBuilder()
      .setSpacing(spacing)
    );
  }

  gallery(...urls) {
    return this.addMediaGalleryComponents(
      new MediaGalleryBuilder()
      .addItems(
        urls.flat().map((url) => ({ media: url }))
      )
    );
  }

  section(fn) {
    const s = new Section();

    fn(s);

    return this.addSectionComponents(s);
  }

  row(...components) {
    return this.addActionRowComponents(
      new ActionRowBuilder()
      .addComponents(
        ...components.flat()
      )
    );
  }

  toJSON() {
    const { footer: DEFAULT_FOOTER } = config;
    
    if (this.#footer && DEFAULT_FOOTER) {
      this.separator().sub(DEFAULT_FOOTER);
      this.#footer = false;
    }

    return super.toJSON();
  }
}

export { Section, fmt };
export default Container;
