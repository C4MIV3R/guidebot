# pancakeBot
A Discord bot. Forked from [AnIdiotsGuide's GuideBot](https://github.com/An-Idiots-Guide/guidebot).

## Requirements

- `git` command line ([Windows](https://git-scm.com/download/win)|[Linux](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)|[MacOS](https://git-scm.com/download/mac)) installed
- `node` [Version 8.0.0 or higher](https://nodejs.org)

You also need your bot's token. This is obtained by creating an application in
the Developer section of discordapp.com. Check the [first section of this page](https://anidiots.guide/getting-started/the-long-version.html) 
for more info.

Once finished: 

- In the folder from where you ran the git command, run `cd guidebot` and then run `npm install`
- Rename or copy `config.js.example` to `config.js`
- Edit `config.js` and fill in all the relevant details as indicated in the file's comments.

## Starting the bot

To start the bot, in the command prompt, run the following command:
`node index.js`

## Inviting to a guild

To add the bot to your guild, you have to get an oauth link for it. 

You can use this site to help you generate a full OAuth Link, which includes a calculator for the permissions:
[https://finitereality.github.io/permissions-calculator/?v=0](https://finitereality.github.io/permissions-calculator/?v=0)
