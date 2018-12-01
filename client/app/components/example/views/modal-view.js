import React from 'react';
import StyledContainer from '../../common/styled-container';
import StyledRow from '../../common/styled-row';
import { ModalContainer, modal } from '../../common/modal';

const MyModal = () => {
    return(
        <div>
            <h1 style={{marginBottom: '1rem', textAlign: 'center', textTransform: 'uppercase'}}>This is a modal</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus, nisi nec sagittis scelerisque, arcu turpis tincidunt arcu, at aliquam nisl mauris eu 
            mauris. Suspendisse iaculis eros eu blandit consequat. Phasellus aliquet ac velit id lobortis. Sed sit amet vestibulum ex, nec convallis augue. 
            Suspendisse ut venenatis sem. Aliquam a mollis massa, vel vulputate mauris. Sed a nulla enim. Etiam a tristique massa. Donec rhoncus auctor lorem, 
            in gravida lacus malesuada ac. Vivamus eget elementum metus. Aenean libero orci, ullamcorper et aliquam sit amet, faucibus sit amet augue. 
            Aenean efficitur, enim at maximus convallis, augue sapien auctor tortor, a interdum ipsum ex eget mauris. Duis imperdiet feugiat pretium. 
            Sed porttitor velit nec sapien condimentum suscipit. Vestibulum rhoncus dui interdum felis fringilla iaculis.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla iaculis consequat diam, sed pharetra nunc imperdiet at. Ut fermentum convallis orci vel iaculis. 
            Vestibulum pulvinar ac sem sed dictum. Etiam ornare felis nec blandit ultrices. Aenean id magna purus. Vivamus varius, leo sed laoreet hendrerit, 
            justo magna dignissim lacus, sit amet maximus erat magna quis velit.</p>
            <button type="button" onClick={() => modal.close() }>Close Modal</button>
        </div>
    )
};

export default class ModalView extends React.Component {
    constructor(props) {
        super(props);
    }

    showModal() {
        modal.show(
            <MyModal/>
        )
    }

    render() {
        return (
            <div>
                <StyledContainer
                    title="Modal"
                    className="ModalView"
                    description={(
                        <p>Below is an example of how to use the Modal component</p>
                    )}
                >
                    <div>
                        <button type="button" onClick={this.showModal.bind(this)}>Show Modal</button>
                    </div>
                </StyledContainer>

                <StyledContainer
                    title="Usage"
                    className="ModalCode"
                >
                    <pre>{code}</pre>
                </StyledContainer>

                <ModalContainer/>
            </div>
        )
    }
}



const code = 
`import React from 'react';
import { ModalContainer, modal } from '../../common/modal';

const MyModal = () => {
    <div>
        <h1>This is a modal</h1>
        <p>This is the content of the modal</p>
        <button type="button" onClick={() => {modal.close()} }>Close Modal </button> // Custom close action
    </div>
}

export default class ModalView extends React.Component {
    constructor(props) {
        super(props);
    }

    showModal() {
        modal.show(
            <MyModal/>, { hideClose: true }
        )
    }

    render() {
        return (
            <div>
                <button type="button" onClick={this.showModal.bind(this)}>Show Modal</button>

                <ModalContainer/> // Must be mounted before using modal.show
            </div>
        )
    }
}`;