import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelink/ImageLinkForm';
import Particles from 'react-particles-js';

import FaceRecognition from './components/facerecognition/FaceRecognition';
import SignIn from './components/signin/SignIn'
import Register from './components/signin/Register'

const BACKEND = 'http://localhost:3000/';


const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 500
      }
    },
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        userId: '',
        userName: '',
        userCount: 0,
        userMail: ''
      }

    }
  }




  calculateFaceLocation = (data) => {

    const image = document.getElementById('image');
    const width = Number(image.width);
    const height = Number(image.height);

    
    const faces = data.map(d => d.region_info.bounding_box);

    const boxes = faces.map(face => {
      return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - (face.right_col * width),
        bottomRow: height - (face.bottom_row * height)
      }
    })
  
    return boxes;

  }

  displayFaceBox = (boxes) => {
    this.setState({ box: boxes });




  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }


  onClick = (event) => {
    
    const imageUrl = this.state.input;
    this.setState({ imageUrl: imageUrl })
    fetch(BACKEND + 'detect', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: imageUrl
      })
    }).then(response => response.json())
      .then(response => {
        console.log('calculating face location', response)
        this.displayFaceBox(this.calculateFaceLocation(response))
        if (response) {

          fetch(BACKEND + 'increment', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.userId
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { userCount: count }))
            })
        }
       
      })
      .catch(err => console.log(err));
   
  }



  loadUser = (data) => {
    this.setState({
      user: {
        userId: data.user_id,
        userName: data.user_name,
        userMail: data.user_email,
        userCount: data.user_entries
      }
    })
  }


  onRouteChange = (route, id) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    }
    if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }












  render() {

    const { input, imageUrl, box, route, isSignedIn, user } = this.state;

    return (



      <div className="App">

        <Navigation onRouteChange={this.onRouteChange} />
        <Particles className="particles"
          params={particlesOptions} />

        {route === 'home' ?
          <div>
            <Logo />
            <p> user # {user.userId}, your current count is  </p>
            <br />
            <p className='f3'> {this.state.user.userCount} </p>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onClick} />

            <FaceRecognition url={imageUrl} box={box} />
          </div>

          :
          this.state.route === 'signin' ?
            <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />

            :
            <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        }
      </div>
    );
  }
}

export default App;