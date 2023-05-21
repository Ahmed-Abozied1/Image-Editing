import React, { Component } from "react";
import { connect } from "react-redux";
import { DragSource } from "react-dnd";

import "./CropElementTwo.css";

const cardSource = {
  canDrag(props) {
    return !props.flag;
  },
  isDragging(props, monitor) {
    return monitor.getItem().id === props.id;
  },

  beginDrag(props, monitor, component) {
    const item = { id: props.id, left: props.left, top: props.top };
    return item;
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

class CropElementTwo extends Component {
  constructor(props) {
    super(props);
    this.overlappingDiv = React.createRef();
    this.state = {
      clickedResizeRegion: false,
      cursor: null,
    };
  }

  handleMouseDown2 = (e) => {
    let mouseXInCropElement2 = e.nativeEvent.offsetX;
    let mouseYInCropElement2 = e.nativeEvent.offsetY;

    if (mouseXInCropElement2 < 10 && mouseYInCropElement2 < 10) {
      console.log("LT");
      this.props.setCropDivClickedResizeRegion2("LT");
      this.props.setCropDivInitialCoor2(
        mouseXInCropElement2,
        mouseYInCropElement2
      );
    } else if (
      this.props.cropDivWidth2 - mouseXInCropElement2 < 10 &&
      mouseYInCropElement2 < 10
    ) {
      console.log("RT");
    
      this.props.setCropDivClickedResizeRegion2("RT");
      this.props.setCropDivInitialCoor2(
        mouseXInCropElement2,
        mouseYInCropElement2
      );
    } else if (
      this.props.cropDivWidth2 - mouseXInCropElement2 < 10 &&
      this.props.cropDivHeight2 - mouseYInCropElement2 < 10
    ) {
      console.log("RB");
      this.props.setCropDivClickedResizeRegion2("RB");
      this.props.setCropDivInitialCoor2(
        mouseXInCropElement2,
        mouseYInCropElement2
      );
    } else if (
      mouseXInCropElement2 < 10 &&
      this.props.cropDivHeight2 - mouseYInCropElement2 < 10
    ) {
      console.log("LB");
      this.props.setCropDivClickedResizeRegion2("LB");
      this.props.setCropDivInitialCoor2(
        mouseXInCropElement2,
        mouseYInCropElement2
      );
    }
  };

  handleMouseUp2 = (e) => {
    let mouseXInCropElement2 = e.nativeEvent.offsetX;
    let mouseYInCropElement2 = e.nativeEvent.offsetY;

    let diffX2 = mouseXInCropElement2 - this.props.cropDivClickInitialX2;
    let diffY2 = mouseYInCropElement2 - this.props.cropDivClickInitialY2;

    if (this.props.cropDivClickedResizeRegion2 === "RB") {
      this.props.setCropDivSize2("RB", diffX2, diffY2);
    } else if (this.props.cropDivClickedResizeRegion2 === "RT") {
      this.props.setCropDivLeftAndTop2(diffY2, 0);
      this.props.setCropDivSize2("RT", diffX2, -diffY2);
    } else if (this.props.cropDivClickedResizeRegion2 === "LT") {
      this.props.setCropDivLeftAndTop2(diffY2, diffX2);
      this.props.setCropDivSize2("LT", -diffX2, -diffY2);
    } else if (this.props.cropDivClickedResizeRegion2 === "LB") {
      this.props.setCropDivLeftAndTop2(0, diffX2);
      this.props.setCropDivSize2("LT", -diffX2, diffY2);
    }
  };

  handleMouseMove2 = (e) => {
    let mouseXInCropElement2 = e.nativeEvent.offsetX;
    let mouseYInCropElement2 = e.nativeEvent.offsetY;
    if (mouseXInCropElement2 < 10 && mouseYInCropElement2 < 10) {
      this.setState({ cursor: "se-resize" });
    } else if (
      this.props.cropDivWidth2 - mouseXInCropElement2 < 10 &&
      mouseYInCropElement2 < 10
    ) {
      this.setState({ cursor: "ne-resize" });
    } else if (
      this.props.cropDivWidth2 - mouseXInCropElement2 < 10 &&
      this.props.cropDivHeight2 - mouseYInCropElement2 < 10
    ) {
      this.setState({ cursor: "nw-resize" });
    } else if (
      mouseXInCropElement2 < 10 &&
      this.props.cropDivHeight2 - mouseYInCropElement2 < 10
    ) {
      this.setState({ cursor: "sw-resize" });
    } else {
      this.setState({ cursor: null });
    }
 };

  render() {
    const { isDragging, connectDragSource } = this.props;
    if (isDragging) {
      return connectDragSource(<div />);
    }
    return (
      <>

        {
          connectDragSource(
    

     <div
        className="crop-div2"
        ref={this.overlappingDiv}
        id={this.props.id}
        onMouseDown={this.handleMouseDown2}
        onMouseUp={this.handleMouseUp2}
        onMouseMove={this.handleMouseMove2}
        style={{
          width: this.props.cropDivWidth2,
          height: this.props.cropDivHeight2,
          cursor: this.state.cursor || "move",
          left: this.props.left,
          top: this.props.top,
        }}
      />

    
      
    )
    
        }
       
      </>
    )

  }
}

const mapStateToProps2 = (state) => {
  return {
    height: state.height,
    width: state.width,
    cropDivClickedResizeRegion2: state.cropDivClickedResizeRegion2,
    cropDivWidth2: state.cropDivWidth2,
    cropDivHeight2: state.cropDivHeight2,
    cropDivClickInitialX2: state.cropDivClickInitialX2,
    cropDivClickInitialY2: state.cropDivClickInitialY2,
  };
};

const mapDispatchToProps2 = (dispatch) => {
  return {
    setCropDivClickedResizeRegion2: (flag) => {
      dispatch({ type: "SET_RESIZE_REGION_CLICKED2", payload: flag });
    },
    setCropDivInitialCoor2: (x, y) => {
      dispatch({ type: "SET_CROP_DIV_INITIAL_COOR2", payload: { x, y } });
    },
    setCropDivSize2: (region, width, height) => {
      dispatch({
        type: "SET_CROP_DIV_SIZE2",
        payload: { region, width, height },
      });
    },
    setCropDivLeftAndTop2: (top, left) => {
      dispatch({
        type: "SET_CROP_DIV_LEFT_AND_TOP2",
        payload: { top, left },
      });
    },
  };
};

export default DragSource(
  "crop-div",
  cardSource,
  collect
)(connect(mapStateToProps2, mapDispatchToProps2)(CropElementTwo));
