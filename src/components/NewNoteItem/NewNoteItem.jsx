import React from "react";
import styled, { css } from "styled-components";
import StyledRemovedNoteButton from "../StyledRemovedNoteButton/StyledRemovedNoteButton";

const StyledTitle = styled.h1`
  font-size: 26px;
  font-weight: 600;

  text-align: start;
  border-radius: 20px;
  padding: 10px;
  margin: 10px;
  //height: 50px;
  font-family: "Montserrat", sans-serif;
  background-color: hsl(0, 0%, 10%);
  //margin-bottom: 1px;

  ${({ $category }) =>
    $category === "Notes" &&
    css`
      color: #ffd82b;
    `}
  ${({ $category }) =>
    $category === "Films" &&
    css`
      color: hsl(196, 83%, 75%);
    `}
  ${({ $category }) =>
    $category === "Books" &&
    css`
      color: hsl(106, 47%, 64%);
    `}
`;

const StyledWrapper = styled.div`
  //border-left: 10px solid ${({ theme, activecolor }) => theme[activecolor]};
  z-index: 9999;
  position: fixed;
  display: flex;
  padding: 100px 90px;
  flex-direction: column;
  right: 0;
  top: 0;
  height: 100vh;
  width: 680px;
  background-color: hsl(0, 0%, 10%);
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);

  ${({ $category }) =>
    $category === "Notes" &&
    css`
      border-left: 10px solid #ffd82b;
    `}
  ${({ $category }) =>
    $category === "Films" &&
    css`
      border-left: 10px solid hsl(196, 83%, 75%);
    `}
  ${({ $category }) =>
    $category === "Books" &&
    css`
      border-left: 10px solid hsl(106, 47%, 64%);
    `}
`;
const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 50px;
  text-transform: uppercase;
  border: none;
  font-family: "Montserrat", serif;
  width: 400px;
  margin-left: 5px;
  background-color: beige;
  background-position: "15px 60%";
  &:focus {
    ${({ $category }) =>
      $category === "Notes" &&
      css`
        outline: 3px solid #ffd82b;
      `}
    ${({ $category }) =>
      $category === "Films" &&
      css`
        outline: 3px solid hsl(196, 83%, 75%);
      `}
  ${({ $category }) =>
      $category === "Books" &&
      css`
        outline: 3px solid hsl(106, 47%, 64%);
      `}
  }
`;

const StyledTextArea = styled(Input)`
  margin: 10px 0 10px;
  border-radius: 20px;
  height: 40vh;
`;
const NewNoteItem = ({ $category }) => {
  const categoryName = $category.slice(
    $category.length - 5,
    $category.length - 1
  );
  const lower = $category.toLowerCase();
  return (
    <>
      <StyledWrapper $category={$category}>
        <StyledTitle $category={$category}>
          Creart new item in {lower}
        </StyledTitle>
        <Input $category={$category} placeholder="title" />
        {($category === "Films" || $category === "Books") && (
          <Input
            $category={$category}
            placeholder={`Put link to cover of ${categoryName}`}
          />
        )}

        <StyledTextArea
          as="textarea"
          $category={$category}
          placeholder="Description"
        />
        <StyledRemovedNoteButton $small $category={$category}>
          Add note
        </StyledRemovedNoteButton>
      </StyledWrapper>
      ;
    </>
  );
};

export default NewNoteItem;
