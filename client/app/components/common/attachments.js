import React from 'react';
import Api from '../../lib/api';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import includes from 'lodash/includes';
import './styles/attachments.scss';

export default class Attachments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: null,
            newFiles: null,
            uploading: false
        };

        this.uploadFiles = this.uploadFiles.bind(this);
        this.onFilesChange = this.onFilesChange.bind(this);
        this.removeFile = this.removeFile.bind(this);
        this.fileInput = null;
        this.setFileRef = element => {
            this.fileInput = element;
        }
    }

    //If you can, fetch all the current attachments
    componentDidMount() {
    	if(this.props.itemId && this.props.listName) {
	        this.fetchAttachments();
	    }
    }

    //Fetch attachments
    fetchAttachments() {
        Api.get(`${APP_CONFIG.site.url}/_api/web/lists/getbytitle('${this.props.listName}')/items(${this.props.itemId})
			?$select=Attachments, AttachmentFiles
			&$expand=AttachmentFiles
		`).then((resp) => {
			this.setState({
				files: resp
			});
		}).catch((ex) => {
			console.log(ex);
		});
    }

    /**
     * Check if the filename already exists in the file attachments
     * @param {String} filename 
     */
    nameInAttachments(filename) {
        let found = find(this.state.files.d.AttachmentFiles.results, {FileName: filename});
        return found !== undefined ? true : false;
    }

    /**
     * When there is a change then update the model in the right place
     */
    onFilesChange(event) {
        let files = event.target.files;
        let invalidNames = [];
        let invalidTypes = [];

        //If there is no file reset state and return
        if (!files[0]) {
            this.setState({
                newFiles: null
            });
            return;
        }

        //Enforce file limits
        if(this.props.limit !== null && (this.state.files.d.AttachmentFiles.results.length + files.length > this.props.limit)) {
        	alert(`You cannot upload more that ${this.props.limit} files`);
        	this.fileInput.value = null;
        	this.setState({
                newFiles: null
            });
            return;
        }

        //Enforce file types
        if(this.props.accept.length > 0) {
        	for(let i=0; i<files.length; i++) {
        		if(!includes(this.props.accept, files[i].type)) {
        			invalidTypes.push(files[i].name);
        		}
        	}
        }

        if(invalidTypes.length > 0) {
        	alert(`Only the following file types are accepted:\n${this.props.accept.join(', ')}\n\nInvalid Files:\n${invalidTypes.join(', ')}`);
        	this.fileInput.value = null;
            return;
        }

        //Check for valid names
        for(let i = 0; i < files.length; i++) {
            if(this.nameInAttachments(files[i].name)) {
                invalidNames.push(files[i].name);
            }
        }

        //If invalid names found the alert user and return otherwise change the state
        if(invalidNames.length > 0) {
            alert(`Attachments cannot have the same name. Please fix the following attachment(s) and try again.\n\nInvalid Files:\n${invalidNames.join(', ')}`);
            this.fileInput.value = null;
            return;
        }

        //Add files to state if they pass all checks
        let filesArr = [];
    	for(let i=0; i<files.length; i++) {
    		filesArr.push(files[i]);
    	}

        this.setState({
            newFiles: filesArr
        });
    }

    uploadFiles() {
    	this.setState({
    		uploading: true
    	});

        this.state.newFiles.reduce((p, file) => {
            return p.then(chain =>
                Api.postFile(
                	`${APP_CONFIG.site.url}/_api/web/lists/getbytitle('${this.props.listName}')/items(${this.props.itemId})/AttachmentFiles/add(FileName='${file.name}')`, 
                	file, 
                	file.size
                ).then(result =>
                    [...chain, result]
                )
            );
        }, Promise.resolve([])).then(resp => {
			this.fileInput.value = null;

            let files = this.state.files;
            for(let i=0; i<resp.length; i++) {
            	files.d.AttachmentFiles.results.push(resp[i].d);
            }
            files.d.Attachments = true;

            this.setState({
            	files: files,
            	uploading: false,
            	newFiles: null
            });
        });
    }

    removeFile(fileName, index) {
    	let files = this.state.files;
    		files.d.AttachmentFiles.results.splice(index, 1);
    		files.d.Attachments = files.d.AttachmentFiles.results.length > 0 ? true : false;

    	this.setState({
    		files: files
    	});

    	Api.delete(`${APP_CONFIG.site.url}/_api/web/lists/getbytitle('${this.props.listName}')/items(${this.props.itemId})/AttachmentFiles/getByFileName('${fileName}')`)
    		.then((resp) => {
    			console.log(resp);
    		}).catch((ex) => {
    			console.log(ex);
    		})
    }

    render() {
    	let isAtFileLimit = 
    		this.props.limit !== null && 
    		this.state.files !== null &&
    		this.state.files.d.AttachmentFiles.results.length >= this.props.limit 
    			? true 
    			: false;

    	let isUploadDisabled = 
    		isAtFileLimit ||
    		this.props.disableUpload 
    			? 'disabled' 
    			: '';

    	let isUploadButtonDisabled = 
    		isAtFileLimit ||
    		isUploadDisabled || 
    		this.state.newFiles === null;

        return (
            <div className="Attachments">
                {(this.props.itemId === null || this.props.listName === null) && (
                    <div className="notice">
                        <span className="fa fa-info"></span>
                        <span>{this.props.notice}</span>
                    </div>
                )}

                {(this.props.itemId !== null && this.props.listName !== null) && (
                    <React.Fragment>
                    	{this.props.uploadVisible && (
	                        <div className="upload-container">
	                            <label>{this.props.uploadLabel}</label>
	                            <div className="input-container">
	                                <input ref={this.setFileRef} type="file" multiple={this.props.multiple} accept={this.props.accept.join(',')} onChange={this.onFilesChange} disabled={isUploadDisabled}/>
	                                <button type="button" className="save-button" onClick={this.uploadFiles} disabled={isUploadButtonDisabled}>
	                                	{this.state.uploading && (
											<span className="fas fa-spinner fa-spin"></span>
	                                	)}

	                                	{!this.state.uploading && (
											<span className="fas fa-cloud-upload-alt"></span>
	                                	)}
	                                    Upload
	                                </button>
	                            </div>
	                        </div>
                    	)}

                        {(this.props.attachmentsVisible && this.state.files !== null && this.state.files.d.Attachments) && (
	                       	<div className="files-container">
	                            <label>{this.props.attachmentsLabel}</label>
	                            <ul>
	                            	{this.state.files.d.AttachmentFiles.results.map((item, i) => {
	                            		return(
	                            			<li key={i}>
	                            				<i className={getFontaAwesomeFileIcon(item.FileName)}></i>
	                            				<a href={`${item.ServerRelativeUrl}`} target="_blank">{item.FileName}</a>
	                            				{!this.props.disableRemove && (
	                            					<button type="button" onClick={() => this.removeFile(item.FileName, i)}>
		                            					<i className="fa fa-times"></i>
		                            				</button>
	                            				)}
	                            			</li>
	                            		)
	                            	})}
	                            </ul>
	                        </div>
                        )}
                    </React.Fragment>
                )}
            </div>
        )
    }
}

Attachments.defaultProps = {
    itemId: null,
    listName: null,
    multiple: false,
    disableUpload: false,
    disableRemove: false,
    uploadVisible: true,
    attachmentsVisible: true,
    limit: null,
    notice: 'Form must be saved before file attachments can be added.',
    attachmentsLabel: 'Attachments',
    uploadLabel: 'File Upload',
    accept: []
}


function getFontaAwesomeFileIcon(fileName) {
	const re = /(?:\.([^.]+))?$/;
	let ext = re.exec(fileName)[1];

	switch(ext) {
		case('aif'):
		case('cda'):
		case('mid'):
		case('midi'):
		case('mp3'):
		case('mpa'):
		case('ogg'):
		case('wav'):
		case('wma'):
		case('wpl'):
			return 'fas fa-file-audio';
		case('7z'):
		case('arj'):
		case('deb'):
		case('pkg'):
		case('rar'):
		case('rpm'):
		case('z'):
		case('zip'):
			return 'fas fa-file-archive';
		case('csv'):
			return 'fas fa-file-csv';
		case('js'):
		case('css'):
		case('scss'):
		case('ts'):
		case('jsx'):
		case('jar'):
		case('java'):
		case('html'):
		case('xml'):
		case('jsp'):
		case('json'):
		case('md'):
		case('cmd'):
		case('less'):
		case('coffee'):
		case('tsx'):
		case('gitignore'):
		case('babelrc'):
		case('go'):
		case('php'):
		case('config'):
		case('lock'):
		case('vue'):
		case('jade'):
		case('cs'):
		case('cpp'):
		case('c'):
			return 'fas fa-file-code';
		case('ai'):
		case('bmp'):
		case('gif'):
		case('ico'):
		case('jpeg'):
		case('jpg'):
		case('png'):
		case('ps'):
		case('psd'):
		case('svg'):
		case('tif'):
		case('tiff'):
			return 'fas fa-file-image';
		case('pdf'):
			return 'fas fa-file-pdf';
		case('pps'):
		case('ppt'):
		case('pptx'):
			return 'fas fa-file-powerpoint';
		case('xls'):
		case('xlsx'):
			return 'fas fa-file-excel';
		case('3g2'):
		case('3gp'):
		case('avi'):
		case('flv'):
		case('h264'):
		case('m4v'):
		case('mkv'):
		case('mov'):
		case('mp4'):
		case('mpg'):
		case('mpeg'):
		case('rm'):
		case('swf'):
		case('vob'):
		case('wmv'):
			return 'fas fa-file-video';
		case('doc'):
		case('docx'):
			return 'fas fa-file-word';
		default:
			return 'fas fa-file-alt';
	}
}