## Inspect Next

Website to view optimal, viable and inadvisable beehive inspection times, allowing beekeepers to better manage their time and resources.

https://inspectnext.com

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

`npm install`

To Run Test Suite:

`npm test`

To Start Server:

`npm start`

To Visit App:

`localhost:3000`

## Reflection

I wanted a project to demonstrate my experience as well as being a useful tool to the beekeeping community, which I am apart of. Hence `inspectnext` was coined, allowing beekeepers to view inspection times for locations all over the world.

I host the Front End through AWS Amplify, which takes care of my Continuous Integration by automatically testing, building and serving whenever any change is made the the `develop` or `master` branches. I utilise a self-built `Node/Express` server which is hosted on an EC2 service to proxy and cache API calls to `OpenWeatherAPI` for the weather data, and `Googles Autocomplete places API` for locations.

One of the main challenges I face is SEO, which I plan to solve in the future by changing this project to be `server-side rendered`, though I have no time frame for completion of this.

In closing, I utilized `React, Redux, SCSS, Typescript` to create a quick and responsive UI to modify weather data to assist beekeepers in choosing the best times to inspect their beehives.

## Technology Used

Cut the chat, right to brass tacks.
`React, Redux, SCSS, CSS, React-Router, Jest, Typescript, Javascript, HTML`
