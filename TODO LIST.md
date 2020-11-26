### TODO LIST SNAKE GAME:

### Essentials Of The Game:

-   Render Loop.
-   Player controls the snake.
-   create the snake.
-   Randomize the food position.
-   Alot of food scattered in the map.
-   Large ass map (player is tiny).
-   Snake grows as it eats food.
-   food re-spawn.
-   Add borders (ending for the map).
-   add collision with itself.
-   add collision with borders.

### Multiplayer Essentials:

-   Body should despawn when user dies.
-   Scoreboard.
-   Keep count the score of each player.
-   Eliminate the player with least score every 90 seconds.
-   when u die u can spectate, but u have the option to leave.(Canceled)
-   add collision between players.
-   add a timer.

### Non-Essentials:

-   when u kill someone u get a 30% of his/her points.
-   ADD SCORE WHEN U KILL.
-   GAMEMODE : INCREASE SNAKE BORDER SIZE TO 1VMIN

### Saturday Nov 7th:

-   Add FOOD. (**Done**)
-   ADD COLLISON WITH BORDER. (**Done**)
-   ADD COLLISION WITH SELF. (**Done**)
-   ADD COLLISION WITH FOOD. (**Done**)

### Sunday Nov 8th:

-   ADD COLLISION WITH OTHER PLAYERS.(Semi-Done). (**Done**)
-   ADD THE POINT SYSTEM (PUT THE LENGTH OF THE SNAKE FOR EACH PLAYER USING HTML AND CSS). (**Done**)
-   ADD THE LEADERBOARD. (**Done**)

### Wednesday 11th:

-   ADD TIMER LOGIC TO KILL THE SMALLEST PLAYER. (**Done**)
-   DEBUG THE PROBLEM WERE PLAYERS DON'T GET REMOVED WHEN THEY DISCONNECT (AZURE) (**Done**)
-   REMOVE THE SNAKE (BETTER LOGIC)/ INSTEAD OF RELOADING WE TAKE THEM TO A YOU DIED SCREEN. (**Done**)

### Thursday 12th:

-   Work on the css for scoreboard. (**Done**)
-   HTML AND CSS. (INITIAL SCREEN, YOU DIED SCREEN (send whoever dies to the initial screen and update the database) , WIN SCREEN). (**Done**)

### Wed 19th:

-   Work on the css. Try making it look better. (**Done**)
-   Add Music. (**Done**)

### Without a date Near the end:

-   ADD INPUT FOR THE PHONE (**Didn't Implement it**)
-   Seperate snake speed from render speed. (**Done**)
-   Security. (**Done**)

### Notes:

-   When signing up, CREATE NEW RECORD WITH USERNAME AND PASSWORD IN DB. (**Done**)
-   When loging in, QUERY IF USERNAME EXISTS, IF IT DOES THEN QUERY IF PASSWORD IS THE SAME. (**Done**)

### Final List:

-   The login system. Sign up/Login.(**Done**)
-   LeaderBoard DataBase. (**Done**)
-   Stoping players from starting the game without enough players. (**Done**)
-   Timer kill smallest player. (Done with this, except we will have to draw the time on the client side). (**Done**)
-   Remove Dead players.(**Done**)
-   Heroko.(**Done**)

### Side Notes:

-   Check winner:
    We need it to keep on checking so I think put it in the getUpdate Method.
    If there is one more player left then
    start a timer to for 5 seconds and if there is still one player. (Without this line.)
    award him and tell him you win. add one point to him in his database and then redirect him to the You Win Screen.
    ADD ONE POINT IN THE LEADERBOARD UNDER HIS NAME.

### Side Notes:

-   When first come on website, you are greeted with a sign up/log-in page.
-   after signing in, you are in the main menu with a join game button.
-   when user clicks on "join game" he is taken to the black gamemap with nothing in it except for text saying "Waiting for players" with the number of players shown on the right to be less than 8.
    "Starting game" shows for 2 seconds, then "3..2..1".
-   then game starts for real and everything is enabled and unhidden or starts rendering and maybe the game on the server actually starts for real, PLUS the TIMER STARTS.

### Monday 23rd:

-   THE TIMER CSS/ DISPLAY IT. (**Done**)

-   THE RANK FOR THE LEADERBOARD. (**Done**)

-   YOU DIE AND WIN MAIN MENU BUTTONS DONW TO THE RIGHT. (**Done**)

-   RANDOM SNAKE COLOR (**Done**)

### Side Notes:

-   Bcrypt also provides methods like genSaltSync, HashSync and CompareSync to perform synchronously. However, aysnc methods are preferred because of the fact that hashing done by bcyrpt is CPU intensive, so the sync methods will block event loop and our application will not serve any other request until the sync methods are completed executed. (ASYNC methods are prefered.)
