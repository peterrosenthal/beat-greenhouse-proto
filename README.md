# Growing Beats
An interactive way (a game if you will) to explore and create machine learning generated music

## Tools
* [Magenta.js](https://github.com/magenta/magenta-js), more specifically MusicVAE, as the ML backend of the project.
* [three.js](https://github.com/mrdoob/three.js) to handle all of the usual 3D aspects of a game.
* [TypeScript](https://github.com/microsoft/TypeScript/). The dynamic typing of JavaScript scares me, I'm gonna have to learn typescript for such a large scale web project.
* [Yarn](https://yarnpkg.com) for javascript package management.
* [Webpack](https://webpack.js.org) for bundling and builds(?) I definitely need to learn more about this one.
* [WebXR](https://github.com/immersive-web/webxr). Does three.js already include an interface for the WebXR API, or will I be working with the two tehcnologies side by side? I don't know, I have to do more research. But I do think this game would be *really* good for VR.
* [Blender](https://github.com/immersive-web/webxr). I've gotta learn how to 3d model in Blender if I want this to be a sustainable long term **solo** project.

## Current Progress
Breeding algorithm prototyped

### Milestone 1: Dec 7 - CTD Creative Code Final Project
This Growing Beats project is bigger than I can finish by the end of this semester, especially with how much I have to learn for it. But I can scope down the projects into several independent parts, and each part can be done as different school projects at different times. The first of these parts is going to be my final project for the class [Creative Code](https://github.com/peterrosenthal/ctd-creative-code).

The goal for this first milestone is to have a working "breeding" system for MIDI beats done with magenta. Then once that is completed, I can start working on a system that ties each beat to a uniquely generated plant. This doesn't have to be (and won't be!) a good looking procedurally generated plant at all. I probably won't waste any time learning good 3D modeling yet, and I might not even bother with learning three.js yet. It will probably be wise for me to stick with some of the simple 2D drawing I already know with p5\*js already.

#### Week 1
Currently the concept for the breeding system is to use both functionalities of magenta's MusicVAE model. The [MusicVAE model](https://magenta.tensorflow.org/music-vae) can either create new sequences which are reconstructions or variations of a single piece of input data, or it can smoothly interpolate between two pieces of input data. If we:
1. Do a small reconstruction/variation of both the parent beats. Then:
2. Interpolate a random amount between the reconstruction/variations of the parents.
And repeat both steps a couple dozen times... Then we have enough beat offspring to fill a greenhouse full of plants that are the beats!

#### Week 2
Typescript is pretty darn fun. I think it helps that I'm learning typescript and magentajs at the same time, because a lot, if not most, of magenta's examples are in typescript. I started with one of these examples, and they used yarn and webpack, so that's the reason I'm now using Yarn for package management in this project, and webpack for building. I'm not sure if I actually do need to use webpack or not, but it turns all of my code into one line which makes debugging harder, so I *really* need to learn more about that program. For now I'm still just using regular old HTML elements, minimal CSS, and magenta's built in MIDI sequence visualizer that is built on SVGs. So the goal for next week is to really pretty it up with CSS, and get some fun interactive drawing incorporated into the music using p5\*js.
![Screenshot of the very first prototype of the game](/resources/magenta-prototype-2020-11-23.png)
