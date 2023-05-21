import React, { Component } from "react";
import { connect } from "react-redux";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

import "./assets/css/App.css";

import Header from "./components/Header";
import Navbar from "./components/Navbar/NavBar";
import Canvas from "./pages/Canvas/Canvas";

import Footer from "./components/Footer";
import CropSection from "./components/CropSection/CropSection";
import AddImageScreen from "./pages/AddImage";

class App extends Component {
  constructor(props) {
    super(props);
    this.canvasDiv = React.createRef();
  }

  componentDidUpdate() {
    this.props.setWidthAndHeightOfCanvasDiv(
      this.canvasDiv.current.clientWidth,
      this.canvasDiv.current.clientHeight
    );
  }

  render() {
    return (
      <div className="App">
        <div className="desktop">
          {this.props.image ? (
            <div className="wrapper">
              <div
                className="header animate__animated animate__fadeInDown"
                style={{ flexDirection: "row" }}
              >
                <Header />
              </div>
              <div className="middle-wrapper">
                <div
                  className="content animate__animated animate__fadeInLeft"
                  ref={this.canvasDiv}
                >
                  <Canvas />
                </div>
                <div className="side-menu animate__animated animate__fadeInRight">
                  <div className="icons">
                    <Navbar />
                  </div>
                  <div className="options">
                    <CropSection />
                  </div>
                </div>
              </div>
              <div className="footer animate__animated animate__fadeInUp">
                <Footer showCropCanvas={this.props.showCropCanvas} />
              </div>
            </div>
          ) : (
            <AddImageScreen />
          )}
        </div>
      </div>
    );
  }
}

const mapDispachToProps = (dispatch) => ({
  setWidthAndHeightOfCanvasDiv: (width, height) => {
    dispatch({
      type: "SET_WIDTH_AND_HEIGHT_OF_CANVAS_DIV",
      payload: { width, height },
    });
  },
});

const mapStateToProps = (state) => ({
  image: state.image,
  showCropCanvas: state.showCropCanvas,
});

export default connect(
  mapStateToProps,
  mapDispachToProps
)(DragDropContext(HTML5Backend)(App));
