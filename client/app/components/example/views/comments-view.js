import React from 'react';
import StyledContainer from '../../common/styled-container';
import StyledRow from '../../common/styled-row';
import Comments from '../../common/comments';

export default class CommentsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }
    }

    onCommentAdd(obj) {
        let comments = this.state.comments;
            comments.push(obj);

        this.setState({
            comments: comments
        });
    }

    render() {
        return (
            <div>
                <StyledContainer
                    title="Comments"
                    className="CommentsView"
                    description={(
                        <p>Below is an example of how to use the Comments component</p>
                    )}
                >
                    <div>
                        <Comments
                            comments={this.state.comments}
                            onAddComment={this.onCommentAdd.bind(this)}
                        />
                    </div>
                </StyledContainer>

                <StyledContainer
                    title="Usage"
                    className="CommentsCode"
                >
                    <pre>{code}</pre>
                </StyledContainer>
            </div>
        )
    }
}



const code = 
`import React from 'react';
import Comments from '../common/comments';

export default class CommentsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }
    }

    onCommentAdd(obj) {
        let comments = this.state.comments;
            comments.push(obj);
            
        this.setState({
            comments: comments
        });
    }

    render() {
        return (
            <div>
                <Comments
                    comments={this.state.comments}
                    onAddComment={this.onCommentAdd.bind(this)}
                />
            </div>
        )
    }
}`;