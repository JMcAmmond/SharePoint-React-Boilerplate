import React from 'react';
import * as Utils from '../../lib/utils';

import './styles/image-upload.scss';

export default class ImageUpload extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dragging: false
		}
	}

	/**
	 *
	 * @param event
	 */
	onImageChange(event) {
		//File must be under size limit
		if(event.target.files && event.target.files[0].size > this.props.fileSizeLimit) {
			alert(`Images must be under ${this.props.fileSizeLimit / 1000}KB in size`);
			return;
		}

		//Only allow image files to be uploaded
		if(event.target.files && !this.isImage(event.target.files[0])) {
			alert('Only images can be uploaded');
			return;
		}

		this.props.onImageChange(event);
	}

	/**
	 * Determine if a file is an image
	 * @param file
	 * @returns {boolean}
	 */
	isImage(file){
		return (file['type'].split('/')[0] === 'image');
	}

	/**
	 * Drag events that trigger state change
	 * Currently used to style the 'drop-zone' container
	 * @param event
	 */
	onDragEnter(event) { this.setState({ dragging: true }); }
	onDragLeave(event) { this.setState({ dragging: false }); }
	onDrop(event) { this.setState({ dragging: false }); }

	render() {
		let dropzone = {
			outlineOffset: this.state.dragging ? '-20px' : '-2px',
			backgroundColor: this.state.dragging ? '#cbebfa' : 'transparent',
		};

		return (
			<div className="ImageUpload">

				<div className="image-container">
					<div className="drop-zone" style={dropzone}>

						{/**
						 * Upload icon
						 * Shown when there are no images and state is not uploading
						 */}
						{!this.props.image && (
							<svg className="icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43">
								<path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path>
							</svg>
						)}

						{/**
						 * Upload image preview
						 * Shown when there are images and state is not uploading
						 */}
						{this.props.image && (
							<img className="uploadedImage" src={this.props.image} alt=""/>
						)}

						{/**
						 * Image input field
						 */}
						<input type="file" name="files[]" id="file" className="file"
							   onChange={this.onImageChange.bind(this)}
							   onDragEnter={this.onDragEnter.bind(this)}
							   onDragLeave={this.onDragLeave.bind(this)}
							   onDrop={this.onDrop.bind(this)}
						/>

						{/**
						 * Image input field label
						 * Shown then state is not uploading
						 */}
						<label htmlFor="file">
							{!Utils.detectIE() && (
								<p>
									<strong>Choose an image</strong>
									<span className="dragndrop"> or drag it here</span>.
								</p>
							)}

							{Utils.detectIE() && (
								<p><strong>Click here to choose an image</strong></p>
							)}
						</label>

					</div>
				</div>

			</div>
		)
	}
}

ImageUpload.defaultProps = {
	fileSizeLimit: 800000
}