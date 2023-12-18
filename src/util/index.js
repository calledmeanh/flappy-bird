import zeroImg from "../asset/sprites/0.png";
import oneImg from "../asset/sprites/1.png";
import twoImg from "../asset/sprites/2.png";
import threeImg from "../asset/sprites/3.png";
import fourImg from "../asset/sprites/4.png";
import fiveImg from "../asset/sprites/5.png";
import sixImg from "../asset/sprites/6.png";
import sevenImg from "../asset/sprites/7.png";
import eightImg from "../asset/sprites/8.png";
import nineImg from "../asset/sprites/9.png";

export const getSizeByPercent = (size, percent) => (percent * size) / 100;

export const randomNumInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomHeightPipe = (screenHeight, maxPer) => {
  const upPer = randomNumInRange(20, maxPer);
  const downPer = maxPer - upPer;

  const upHeight = getSizeByPercent(screenHeight, upPer);
  const downHeight = getSizeByPercent(screenHeight, downPer);
  const midHeight = getSizeByPercent(screenHeight, 100 - (upPer + downPer));
  return { upHeight, midHeight, downHeight };
};

export const getStateOfTime = () => {
  const hours = new Date().getHours();
  if (hours >= 6 && hours < 20) return true; // day
  return false; // night
};

export const listener = (type, handler, target = window) => {
  target.addEventListener(type, handler, { passive: false });
  return () => {
    target.removeEventListener(type, handler);
  };
};

export const checkRectCollision = (rect1, rect2) => {
  if (rect1.x < rect2.x + rect2.w && rect1.x + rect1.w > rect2.x && rect1.y < rect2.y + rect2.h && rect1.h + rect1.y > rect2.y) {
    return true;
  } else {
    return false;
  }
};

export const getImageByNumber = (num) => {
  switch (num) {
    case 0:
      return zeroImg;
    case 1:
      return oneImg;
    case 2:
      return twoImg;
    case 3:
      return threeImg;
    case 4:
      return fourImg;
    case 5:
      return fiveImg;
    case 6:
      return sixImg;
    case 7:
      return sevenImg;
    case 8:
      return eightImg;
    case 9:
      return nineImg;
    default:
      return "";
  }
};

export const transformScore = (score) => {
  if (score < 10) {
    const scoreImg = getImageByNumber(score);
    return [scoreImg];
  }

  const scoreStr = score.toString();
  const scoreArr = scoreStr.split("");

  return scoreArr.reduce((init, s) => {
    const scoreInt = parseInt(s);
    const scoreImg = getImageByNumber(scoreInt);
    init.push(scoreImg);
    return init;
  }, []);
};

export const mobileCheck = () => {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a,
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw(n|u)|c55\/|capi|ccwa|cdm|cell|chtm|cldc|cmd|co(mp|nd)|craw|da(it|ll|ng)|dbte|dcs|devi|dica|dmob|do(c|p)o|ds(12|d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(|_)|g1 u|g560|gene|gf5|gmo|go(\.w|od)|gr(ad|un)|haie|hcit|hd(m|p|t)|hei|hi(pt|ta)|hp( i|ip)|hsc|ht(c(| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i(20|go|ma)|i230|iac( ||\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|[a-w])|libw|lynx|m1w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|mcr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|([1-8]|c))|phil|pire|pl(ay|uc)|pn2|po(ck|rt|se)|prox|psio|ptg|qaa|qc(07|12|21|32|60|[2-7]|i)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h|oo|p)|sdk\/|se(c(|0|1)|47|mc|nd|ri)|sgh|shar|sie(|m)|sk0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h|v|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl|tdg|tel(i|m)|tim|tmo|to(pl|sh)|ts(70|m|m3|m5)|tx9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas|your|zeto|zte/i.test(
        a.substr(0, 4),
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};
