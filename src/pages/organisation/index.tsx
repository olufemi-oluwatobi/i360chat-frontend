import React from "react";
import Header from "../../components/header";
import LogoImage from "../../assets/logo/i360-logo.svg";
import EmptyStareImage from "../../assets/images/organisation_empty_state.svg";
import AvatarMenu, { AvatarMenuProps } from "../../components/AvatarMenu";
import { ContentWrapper, LogoWrapper, Title, EmptyStateWrapper } from "./style";
import { Button, ButtonProps } from "../../main/style.main";
import Add from "@material-ui/icons/Add";

export default function Organisation(props: any) {
  console.log("props", props);
  const menuProps: AvatarMenuProps = {
    items: [
      {
        content: "Profile",
        key: "profile",
      },
    ],
    onItemClick: (key: string | number) => console.log(key),
    src:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fillustrations%2Fgender-neutral-icon&psig=AOvVaw3em1dG-ZCX5NDPNglfOYqT&ust=1614957703611000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJCNrbX4lu8CFQAAAAAdAAAAABAD",
  };

  const renderEmptyState = () => {
    const createOrganisationButtonProps: ButtonProps = {
      color: "white",
      background: "#25A8E0",
      border: "none",
      fontSize: "12px",
      padding: "10px 8px",
    };
    return (
      <EmptyStateWrapper>
        <img alt="empty" src={EmptyStareImage} />
        <Title style={{ fontSize: "18px" }}>
          You don't belong to any organisation
        </Title>
        <Button {...createOrganisationButtonProps}>
          <Add />
          <span>Create Organisation</span>
        </Button>
      </EmptyStateWrapper>
    );
  };

  return (
    <React.Fragment>
      <Header style={{ color: "black", background: "grey", boxShadow: "none" }}>
        <ContentWrapper>
          <LogoWrapper alt="logo" src={LogoImage} />
          <AvatarMenu {...menuProps} />
        </ContentWrapper>
      </Header>
      <ContentWrapper
        style={{ background: "#FAFAFA", flexDirection: "column" }}
      >
        <Title>Your Organisation</Title>
        {renderEmptyState()}
      </ContentWrapper>
    </React.Fragment>
  );
}
