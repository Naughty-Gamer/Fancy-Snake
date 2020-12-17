# Fancy Snake

[Trailer!](https://youtu.be/46E2y9QZu5w)

[![Demo](https://i.imgur.com/R3WkhuK.gif)](https://www.youtube.com/watch?v=46E2y9QZu5w "Check out our trailer :)")

### The game:

Our game is a multiplayer adaptation of the well-known 2D snake game. The aim of the project was to make a short fun game in which players can easily sign onto and challenge each other in a competitive game, and have their scores shown on a leader board which others can try and beat.

[Stable Release!](https://fancy-snake.herokuapp.com)

**Note: You will need a minimum of 2 players to start a game**

### Controls:

| Direction | Key | Alternative Key |
| :-------: | :-: | :-------------: |
|    Up     |  W  |  Up Arrow Key   |
|   Down    |  S  | Down Arrow Key  |
|   Left    |  A  | Left Arrow Key  |
|   Right   |  D  | Right Arrow Key |

### How To Run The Game Locally:

**Note: instructions have been laid out on README-dev.md, but we are laying them out here just in case you miss it**

-   Fork, then clone this project, or alternatively, download it as zip, then run the following in the terminal at the project's root directory:
-   npm i or npm install
-   SET DB_Host=localhost
-   SET DB=snake_game
-   SET DB_user=root
-   SET DB_pass=root
-   Next step is to run XAMPP and spin up an Apache HTTP Server and a MySQL instance, both if which can be done usign XAMPP.
-   Once you have done the above, run "npm start" in the project's root directory
-   Open any browser of your choice, and type in "localhost:3000" in the address bar.

At this point you should see the game's sign-in page. Which means you have done all the above steps correctly!

### Look and Feel:

The game gives you a feeling of the retro classic 2D snake game. It has been designed to look like its ancestor while still feeling modern. The choice of arcade music fits the 90’s era vibe that the game is going for. It contains a leaderboard with every players' wins so that there is a sense of competition among new and continuing players alike. On winning, the game gives you a banner declaring you as a champion, giving you a sense of accomplishment.

### Architecture choices:

-   We have adopted a server authoritative system, where all of the game's logic is processed on the server. We hope that this will help prevent cheating and ruining other player's experiences, as any important decision in the game is taken by the server
-   The client only receives the state of the game from the server and renders it on their machine. All the CPU intensive processes are done
    on the server.
-   While player's can host the game themselves and play in a peer-to-peer environment, the official game has dedicated servers where players can expect a more consistent network experience

### Members:

| Name          | Github Handle |                       Role                        |
| :------------ | :---------: | :-----------------------------------------------: |
| Farhan Fiaz   |    [farhansolodev](https://github.com/farhansolodev)     |        Lead Developer, Designer and Project Manager         |
| Mahmoud Aoude |    [MahmoudAoude](https://github.com/MahmoudAoude)       |        Lead Developer, Designer and Project Manager         |
| Luke Mason    |    [LukeCMason](https://github.com/LukeCMason)           |             Assistant Game Developer              |
| Shoaib Khan   |    [DeathCall1O1](https://github.com/DeathCall1O1)       | Database Designer and Assistant Backend Developer |
