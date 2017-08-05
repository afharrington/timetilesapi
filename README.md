<a href="https://timetiles.herokuapp.com/">
    <img src="./public/img/Logo.png" alt="TimeTiles logo" title="TimeTiles" align="right" height="60" />
</a>

TimeTiles
=================
REST API for TimeTiles.

TimeTiles allows you to track the time you spend toward your goals.

## Demo

You can test the app live <a href="https://timetiles.herokuapp.com/">here</a>.

Sign up for an account, or use the following:

email: test@email.com
password: tiles

## Setup

To run locally, you must also clone and run the React app <a href="https://github.com/afharrington/tracker/">here</a> on a separate port.

To start the API server, clone this repository and install dependencies with `npm install`. Then from to the project's root directory run the application with `npm start`.

## Usage

<img src="./public/img/AddTiles.png" alt="Add Tiles Screenshot" title="Add Tiles" align="center" height="500" />

After signing in, you will be taken to your dashboard where you can view all existing tiles - you can think of these as your goals. Tile colors deepen a shade for each  hour spent toward the goal, and lighten a shade every two days without an entry.

<img src="./public/img/EntryView.png" alt="TimeTiles logo" title="TimeTiles" height="300" />

<img src="./public/img/AddEntry.png" alt="TimeTiles logo" title="TimeTiles" height="300" />

To add an entry, click a tile to be taken to its entry page. Click the + to expand the form and add your entry and time spent.
