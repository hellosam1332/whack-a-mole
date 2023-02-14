import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

function PageLayout({ title, children }: Props) {
  return (
    <>
      <Header>
        <h1>{title}</h1>
      </Header>
      <Main>{children}</Main>
    </>
  );
}

const Header = styled.header`
  display: flex;
  justify-content: center;
`;

const Main = styled.main`
  max-width: 1050px;
  margin: 0 auto;
  padding: 0 50px;
`;

export default PageLayout;
