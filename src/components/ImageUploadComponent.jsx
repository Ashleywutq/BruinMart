import React, { Component, Fragment } from "react";
import ReactDropzone from "react-dropzone";

class ImageUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
    };
  }

  onPreviewDrop = (files) => {
    this.setState({
      files: this.state.files.concat(files),
     });
  }

  render() {
    const previewStyle = {
      display: 'inline',
      width: 100,
      height: 100,
    };

    return (
      <div className="app">
        <ReactDropzone
          accept="image/*"
          onDrop={this.onPreviewDrop}
        >
          <div className="upload-box">Drag your image here or click the box to browse your local files.</div>
        </ReactDropzone>
        {this.state.files.length > 0 &&
          <Fragment>
            <h3>Previews</h3>
            {this.state.files.map((file) => (
              <img
                alt={file.name}
                key={file.preview}
                src={file.preview}
                style={previewStyle}
              />
            ))}
          </Fragment>
        }
      </div>
    );
  }
}

export default ImageUpload;