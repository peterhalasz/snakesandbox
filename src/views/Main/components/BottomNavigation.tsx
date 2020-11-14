import * as React from "react";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import StopIcon from "@material-ui/icons/Stop";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import HelpIcon from "@material-ui/icons/Help";
import GitHubIcon from "@material-ui/icons/GitHub";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

interface Props {
  onResetCode: () => void;
  handleOpenModal: () => void;
  isRunning: boolean;
  onClickStart: () => void;
  onClickStop: () => void;
}

const Header = ({
  onResetCode,
  handleOpenModal,
  onClickStart,
  isRunning,
  onClickStop,
}: Props) => (
  <BottomNavigation>
    <BottomNavigationAction
      label={isRunning ? "STOP" : "START"}
      icon={!isRunning ? <PlayCircleFilledWhiteIcon /> : <StopIcon />}
      onClick={isRunning ? onClickStop : onClickStart}
    ></BottomNavigationAction>
    <BottomNavigationAction
      label="Help"
      icon={<HelpIcon />}
      onClick={handleOpenModal}
    ></BottomNavigationAction>
    <BottomNavigationAction
      label="Reset"
      icon={<RotateLeftIcon />}
      onClick={onResetCode}
    ></BottomNavigationAction>
    <BottomNavigationAction
      label="Code"
      icon={<GitHubIcon />}
      target="_blank"
      href="https://github.com/peterhalasz/smartsneks"
    ></BottomNavigationAction>
  </BottomNavigation>
);

export default Header;
