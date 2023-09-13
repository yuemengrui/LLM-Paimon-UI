import React, {Component} from 'react';

class RainbowText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: ['#ec4646', '#f5a14f', '#f5c0dc', '#4bf14b',
                '#8282f5', '#c48bee', '#c35eee'],
            currentColorIndex: 0
        };
    }

    // componentDidMount() {
    //     this.timer = setInterval(this.changeColor, 500); // 每500毫秒更新一次颜色
    // }

    componentWillUnmount() {
        clearInterval(this.timer); // 在组件卸载前清除定时器
    }

    changeColor = () => {
        this.setState(prevState => ({
            currentColorIndex: (prevState.currentColorIndex + 1) % this.state.colors.length
        }));
    };

    render() {
        const {text} = this.props;
        const {colors, currentColorIndex} = this.state;

        // @ts-ignore
        const rainbowText = Array.from(text).map((char, index) => (
            <span key={index} style={{color: colors[(index + currentColorIndex) % colors.length]}}>
        {char}
      </span>
        ));

        return <a>{rainbowText}</a>;
    }
}

export default RainbowText;