import * as React from "react";

import Backdrop from "@material-ui/core/Backdrop";
import Grid from "@material-ui/core/Grid";

import Output from "./components/Output";
import BottomNavigation from "./components/BottomNavigation";
import InfoModal from "../InfoModal/index";

import dynamic from "next/dynamic";

const Editor = dynamic(() => import("./components/Editor"), { ssr: false });

interface Props {
  code: string;
  isRunning: boolean;
  isInfoModalOpen: boolean;
  onClickStart: () => void;
  onClickStop: () => void;
  onCodeChange: (e: string) => void;
  onResetCode: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  score: number;
  error: boolean;
  errorMessage: string;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

const Main = ({
  code,
  isRunning,
  onClickStart,
  onClickStop,
  onCodeChange,
  onResetCode,
  score,
  canvasRef,
  error,
  errorMessage,
  isInfoModalOpen,
  handleOpenModal,
  handleCloseModal,
}: Props) => (
  <>
    <Grid container>
      <Grid item xs={12}>
        <Editor code={code} onCodeChange={onCodeChange} />
      </Grid>
      <Grid item xs={12}>
        <BottomNavigation
          isRunning={isRunning}
          onClickStart={onClickStart}
          onClickStop={onClickStop}
          onResetCode={onResetCode}
          handleOpenModal={handleOpenModal}
        />
      </Grid>
    </Grid>

    <InfoModal
      isInfoModalOpen={isInfoModalOpen}
      handleCloseModal={handleCloseModal}
    />

    <Backdrop open={isRunning} style={{ zIndex: 9999 }} onClick={onClickStop}>
      <Output canvasRef={canvasRef} />
    </Backdrop>
  </>
);

export default Main;
