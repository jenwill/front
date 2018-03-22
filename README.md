          ___          _     _ _     _                   
        / __| ___  __| |__ (_) |_  | |_ ___   _ __  ___ 
        \__ \/ _ \/ _| / / | |  _| |  _/ _ \ | '  \/ -_)
        |___/\___/\__|_\_\ |_|\__|  \__\___/ |_|_|_\___|
                                                               
[![Build Status](https://travis-ci.org/sockittome/back.svg?branch=master)](https://travis-ci.org/sockittome/back)

## General information
**_Authors_**:
* Jeremy Pearson: https://github.com/jpjazzy 
* Melanie Downing: https://github.com/sayanything830
* Joy Hou: https://github.com/strawbee
* Ender Smith: https://github.com/EnderSmith 
* Dean Murphy: https://github.com/dmurphy90

**_Version_**: 1.0.0 [Front end]

**_Libraries_**: 

    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-plugin-transform-object-rest-spread": "^6.26.0",
    "babel-preset-env": "^1.6.1",
    "babel-preset-react": "^6.24.1",
    "clean-webpack-plugin": "^0.1.18",
    "css-loader": "^0.28.10",
    "dotenv": "^5.0.0",
    "enzyme": "^3.3.0",
    "enzyme-adapter-react-16": "^1.1.1",
    "eslint": "^4.18.2",
    "eslint-plugin-react": "^7.7.0",
    "extract-text-webpack-plugin": "^3.0.2",
    "howler": "^2.0.9",
    "html-webpack-plugin": "^2.30.1",
    "jest": "^22.4.2",
    "node-sass": "^4.7.2",
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "react-redux": "^5.0.7",
    "react-router-dom": "^4.2.2",
    "redux": "^3.7.2",
    "redux-devtools-extension": "^2.13.2",
    "sass-loader": "^6.0.6",
    "socket.io": "^2.0.4",
    "socket.io-client": "^2.0.4",
    "superagent": "^3.8.2",
    "uglifyjs-webpack-plugin": "^1.2.1",
    "uuid": "^3.2.1",
    "webpack": "^3.11.0",
    "webpack-dev-server": "^2.11.1"
    "prop-types": "^15.6.1",
    "style-loader": "^0.20.3",
    "file-loader": "^1.1.11",
    "prop-types": "^15.6.1",
    "react-sound": "^1.1.0",
    "url-loader": "^1.0.1"

**_Last modified_**: 3/22/2018

## About the app

Sock it to me is a javascript based game website where you can games with local groups, and with an emphasis on educational games. 

Currently as a first model, the only game implemented is called truthy falsy and is variation on a quiz game. The goal is simple. All answers are true or false and your goal is to get the most points. This game is meant for classes and large groups.

To join a room, all you need is the code. The games are meant to be played with a host screen and all other players are looking at the host screen. You can join from other places, but if you can't see the host screen, you won't be able to see some important information, so make sure you can! A host can see all quizzes made in the database. To have a wide selection of quizzes to choose from, invite your friends and have everyone make quizzes! 

## How to use our project

1. One person go to sockit.live and sign up or sign in as a host. Select a game (currently only truthyfalsy) and create a quiz to use or select a quiz you have made and start a game.
2. Give your friends the generated 4 character room code.
3. Have your friends go to sockit.live and select "join as a player", then input the room code and your name.
4. When ready, the host can click start to start, and it's game on!

## How to set up your own Sock it to me game (front end)

### Cloning

Clone our repo with:
```
git clone https://github.com/sockittome/front.git
```

### Installing dependencies

Install the necessary dependencies with:
```
npm i
```

### Running 

In terminal type the following to run a hot webpack server after installing dependencies:
```
npm run watch
```

## Tests

### File tree structure

```
Front end Directory
├── ./build
│   ├── ./build/bundle-eca758a4f5faf1678a9c.css
│   ├── ./build/bundle-eca758a4f5faf1678a9c.js
│   └── ./build/index.html
├── ./favicon.ico
├── ./index.js
├── ./package.json
├── ./package-lock.json
├── ./README.md
├── ./src
│   ├── ./src/action
│   │   ├── ./src/action/auth-action.js
│   │   ├── ./src/action/game-action.js
│   │   ├── ./src/action/profile-action.js
│   │   ├── ./src/action/quiz-action.js
│   │   ├── ./src/action/room-action.js
│   │   ├── ./src/action/socket-action.js
│   │   └── ./src/action/sound-action.js
│   ├── ./src/components
│   │   ├── ./src/components/app
│   │   │   ├── ./src/components/app/app.js
│   │   │   └── ./src/components/app/rotate-phone.png
│   │   ├── ./src/components/auth
│   │   │   └── ./src/components/auth/auth-form.js
│   │   ├── ./src/components/choosegame
│   │   │   └── ./src/components/choosegame/choosegame.js
│   │   ├── ./src/components/createquiz
│   │   │   └── ./src/components/createquiz/createquiz.js
│   │   ├── ./src/components/errorview
│   │   │   └── ./src/components/errorview/disconnected.js
│   │   ├── ./src/components/gameview
│   │   │   ├── ./src/components/gameview/gameview.js
│   │   │   └── ./src/components/gameview/truthyfalsy
│   │   │       ├── ./src/components/gameview/truthyfalsy/answerview.js
│   │   │       └── ./src/components/gameview/truthyfalsy/playerview.js
│   │   ├── ./src/components/joinroom
│   │   │   └── ./src/components/joinroom/joinroom.js
│   │   ├── ./src/components/landing
│   │   │   └── ./src/components/landing/landing.js
│   │   ├── ./src/components/navbar
│   │   │   ├── ./src/components/navbar/navbar.js
│   │   │   └── ./src/components/navbar/socket.svg
│   │   └── ./src/components/waitingroom
│   │       └── ./src/components/waitingroom/waitingroom.js
│   ├── ./src/lib
│   │   ├── ./src/lib/cookie.js
│   │   ├── ./src/lib/sounds.js
│   │   ├── ./src/lib/store.js
│   │   └── ./src/lib/utils.js
│   ├── ./src/main.js
│   ├── ./src/middleware
│   │   ├── ./src/middleware/redux-reporter.js
│   │   └── ./src/middleware/redux-thunk.js
│   ├── ./src/model
│   │   └── ./src/model/tfquestion.js
│   ├── ./src/public
│   │   ├── ./src/public/images
│   │   │   ├── ./src/public/images/deanavatar.jpeg
│   │   │   ├── ./src/public/images/enderavatar.jpeg
│   │   │   ├── ./src/public/images/jeremyavatar.png
│   │   │   ├── ./src/public/images/joyavatar.jpeg
│   │   │   ├── ./src/public/images/melanieavatar.jpeg
│   │   │   ├── ./src/public/images/rotate-phone.png
│   │   │   └── ./src/public/images/socket.svg
│   │   └── ./src/public/index.html
│   ├── ./src/reducer
│   │   ├── ./src/reducer/auth.js
│   │   ├── ./src/reducer/game.js
│   │   ├── ./src/reducer/index.js
│   │   ├── ./src/reducer/profile.js
│   │   ├── ./src/reducer/quiz.js
│   │   ├── ./src/reducer/room.js
│   │   ├── ./src/reducer/socket.js
│   │   └── ./src/reducer/sound.js
│   ├── ./src/sounds
│   │   ├── ./src/sounds/answercorrect.mp3
│   │   ├── ./src/sounds/endgamemusic.mp3
│   │   ├── ./src/sounds/lobbymusic.wav
│   │   ├── ./src/sounds/playerjoinroom.wav
│   │   └── ./src/sounds/playerwrong.wav
│   └── ./src/styles
│       ├── ./src/styles/_base.scss
│       ├── ./src/styles/_choosegame.scss
│       ├── ./src/styles/_form.scss
│       ├── ./src/styles/_gameview.scss
│       ├── ./src/styles/_joinroom.scss
│       ├── ./src/styles/_landing.scss
│       ├── ./src/styles/main.scss
│       ├── ./src/styles/_navbar.scss
│       ├── ./src/styles/_reset.scss
│       └── ./src/styles/_waitingroom.scss
└── ./webpack.config.js
```

## Stretch goals

 - Add more games to be incorporated
	 - Quiz game (more than true/false)
	 - Drawing game with canvas.

 - Add minor bug fixes with quizzes and more functionality

## About us

* Jeremy Pearson: https://github.com/jpjazzy

![Description](./src/public/images/jeremyavatar.png)

Javascript developer with a talent for writing clean and efficient code as working with teams. One of my greatest strengths is my passion for experimenting with and learning the newest technologies. I am interested in working for a company that allows me to showcase the skills I have learned as well as grow as a developer through teamwork and experience.    

* Melanie Downing: https://github.com/sayanything830

![Description](./src/public/images/melanieavatar.jpeg)


* Ender Smith: https://github.com/EnderSmith

![Description](./src/public/images/enderavatar.jpeg)


* Dean Murphy: https://github.com/dmurphy90

![Description](./src/public/images/deanavatar.jpeg)


* Joy Hou: https://github.com/strawbee

![Description](./src/public/images/joyavatar.jpeg)


Special thanks and kudos to:
* Scott (Instructor)
* Vinicio (Instructor)
* Noah (TA)
* Cameron (TA)
* Geo-jumper project team
* Firepolls project team
* Freesound.org

