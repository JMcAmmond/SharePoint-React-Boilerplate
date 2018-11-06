import React from 'react';
import moment from 'moment';
import { replaceLineBreak } from '../../lib/utils';
import './styles/comments.scss';

export default class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newComment: "",
        }
        this.onCommentsChange = this.onCommentsChange.bind(this);
        this.onCommentAdd = this.onCommentAdd.bind(this);
    }

    /**
     * When the comments textarea changes, store the new value
     * @param {Event} e 
     */
    onCommentsChange(e) {
        this.setState({
            newComment: e.currentTarget.value,
        });
    }

    /**
     * When a new comment is added timestamp it and generate the markup
     * Return the comment markup to the parent
     */
    onCommentAdd() {
        let timeStamp = moment().format('MMMM Do YYYY, h:mm:ss a');
        let user = _spPageContextInfo.userDisplayName;
        let markup = `
            <div class="comment">
                <span class="user">${user}</span>
                <span class="timestamp">${timeStamp}</span>
                <p class="body">${replaceLineBreak(this.state.newComment)}</p>
            </div>
        `;

        //Reset the comment textarea
        this.setState({
            newComment: ""
        });

        this.props.onAddComment(markup);
    }

    render() {
        let isCommentDisabled =
            this.state.newComment.trim() === "" || this.props.disabled === "disabled"
                ? 'disabled'
                : '';

        return (
            <div className="Comments">

                {this.props.newCommentsVisible && (
                    <div className="new-comment-container">
                        <div className="new-comment-button">
                            <button type="button" onClick={this.onCommentAdd} disabled={isCommentDisabled}><span className="fa fa-plus"></span>Add comment</button>
                        </div>

                        <div className="new-comment">
                            <textarea value={this.state.newComment} disabled={this.props.disabled} onChange={this.onCommentsChange}></textarea>
                        </div>
                    </div>
                )}

                {this.props.comments && (
                    <div>
                        <label>{this.props.commentLabel}</label>
                        <div className="comment-container" dangerouslySetInnerHTML={{ __html: this.props.comments }}></div>
                    </div>
                )}

            </div>
        )
    }
}

Comments.defaultProps = {
    comments: "",
    commentLabel: "Comments",
    disabled: false,
    newCommentsVisible: true
}