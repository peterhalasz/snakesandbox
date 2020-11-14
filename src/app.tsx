import * as React from "react";

import demoCode from "./demo-code";
import EngineImpl, { Engine } from "./engine";
import RendererImpl from "./renderer";
import saveUserCode from "./util/save-user-code";
import Main from "./views/Main";

interface State {
  code: string;
  isRunning: boolean;
  score: number;
  error: boolean;
  errorMessage: string;
  isInfoModalOpen: boolean;
}

export default class App extends React.Component<{}, State> {
  private canvas: React.RefObject<HTMLCanvasElement>;
  private engine: Engine;

  constructor(props: {}) {
    super(props);

    this.state = {
      code:
        ("undefined" !== typeof window
          ? window.localStorage.getItem("userCode")
          : null) || demoCode,
      error: false,
      errorMessage: "",
      isInfoModalOpen: false,
      isRunning: false,
      score: 0,
    };

    this.canvas = React.createRef();
  }

  componentDidMount() {
    if (this.canvas.current) {
      const context = this.canvas.current.getContext("2d");

      if (context) {
        const mapSize = 30;
        const tileSize = 2;

        const renderer = new RendererImpl(context, tileSize, mapSize);
        this.engine = new EngineImpl(
          renderer,
          mapSize,
          this.onGameOver,
          this.onScoreChange,
          this.onError
        );
      }

      document.addEventListener("keydown", (e) => {
        if (e.keyCode === 13 && e.ctrlKey) {
          if (!this.state.isRunning) {
            this.onClickStart();
          } else {
            this.onClickStop();
          }
        } else if (e.keyCode === 27) {
          if (this.state.isRunning) {
            this.onClickStop();
          }
        }
      });
    }
  }

  onClickStart = () => {
    this.handleCloseModal();
    const { code } = this.state;

    try {
      this.engine.start(code);
      this.setState({ isRunning: true, error: false });
    } catch (e) {
      if (e instanceof Error) {
        this.setState({
          error: true,
          errorMessage: e.message,
          isRunning: false,
        });
      } else {
        throw e;
      }
    }
  };

  onClickStop = () => {
    this.setState({ isRunning: false });
    this.engine.stop();
  };

  onGameOver = () => {
    this.setState({ isRunning: false });
  };

  onCodeChange = (e: string) => {
    this.setState({ code: e, error: false });

    saveUserCode(e);
  };

  onScoreChange = (newScore: number) => {
    this.setState({ score: newScore });
  };

  handleOpenModal = () => {
    this.setState({ isInfoModalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ isInfoModalOpen: false });
  };

  onError = (message: string) => {
    this.setState({
      error: true,
      errorMessage: message,
      isRunning: false,
    });
  };

  onResetCode = () => {
    if (confirm("Are you sure you want to reset the code?")) {
      this.setState({
        code: demoCode,
        error: false,
      });

      saveUserCode(demoCode);
    }
  };

  render() {
    const {
      code,
      isRunning,
      score,
      error,
      errorMessage,
      isInfoModalOpen,
    } = this.state;

    return (
      <Main
        code={code}
        isRunning={isRunning}
        onClickStart={this.onClickStart}
        onClickStop={this.onClickStop}
        onCodeChange={this.onCodeChange}
        onResetCode={this.onResetCode}
        score={score}
        canvasRef={this.canvas}
        error={error}
        errorMessage={errorMessage}
        isInfoModalOpen={isInfoModalOpen}
        handleOpenModal={this.handleOpenModal}
        handleCloseModal={this.handleCloseModal}
      />
    );
  }
}
