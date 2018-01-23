import React from 'react';

export default class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {file: '',imagePreviewUrl: ''};
    }

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
            });
            this.uploadImageToServer();
        }

        reader.readAsDataURL(file)

}
    uploadImageToServer() {
        let formData = new FormData();
        formData.append('file', this.state.file);
        fetch("http://localhost:8080/image", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                // 'Content-Type': 'multipart/form-data'
            },
            body: formData
        })
            .then(results => {
                return results.json();
            })
            .then(data => {
                console.log(data);
                this.props.selectImage(data.originalFileName, data.targetFileName);
                this.setState({
                    imagePreviewUrl: "http://localhost:8080/image/" + data.targetFileName
                });
            })
            .catch((error) => {
                console.log(error)
            });

    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img alt="preview" src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        return (
            <div className="previewComponent">
                    <input className="fileInput"
                           type="file"
                           onChange={(e)=>this.handleImageChange(e)} />
                <div className="imgPreview">
                    {$imagePreview}
                </div>
            </div>
        )
    }
}