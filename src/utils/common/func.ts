import styles from "../../assets/css/Colors.module.css";

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