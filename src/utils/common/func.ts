import styles from "../../assets/css/Colors.module.css";
import fontStyles from "../../assets/css/Font.module.css";

export const getRankColorClass = (rank:string|null) => {
    switch (rank) {
      case "初心":
        console.log(rank)
        return styles.font_color_gray;
      case "雀士":
        return styles.font_color_green;
      case "雀士2":
        return styles.font_color_skyblue;
      case "雀士3":
        return styles.font_color_blue;
      case "雀傑":
        return styles.font_color_purple;
      case "雀鬼":
        return styles.font_color_yellow;
      case "雀聖":
        return styles.font_color_orange;
      case "雀神":
        return styles.font_color_red;
      default:
        return '';
    }
};

export const getFontSize = (str:string|null) => {
  let len = str ? str.length : 0   
  if (len <=6){
    return fontStyles.font_size_30;
  }else if (len >6 && len <=10){
    return fontStyles.font_size_20;
  }else{
    return fontStyles.font_size_10;
  }
};