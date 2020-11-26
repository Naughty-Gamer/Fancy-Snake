# Fancy Snake

[![Demo](https://i.imgur.com/R3WkhuK.gif)](https://www.youtube.com "Check out our trailer :)")

### The game:

Our game is a multiplayer adaptation of the well-known 2D snake game. The aim of the project was to make a short fun game in which players can easily sign onto and challenge each other in a competitive game, and have their scores shown on a leader board which others can try and beat.

[Play the Alpha Build!](https://fancy-snake.herokuapp.com)  
**Note: You will need a minimum of 3 player's to start a game**

### Controls:

| Direction | Key | Alternative Key |
| :-------: | :-: | :-------------: |
|    Up     |  W  |  Up Arrow Key   |
|   Down    |  S  | Down Arrow Key  |
|   Left    |  A  | Left Arrow Key  |
|   Right   |  D  | Right Arrow Key |

### Look and Feel:

The game gives you a feeling of the retro classic 2D snake game. It has been designed to look like its ancestor while still feeling modern. The choice of arcade music fits the 90’s era vibe that the game is going for. It contains a leaderboard with every players' wins so that there is a sense of competition among new and continuing players alike. On winning, the game gives you a banner declaring you as a champion, giving you a sense of accomplishment.

### Architecture choices:

-   We have adopted a server authoritative system, where all of the game's logic is processed on the server. We hope that this will help prevent cheating and ruining other player's experiences, as any important decision in the game is taken by the server
-   The client only receives the state of the game from the server and renders it on their machine. All the CPU intensive processes are done
    on the server.
-   While player's can host the game themselves and play in a peer-to-peer environment, the official game has dedicated servers where players can expect a more consistent network experience

### Members:

| Name          | HW Username |                       Role                        |
| :------------ | :---------: | :-----------------------------------------------: |
| Farhan Fiaz   |    ff15     |        Lead Developer and Project Manager         |
| Mahmood Aoude |    mma37    |        Lead Developer and Project Manager         |
| Luke Mason    |    lcm9     |             Assistant Game Developer              |
| Shoaib Khan   |    ms416    | Database Designer and Assistant Backend developer |
| Moaz Mohammed |    mtm12    |            Assistant Webpage Designer             |

### YouTube Link:

-   https://www.youtube.com/watch?v=46E2y9QZu5w
