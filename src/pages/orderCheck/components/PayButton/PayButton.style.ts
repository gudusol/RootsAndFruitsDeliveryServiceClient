import { css, Theme } from "@emotion/react";
import { flexGenerator } from "@styles/generator";

export const buttonStyle = (theme: Theme) => css`
  ${flexGenerator()};
  width: 100%;
  height: 7rem;
  padding: 1rem;
  border: 1px solid ${theme.color.black};
  border-radius: 20px;
  ${theme.font["orderCheck-32"]};
`;

export const buttonVariant = {
  fill: (theme: Theme) => css`
    color: ${theme.color.white};
    background-color: ${theme.color.orange};
  `,
  stroke: (theme: Theme) => css`
    color: ${theme.color.black};
    background-color: ${theme.color.white};
  `,
};
