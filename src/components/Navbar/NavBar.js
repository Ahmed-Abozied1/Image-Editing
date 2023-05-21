import React, { Component } from "react";
import { connect } from "react-redux";
import { Tooltip as ReactTooltip } from 'react-tooltip'
import "./sidebar.css";

class Navbar extends Component {


  render() {
    return (
     
      <div>
       
        <div
          className="sidebar-icons"
          data-tip="Cortar imagem"
          onClick={() => this.props.handleShowCropCanvas(this.props.showCropCanvas)}
        >
          {this.props.showCropCanvas ? (
            <i className="far fa-lg fa-crop-alt active" />
          ) : (
            <i className="fal fa-lg fa-crop-alt" />
          )}
        </div>
       
        
      
        <ReactTooltip place="right" type="info" />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
 
  handleShowCropCanvas: (showCropCanvas,showCropCanvas2) => {
    dispatch({ type: "SHOW_CROP_CANVAS", payload: showCropCanvas });
  
    //dispatch({ type: "SHOW_CROP_CANVAS2", payload: showCropCanvas2 });

  },
      
  handleShowCropCanvas2: (showCropCanvas2) => {
    dispatch({ type: "SHOW_CROP_CANVAS2", payload: showCropCanvas2 });
  },
 
});


const mapPropsToState = (state) => ({
  showResizeSection: state.showResizeSection,
  showCropCanvas: state.showCropCanvas,
   showCropCanvas2: state.showCropCanvas2,
  showSlider: state.showSlider,
  showTextField: state.showTextField,
  errorMessage: state.errorMessage,
  image: state.image,
  showRotateSection: state.showRotateSection,
});

export default connect(mapPropsToState, mapDispatchToProps)(Navbar);
