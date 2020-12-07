# Growing Beats
An interactive way (a game if you will) to explore and create machine learning generated music

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

## Current Progress
Really awesome website to show off the prototype beat-breeding algorithm! [peter.rosenth.al/beat-breeder/](http://peter.rosenth.al/beat-breeder)

### Milestone 1: Dec 7 - CTD Creative Code Final Project
This Growing Beats project is bigger than I can finish by the end of this semester, especially with how much I have to learn for it. But I can scope down the projects into several independent parts, and each part can be done as different school projects at different times. The first of these parts is going to be my final project for the class [Creative Code](https://github.com/peterrosenthal/ctd-creative-code).

The goal for this first milestone is to have a working "breeding" system for MIDI beats done with magenta. Then once that is completed, I can start working on a system that ties each beat to a uniquely generated plant. This doesn't have to be (and won't be!) a good looking procedurally generated plant at all. I probably won't waste any time learning good 3D modeling yet, and I might not even bother with learning three.js yet. It will probably be wise for me to stick with some of the simple 2D drawing I already know with p5:boom:js already.

#### Week 1
Currently the concept for the breeding system is to use both functionalities of magenta's MusicVAE model. The [MusicVAE model](https://magenta.tensorflow.org/music-vae) can either create new sequences which are reconstructions or variations of a single piece of input data, or it can smoothly interpolate between two pieces of input data. If we:
1. Do a small reconstruction/variation of both the parent beats. Then:
2. Interpolate a random amount between the reconstruction/variations of the parents.

And repeat both steps a couple dozen times... Then we have enough beat offspring to fill a greenhouse full of plants that are the beats!

#### Week 2
Typescript is pretty darn fun. I think it helps that I'm learning typescript and magentajs at the same time, because a lot, if not most, of magenta's examples are in typescript. I started with one of these examples, and they used yarn and webpack, so that's the reason I'm now using Yarn for package management in this project, and webpack for building. I'm not sure if I actually do need to use webpack or not, but it turns all of my code into one line which makes debugging harder, so I *really* need to learn more about that program. For now I'm still just using regular old HTML elements, minimal CSS, and magenta's built in MIDI sequence visualizer that is built on SVGs. So the goal for next week is to really pretty it up with CSS, and get some fun interactive drawing incorporated into the music using p5:star2:js.

![Screenshot of the very first prototype of the game](/res/magenta-prototype-2020-11-23.png)

#### Week 4
I didn't write any updates last week because I was too focused on my other final projects that were due sooner. And now this was the final week for this project, so naturally I crammed *everything* into this one week. Cramming features usually also leads to messy code, and this was no exception. Trying to avoid that was one of my major goals this week, I even did a major re-factor for neatness twice, once at the beginning of the week, and once about half-way through. But then more than 2/3rds of the features implemented this week were jammed in there last night, so **all** of that code is :musical_note:garbage:musical_note:. So I'm really looking forward to going trough and cleaning it all up over winter break with an emphasis on making things into proper components that I can use in the future. If I want any hope of ever coming back to this project, I can't leave the code like this.

The first thing I worked on this week was creating a full fledged custom piano roll editor using p5:boom:js. This would replace the built in visualizer that came with magenta.js that uses SVGs, but still be built around interfacing directly with the note sequence data type that magenta.js uses. That way no data translation nonsense has to happen. I was originally thinking about prototyping the plant generation tied to note sequences in 2D by the end of this milestone. Upon further evaluation however, I realized that there would be no use case for 2D plants in the final 3D game, but there would absolutely still be a need for a 2D note sequence editor and visualizer in the menus of the final 3D game I think. Therefore it was a much better idea to dedicate my time toward this piano roll editor instead of any 2D plants that wont make it into the final game. I started by just making my own visualizer for the magenta.js note sequences that I already had (just twinkle twinkle little star still), and figured I could get to the note sequence editing part later after I had finished the visualizing part. Here's what it looked like after I had replaced the old SVG visualizers with my new ones:

![The black and white visualizers in the previous screenshot have been replaced by my own custom orange and white ones!](/res/magenta-prototype-2020-12-06.png)

After that was complete, I was able to start sensing which note my mouse was hovering over so then I could delete an existing note by clicking on it. Then I moved on to creating a new note if the user clicks somewhere that doesn't currently have a note. But at the time I was still limited to creating quarter notes and that was it, which wasn't enough for a full piano roll editor, that's like just a step sequencer. So I messed around with a whole bunch of weird combinations of p5:sparkles:js's `mousePressed()`, `mouseDragged()`, and `mouseReleased()` functions, until I finally figured out something that worked to allow me to click and drag to either extend or contract the note to all different lengths. Finally all that was left to do was solve a million edge cases and bugs, and I had a featurful piano roll editor that was pretty damn bug free too.

I didn't take a screenshot at that point though, it was getting too late and there was too much more I wanted to do. First, I wanted to make everything look pretty, not like some ancient plain HTML page that is afraid of CSS or JavaScript. Second, I wanted my visualizer/editor to be able to cover more than the fixed range of 12 notes that I gave it to start out with, and along with that: tie each row/note to a different color along an HSV gradient for more eye candy, and a bit of visual clarity too. Third, I wanted to add the ability to select from several default note sequences (but I still only have twinkle twinkle little star :milky_way:). And fourth, I wanted to include instructions on the page in the form of a help button so that people wouldn't understand how to use it without me having to explain it to them in person. Finally, once I hacked together those four things with the messiest code possible, I was left the prettified and feature packed final prototype for the magenta.js beat breeding algorithm we have now today! (Screenshot below). Check it out at [peter.rosenth.al/beat-breeder/](http://peter.rosenth.al/beat-breeder) to play with it yourself!

![The prettified and feature packed final prototype for the magenta.js beat breeding algorithm.](/res/magenta-prototype-2020-12-07.png)
