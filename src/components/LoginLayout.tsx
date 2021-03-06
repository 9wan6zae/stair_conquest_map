import * as React from 'react';
import AppHeader from '../components/appHeader';
import styled from 'styled-components';

export const MainBlock = styled.main`
  position: relative;
  
  width: 100%;
  max-width: var(--maxWidth);
  padding: 0 20px;
  padding-top: 56px;
  box-sizing: border-box;

  .login__title_section {
    margin-top: 36px;
    margin-bottom: 32px;
    text-align: center;
  }

  .login__title {
    margin-bottom: 12px;
  }

  .login__input-box {
    margin-bottom: 16px;
  }
`

type LayoutProps = {
  title: string
  description: string
  content: React.ReactElement
  footer?: React.ReactElement
}

export default function LoginLayout({title, description, content, footer}: LayoutProps) {
  return (
    <>
      <AppHeader title={title}></AppHeader>
      <section style={{height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <MainBlock>
        <section className="login__title_section">
          <p className="title4 login__title">계단정복지도</p>
          <p className="description">{description}</p>
        </section>
        {content}
      </MainBlock>
      {footer}
      </section>
    </>
  )
}