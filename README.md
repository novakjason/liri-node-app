![alt text](https://github.com/novakjason/liri-node-app/blob/master/images/LIRI.png "LIRI")
# a command line node.js app

<<<<<<< HEAD
## Instructions to use LIRI on local machine.
### 1. [Clone Github Repository](https://github.com/novakjason/liri-node-app)
=======
### Instructions to use LIRI on local machine.
`1. Clone repository to your computer.`
>>>>>>> 05b5bd1ad589e49e1024febee0ccaa1f35c98d65

![alt text](https://github.com/novakjason/liri-node-app/blob/master/images/clone1.png "clone github")

![alt text](https://github.com/novakjason/liri-node-app/blob/master/images/cli1.png "clone cli")

<<<<<<< HEAD
=======
`2. Using **Bash/Terminal** on your device, navigate to the liri-node-app directory`
>>>>>>> 05b5bd1ad589e49e1024febee0ccaa1f35c98d65

### 2. Using **Bash/Terminal** on your device, navigate to the liri-node-app directory

![alt text](https://github.com/novakjason/liri-node-app/blob/master/images/cli2.png "cd liri-node-app")

<<<<<<< HEAD

### 3. Install the required Node packages by typing the following command: **{npm i}**

![alt text](https://github.com/novakjason/liri-node-app/blob/master/images/npmi.png "npm i")

#### You should now see a directory named "node_modules" in your **liri-node-app** directory.

![alt text](https://github.com/novakjason/liri-node-app/blob/master/images/cli_nodemodules.png "node modules")


### 4. Create a **.env** file in the **liri-node-app** directory by typing the following command: **{touch .env}**

![alt text](https://github.com/novakjason/liri-node-app/blob/master/images/touch_env.png "touch .env")


### 5.  Obtain Spotify API Client ID and Secret

   * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.

   * The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

   * Step One: Visit [Spotify Developer](https://developer.spotify.com/my-applications/#!/)

   * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

   * Step Three: Once logged in, navigate to [Create Application](https://developer.spotify.com/my-applications/#!/applications/create) to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

   * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down for the next step to get LIRI up and running.


### 6. Using a text editor like VS Code or Notepad, edit the **.env** file and insert the following text: 

`# Spotify API keys                             `
`                                               `
`SPOTIFY_ID=@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  `
`SPOTIFY_SECRET=@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`

#### Replace @@@@@@@@ with your Spotify Client ID and Secret.  

![alt text](https://github.com/novakjason/liri-node-app/blob/master/images/env_editor.png "edit .env")


### 7. List of LIRI commands:
- `node liri concert-this {artist(s) name}`
- `node liri movie-this {movie name}`
- `node liri spotify-this-song {song name}`
- `node liri do-what-it-says`


### 8. Examples of commands in use:

- `node liri concert-this {artist(s) name}`
![alt text](https://github.com/novakjason/liri-node-app/blob/master/images/bandsintown_command.png "concert-this")
![alt text](https://github.com/novakjason/liri-node-app/blob/master/images/bandsintown_results.png "concert results")

`Example of results being logged to log.txt file:`
![alt text](https://github.com/novakjason/liri-node-app/blob/master/images/logging_example1.png "log.txt example")


- `node liri spotify-this-song {song name}`
![alt text](https://github.com/novakjason/liri-node-app/blob/master/images/omdb_command.png "movie-this")
![alt text](https://github.com/novakjason/liri-node-app/blob/master/images/omdb_results.png "omdb results")

`Example of results being logged to log.txt file:`
![alt text](https://github.com/novakjason/liri-node-app/blob/master/images/logging_example2.png "log.txt example 2")


- `node liri spotify-this-song {song name}`
![alt text](https://github.com/novakjason/liri-node-app/blob/master/images/spotify_command.png "spotify-this-song")
![alt text](https://github.com/novakjason/liri-node-app/blob/master/images/spotify_results.png "spotify results")


- `node liri do-what-it-says`
![alt text](https://github.com/novakjason/liri-node-app/blob/master/images/textfile_command.png "do-what-it-says")
![alt text](https://github.com/novakjason/liri-node-app/blob/master/images/textfile_results.png "text file results")
=======
`3. Instal the required Node packages by typing the following command: **{npm i}**`

![alt text](https://github.com/novakjason/liri-node-app/blob/master/images/npmi.png "LIRI")
>>>>>>> 05b5bd1ad589e49e1024febee0ccaa1f35c98d65
