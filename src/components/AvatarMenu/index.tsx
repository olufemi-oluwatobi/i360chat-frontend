import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import Fade from "@material-ui/core/Fade";

export type AvatarMenuProps = {
  style?: any;
  items: { content: any; key: string | number }[];
  src: string;
  onItemClick: Function;
};
export default function FadeMenu(props: AvatarMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: { currentTarget: Element }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (key: string | number) => {
    props.onItemClick(key);
    setAnchorEl(null);
  };

  return (
    <div>
      <Avatar
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
        src={
          props.src
          // "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fillustrations%2Fgender-neutral-icon&psig=AOvVaw3em1dG-ZCX5NDPNglfOYqT&ust=1614957703611000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJCNrbX4lu8CFQAAAAAdAAAAABAD"
        }
      ></Avatar>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {props.items.map((item) => (
          <MenuItem onClick={() => handleClose(item.key)}>
            {item.content}{" "}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
