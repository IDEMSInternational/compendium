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

## Supabase

There is a [supabase project](https://app.supabase.com/project/sryrsmsaaaewombnktiu) that hosts the database. Ask a dev for access.

## Running locally

Run `ng serve` to serve the app locally on [localhost:4200](http://localhost:4200/). The app will connect to the live supabase database. A secret `supabaseConfig.ts` file is required for connecting, contact a dev for access.