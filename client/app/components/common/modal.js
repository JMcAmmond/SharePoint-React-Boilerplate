import React from 'react';
import eventManager from '../../lib/eventManager';

import './styles/modal.scss';

export class ModalContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: null
        }
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        eventManager.on('ACTION.SHOW.MODAL', (item) => {
            this.setState({
                modal: item
            });
        });

        eventManager.on('ACTION.CLOSE.MODAL', () => {
            this.closeModal()
        });
    }

    componentWillUnmount() {
        eventManager.off('ACTION.SHOW.MODAL').off('ACTION.CLOSE.MODAL');
    }

    closeModal() {
        this.setState({
            modal: null
        })
    }

    render() {
        return (
            <div className="ModalContainer">

                {this.state.modal !== null && (
                    <div className="Modal">
                        <div className="Modal--background"></div>
                        <div className="Modal--content">

                            {this.state.modal.closeLabel !== undefined ? (
                                <span className="Modal--close-custom" onClick={() => {this.closeModal()} }>
                                    {this.state.modal.closeLabel}
                                </span>
                            ) : (
                                <span className="Modal--close" onClick={() => {this.closeModal()} }>
                                    {this.props.closeLabel}
                                </span>
                            )}

                            {this.state.modal.content}
                        </div>
                    </div>
                )}

            </div>
        )
    }
}

export const modal = {
    show: function(content, options) {
        eventManager.emit('ACTION.SHOW.MODAL', Object.assign({content: content}, options));
    },
    close: function() {
        eventManager.emit('ACTION.CLOSE.MODAL');
    }
}

ModalContainer.defaultProps = {
    closeLabel: '×',
}