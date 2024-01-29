class NeonCursor extends React.Component {
  constructor(props) {
    super(props);

    this.state = { top: 0, left: 0 };
  }

    // Метод будет вызван сразу после монтирования: создаём эффекты
  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.documentElement.classList.add('no-cursor');
  }

    // Метод будет вызван непосредственно перед размонтированием: удаляем эффекты
  componentWillUnmount() {
    document.documentElement.classList.remove('no-cursor');
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove = (event) => {
    this.setState({
      top: event.pageY,
      left: event.pageX,
    });
  };

  render() {
    return (
      <img
        src="./cursor.png"
        width="30"
        style={{
          position: 'absolute',
          top: this.state.top,
          left: this.state.left,
          pointerEvents: 'none',
        }}
      />
    );
  }
} 



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isCustomCursor: false };
  }

  handleChange = () => {
    this.setState({
      isCustomCursor: !this.state.isCustomCursor,
    });
  };

  render() {
    return (
      <>
        <label>
          <input type="checkbox" onChange={this.handleChange} />
          — Включить неоновый курсор
        </label>
        {this.state.isCustomCursor && <NeonCursor />}
      </>
    );
  }
} 

ReactDOM.render(<App />, document.querySelector('#root'));