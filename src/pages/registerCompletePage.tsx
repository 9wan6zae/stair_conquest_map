import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { RootState } from '../modules';

import html2canvas from 'html2canvas'
import BottomModal from '../components/bottomModal';

const RegisterCompleteBlock = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background-image: url('./assets/gif/confetti-min.gif');

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  p.register_complete__title {
    font-size: 28px;
    color: #fff;
    font-weight: 700;
    text-align: center;
    width: 100%;
  }

  p.register_complete__subtitle {
    font-size: 20px;
    color: #fff;
    font-weight: 500;
    text-align: center;
    margin-top: 8px;
  }

  section.register_complete__info {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    padding-top: 40px;
    z-index: 3;

    img {
      margin-top: 56px;
    }
  }
  section.register_complete__bottom {
    width: 952px;
    position: absolute;
    z-index: 1;
    top: 338px;
    left: 50%;
    transform: translateX(-50%);
  }

  @media all and (max-width: 320px) {
    section.register_complete__bottom {
      top: 40%
    }
    section.register_complete__info {
      img {
        margin-top: 4px;
        width: 50%;
      }
    }
  }

  @media all and (max-height: 667px) {
    section.register_complete__bottom {
      top: 50%
    }
    section.register_complete__info {
      img {
        margin-top: 50px;
        width: 60%;
      }
    }
  }

  @media all and (max-height: 568px) {
    section.register_complete__bottom {
      top: 40%
    }
    section.register_complete__info {
      img {
        margin-top: 20px;
        width: 46%;
      }
    }
  }

  @media all and (min-height: 1314px) {
    section.register_complete__bottom {
      top: auto;
      bottom: 0px;
    }
    section.register_complete__info {
      img {
        margin-top: 50%;
      }
    }
  }
`

const RegisterCompleteFooter = styled.footer`
  z-index: 6;
  position: absolute;
  height: 280px;
  bottom: 0px;
  left: 0px;
  width: 100%;
  display: flex;
  flex-direction: column;

  section.register_complete__description {
    text-align: center;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    line-height: 160%;
  }

  section.register_complete__action {
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-height: 146px;
    background: #fff;
    padding: 0 20px;
    box-sizing: border-box;
    z-index: 5;
  }
`

const ImgWrapper = styled.section`
  width: 100%;
  height: 228px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F2F2F5;
`

// const ImgModal = styled.section`
//   position: absolute;
//   z-index: 6;
//   width: 100vw;
//   height: 100vh;

//   top: 0;
//   left: 0;

//   section.img__wrapper {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     width: 90%;
//     background: #fff;
//     padding: 20px;
//     box-sizing: border-box;
//     border-radius: 20px;
//     box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
    
//     p {
//       text-align: center;
//       font-size: 18px;
//       margin-top: 10px;
//     }
//   }
// `

export default function RegisterCompletePage() {
  const item = useSelector((state: RootState) => state.item.item);
  const result = useSelector((state: RootState) => state.result.result);
  const [img, setImg] = React.useState('')
  const [open, setOpen] = React.useState(false)

  const onCapture = () => {
    const shareImg = document.getElementById('share')
    if (shareImg)
    html2canvas(shareImg).then(canvas => {
      setImg(canvas.toDataURL('image/png'))
      setOpen(true)
    })
  }

  const setUserName = (username: string | undefined) => {
    if (username) return username
    else return '?????? ????????????'
  }

  return (
    <>
      <RegisterCompleteBlock>
        <section style={{width: '100%', height: '100vh'}}>
          <section className="register_complete__info">
            <p className="register_complete__title">????????? ???????????????????!</p>
            <p className="register_complete__subtitle">{result?.registeredUserOrder}??? ????????? {setUserName(result?.buildingAccessibility?.registeredUserName?.value)}</p>
            <img src="./assets/svg/character_astronut.svg" alt="character" />
          </section>
        </section>
        <section className="register_complete__bottom">
          <img width="100%" src="./assets/svg/bottom.svg" alt="bottom" />
        </section>
        <RegisterCompleteFooter>
          <section className="register_complete__description">
            <p><b>{item?.place.name}</b> ?????? ????????? ???????????????.</p>
            <p>????????? ?????? ?????? ?????? ??? ??? ??????</p>
            <p>????????? ?????????????????????. ?????? ???????????? ??????</p>
          </section>
          <section className="register_complete__action">
            <button onClick={onCapture} className="next-btn">????????????</button>
            <Link to="/accessibility" style={{marginTop: '24px'}}><button className="text-btn">??????</button></Link>
          </section>
        </RegisterCompleteFooter>
        <RegisterCompleteBlock style={{opacity: '0%'}}>
          <section id='share' style={{position: 'absolute', top: '0px', width: '500px', height: '500px', backgroundImage: `url('./assets/png/shareBG.png')`}}>
            <section style={{width: '100%', paddingTop: '20px'}} className="register_complete__info">
              <p className="register_complete__title">????????? ???????????????????!</p>
              <p className="register_complete__subtitle">{result?.registeredUserOrder}??? ????????? {setUserName(result?.buildingAccessibility?.registeredUserName?.value)}</p>
              <section style={{marginTop: '300px', textAlign: 'center', color: '#fff', fontSize: '18px', fontWeight: 500, lineHeight: '160%'}}>
                <p><b>{item?.place.name}</b> ?????? ????????? ???????????????.</p>
                <p>????????? ?????? ?????? ?????? ??? ??? ??????</p>
                <p>????????? ?????????????????????. ?????? ???????????? ??????</p>
              </section>
            </section>
          </section>
        </RegisterCompleteBlock>
      </RegisterCompleteBlock>
      {/* {open &&
        <ImgModal onClick={() => setOpen(false)}>
          <section className="img__wrapper">
            <img width="100%" src={img} alt="tt"/>
            <p>???????????? ????????? ???????????? ????????????!</p>
          </section>
        </ImgModal>} */}
      <BottomModal
        open={open}
        height={482}
        setOpen={setOpen}
        title="????????????"
        description="???????????? ?????? ????????? ???????????????!"
        content= {
          <ImgWrapper>
            <img style={{borderRadius: "20px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)"}} width="180px" src={img} alt="tt"/>
          </ImgWrapper>
        }
        footer= {
          <>
            <button className="border-btn" onClick={() => setOpen(false)}>??????</button>
          </>
        }
      />
    </>
  )
}