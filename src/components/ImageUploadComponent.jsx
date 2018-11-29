import React, { Component, Fragment } from 'react';
import Dropzone from 'react-dropzone';
import { Col, Row, Button } from 'reactstrap';

class ImageUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            files: []
        };
    }

    onPreviewDrop = (files) => {
        this.setState({
            files: this.state.files.concat(files)
        });
    };

    render() {
        const previewStyle = {
            display: 'inline',
            width: 100,
            height: 100
        };

        return (
            <>
                <Dropzone className="dropzone" accept="image/*" onDrop={this.onPreviewDrop}>
                    <p>Drag your image here or click the box to browse your local files.</p>
                </Dropzone>
                {this.state.files.length > 0 && (
                    <Fragment>
                        <h3>Previews</h3>
                        {this.state.files.map((file) => (
                            <img alt={file.name} key={file.preview} src={file.preview} style={previewStyle} />
                        ))}
                    </Fragment>
                )}
            </>
        );
    }
}

export default ImageUpload;
