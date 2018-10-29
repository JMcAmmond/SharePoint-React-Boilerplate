import React from 'react';
import StyledContainer from '../common/styled-container';
import StyledRow from '../common/styled-row';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Home">
                <StyledContainer
                    title="Section 1"
                    className="InfoSection"
                    description={(
                        <p>This is the description</p>
                    )}
                >
                    {/*Row 1*/}
                    <StyledRow>
                        <div>
                            <label>Column 1</label>
                            <input type="text"/>
                        </div>

                        <div>
                            <label>Column 2</label>
                            <input type="text"/>
                        </div>
                    </StyledRow>

                    {/*Row 2*/}
                    <StyledRow rowType='even-spaced'>
                        <div>
                            <label>Column 1</label>
                            <input type="text"/>
                        </div>

                        <div>
                            <label>Column 2</label>
                            <input type="text"/>
                        </div>

                        <div>
                            <label>Column 3</label>
                            <input type="text"/>
                        </div>
                    </StyledRow>

                </StyledContainer>

                <StyledContainer
                    title="Section 2"
                    className="AnotherSection"
                >

                    <StyledRow>
                        <div>
                            <table>
                                {/* Header */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Total</th>
                                        <th>Year 1</th>
                                        <th>Year 2</th>
                                        <th>Year 3</th>
                                        <th>Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* CAPEX */}
                                    <tr>
                                        <td><label className="required">Row 1</label></td>
                                        <td><span>0.00</span></td>
                                        <td><input type="number" /></td>
                                        <td><input type="number" /></td>
                                        <td><input type="number" /></td>
                                        <td><input type="number" /></td>
                                    </tr>

                                    {/* IDC */}
                                    <tr>
                                        <td><label>Row 2</label></td>
                                        <td><span>0.00</span></td>
                                        <td><input type="number" /></td>
                                        <td><input type="number" /></td>
                                        <td><input type="number" /></td>
                                        <td><input type="number" /></td>
                                    </tr>

                                    {/* OPEX */}
                                    <tr>
                                        <td><label className="required">Row 3</label></td>
                                        <td><span>0.00</span></td>
                                        <td><input type="number" /></td>
                                        <td><input type="number" /></td>
                                        <td><input type="number" /></td>
                                        <td><input type="number" /></td>
                                    </tr>

                                    {/* Total */}
                                    <tr>
                                        <td><label>Total</label></td>
                                        <td><span>0.00</span></td>
                                        <td><span className="right-align">0.00</span></td>
                                        <td><span className="right-align">0.00</span></td>
                                        <td><span className="right-align">0.00</span></td>
                                        <td><span className="right-align">0.00</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </StyledRow>
                </StyledContainer>
            </div>
        )
    }
}
