import styled from "styled-components";
export type ButtonProps = {
  color: string;
  background: string;
  height?: string;
  width?: string;
  border?: string;
  fontSize: string;
  margin?: string;
  padding?: string;
};

export const Button = styled.button<ButtonProps>`
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  cursor: pointer;
  align-self: center;

  border: ${(props) => props.border};
  font-size: ${(props) => props.fontSize};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;
