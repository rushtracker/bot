import { Client, Collection, ApplicationCommandOptionType } from 'discord.js';

import Utils from '../classes/Utils.js';
import config from '../config.js';

export default class Bot extends Client {
  utils = new Utils();
  config = config;

  commands = new Collection();
  contextmenus = new Collection();
  buttons = new Collection();
  selectmenus = new Collection();
  modals = new Collection();
  events = new Collection();

  constructor(options) {
    super(options);
  }

  get interactions() {
    return [].concat(this.commands.map((c) => c.config), this.contextmenus.map((c) => c.config));
  }

  async getApplicationCommand(name) {
    const commands = await this.application.commands.fetch();

    return commands.find((c) => c.name === name);
  }

  getValidator(type) {
    switch(type) {
      case 'commands':
        return (i) => i?.run && i?.config?.name && i?.config?.description;
      case 'contextmenus':
        return (i) => i?.run && i?.config?.name && i?.config?.type;
      default:
        return (i) => i?.run && i?.config?.name;
    }
  }

  async loadInteraction(dir, collection, validate) {
    const filesPath = this.utils.getFiles(dir, ['.js']);

    for (const path of filesPath) {
      const { default: Instance } = await import(`../../${path}`);
      const interaction = new Instance(this);

      if (!validate(interaction)) continue;

      collection.set(interaction.config.name, interaction);
    }
  }

  async loadInteractions() {
    const types = [
      'commands',
      'contextmenus',
      'buttons',
      'selectmenus',
      'modals'
    ];

    for (const type of types) {
      await this.loadInteraction(
        `./src/interactions/${type}`,
        this[type],
        this.getValidator(type)
      );
    }
  }

  async loadEvents() {
    const filesPath = this.utils.getFiles('./src/listeners', ['.js']);

    for (const path of filesPath) {
      const { default: Instance } = await import(`../../${path}`);
      const event = new Instance(this);

      if (!event.run || !event.config?.name) continue;

      this.events.set(event.config.name, event);

      const target = event.config.rest ? this.rest : event.config.process ? process : this;
      const emitterEvent = event.config.event || event.config.name;

      target.on(emitterEvent, (...args) => event.run(...args));
    }
  }

  async deployClientCommands() {
    return this.application.commands.set(this.interactions);
  }

  async removeClientCommands() {
    return this.application.commands.set([]);
  }

  async loadAll() {
    await this.loadInteractions();
    await this.loadEvents();
  }

  async loadClient(token) {
    return this.login(token);
  }
};
