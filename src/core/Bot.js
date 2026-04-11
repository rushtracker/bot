const { Client, Collection, ApplicationCommandOptionType } = require('discord.js');
const { MongoDriver } = require('quick.db');

module.exports = class Bot extends Client {
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

  getApplicationCommand(commands, name) {
    return commands.find((c) => c.name === name);
  }

  getApplicationSubCommands(commands, name) {
    return this.getApplicationCommand(commands, name).options?.filter((opt) => opt.type === ApplicationCommandOptionType.Subcommand);
  }
};