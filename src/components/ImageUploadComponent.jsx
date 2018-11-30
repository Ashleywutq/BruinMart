import React, { Component, Fragment } from 'react';
import Dropzone from 'react-dropzone';
import { Col, Row, Button } from 'reactstrap';

class ImageUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            files: []
        };

        this.deleteFile = this.deleteFile.bind(this);
        this.onPreviewDrop = this.onPreviewDrop.bind(this);
    }

    handleCheck(val) {
        return this.state.files.some(item => val.name === item.name);
    }

    onPreviewDrop = (files) => {
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend=()=>{
            const curPath = reader.result;
            files[0].preview=curPath;
            if(this.handleCheck(files[0])){
                alert("Please do not upload the same image twice!");
            }
            else{
                this.setState({
                    files: this.state.files.concat(files[0])
                });
            }
        }
    };

    deleteFile = (file)=>{
        this.setState({
            files: this.state.files.filter(el => el!==file )
        });
    }

    render() {
        const previewStyle = {
            display: 'inline',
            width: 100,
            height: 100
        };

        return (
            <>
                <Dropzone className="dropzone" accept="image/*" onDrop={this.onPreviewDrop}>
                    <div className="upload-box">Drag your image here or click the box to browse your local files.</div>
                </Dropzone>
                {this.state.files.length > 0 && (
                    <Fragment>
                        <h4>Uploaded Pictures</h4>
                        {this.state.files.map((file,i) => (
                            <div key={i}>
                            <img alt={file.name} key={file.preview} src={file.preview} style={previewStyle} />
                            {file.name}{' '}
                            <Button value="delete" onClick={()=>this.deleteFile(file)}>delete</Button>
                            </div>
                        ))}
                        {console.log(this.state.files)}
                    </Fragment>
                )}
            </>
        );
    }
}

export default ImageUpload;
