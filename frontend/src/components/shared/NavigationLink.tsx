import { Button } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};

const NavigationLink = (props: Props) => {
  return (
    // <Link
    //   onClick={props.onClick}
    //   className="nav-link"
    //   to={props.to}
    //   style={{ background: props.bg, color: props.textColor }}
    // >
    //   {props.text}
    // </Link>
    <Button
      onClick={props.onClick}
      className="nav-link"
      style={{ background: props.bg, color: props.textColor }}
    >
      {props.text}
    </Button>
  );
};

export default NavigationLink;
