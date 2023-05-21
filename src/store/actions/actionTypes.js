// NAVBAR ACTIONS
export function handleUploadedFile(e) {
  return {
    type: "HANDLE_FILE_UPLOAD",
    payload: e,
  };
}

export function handleShowCropCanvas(showCropCanvas) {
  return {
    type: "SHOW_CROP_CANVAS",
    payload: showCropCanvas,
  };
}
