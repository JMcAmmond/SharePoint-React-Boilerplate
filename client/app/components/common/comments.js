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

    onCommentsChange(e) {
        this.setState({
            newComment: e.currentTarget.value,
        });
    }

    onCommentAdd() {
        let timeStamp = moment().toISOString();
        let user = _spPageContextInfo.userDisplayName;
        let comment = replaceLineBreak(this.state.newComment);

        this.setState({
            newComment: ""
        });

        this.props.onAddComment({
            user: user,
            timeStamp: timeStamp,
            comment: comment
        });
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

                {this.props.comments.length > 0 && (
                    <div>
                        <label>{this.props.commentLabel}</label>
                        <div className="comment-container">
                            {this.props.comments.map((item, i) => {
                                return(
                                    <div className="comment" key={i}>
                                        <span className="user">{item.user}</span>
                                        <span className="timestamp">{moment(item.timeStamp).format('MMMM Do YYYY, h:mm:ss a')}</span>
                                        <p className="body" dangerouslySetInnerHTML={{ __html: item.comment }}></p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

            </div>
        )
    }
}

Comments.defaultProps = {
    comments: [],
    commentLabel: "Comments",
    disabled: false,
    newCommentsVisible: true
}