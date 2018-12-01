import React from 'react';
import StyledContainer from '../../common/styled-container';
import StyledRow from '../../common/styled-row';
import SignatureCanvas from '../../common/signature-canvas';

export default class SignatureCanvasView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasImage: null
        }
    }

    onCanvasChange(canvasImage) {
        this.setState({
            canvasImage: canvasImage
        })
    }

    render() {
        return (
            <div>
                <StyledContainer
                    title="Signature Canvas"
                    className="SignatureCanvasView"
                    description={(
                        <p>
                            Below is an example of how to use the SignatureCanvas component.
                        </p>
                    )}
                >
                    <StyledRow>
                        <div>
                            <SignatureCanvas
                                onChange={this.onCanvasChange.bind(this)}
                                dataURL='image/png'
                            />
                        </div>
                    </StyledRow>
                </StyledContainer>

                <StyledContainer
                    title="Usage"
                    className="SignatureCanvasCode"
                >
                    <pre>{code}</pre>
                </StyledContainer>
            </div>
        )
    }
}



const code = 
`import React from 'react';
import SignatureCanvas from '../common/signature-canvas';

export default class SignatureCanvasView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canvas: null
        }
    }

    onCanvasChange(canvas) {
        this.setState({
            canvas: canvas
        })
    }

    render() {
        return (
            <div>
                <SignatureCanvas
                    onChange={this.onCanvasChange.bind(this)}
                    dataURL='image/png'
                />
            </div>
        )
    }
}`;