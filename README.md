Welcome to the NOV Rigsentry Dev team technical interview coding challenge!

You will be tested on 2 main things: 
    1. Your ability to troubleshoot and fix bugs. 
    2. Your ability to pick new things up quickly.


THE CHALLENGE:

You have a limited amount of time, likely about a few hours or less. The challenge has 2 main sections with 1 bonus section.
Also feel free to ask any questions during the test, this allows us to get an idea of what it would feel like to work together! 
This is an open internet test. You can use google and stack overflow as much as you would like.

PART ONE:

The app you have cloned is Mad Libs. Mad Libs is a phrasal template word game where one player prompts others for a list 
of words to substitute for blanks in a story, before reading the – often comical or nonsensical – story aloud. The game 
is frequently played as a party game or as a pastime. Here is a link to wikipedia describing what MadLibs is: https://en.wikipedia.org/wiki/Mad_Libs
Here is a link to a MadLibs game very is similar to this app: http://www.redkid.net/madlibs/.

The core logic for this app is already working. However, there are a few bugs. Part one of this challenge is to troubleshoot 
and resolve all of the bugs. Some bugs are easy and other are more difficult. There are 5 known bugs, they are listed here:

1. When generate story button is clicked the page refreshes. 

2. All radio buttons are selectable 

3. Story types radio buttons are not properly linked to generate story button 

4. Story name is not showing up in HTML

5. Undefined shows up in story on occasion

Not all of these bugs will be apparent when you first load the application, as the app breaks before it can hit all 5 bugs. 
But feel free to fix them in whatever order you would like to. 



PART TWO:

Your task is to add database connectivity functionality to app. Right now the application has all the default words and stories
hard coded into the javascript. You will find in the firebaseDB all the words and stories already exist and you simply need to 
fetch them instead of using the hard coded values in the javascript. The firebaseDB documentation is decent and should have 
all the information you need to query data out of the database. 
Note that no webserver is being used, you will be going straight from the javascript to the firebaseDB.  

Firebase information:
Here is a link to the firebase javascript documentation: https://firebase.google.com/docs/reference/js. Firebase is already
initialized in the project. You can see a snapshot of what the database looks like by checking what is written to the console 
from line 3 of script.js. 

BONUS:

We would like to write or save each story generated to the firebaseDB and then display them in the app. 

DOUBLE BONUS:

Impress us with some CSS styling.

SUBMISSION

Create a git repository with your solution and resume.Then please email us a read access link to RigsentryCodeChallenge@gmail.com.

Thank you and good luck!

NOV Rigsentry Team

