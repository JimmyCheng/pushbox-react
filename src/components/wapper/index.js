const Wrapper = styled.div`
  width: 480px;
  display: grid;
  grid-gap: 0px;
  grid-template-columns: repeat(16, 30px);
  grid-template-rows: repeat(14, 30px);
  grid-auto-flow: row;
  visibility: ${props.visible}
`;