# Beat Greenhouse
A ludic exploration of music creation through a gardening/cultivation lens.

## Build Instructions
To build and run the game in its development state: 
1. Clone this repo
```
git clone https://github.com/peterrosenthal/growing-beats.git
cd growing-beats
```
2. Install the dependencies (assuming you have [Yarn installed](https://yarnpkg.com))
```
yarn
yarn install
```
3. Build the project
```
yarn build
```
4. Start a local server
```
yarn serve
```
5. In your web browser go to `localhost:8080` to access the local server and the game

## Tools
* [Magenta.js](https://github.com/magenta/magenta-js), more specifically MusicVAE, as the ML backend of the project.
* [three.js](https://github.com/mrdoob/three.js) to handle all of the usual 3D aspects of a game.
* [p5*js](https://p5js.org) for 2D interactive elements.
* [TypeScript](https://github.com/microsoft/TypeScript/). The dynamic typing of JavaScript scares me, I'm gonna have to learn typescript for such a large scale web project.
* [Yarn](https://yarnpkg.com) for javascript package management.
* [Webpack](https://webpack.js.org) for bundling and builds(?) I definitely need to learn more about this one.
* [WebXR](https://github.com/immersive-web/webxr). Does three.js already include an interface for the WebXR API, or will I be working with the two tehcnologies side by side? I don't know, I have to do more research. But I do think this game would be *really* good for VR.
* [Blender](https://blender.org). I've gotta learn how to 3d model in Blender if I want this to be a sustainable long term **solo** project.

## Development Progress
Milestone 1 completed! [Switch to the "milestone-1" branch](https://github.com/peterrosenthal/beat-greenhouse/tree/milestone-1/) to read the process blog for that milestone and to check out the code in it's preserved state.
