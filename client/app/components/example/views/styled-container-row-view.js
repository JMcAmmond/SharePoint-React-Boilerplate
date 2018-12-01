import React from 'react';
import StyledContainer from '../../common/styled-container';
import StyledRow from '../../common/styled-row';
import './styles/styled-container-row-view.scss';

export default class StyledContainerRowView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <StyledContainer
                    title="StyledContainer & StyledRow"
                    className="StyledContainerRowView"
                    description={(
                        <p>Each section you are seeing is an example of the 'StyledContainer' component.</p>
                    )}
                >
                    <label>Even Spaced Columns</label>
                    <StyledRow rowType="example">
                        <div><span className="box">No class</span></div>
                        <div><span className="box">No class</span></div>
                        <div><span className="box">No class</span></div>
                    </StyledRow>

                    <label>Specific Column Widths</label>
                    <StyledRow rowType="example">
                        <div className="col-11"><span className="box">.col-11</span></div>
                        <div className="col-1"><span className="box">.col-1</span></div>
                    </StyledRow>
                    <StyledRow rowType="example">
                        <div className="col-10"><span className="box">.col-10</span></div>
                        <div className="col-2"><span className="box">.col-2</span></div>
                    </StyledRow>
                    <StyledRow rowType="example">
                        <div className="col-9"><span className="box">.col-9</span></div>
                        <div className="col-3"><span className="box">.col-3</span></div>
                    </StyledRow>
                    <StyledRow rowType="example">
                        <div className="col-8"><span className="box">.col-8</span></div>
                        <div className="col-4"><span className="box">.col-4</span></div>
                    </StyledRow>
                    <StyledRow rowType="example">
                        <div className="col-7"><span className="box">.col-7</span></div>
                        <div className="col-5"><span className="box">.col-5</span></div>
                    </StyledRow>
                    <StyledRow rowType="example">
                        <div className="col-6"><span className="box">.col-6</span></div>
                        <div className="col-6"><span className="box">.col-6</span></div>
                    </StyledRow>
                    <StyledRow rowType="example">
                        <div className="col-3"><span className="box">.col-3</span></div>
                        <div className="col-5"><span className="box">.col-5</span></div>
                        <div className="col-4"><span className="box">.col-4</span></div>
                    </StyledRow>
                </StyledContainer>

                <StyledContainer
                    title="Usage"
                    className="StyledContainerRowCode"
                >
                    <pre>{code}</pre>
                </StyledContainer>

            </div>
        )
    }
}



const code = 
`import React from 'react';
import StyledContainer from '../../common/styled-container';
import StyledRow from '../../common/styled-row';

export default class StyledView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StyledContainer>
                <StyledRow>
                    <div>No class</div>
                    <div>No class</div>
                    <div>No class</div>
                </StyledRow>

                <StyledRow>
                    <div className="col-11">
                        .col-11
                    </div>
                    <div className="col-1">
                        .col-1
                    </div>
                </StyledRow>
            </StyledContainer>
        )
    }
}`;