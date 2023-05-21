const initialState = {
  image: null,
  imageName: null,
  height: null,
  width: null,
  showSlider: true,
  showCropCanvas: false,
  showCropCanvas2: false,
  downloadImageFlag: false,
  scaleValue: 100,
  imgURL: null,
  canvasDivHeight: null,
  canvasDivWidth: null,
  cropDivClickedResizeRegion: false,
  //
  cropDivClickedResizeRegion2: false,

  // crop1
  cropDivClickInitialX1: null,
  cropDivClickInitialY1: null,
  cropDivWidth1: 150 ,
  cropDivHeight1: 150 ,
  cropDivTop1: 0,
  cropDivLeft1: 0,
  cropImage1: false,
  // crop 2
  cropDivClickInitialX2: null,
  cropDivClickInitialY2: null,
  cropDivWidth2: 150 ,
  cropDivHeight2: 150 ,
  cropDivTop2: 0,
  cropDivLeft2: 0,
  cropImage2: false,
};
// file upload
const rootReducer = (state = initialState, action) => {
  if (action.type === "HANDLE_FILE_UPLOAD") {
    return {
      ...state,
      image: action.payload.result,
      imageName: action.payload.fileName,
      errorMessage: "",
      width: action.payload.width || null,
      height: action.payload.height || null,
      cropImage1: false,
      cropDivLeft1: 0,
      cropDivTop1: 0,
      cropDivWidth1: state.width * 0.5,
      cropDivHeight1: state.height * 0.5 ,
      // //
      cropImage2: false,
      cropDivLeft2: 200,
      cropDivTop2: 200,
      cropDivWidth2: 100 ,
      cropDivHeight2: 100 ,
    };
  } else if (action.type === "SET_WIDTH_AND_HEIGHT") {
    return {
      ...state,
      width: parseInt(action.payload.width),
      height: parseInt(action.payload.height),
    };
  } else if (action.type === "SET_IMAGE_NAME") {
    return {
      ...state,
      imageName: action.payload,
    };
  }

  //**************** */
  else if (action.type === "SHOW_CROP_CANVAS") {
    if (state.image) {
      return {
        ...state,
        showCropCanvas: !action.payload,
        showSlider: false,
        scaleValue: 100,
        errorMessage: "",
        cropDivWidth1: state.width * 0.5,
        cropDivHeight1: state.height * 0.5,
        cropDivTop1: 50,
        cropDivLeft1: 50,
      };
    } else {
      return {
        ...state,
        errorMessage: "Please upload image",
        showSlider: false,
      };
    }
  }
  //
  else if (action.type === "SHOW_CROP_CANVAS2") {
    if (state.image) {
      return {
        ...state,
        showCropCanvas2: !action.payload,
        showSlider: false,
        scaleValue: 100,
        errorMessage: "",

        cropDivWidth2: state.width * 0.5,
        cropDivHeight2: state.height * 0.5,
        cropDivTop2: 50,
        cropDivLeft2: 50,
      };
    } else {
      return {
        ...state,
        errorMessage: "Please upload image",
        showSlider: false,
      };
    }
  } else if (action.type === "SHOW_TEXT_FIELD") {
    return {
      ...state,
      showTextField: !action.payload,
      showSlider: false,
      showCropCanvas: false,
      showRotateSection: false,
      showResizeSection: false,
      errorMessage: "",
    };
  } else if (action.type === "SET_DOWNLOAD_IMAGE_FLAG") {
    return {
      ...state,
      downloadImageFlag: true,
    };
  } else if (action.type === "SET_IMG_URL") {
    return {
      ...state,
      imgURL: action.payload,
    };
  } else if (action.type === "DOWNLOAD_IMAGE") {
    var link = document.createElement("a");
    let fileName = state.imageName.split(".")[0];

    link.download = `${fileName} + -editada + .jpg`;

    link.href = state.imgURL;

    try {
      localStorage.setItem(
        "imageInformation",
        JSON.stringify({
          name: fileName,
          url: state.imgURL,
          date: new Date(),
        })
      );
    } catch (e) {
      console.log("This image is too big to save to localStorage");
    }

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    link.remove();

    return {
      ...state,
      downloadImageFlag: false,
    };
  } else if (action.type === "HANDLE_SCALE_CHANGE") {
    return {
      ...state,
      scaleValue: Math.round(action.payload),
    };
  } else if (action.type === "SET_WIDTH_AND_HEIGHT_OF_CANVAS_DIV") {
    return {
      ...state,
      canvasDivHeight: action.payload.height,
      canvasDivWidth: action.payload.width,
      // canvasDivHeight2: action.payload.height,
      // canvasDivWidth2: action.payload.width,
    };
  }
  //
  else if (action.type === "SET_WIDTH_AND_HEIGHT_OF_CANVAS_DIV2") {
    return {
      ...state,
      canvasDivHeight2: action.payload.height,
      canvasDivWidth2: action.payload.width,
    };
  } else if (action.type === "SET_RESIZE_REGION_CLICKED") {
    return {
      ...state,
      cropDivClickedResizeRegion: action.payload,
    };
  } else if (action.type === "SET_RESIZE_REGION_CLICKED2") {
    return {
      ...state,
      cropDivClickedResizeRegion2: action.payload,
    };
  } else if (action.type === "SET_CROP_DIV_INITIAL_COOR") {
    return {
      ...state,
      cropDivClickInitialX1: action.payload.x,
      cropDivClickInitialY1: action.payload.y,
     
    };
  } else if (action.type === "SET_CROP_DIV_INITIAL_COOR2") {
    return {
      ...state,
      cropDivClickInitialX2: action.payload.x,
      cropDivClickInitialY2: action.payload.y,
    };
  } else if (action.type === "SET_CROP_DIV_SIZE") {
    if (action.payload.region) {
      return {
        ...state,
        cropDivWidth1: state.cropDivWidth1 + action.payload.width,
        cropDivHeight1: state.cropDivHeight1 + action.payload.height,
        cropDivClickedResizeRegion: false,
      };
    }
  }
  //
  else if (action.type === "SET_CROP_DIV_SIZE2") {
    if (action.payload.region) {
      return {
        ...state,
        cropDivWidth2: state.cropDivWidth2 + action.payload.width,
        cropDivHeight2: state.cropDivHeight2 + action.payload.height,
        cropDivClickedResizeRegion2: false,
      };
    }
  } else if (action.type === "SET_CROP_DIV_LEFT_AND_TOP") {
    return {
      ...state,
      cropDivTop1: state.cropDivTop1 + action.payload.top,
      cropDivLeft1: state.cropDivLeft1 + action.payload.left,
      // cropDivTop2: state.cropDivTop2 + action.payload.top,
      // cropDivLeft2: state.cropDivLeft2 + action.payload.left,
    };
  }
  //
  else if (action.type === "SET_CROP_DIV_LEFT_AND_TOP2") {
    return {
      ...state,
      cropDivTop2: state.cropDivTop2 + action.payload.top,
      cropDivLeft2: state.cropDivLeft2 + action.payload.left,
    };
  } else if (action.type === "SET_CROP_DIV_LEFT_AND_TOP_PLAIN") {
    return {
      ...state,
      cropDivTop1: action.payload.top,
      cropDivLeft1: action.payload.left,
    };
  }
  //
  else if (action.type === "SET_CROP_DIV_LEFT_AND_TOP_PLAIN2") {
    return {
      ...state,

      cropDivTop2: action.payload.top,
      cropDivLeft2: action.payload.left,
    };
  } else if (action.type === "CROP_IMAGE") {
    return {
      ...state,
      cropImage1: !action.payload,
    };
  } else if (action.type === "CROP_IMAGE2") {
    return {
      ...state,
      cropImage2: !action.payload,
    };
  } else if (action.type === "SET_SAVE_TEXT_FLAG") {
    return {
      ...state,
      saveTextFlag: action.payload,
    };
  }

  return state;
};

export default rootReducer;
