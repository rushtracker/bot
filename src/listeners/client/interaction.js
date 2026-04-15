import Event from '../../core/structures/Event.js';

export default class ClientInteractionEvent extends Event {
  constructor(client) {
    super(client, {
      name: 'client:interaction',
      event: 'interactionCreate'
    });
  }

  async run(interaction) {
    let int;
    if (interaction.isChatInputCommand()) int = this.client.commands.get(interaction.commandName);
    if (interaction.isContextMenuCommand()) int = this.client.contextmenus.get(interaction.commandName);
    if (interaction.isButton()) int = this.client.buttons.get(interaction.customId);
    if (interaction.isAnySelectMenu()) int = this.client.selectmenus.get(interaction.customId);
    if (interaction.isModalSubmit()) int = this.client.commands.get(interaction.customId);
    if (interaction.isAutocomplete()) int = this.client.commands.get(interaction.commandName);

    if (!interaction.isAutocomplete() && !int) return this.errorReply(interaction);

    if (interaction.isChatInputCommand()) this.client.emit('handler:command', interaction, int);
    if (interaction.isContextMenuCommand()) this.client.emit('handler:contextmenu', interaction, int);
    if (interaction.isButton()) this.client.emit('handler:button', interaction, int);
    if (interaction.isAnySelectMenu()) this.client.emit('handler:selectmenu', interaction, int);
    if (interaction.isModalSubmit()) this.client.emit('handler:modal', interaction, int);
    if (interaction.isAutocomplete()) this.client.emit('handler:autocomplete', interaction, int);
  }
}
