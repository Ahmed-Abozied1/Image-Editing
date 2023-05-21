import React, { Component } from "react";
import { connect } from "react-redux";

import "./styles.css";

class CropSection extends Component {
  render() {
    if (this.props.showCropCanvas) {
      return (
        <div className="crop-section-wrapper">
         <div >
         <label className="box1">Box 1</label>
          <div className="crop-section">
            <div className="left-section">
              <label className="label label-resize" htmlFor="resize-width">
                Width :
              </label>
              <label className="label label-resize" htmlFor="resize-height">
                Height :
              </label>
            </div>

            <div className="right-section">
              <label htmlFor="">{this.props.cropDivWidth1}</label>

              <label htmlFor="">{this.props.cropDivHeight1}</label>
            </div>
          </div>
          <button
            style={{
              borderRadius: "2px",
              border: 0,
              backgroundColor: "#d42f2f",
              fontSize: 13,
            }}
            className="btn btn-primary btn-block btn-crop-section"
            onClick={() => this.props.handleCropImage1(this.props.cropImage1)}
          >
            Cut
          </button>
         </div>
         <div>
         <label className="box2">Box 2</label>
          <div className="crop-section">
            <div className="left-section">
              <label className="label label-resize" htmlFor="resize-width">
                Width :
              </label>
              <label className="label label-resize" htmlFor="resize-height">
                Height :
              </label>
            </div>

            <div className="right-section">
              <label htmlFor="">{this.props.cropDivWidth2}</label>

              <label htmlFor="">{this.props.cropDivHeight2}</label>
            </div>
          </div>
          <button
            style={{
              borderRadius: "2px",
              border: 0,
              backgroundColor: "#148106",
              fontSize: 13,
            }}
            className="btn btn-primary btn-block btn-crop-section"
            onClick={() => this.props.handleCropImage2(this.props.cropImage2)}
          >
            Cut
          </button>
         </div>
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps1 = (state) => ({
   cropDivWidth1: state.cropDivWidth1,
   cropDivHeight1: state.cropDivHeight1,
   cropDivTop1: state.cropDivTop1,
   cropDivLeft1: state.cropDivLeft1,
   showCropCanvas: state.showCropCanvas,
   cropImage1: state.cropImage1,
   cropDivWidth2: state.cropDivWidth2,
   cropDivHeight2: state.cropDivHeight2,
   cropDivTop2: state.cropDivTop2,
   cropDivLeft2: state.cropDivLeft2,
   showCropCanvas2: state.showCropCanvas2,
   cropImage2: state.cropImage2,
});

   


const mapDispatchToProps = (dispatch) => ({
  handleCropImage1: (cropImage1) => {
    dispatch({ type: "CROP_IMAGE", payload: cropImage1 });
  },
  handleCropImage2: (cropImage2) => {
    dispatch({ type: "CROP_IMAGE2", payload: cropImage2 });
  },
});

export default connect(mapStateToProps1, mapDispatchToProps)(CropSection);
