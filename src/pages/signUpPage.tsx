import * as React from 'react';
import { useState } from 'react';
import InputBox from '../components/inputBox';
import styled, {css} from 'styled-components';

import LoginLayout from '../components/LoginLayout';
import Modal from '../components/modal';
import { SignUpParams } from '../types/Sign';
import * as LoginAPI from "../api/login"

const InputSection = styled.section`
  margin-bottom: 16px;
`

type LoginBtnProps = {
  active: boolean
}

const SignUpBtn = styled.button<LoginBtnProps>`
  width: 100%;
  min-height: 56px;
  max-height: 56px;
  border: none;
  border-radius: 20px;
  background: var(--primary);
  opacity: 0.3;

  color: #fff;
  font-weight: 700;
  font-size: 18px;

  ${props => props.active && css`
      opacity: 1
    `
  }
`

export default function SignUpPage() {
  const [signUpParams, setSignUpParams] = useState<SignUpParams>({
    nickname: '',
    password: '',
    instagramId: undefined,
  });

  const [temp, setTemp] = useState({
    temp_instagramId: '',
    temp_password: ''
  })

  const [open, setOpen] = React.useState(false)
  
  const {nickname, password} = signUpParams

  const {temp_instagramId, temp_password} = temp

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setSignUpParams({
      ...signUpParams,
      [name]: value
    });
  }

  const clearInfo = (name: string) => {
    setSignUpParams({
      ...signUpParams,
      [name]: ''
    });
  }

  const onChange_temp = (e: any) => {
    const { name, value } = e.target;
    setTemp({
      ...temp,
      [name]: value
    });
  }

  const clearInfo_temp = (name: string) => {
    setTemp({
      ...temp,
      [name]: ''
    });
  }

  const signUp = async () => {
    if (nickname !== '' && password !== '')
      if (temp_instagramId) {
        let instagramId = temp_instagramId
        if(temp_instagramId[0] === '@') instagramId = temp_instagramId.substring(1)
        signUpParams.instagramId = {value: instagramId}
      }
      const res = await LoginAPI.signUp(signUpParams)
      if (res.status === 200) {
        setOpen(true)
      }
  }

  const checkBtnActive = (nickname: string, password: string, temp_password: string) => {
    return nickname !== '' && password !== '' && password === temp_password
  }

  const notMatchPwd = (password: string, temp_password: string) => {
    const is_fill = password !== '' && temp_password !== ''
    const is_not_same = password !== temp_password

    return is_fill && is_not_same
  }

  const modalAction = () => {
    setOpen(false)
    window.location.href = '/login'
  }

  return (
    <>
      <LoginLayout
        title="????????????"
        description = "??? ???????????? ????????? ?????? ?????????!"
        content = {
          <>
            <InputSection>
              <InputBox placeholder="?????????" type="text" name="nickname" value={nickname} onChange={onChange} clearInfo={clearInfo}/>
            </InputSection>
            <InputSection>
              <InputBox placeholder="??????????????? ?????? (??????)" type="text" name="temp_instagramId" value={temp_instagramId} onChange={onChange_temp} clearInfo={clearInfo_temp}/>
            </InputSection>
            <InputSection>
              <InputBox placeholder="????????????" type="password" name="password" value={password} onChange={onChange} clearInfo={clearInfo}/>
            </InputSection>
            <InputSection>
              <InputBox placeholder="???????????? ??????" type="password" name="temp_password" value={temp_password} onChange={onChange_temp} clearInfo={clearInfo_temp}/>
            </InputSection>
            <SignUpBtn active={checkBtnActive(nickname, password, temp_password)} onClick={() => signUp()}>???????????? ??????</SignUpBtn>
            { notMatchPwd(password, temp_password) && <p style={{marginTop: '16px', fontSize: '14px', color: '#DB0B24', textAlign: 'center'}}>????????? ??? ??????????????? ???????????????. ?????? ????????? ?????????.</p>}
          </>
        }
      ></LoginLayout>
      {open && <Modal title="??? ??????????????? ???????????????" description="?????? ????????? ????????? ?????? ????????? ?????????!" setOpen={setOpen} open={open} action={modalAction} />}
    </>
  )
}