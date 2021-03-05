import styled from "styled-components";

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.2rem 2rem;
  width: 100%;
  background: #ffffff;
  height: 100%;
`;

export const LogoWrapper = styled.img`
  width: 156px;
  height: 48px;
`;

export const Title = styled.h4`
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
  display: flex;
  align-items: center;
  letter-spacing: 0.04em;

  /* neutral/dark */

  color: #0a1b12;
`;

export const EmptyStateWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: auto;
`;
