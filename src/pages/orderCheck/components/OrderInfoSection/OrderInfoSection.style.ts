import { css, Theme } from "@emotion/react";
import { flexGenerator } from "@styles/generator";

export const section3Container = (theme: Theme) => css`
  ${flexGenerator("column", "start", "start")};
  width: 38rem;
  min-height: 100%;
  background-color: ${theme.color.white};
`;
export const section3InfoWrapper = css`
  ${flexGenerator("column", "start", "start")};
  gap: 2rem;
`;

export const section3Div = css`
  ${flexGenerator("column", "start", "start")};
  gap: 0.5rem;
`;
export const graySpan = (theme: Theme) => css`
  color: ${theme.color.lightgray4};
  ${theme.font["head01-b-24"]}
`;
export const blackSpan = (theme: Theme) => css`
  color: ${theme.color.black};
  ${theme.font["orderCheck-36"]}
`;

export const buttonWrapper = css`
  ${flexGenerator("row", "space-between", "center")};
  width: 100%;
  margin-top: auto;
`;