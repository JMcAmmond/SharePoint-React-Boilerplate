import React from 'react';
import './styles/signature-canvas.scss';

export default class SignatureCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clickX: [],
            clickY: [],
            clickDrag: [],
            paint: false
        }

        this.setCanvasRef = element => {
            this.canvas = element;
        }
    }

    componentDidMount() {
        let self = this;

        this.canvas.addEventListener("touchstart", function(e) {
            let mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - (Math.floor(self.canvas.getBoundingClientRect().left));
            let mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - (Math.floor(self.canvas.getBoundingClientRect().top));
                
            self.setState({
                paint: true
            });

            self.addClick(mouseX, mouseY, false);
            self.redraw();
        });

        this.canvas.addEventListener("touchmove", function(e) {
                let mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - (Math.floor(self.canvas.getBoundingClientRect().left));
                let mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - (Math.floor(self.canvas.getBoundingClientRect().top));
                e.preventDefault();
                
                if(self.state.paint){
                    self.addClick(mouseX, mouseY, true);
                    self.redraw();
                }
        });

        this.canvas.addEventListener("touchend", function(e) {
            self.props.onChange(self.canvas.toDataURL(self.props.dataURL));
            
            self.setState({
                paint: false
            });
        });

        if (this.props.src !== "" && this.props.src !== null) {
            let context = this.canvas.getContext("2d");
            let image = document.createElement('img');
                image.src = this.props.src;
                image.onload = function() {
                    context.drawImage(image, 0, 0);
                }
        }
    }

    erase() {
        let canvas = this.canvas;
        let context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);

        this.setState({
            clickX: [],
            clickY: [],
            clickDrag: [],
            paint: false
        });

        this.props.onChange("");
    }

    onMouseDown(e) {
        let mouseX = e.pageX - (Math.floor(this.canvas.getBoundingClientRect().left));
        let mouseY = e.pageY - (Math.floor(this.canvas.getBoundingClientRect().top));
        
        this.setState({
            paint: true
        });

        this.addClick(mouseX, mouseY, false);
        this.redraw();
    }

    onMouseMove(e) {
        let mouseX = e.pageX - (Math.floor(this.canvas.getBoundingClientRect().left));
        let mouseY = e.pageY - (Math.floor(this.canvas.getBoundingClientRect().top));

        if(this.state.paint){
            this.addClick(mouseX, mouseY, true);
            this.redraw();
        }
    }

    onMouseUp(e) {
        this.setState({
            paint: false
        });
    }

    onMouseLeave(e) {
        let blank = document.createElement('canvas');
            blank.width = this.canvas.width;
            blank.height = this.canvas.height;

        // check if the canvas is not blank
        if (blank.toDataURL() !== this.canvas.toDataURL()) {
            this.props.onChange(this.canvas.toDataURL(this.props.dataURL));
        }

        this.setState({
            paint: false
        });

    }

    addClick(x, y, dragging) {
        let clickX = this.state.clickX;
        let clickY = this.state.clickY;
        let clickDrag = this.state.clickDrag;

        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);

        this.setState({
            clickX: clickX,
            clickY: clickY,
            clickDrag: clickDrag 
        });
    }

    redraw() {
        let context = this.canvas.getContext("2d");
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  
        context.strokeStyle = "#00a4e4";
        context.lineJoin = "round";
        context.lineWidth = 4;
            
        for(let i=0; i < this.state.clickX.length; i++) {        
            context.beginPath();
            if(this.state.clickDrag[i] && i){
                context.moveTo(this.state.clickX[i-1], this.state.clickY[i-1]);
            }else{
                context.moveTo(this.state.clickX[i]-1, this.state.clickY[i]);
            }
            context.lineTo(this.state.clickX[i], this.state.clickY[i]);
            context.closePath();
            context.stroke();
        }
    }

    render() {
        return (
            <div className="SignatureCanvas">
                <div className="canvas-block" style={{width: `${this.props.width + 4}px`}}>
                    <canvas 
                        ref={this.setCanvasRef}
                        id={this.props.id} 
                        width={this.props.width} 
                        height={this.props.height}
                        onMouseMove={this.onMouseMove.bind(this)}
                        onMouseDown={this.onMouseDown.bind(this)}
                        onMouseUp={this.onMouseUp.bind(this)}
                        onMouseLeave={this.onMouseLeave.bind(this)}
                        style={{
                            opacity: this.props.disabled ? '0.3' : '1'
                        }}
                    />
                    <div className="canvas-buttons">
                        <button type="button" className="clear-canvas" onClick={this.erase.bind(this)} disabled={this.props.disabled ? 'disabled' : ''}>Clear Canvas</button>
                    </div>
                    {this.props.disabled && (
                        <div className="disabled-cover" style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: `${this.props.width + 4}px`,
                            height: `${this.props.height + 4}px`
                        }}></div>
                    )}
                </div>
            </div>
        )
    }
}

SignatureCanvas.defaultProps = {
    id: "canvas",
    width: 600,
    height: 200,
    src: "",
    disabled: false
}