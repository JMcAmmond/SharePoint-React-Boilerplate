import React from 'react';
import StyledContainer from '../../common/styled-container';
import StyledRow from '../../common/styled-row';
import Attachments from '../../common/attachments';

export default class AttachmentsView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <StyledContainer
                    title="Attachments"
                    className="AttachmentsView"
                >
                    <StyledRow>
                        <div>
                            Below is an example of how the Attachments component works. Not providing an itemId or a listName will result in the following.
                        </div>
                    </StyledRow>

                    <StyledRow>
                        <div>
                            <Attachments/>
                        </div>
                    </StyledRow>
                </StyledContainer>


                <StyledContainer
                    title="Example"
                    className="AttachmentsView"
                >
                    <StyledRow>
                        <div>
                            <Attachments
                                itemId={1}
                                listName="ExampleList"
                                multiple={true}
                                limit={5}
                                accept={['application/pdf']}
                                disableUpload={false}
                                disableRemove={false}
                                uploadVisible={true}
                                attachmentsVisible={true}
                            />
                        </div>
                    </StyledRow>
                </StyledContainer>

                <StyledContainer
                    title="Usage"
                    className="AttachmentsCode"
                >
                    <pre>{code}</pre>
                </StyledContainer>
            </div>
        )
    }
}

const code = 
`import React from 'react';
import Comments from '../common/attachments';

export default class AttachmentsView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Attachments
                    itemId={1}
                    listName="ExampleList"
                    multiple={true}
                    limit={5}
                    accept={['application/pdf']}
                    disableUpload={false}
                    disableRemove={false}
                    uploadVisible={true}
                    attachmentsVisible={true}
                />
            </div>
        )
    }
}`;