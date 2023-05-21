import React, { Component } from "react";
import { connect } from "react-redux";
import { DropTarget } from "react-dnd";

import "./styles.css";
import CropElement from "../../components/CropElement/CropElement";
import CropElementTwo from "../../components/CropElementTwo/CropElementTwo";
const canvasTarget = {
  drop(monitor, component) {},
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
    monitor: monitor,
  };
}

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentWillMount() {
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();

      // SAVE TO LOCAL STORAGE
      const node = this.canvasRef.current;
      let imgURL = node.toDataURL("image/png");
      localStorage.removeItem("image");
      localStorage.setItem(
        "image",
        JSON.stringify({
          name: this.props.imageName,
          url: imgURL,
          date: new Date(),
        })
      );
    });
  }

  drawCanvas(img, prevProps) {
    if (!this.props.width) {
      if (
        img.height + 100 > this.props.canvasDivHeight ||
        img.width + 250 > this.props.canvasDivWidth
      ) {
        // AUTO SCALE
        let diffHeight = img.height + 145 - this.props.canvasDivHeight;
        let diffWidth = img.width + 250 - this.props.canvasDivWidth;
        if (diffHeight > 3500 || diffWidth > 3500) {
          this.props.handleScaleChange(15);
        } else if (diffHeight > 3000 || diffWidth > 3000) {
          this.props.handleScaleChange(20);
        } else if (diffHeight > 2500 || diffWidth > 2500) {
          this.props.handleScaleChange(25);
        } else if (diffHeight > 2000 || diffWidth > 2000) {
          this.props.handleScaleChange(30);
        } else if (diffHeight > 1000 || diffWidth > 1000) {
          this.props.handleScaleChange(40);
        } else if (diffHeight > 800 || diffWidth > 800) {
          this.props.handleScaleChange(50);
        } else if (diffHeight > 600 || diffWidth > 600) {
          this.props.handleScaleChange(60);
        } else if (diffHeight > 400 || diffWidth > 400) {
          this.props.handleScaleChange(70);
        } else if (diffHeight > 200 || diffWidth > 200) {
          this.props.handleScaleChange(80);
        } else if (diffHeight <= 200) {
          this.props.handleScaleChange(95);
        }
      }
      this.props.setWidthAndHeight(img.width, img.height);
    }

    const node = this.canvasRef.current;
    const context = node.getContext("2d");

    if (this.props.horizontalFlip) {
      context.translate(this.props.width, 0);
      context.scale(-1, 1);
      this.props.toggleHorizontalFlip(this.props.horizontalFlip);
    }

    if (this.props.verticalFlip) {
      context.translate(0, this.props.height);
      context.scale(1, -1);
      this.props.toggleVerticalFlip(this.props.verticalFlip);
    }

    // BRIGHTNESS
    let brightness =
      "brightness(" + (50 + this.props.brightnessValue).toString() + "%) ";

    // CONTRAST
    let contrast =
      "contrast(" + (50 + this.props.contrastValue).toString() + "%) ";

    // BLUR
    let blur = "blur(" + (this.props.blurValue / 18).toString() + "px) ";

    //SATURATE
    let saturate =
      "saturate(" + (50 + this.props.saturateValue).toString() + "%) ";

    context.filter = brightness + contrast + blur + saturate;

    if (this.props.cropImage1) {
      this.props.setWidthAndHeight(
        this.props.cropDivWidth1,
        this.props.cropDivHeight1
      );
      context.drawImage(
        img,
        this.props.cropDivLeft1,
        this.props.cropDivTop1,
        this.props.cropDivWidth1,
        this.props.cropDivHeight1,
        0,
        0,
        this.props.cropDivWidth1,
        this.props.cropDivHeight1
      );
      let imgURL = node.toDataURL("image/png");
      this.props.handleUploadedFile({
        result: imgURL,
        fileName: this.props.imageName,
        width: this.props.cropDivWidth1,
        height: this.props.cropDivHeight1,
      });
    } else if (this.props.cropImage2) {
      this.props.setWidthAndHeight(
        this.props.cropDivWidth2,
        this.props.cropDivHeight2
      );
      context.drawImage(
        img,
        this.props.cropDivLeft2,
        this.props.cropDivTop2,
        this.props.cropDivWidth2,
        this.props.cropDivHeight2,
        0,
        0,
        this.props.cropDivWidth2,
        this.props.cropDivHeight2
      );
      let imgURL = node.toDataURL("image/png");
      this.props.handleUploadedFile({
        result: imgURL,
        fileName: this.props.imageName,
        width: this.props.cropDivWidth2,
        height: this.props.cropDivHeight2,
      });
    }
    context.drawImage(img, 0, 0, this.props.width, this.props.height);

    if (this.props.downloadImageFlag) {
      let imgURL = node.toDataURL("image/png");
      this.props.setImgURL(imgURL);
      this.props.downloadImage(imgURL);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.showCropCanvas !== this.props.showCropCanvas ||
      prevProps.showRotateSection !== this.props.showRotateSection ||
      prevProps.showSlider !== this.props.showSlider ||
      prevProps.showTextField !== this.props.showTextField
    ) {
    } else {
      var img = new Image();
      img.src = this.props.image;
      img.onload = () => this.drawCanvas(img, prevProps);
    }
  }

  handleMouseUp = (e) => {
    let mouseXInCropElement1 = e.nativeEvent.offsetX;
    let mouseYInCropElement1 = e.nativeEvent.offsetY;

    let mouseXInCropElement2 = e.nativeEvent.offsetX;
    let mouseYInCropElement2 = e.nativeEvent.offsetY;

    let diffX1 =
      mouseXInCropElement1 -
      (this.props.cropDivClickInitialX1 + this.props.cropDivLeft1);

    let diffY1 =
      mouseYInCropElement1 -
      (this.props.cropDivClickInitialY1 + this.props.cropDivTop1);
    // **

    let diffX2 =
      mouseXInCropElement2 -
      (this.props.cropDivClickInitialX2 + this.props.cropDivLeft2);

    let diffY2 =
      mouseYInCropElement2 -
      (this.props.cropDivClickInitialY2 + this.props.cropDivTop2);

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
    //   // **
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

  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <div
        id="canvas-wrap1"
        style={{
          maxHeight: this.props.canvasDivHeight - 50,
          maxWidth: this.props.canvasDivWidth,
        }}
      >
        <canvas
          ref={this.canvasRef}
          width={this.props.width || 500}
          height={this.props.height || 500}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleOnMouseMove}
          style={{
            transform: "scale(" + this.props.scaleValue / 100 + ")",
          }}
        />

        {this.props.showCropCanvas ? (
          <>
            <CropElement
              key={1}
              id={1}
              flag={this.props.cropDivClickedResizeRegion}
              left={this.props.cropDivLeft1}
              top={this.props.cropDivTop1}
              canvasRef={this.canvasRef}
            />

            <CropElementTwo
              key={2}
              id={2}
              flag={this.props.cropDivClickedResizeRegion2}
              left={this.props.cropDivLeft2}
              top={this.props.cropDivTop2}
              canvasRef={this.canvasRef}
            />
          </>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    image: state.image,
    height: state.height,
    width: state.width,
    imageName: state.imageName,
    brightnessValue: state.brightnessSliderValue,
    contrastValue: state.contrastSliderValue,
    blurValue: state.blurSliderValue,
    saturateValue: state.saturateSliderValue,
    showCropCanvas: state.showCropCanvas,
    textInput: state.textInput,
    showTextField: state.showTextField,
    inputColor: state.inputColor,
    textSize: state.textSize,
    downloadImageFlag: state.downloadImageFlag,
    scaleValue: state.scaleValue,
    horizontalFlip: state.horizontalFlip,
    verticalFlip: state.verticalFlip,
    rotateCanvas: state.rotateCanvas,
    fineTuneRotate: state.fineTuneRotate,
    showRotateSection: state.showRotateSection,
    canvasDivHeight: state.canvasDivHeight,
    canvasDivWidth: state.canvasDivWidth,
    cropDivClickedResizeRegion: state.cropDivClickedResizeRegion,
    cropDivClickedResizeRegion2: state.cropDivClickedResizeRegion2,
    cropDivClickInitialX1: state.cropDivClickInitialX1,
    cropDivClickInitialY1: state.cropDivClickInitialY1,
    cropDivWidth1: state.cropDivWidth1,
    cropDivHeight1: state.cropDivHeight1,
    cropDivTop1: state.cropDivTop1,
    cropDivLeft1: state.cropDivLeft1,
    cropImage1: state.cropImage1,
    // **
    cropDivClickInitialX2: state.cropDivClickInitialX2,
    cropDivClickInitialY2: state.cropDivClickInitialY2,
    cropDivWidth2: state.cropDivWidth2,
    cropDivHeight2: state.cropDivHeight2,
    cropDivTop2: state.cropDivTop2,
    cropDivLeft2: state.cropDivLeft2,
    cropImage2: state.cropImage2,
    showSlider: state.showSlider,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setWidthAndHeight: (width, height) => {
      dispatch({
        type: "SET_WIDTH_AND_HEIGHT",
        payload: { width, height },
      });
    },
    downloadImage: (imgURL) => {
      dispatch({ type: "DOWNLOAD_IMAGE", payload: imgURL });
    },
    toggleHorizontalFlip: (horizontalFlip) => {
      dispatch({
        type: "TOGGLE_HORIZONTAL_FLIP",
        payload: horizontalFlip,
      });
    },
    toggleVerticalFlip: (verticalFlip) => {
      dispatch({
        type: "TOGGLE_VERTICAL_FLIP",
        payload: verticalFlip,
      });
    },
    resetRotate: () => {
      dispatch({
        type: "RESET_ROTATE",
      });
    },
    setImgURL: (imgURL) => {
      dispatch({
        type: "SET_IMG_URL",
        payload: imgURL,
      });
    },
    handleScaleChange: (value) => {
      dispatch({
        type: "HANDLE_SCALE_CHANGE",
        payload: value,
      });
    },
    setCropDivClickedResizeRegion: (flag) => {
      dispatch({ type: "SET_RESIZE_REGION_CLICKED", payload: flag });
    },
    //
    setCropDivClickedResizeRegion2: (flag) => {
      dispatch({ type: "SET_RESIZE_REGION_CLICKED", payload: flag });
    },
    setCropDivSize: (region, width, height) => {
      dispatch({
        type: "SET_CROP_DIV_SIZE",
        payload: { region, width, height },
      });
    },
    // //
    setCropDivSize2: (region, width, height) => {
      dispatch({
        type: "SET_CROP_DIV_SIZE2",
        payload: { region, width, height },
      });
    },
    setCropDivLeftAndTop: (top, left) => {
      dispatch({
        type: "SET_CROP_DIV_LEFT_AND_TOP",
        payload: { top, left },
      });
    },
    // **
    setCropDivLeftAndTop2: (top, left) => {
      dispatch({
        type: "SET_CROP_DIV_LEFT_AND_TOP2",
        payload: { top, left },
      });
    },
    setCropDivLeftAndTopPlain: (top, left) => {
      dispatch({
        type: "SET_CROP_DIV_LEFT_AND_TOP_PLAIN",
        payload: { top, left },
      });
    },
    //
    setCropDivLeftAndTopPlain2: (top, left) => {
      dispatch({
        type: "SET_CROP_DIV_LEFT_AND_TOP_PLAIN2",
        payload: { top, left },
      });
    },
    handleCropImage1: (cropImage1) => {
      dispatch({ type: "CROP_IMAGE", payload: cropImage1 });
    },
    handleCropImage2: (cropImage2) => {
      dispatch({ type: "CROP_IMAGE2", payload: cropImage2 });
    },
    handleUploadedFile: (e) => {
      dispatch({ type: "HANDLE_FILE_UPLOAD", payload: e });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropTarget("crop-div", canvasTarget, collect)(Canvas));
