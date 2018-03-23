import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <div className="about-wrapper">
          <h1>Sock it <span className="secondary-color">to Me</span></h1>
          <h2 className="about-h2 secondary-color">For education and <span className="primary-color">for fun</span></h2>

          <p>
            <span className="secondary-color bold">Sock it to Me</span> is a JavaScript-based website where you can play party games with your friends. You can create your own quizzes and prompts for each game, which can make it useful in a classroom or educational environment.
          </p>
          <p>
            Our first model and only currently implemented game is called <span className="secondary-color bold">truthy falsy</span> and is a variation on a true/false quiz game. The goal is simple; get the most points by answering the true/false questions correctly!
          </p>

          <p>
            To join a room, all you need is the room code. The games are meant to be played with a host screen, with all other players in the same room and able to view the host screen. A host can currently see and choose from all quizzes made in the database.    
          </p>

          <p className="link-color center"><a href="https://github.com/sockittome">Check out our project on GitHub!</a></p>


          <h1>About Us</h1>
          <h2 className="about-h2 secondary-color">The app creators</h2>

          <div className="about-us">
            <a className="link-color" href="https://github.com/strawbee" target="_blank">Joy Hou</a> | <a className="link-color" href="https://github.com/sayanything830" target="_blank">Melanie Downing</a> | <a className="link-color" href="https://github.com/jpjazzy" target="_blank">Jeremy Pearson</a> | <a className="link-color" href="https://github.com/dmurphy90" target="_blank">Dean Murphy</a> | <a className="link-color" href="https://github.com/EnderSmith" target="_blank">Ender Smith</a>

          </div>
        </div>
      </Fragment>
    );
  }
}

export default About;