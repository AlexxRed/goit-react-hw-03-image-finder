import { Component } from "react";

export class App extends Component {
  state = {
    images: [],
  }

  render(){
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          textTransform: 'uppercase',
          color: '#010101',
        }}
      >
        Image Finder v3.0
      </div>
    );
  }
};
