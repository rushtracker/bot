import { Colors, MessageFlags, PermissionFlagsBits } from 'discord.js';

import Event from '../../core/structures/Event.js';
import Container, { fmt } from '../../services/Container.js';

export default class InteractionCreateEvent extends Event {
  constructor(client) {
    super(client, {
      name: 'interactionCreate'
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

    if (!interaction.isAutocomplete()) {
      if (!int) return interaction.reply({
        flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral],
        components: [
          new Container()
          .setAccentColor(Colors.Red)
          .h3('erreur')
          .text('une erreur est survenue')
        ]
      });

      if (int.config.perms && !interaction.member.permissions.has(int.config.perms)) {
        const permissions = Object.keys(this.client.config.permissions)
        .filter((p) => int.config.perms.includes(PermissionFlagsBits[p]))
        .map((p) => this.client.config.permissions[p]);

        return interaction.reply({
          flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral],
          components: [
            new Container()
            .setAccentColor(Colors.Red)
            .h3('erreur')
            .text('vous n\'avez pas la permission de réaliser ceci')
            .text(`${fmt.bullet([fmt.bold(`permission${permissions.length > 1 ? 's' : ''}:`)])} ${this.client.utils.joinLastCustomWord(permissions.map((p) => `\`${p}\``))}`)
          ]
        });
      }

      if (int.config.meperms && !interaction.guild.members.me.permissions.has(int.config.meperms)) {
        const permissions = Object.keys(this.client.config.permissions)
        .filter((p) => int.config.meperms.includes(PermissionFlagsBits[p]))
        .map((p) => this.client.config.permissions[p]);

        return interaction.reply({
          flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral],
          components: [
            new Container()
            .setAccentColor(Colors.Red)
            .h3('erreur')
            .text('je n\'ai pas la permission de réaliser ceci')
            .text(`${fmt.bullet(fmt.bold(`permission${permissions.length > 1 ? 's' : ''}:`))} ${this.client.utils.joinLastCustomWord(permissions.map((p) => `\`${p}\``))}`)
          ]
        });
      }
    }

    if (interaction.isChatInputCommand()) this.client.emit('handler:command', interaction, int);
    if (interaction.isContextMenuCommand()) this.client.emit('handler:contextmenu', interaction, int);
    if (interaction.isButton()) this.client.emit('handler:button', interaction, int);
    if (interaction.isAnySelectMenu()) this.client.emit('handler:selectmenu', interaction, int);
    if (interaction.isModalSubmit()) this.client.emit('handler:modal', interaction, int);
    if (interaction.isAutocomplete()) this.client.emit('handler:autocomplete', interaction, int);
  }
}
