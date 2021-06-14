import constants from "../constants";
import openSocket from "socket.io-client";
const socket = openSocket();

const sockets = {
  mouseMove(payload) {
    console.log(payload);
    socket.emit(constants.MOUSE_MOVE, payload);
  },
  mouseClick(payload) {
    console.log(payload);
    socket.emit(constants.MOUSE_CLICK, payload);
  },
  keypress(payload) {
    console.log(payload);
    socket.emit(constants.TYPE_STRING, payload);
  },
  keyTap(payload) {
    console.log(payload);
    socket.emit(constants.KEY_TAP, payload);
  },
  scrollMouse(x, y) {
    socket.emit(constants.SCROLL_MOUSE, { x, y });
  }
};

export default sockets;
