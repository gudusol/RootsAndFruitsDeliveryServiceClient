import { css } from "@emotion/react";
import { flexGenerator } from "@styles/generator";

export const mainSectionStyle = css`
  ${flexGenerator("column")}
  gap: 2.5rem;
  width: 100%;

  margin-top: 2.8rem;
`;