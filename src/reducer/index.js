import { BIRD_CENTER_Y, BIRD_HEIGHT, BIRD_CENTER_X, BIRD_WIDTH, SCREEN_WIDTH, PIPE_WIDTH, LINE_WIDTH, GROUND_HEIGHT } from "../constant";

export const REDUCER_TYPE = {
  BIRD_DOWN: "bird-down",
  BIRD_STOP: "bird-stop",
  BIRD_JUMP: "bird-jump",
  SCORE: "score",
  RUNNING: "running",
  PAUSE: "pause",
  GAMEOVER: "gameover",
};

export const initialState = {
  running: false,
  gameover: false,
  score: 0,
  line: { w: LINE_WIDTH },
  bird: { x: BIRD_CENTER_X, y: BIRD_CENTER_Y, w: BIRD_WIDTH, h: BIRD_HEIGHT, v: 0.4 },
  pipe: { w: PIPE_WIDTH, v: SCREEN_WIDTH < 500 ? 2 : 3.6, initX: SCREEN_WIDTH },
  ground: { h: GROUND_HEIGHT },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case REDUCER_TYPE.BIRD_DOWN:
      return { ...state, bird: { ...state.bird, y: action.payload } };
    case REDUCER_TYPE.BIRD_STOP:
      return {
        ...state,
        bird: { ...state.bird, y: action.payload.y },
        gameover: action.payload.gameover,
        running: action.payload.running,
      };
    case REDUCER_TYPE.BIRD_JUMP:
      return { ...state, bird: { ...state.bird, y: action.payload } };
    case REDUCER_TYPE.GET_SCORE:
      return { ...state, score: action.payload };
    case REDUCER_TYPE.RUNNING:
      return { ...state, running: action.payload };
    case REDUCER_TYPE.PAUSE:
      return { ...state, running: action.payload };
    case REDUCER_TYPE.GAMEOVER:
      return { ...state, gameover: action.payload.gameover, running: action.payload.running };
    default:
      return state;
  }
};
