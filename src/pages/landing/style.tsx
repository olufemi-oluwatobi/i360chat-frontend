import { SyntheticEvent } from "react";
import styled from "styled-components";
import ChatImage from "../../assets/images/chat_background.svg";
import PeopleImage from "../../assets/images/landing_page_faces_image.svg";

const LandingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--primary-light);
  flex-direction: column;
  background-image: url(${ChatImage});
  background-position: top right;
  background-repeat: no-repeat;
  background-size: 50%, 85%;

  .input_root {
    background: #ffffff;
    padding: 15px;
    border: 1px solid #ced1d0;
    box-sizing: border-box;
    border-radius: 28px;
    width: 100%;
    height: 40px;
    margin-bottom: 0.7rem;
  }

  .small_text {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    /* identical to box height */

    display: flex;
    align-items: center;
    text-align: center;

    /* neutral/dark-80 */

    color: #3b4841;
  }

  .smiley_image_background {
    background: url(${PeopleImage});
    background-size: 100% 100%;
    z-index: 2;
    width: 100vw;
    margin-top: -20%;

    height: 400px;
    position: relative;
  }
`;

export const HeaderWrapper = styled.div`
  width: 100vw;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    width: 156px;
    height: 48px;
    padding: 1rem 2rem;
  }
  nav {
    align-items: center;
    align-content: center;
    margin-right: 5rem;
    display: flex;
    justify-content: space-between;
  }
`;

export const SegmentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  z-index: 5;

  width: 40%;
  align-items: center;
  align-self: center;
  justify-content: space-between;
  height: 20rem;
  transition: opacity 1s;

  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
  -ms-animation: fadein 2s; /* Internet Explorer */
  -o-animation: fadein 2s; /* Opera < 12.1 */
  animation: fadein 2s;

  .center {
    display: flex;
    flex-direction: column;
    width: 80%;

    .lower_label {
      display: flex;
      width: 70%;
      justify-content: space-between;
      .lower_label_text {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 18px;
        /* identical to box height */

        display: flex;
        align-items: center;
        text-align: center;

        /* neutral/dark-80 */

        color: #3b4841;

        &.action {
          font-style: normal;
          font-weight: bold;
          font-size: 14px;
          line-height: 18px;
          /* identical to box height */

          /* main/secondary */

          color: #bf3a91;
          cursor: pointer;
        }
      }
    }
  }
  .main_text {
    font-style: normal;
    font-weight: bold;
    font-size: 56px;
    line-height: 71px;

    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.04em;

    /* neutral/dark */

    color: #0a1b12;

    span {
      color: #c34a9a;
      margin-left: 10px;
    }
  }

  header {
    display: flex;
    flex-direction: column;
    align-items: center;

    .main_text {
      font-style: normal;
      font-weight: bold;
      font-size: 32px;
      line-height: 40px;
      display: flex;
      align-items: center;
      text-align: center;
      letter-spacing: 0.04em;

      /* neutral/dark */

      color: #0a1b12;
    }

    .supporting_text {
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 156%;
      /* identical to box height, or 28px */

      display: flex;
      align-items: center;
      text-align: center;

      /* neutral/dark-60 */

      color: #6c7671;

      &.error {
        color: red !important;
        font-size: 12px;
      }
    }
  }
  h3 {
    text-align: center;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 156%;

    display: flex;
    align-items: center;
    text-align: center;

    /* neutral/dark-80 */

    color: #3b4841;
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Firefox < 16 */
  @-moz-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Safari, Chrome and Opera > 12.1 */
  @-webkit-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Internet Explorer */
  @-ms-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Opera < 12.1 */
  @-o-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default LandingWrapper;
