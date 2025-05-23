"use client";
import styled from "styled-components";

export const Wrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !["padding", "maxWidth"].includes(prop),
})<{
  padding?: string;
  maxWidth?: string;
}>`
  --padding: ${({ padding }) => padding || "0rem"};
  --max-width: ${({ maxWidth }) => maxWidth || "var(--max-width)"};

  width: min(90%, 120rem);
  margin-inline: auto;
  padding: var(--padding);

  @media (max-width: 1200px) {
    width: calc(100% - var(--padding));
  }
`;

interface SectionProps {
  variant?: "default" | "hero" | "contact"; // Add more if needed
}

export const Section = styled.section<SectionProps>`
  --padding-top-bottom: 10rem;
  --padding-left-right: 2rem;

  min-height: 100vh;
  min-height: 100svh;
  // padding: var(--padding-top-bottom) var(--padding-left-right);

  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;

  ${({ variant }) =>
    variant === "hero" &&
    `
    background-color: var(--clr-primary-200);
  `}

  ${({ variant }) =>
    variant === "contact" &&
    `
    min-height: calc(100svh - 15rem);
  `}
`;

export const Grid = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["fullScreen", "height", "width", "columns", "gap", "placeItems"].includes(
      prop
    ),
})<{
  fullScreen?: boolean;
  height?: string;
  width?: string;
  columns?: string;
  gap?: string;
  placeItems?: string;
}>`
  display: grid;
  place-items: ${({ placeItems }) => placeItems || "center"};
  height: ${({ fullScreen, height }) =>
    fullScreen ? "100vh" : height || "auto"};
  width: ${({ fullScreen, width }) => (fullScreen ? "100vw" : width || "auto")};
  grid-template-columns: ${({ columns }) =>
    columns || "repeat(auto-fit, minmax(150px, 1fr))"};
  gap: ${({ gap }) => gap || "1rem"};

  @media (max-width: 1024px) {
    grid-template-columns: ${({ columns }) => columns || "repeat(2, 1fr)"};
    gap: ${({ gap }) => gap || "1.5rem"};
  }

  @media (max-width: 768px) {
    grid-template-columns: ${({ columns }) => columns || "repeat(1, 1fr)"};
    gap: ${({ gap }) => gap || "1rem"};
  }
`;

export const Flex = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "justifyContent",
      "alignItems",
      "flexDirection",
      "gap",
      "fullWidth",
      "height",
    ].includes(prop),
})<{
  justifyContent?: string;
  alignItems?: string;
  flexDirection?: "row" | "column"; // Allow 'row' or 'column'
  gap?: string;
  fullWidth?: boolean;
  height?: string;
}>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
  align-items: ${({ alignItems }) => alignItems || "stretch"};
  flex-direction: ${({ flexDirection }) =>
    flexDirection || "row"}; // Default to row
  gap: ${({ gap }) => gap || "0"};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  height: ${({ height }) => height || "auto"};
`;
