# Jarvis11
This repository contains the source code of a telegram bot


## Setting Up

### Clone the repository
- `git clone https://github.com/king-11/Jarvis11.git`
- `cd Jarvis11`

### Create a new telegram bot
- Follow instructions on [this page](https://core.telegram.org/bots) to create a
new bot and obtain a token.

### Firebase Function
- Get blaze pack for typescript to work with firebase functions
- Create new Firebase project

***

### Local development

#### Install dependencies
- `yarn --frozen-lockfile`
- `npm install -g firebase-tools`
- `firebase login`

#### Set env varaibles in firebase functions
- config your .firebaserc with a new project name
- ```bash
  firebase functions:config:set telegram.bot_token="botToken"
  ```
- Additionally if you want articles function to work set
  ```bash
  firebase functions:config:set telegram.chatid=groupID
  firebase functions:config:set telegram.password=groupID
  ```
- Fetch those config
  ```bash 
  firebase functions:config:get > .runtimeconfig.json
  ```
  
#### Running the bot
- `yarn dev:bot`

#### Running the articles
- `yarn dev`

***

#### Deploying the bot
- `yarn deploy`

#### Setup Webhooks and Updates

- You need to setup webhooks so that every update could be sent to that url as a post request. You can do that by this query
  ```https://api.telegram.org/bot"BOT_TOKEN"/setWebhook?url="DEPLOYED_URL"```
- For Deleting Webhook use
```https://api.telegram.org/bot"BOT_TOKEN"/deleteWebhook```
- For getting information about Webhook use
```https://api.telegram.org/bot"BOT_TOKEN"/getWebhookInfo```
- For getting updates about events received by bot use
```https://api.telegram.org/bot"BOT_TOKEN"/getUpdates```


**NOTE** - If you have executed the command `yarn dev` after deploying you'll need to set the webhooks again.
