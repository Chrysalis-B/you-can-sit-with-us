## Setup

Prerequisites: 

1. `Mongodb` (project built using v4.0.6)
2. `Node` (project built using  v11.12.0)

First start a local Mongo Connection on port `27017`.

To start the frontend & backend of the application run:

1. `npm install`
2. `npm start`

This will start the frontend on port `3000` and the backend on port `3001`.

You can also start each part seperately by running `npm start` in their respective folders.

Implemented features:
- view all campaings `PATH /`
- create a new campaign `PATH /create`
- campaign landing page `PATH /campaign?campaingId=<campaignId>`
- automated reminders when 5 more subscriptions needed for next discount stage `/backend/utils/reminder-evaluator.js`
- a daily cron job to find ended campaigns `/backend/utils/cron-scheduler.js`

TODO:
- Due to time constraints the app does not currently calculate the applied discount percentage or
generate discount codes.

The main focus of the project so far is basic core functionality and code readability. The app does NOT
have necessary functionality for a production-ready application
(comprehensive error handling, validation, other security measures, performance optimization).
