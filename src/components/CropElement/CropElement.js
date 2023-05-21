import React, { Component } from "react";
import { connect } from "react-redux";
import { DragSource } from "react-dnd";

import "./styles.css";

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

class CropElement extends Component {
  constructor(props) {
    super(props);
    this.overlappingDiv = React.createRef();
    this.state = {
      clickedResizeRegion: false,
      cursor: null,
    };
  }

  handleMouseDown = (e) => {
    let mouseXInCropElement1 = e.nativeEvent.offsetX;
    let mouseYInCropElement1 = e.nativeEvent.offsetY;

    if (mouseXInCropElement1 < 10 && mouseYInCropElement1 < 10) {
      console.log("LT");
      this.props.setCropDivClickedResizeRegion("LT");
      this.props.setCropDivInitialCoor(
        mouseXInCropElement1,
        mouseYInCropElement1
      );
    } else if (
      this.props.cropDivWidth1 - mouseXInCropElement1 < 10 &&
      mouseYInCropElement1 < 10
    ) {
      console.log("RT");
    
      this.props.setCropDivClickedResizeRegion("RT");
      this.props.setCropDivInitialCoor(
        mouseXInCropElement1,
        mouseYInCropElement1
      );
    } else if (
      this.props.cropDivWidth1 - mouseXInCropElement1 < 10 &&
      this.props.cropDivHeight1 - mouseYInCropElement1 < 10
    ) {
      console.log("RB");
      this.props.setCropDivClickedResizeRegion("RB");
      this.props.setCropDivInitialCoor(
        mouseXInCropElement1,
        mouseYInCropElement1
      );
    } else if (
      mouseXInCropElement1 < 10 &&
      this.props.cropDivHeight1 - mouseYInCropElement1 < 10
    ) {
      console.log("LB");
      this.props.setCropDivClickedResizeRegion("LB");
      this.props.setCropDivInitialCoor(
        mouseXInCropElement1,
        mouseYInCropElement1
      );
    }
  };

  handleMouseUp = (e) => {
    let mouseXInCropElement1 = e.nativeEvent.offsetX;
    let mouseYInCropElement1 = e.nativeEvent.offsetY;

    let diffX1 = mouseXInCropElement1 - this.props.cropDivClickInitialX1;
    let diffY1 = mouseYInCropElement1 - this.props.cropDivClickInitialY1;

    if (this.props.cropDivClickedResizeRegion === "RB") {
      this.props.setCropDivSize("RB", diffX1, diffY1);
    } else if (this.props.cropDivClickedResizeRegion === "RT") {
      this.props.setCropDivLeftAndTop(diffY1, 0);
      this.props.setCropDivSize("RT", diffX1, -diffY1);
    } else if (this.props.cropDivClickedResizeRegion === "LT") {
      this.props.setCropDivLeftAndTop(diffY1, diffX1);
      this.props.setCropDivSize("LT", -diffX1, -diffY1);
    } else if (this.props.cropDivClickedResizeRegion === "LB") {
      this.props.setCropDivLeftAndTop(0, diffX1);
      this.props.setCropDivSize("LT", -diffX1, diffY1);
    }
  };

  handleMouseMove = (e) => {
    let mouseXInCropElement1 = e.nativeEvent.offsetX;
    let mouseYInCropElement1 = e.nativeEvent.offsetY;
    if (mouseXInCropElement1 < 10 && mouseYInCropElement1 < 10) {
      this.setState({ cursor: "se-resize" });
    } else if (
      this.props.cropDivWidth1 - mouseXInCropElement1 < 10 &&
      mouseYInCropElement1 < 10
    ) {
      this.setState({ cursor: "ne-resize" });
    } else if (
      this.props.cropDivWidth1 - mouseXInCropElement1 < 10 &&
      this.props.cropDivHeight1 - mouseYInCropElement1 < 10
    ) {
      this.setState({ cursor: "nw-resize" });
    } else if (
      mouseXInCropElement1 < 10 &&
      this.props.cropDivHeight1 - mouseYInCropElement1 < 10
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
        className="crop-div"
        ref={this.overlappingDiv}
        id={this.props.id}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
        style={{
          width: this.props.cropDivWidth1,
          height: this.props.cropDivHeight1,
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

const mapStateToProps = (state) => {
  return {
    height: state.height,
    width: state.width,
    cropDivClickedResizeRegion: state.cropDivClickedResizeRegion,
    cropDivWidth1: state.cropDivWidth1,
    cropDivHeight1: state.cropDivHeight1,
    cropDivClickInitialX1: state.cropDivClickInitialX1,
    cropDivClickInitialY1: state.cropDivClickInitialY1,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCropDivClickedResizeRegion: (flag) => {
      dispatch({ type: "SET_RESIZE_REGION_CLICKED", payload: flag });
    },
    setCropDivInitialCoor: (x, y) => {
      dispatch({ type: "SET_CROP_DIV_INITIAL_COOR", payload: { x, y } });
    },
    setCropDivSize: (region, width, height) => {
      dispatch({
        type: "SET_CROP_DIV_SIZE",
        payload: { region, width, height },
      });
    },
    setCropDivLeftAndTop: (top, left) => {
      dispatch({
        type: "SET_CROP_DIV_LEFT_AND_TOP",
        payload: { top, left },
      });
    },
  };
};

export default DragSource(
  "crop-div",
  cardSource,
  collect
)(connect(mapStateToProps, mapDispatchToProps)(CropElement));
