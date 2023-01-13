# Staff Database

## Prequisites

1. Download and install [Git](https://git-scm.com/downloads)  
   This will be used to download the repository

2. Download and install [Node](https://nodejs.org/en/download/)  
   This is the programming lanugage required to run the project

## Installation

### Download the repo
```
$ git clone https://github.com/jfmcquade/staff-database.git
```

### Install required dependencies
```
$ cd staff-database
$ npm install
```
Note - you may have to run `npm install` occasionally when content is updated, in order to update the dependencies in `/node_modules`.

## Running locally

### Install Firebase CLI
In order to run the project locally, you need to install the Firebase CLI.
```
$ npm install -g firebase-tools
```
To log in with your Google account, run
```
$ firebase login
```
If required, you can request access to the Firebase project for this app from the dev team.

### Running the local emulators
In order to start the [Firebase Local Emulator Suite](https://firebase.google.com/docs/emulator-suite), run
```
$ firebase emulators:start
```
This will start emulators for Firebase's Authentication (which handles authenticating users) and Firestore (a realtime NoSQL database). The emulator UI should be available at http://localhost:4000/.

Currently, the Hosting emulator is not working, so leave the emulator terminal window running and open a new one to run Angular's development server.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
