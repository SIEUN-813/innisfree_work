import React from "react";
import './scss/section4.scss';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { viewProduct } from '../../reducer/viewProduct';
import { viewProductIsFlag } from '../../reducer/viewProductIsFlag';
import { quickMenuViewProduct } from '../../reducer/quickMenuViewProduct';
import { useNavigate } from 'react-router-dom';

export default function Section4Com ({path}) {

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    const navigate = useNavigate();

    const slideWrap = React.useRef();

    const [mouseDown, setMouseDown] = React.useState(null);
    const [mouseUp, setMouseUp] = React.useState(null);
    const [dragStart, setDragStart] = React.useState(null);
    const [mDown, setMDown] = React.useState(false);
    const [winW, setWinW] = React.useState(window.innerWidth);
    const [sizeX, setSizeX] = React.useState(winW / 8);
  
    const handleMouseDown = (e) => {
      setWinW(window.innerWidth);
      setSizeX(winW / 8);
  
      setMouseDown(e.clientX);
      setDragStart(e.clientX - (slideWrap.current.offsetLeft + winW));
      setMDown(true);
    };
  
    const handleMouseUp = (e) => {
      setMouseUp(e.clientX);
  
      if (mouseDown - mouseUp > sizeX) {
        if (!slideWrap.current.isAnimated) {
            onClickNext(e);
        }
      }
  
      if (mouseDown - mouseUp < -sizeX) {
        if (!slideWrap.current.isAnimated) {
          onClickPrev(e);
        }
      }
  
      if (mouseDown - mouseUp >= -sizeX && mouseDown - mouseUp <= sizeX) {
        mainSlide();
      }
  
      setMDown(false);
    };
  
    const handleMouseMove = (e) => {
      if (!mDown) return;
      const dragEnd = e.clientX;
      slideWrap.current.style.left = dragEnd - dragStart + 'px';
    };
  
    const handleDocumentMouseUp = (e) => {
      setMouseUp(e.clientX);
  
      if (mouseDown - mouseUp > sizeX) {
        if (!slideWrap.current.isAnimated) {
          onClickNext(e);
        }
      }
  
      if (mouseDown - mouseUp < -sizeX) {
        if (!slideWrap.current.isAnimated) {
          onClickPrev(e);
        }
      }
  
      setMDown(false);
    };

    const [cnt, setCnt] = React.useState(0);
    const [toggle, setToggle] = React.useState(0);
    const [isArrowPrev, setIsArrowPrev] = React.useState(true);
    const [isArrowNext, setIsArrowNext] = React.useState(false);

    const [state, setState] = React.useState({
        slide1: [],
        slide2: [],
        slide3: [],
        slide4: [],
        slide5: [], 
        n: 0,
        isAll: true,
        isSkinCare: false,
        isMakeUp: false,
        isHairBodyPet: false,
        isEtc: false
    });

    React.useEffect(()=>{
        slideWrap.current.style.width = `${1300 * (state.n-5)}px`;
    },[state.n]);

    const mainSlide=()=>{
        slideWrap.current.style.transition = 'all 0.6s ease-in-out';
        slideWrap.current.style.left = `${-1300 * cnt}px`;
        if(cnt!==0){
            returnSlide();
        }
    }

    const returnSlide=()=>{
        if(cnt>4){
            setToggle(1);
            setCnt(4);
        }
        if(cnt<0){
            setToggle(1);
            setCnt(0);
        }
    }

    const onClickNext=(e)=>{
        e.preventDefault();
        setCnt(cnt => cnt+1);
    }

    const onClickPrev=(e)=>{
        e.preventDefault();
        setCnt(cnt => cnt-1);
    }

    React.useEffect(()=>{
        let isAll = true;
        let isSkinCare = false;
        let isMakeUp = false;
        let isHairBodyPet = false;
        let isEtc = false;
        let isArrowPrev = true;
        let isArrowNext = false;
        if(toggle===0){
            mainSlide();
        }
        else { 
            setToggle(0);
            setTimeout(()=>{
                mainSlide();
            },100);
        }
        if(cnt===0){
            isAll = true;
            isSkinCare = false;
            isMakeUp = false;
            isHairBodyPet = false;
            isEtc = false;
            isArrowPrev = true;
            isArrowNext = false;
        }
        else if(cnt===1){
            isAll = false;
            isSkinCare = true;
            isMakeUp = false;
            isHairBodyPet = false;
            isEtc = false;
            isArrowPrev = false;
            isArrowNext = false;
        }
        else if(cnt===2){
            isAll = false;
            isSkinCare = false;
            isMakeUp = true;
            isHairBodyPet = false;
            isEtc = false;
            isArrowPrev = false;
            isArrowNext = false;
        }
        else if(cnt===3){
            isAll = false;
            isSkinCare = false;
            isMakeUp = false;
            isHairBodyPet = true;
            isEtc = false;
            isArrowPrev = false;
            isArrowNext = false;
        }
        else if(cnt===4){
            isAll = false;
            isSkinCare = false;
            isMakeUp = false;
            isHairBodyPet = false;
            isEtc = true;
            isArrowPrev = false;
            isArrowNext = true;
        }
        setState({
            ...state,
            isAll : isAll,
            isSkinCare : isSkinCare,
            isMakeUp : isMakeUp,
            isHairBodyPet : isHairBodyPet,
            isEtc : isEtc
        });
        setIsArrowNext(isArrowNext);
        setIsArrowPrev(isArrowPrev);
    },[cnt]);

    React.useEffect(()=>{
        axios({
            url: './data/index/section4.json',
            method: 'GET',
        }).then((res)=>{
            setState({
                ...state,
                slide1: res.data.slide1,
                slide2: res.data.slide2,
                slide3: res.data.slide3,
                slide4: res.data.slide4,
                slide5: res.data.slide5,
                n: res.data.slide1.length
            })
        }).catch((err)=>{
            console.log("AXIOS 오류 " + err );
        })
    },[])

    React.useEffect(()=>{
        if(cnt===0) {
            setIsArrowPrev(true);
        }
        else if(cnt>0) {
            setIsArrowPrev(true);
        }
    },[])

    const onClickTab=(e, p)=>{
        e.preventDefault();
        let isAll = true;
        let isSkinCare = false;
        let isMakeUp = false;
        let isHairBodyPet = false;
        let isEtc = false;

        if(p==='all'){
            isAll = true;
            isSkinCare = false;
            isMakeUp = false;
            isHairBodyPet = false;
            isEtc = false;
            setCnt(0);
        }
        else if(p==='skinCare'){
            isAll = false;
            isSkinCare = true;
            isMakeUp = false;
            isHairBodyPet = false;
            isEtc = false;
            setCnt(1);
        }
        else if(p==='makeUp') {
            isAll = false;
            isSkinCare = false;
            isMakeUp = true;
            isHairBodyPet = false;
            isEtc = false;
            setCnt(2);
        }
        else if(p==='hairBodyPet') {
            isAll = false;
            isSkinCare = false;
            isMakeUp = false;
            isHairBodyPet = true;
            isEtc = false;
            setCnt(3);
        }
        else if(p==='etc') {
            isAll = false;
            isSkinCare = false;
            isMakeUp = false;
            isHairBodyPet = false;
            isEtc = true;
            setCnt(4);
        }
        setState({
            ...state,
            isAll : isAll,
            isSkinCare : isSkinCare,
            isMakeUp : isMakeUp,
            isHairBodyPet : isHairBodyPet,
            isEtc : isEtc
        });        
    }

    const onClickViewProduct=(e, item, route)=>{
        e.preventDefault();
        let obj = {
            번호 : item.번호,
            이미지: `${process.env.PUBLIC_URL}${route}${item.이미지}`,
            베스트: item.베스트,
            제품명: item.제품명,
            상품이름 : item.상품이름,
            정가 : item.정가,
            할인율 : item.할인율,
            판매가 : Math.round(item.정가 * (1- item.할인율)),
            태그1: item.태그1,
            태그2: item.태그2
        }
        dispatch(viewProduct(obj));
        navigate('/productView');
        localStorage.setItem('INNISFREE_VIEWPRODUCT', JSON.stringify(obj));
    }

    React.useEffect(()=>{
        let imsi = [];
        if(localStorage.getItem('INNISFREE_SHOPPING_LOG_PRODUCT') === null){
            if(Object.keys(selector.viewProduct.current).length > 0){
                imsi = [selector.viewProduct.current];
                localStorage.setItem("INNISFREE_SHOPPING_LOG_PRODUCT", JSON.stringify(imsi));
                dispatch(viewProductIsFlag(!selector.viewProductIsFlag.isFlag));  
            }
        }
        else{
            let result = JSON.parse(localStorage.getItem('INNISFREE_SHOPPING_LOG_PRODUCT'));
            let filterResult = result.map((item) => (item.번호) === selector.viewProduct.current.번호 ? true : false)
            if(filterResult.includes(true) !== true){
                if(Object.keys(selector.viewProduct.current).length > 0){
                    result = [selector.viewProduct.current, ...result];
                    localStorage.setItem("INNISFREE_SHOPPING_LOG_PRODUCT", JSON.stringify(result));
                    dispatch(viewProductIsFlag(!selector.viewProductIsFlag.isFlag));  
                }
            }            
        }
    },[selector.viewProduct.current]);
    
    React.useEffect(()=>{
        if(localStorage.getItem('INNISFREE_SHOPPING_LOG_PRODUCT') === null){
            return;
        }
        else{
            let result = JSON.parse(localStorage.getItem('INNISFREE_SHOPPING_LOG_PRODUCT'));
            if(result.length > 0){                
                dispatch(quickMenuViewProduct(result));
            }
        }
    },[selector.viewProductIsFlag.isFlag]);

    return (
        <div id="section4">
            <div className="container" onMouseDown={handleDocumentMouseUp}>
                <div className="h-group">
                    <h2>
                        지금 제일 잘나가요
                        <em className="live-time">12:50</em>
                    </h2>
                    <button type="button" className="btn-arr">더보기</button>
                </div>
                <div className="tab-bar">
                    <ul>
                        <li className={state.isAll?'active':''}>
                            <button type="button" onClick={(e)=>onClickTab(e, 'all')}>전체</button>
                        </li>
                        <li className={state.isSkinCare?'active':''}>
                            <button type="button" onClick={(e)=>onClickTab(e, 'skinCare')}>스킨케어</button>
                        </li>
                        <li className={state.isMakeUp?'active':''}>
                            <button type="button" onClick={(e)=>onClickTab(e, 'makeUp')}>메이크업</button>
                        </li>
                        <li className={state.isHairBodyPet?'active':''}>
                            <button type="button" onClick={(e)=>onClickTab(e, 'hairBodyPet')}>헤어/바디/펫</button>
                        </li>
                        <li className={state.isEtc?'active':''}>
                            <button type="button" onClick={(e)=>onClickTab(e, 'etc')}>미용소품</button>
                        </li>
                    </ul>
                </div>
                <div className="rank-cont" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
                    <div ref={slideWrap} className="slide-wrap">
                        <div className="slide">
                            <ul className="product-list">
                                {
                                    state.slide1.map((item, idx)=>{
                                        return (
                                            <li className="swiper-slide" key={item.번호} onClick={(e)=>onClickViewProduct(e, item, './images/index/')}>                                
                                                <a href="!#">
                                                        <div className="img">                                            
                                                            <img src={`./images/index/${item.이미지}`} alt="" />          
                                                            <div className={`over-img${item.변경이미지 === '' ? ' on' : ''}`}>
                                                                <img src={`./images/index/${item.변경이미지}`} alt="" />
                                                            </div>                                       
                                                            <div className="rank">
                                                                <span>{item.랭크}</span>
                                                            </div>
                                                            <div className="hover-btn">
                                                                <button className='heartBtn'></button>
                                                                <button className='cartBtn'></button>
                                                                <button className='buyBtn'></button>
                                                            </div>
                                                        </div>  
                                                        <div className="product-txt-box">
                                                            <div className="name">
                                                                <strong>{item.베스트}</strong> {item.제품명}
                                                            </div>
                                                            <div className="price-box">
                                                                <span className={`price${item.할인율 === 0 ? ' on' : ''}`}>{Math.round(item.정가 * (1 - item.할인율)).toLocaleString('ko-KR')}</span>

                                                                {
                                                                    item.할인율 !== 0 &&                                                
                                                                    <span className='sale'>{Math.round(item.할인율 * 100)}%</span>
                                                                }                                                       
                                                                {                                            
                                                                    item.할인율 !== 0 &&
                                                                    <strong className='cost'>{item.정가.toLocaleString('ko-KR')}</strong>
                                                                }                                         
                                                            </div>
                                                            <div className="sticker-box">
                                                                <span className={item.증정 === '' ? 'off' : ''}>{item.증정}</span>
                                                            </div>
                                                            <div className="hash-box">
                                                                <button className={`tag1${item.태그1 === '' ? ' on' : ''}`}>{'#'+item.태그1}</button>
                                                                <button className={`tag2${item.태그2 === '' ? ' on' : ''}`}>{'#'+item.태그2}</button>
                                                            </div>
                                                            <div className="review">
                                                                <img src="./images/index/ico_star.png" alt="" />
                                                                <p>4.8 (3,531)</p>
                                                            </div>
                                                        </div>                                      
                                                    </a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="slide">
                            <ul className="product-list">
                                {
                                    state.slide2.map((item, idx)=>{
                                        return(
                                            <li className="swiper-slide" key={item.번호} onClick={(e)=>onClickViewProduct(e, item, './images/index/')}>                                
                                                <a href="!#">
                                                        <div className="img">                                            
                                                            <img src={`./images/index/${item.이미지}`} alt="" />          
                                                            <div className={`over-img${item.변경이미지 === '' ? ' on' : ''}`}>
                                                                <img src={`./images/index/${item.변경이미지}`} alt="" />
                                                            </div>                                       
                                                            <div className="rank">
                                                                <span>{item.랭크}</span>
                                                            </div>
                                                            <div className="hover-btn">
                                                                <button className='heartBtn'></button>
                                                                <button className='cartBtn'></button>
                                                                <button className='buyBtn'></button>
                                                            </div>
                                                        </div>  
                                                        <div className="product-txt-box">
                                                            <div className="name">
                                                                <strong>{item.베스트}</strong> {item.제품명}
                                                            </div>
                                                            <div className="price-box">
                                                                <span className={`price${item.할인율 === 0 ? ' on' : ''}`}>{Math.round(item.정가 * (1 - item.할인율)).toLocaleString('ko-KR')}</span>

                                                                {
                                                                    item.할인율 !== 0 &&                                                
                                                                    <span className='sale'>{Math.round(item.할인율 * 100)}%</span>
                                                                }                                                       
                                                                {                                            
                                                                    item.할인율 !== 0 &&
                                                                    <strong className='cost'>{item.정가.toLocaleString('ko-KR')}</strong>
                                                                }                                         
                                                            </div>
                                                            <div className="sticker-box">
                                                                <span className={item.증정 === '' ? 'off' : ''}>{item.증정}</span>
                                                            </div>
                                                            <div className="hash-box">
                                                                <button className={`tag1${item.태그1 === '' ? ' on' : ''}`}>{'#'+item.태그1}</button>
                                                                <button className={`tag2${item.태그2 === '' ? ' on' : ''}`}>{'#'+item.태그2}</button>
                                                            </div>
                                                            <div className="review">
                                                                <img src="./images/index/ico_star.png" alt="" />
                                                                <p>4.8 (3,531)</p>
                                                            </div>
                                                        </div>                                      
                                                    </a>
                                            </li>
                                        )
                                    })                            
                                }
                            </ul>
                        </div>
                        <div className="slide">
                            <ul className="product-list">
                                {
                                    state.slide3.map((item, idx)=>{
                                        return(
                                            <li className="swiper-slide" key={item.번호} onClick={(e)=>onClickViewProduct(e, item, './images/index/')}>                                
                                                <a href="!#">
                                                        <div className="img">                                            
                                                            <img src={`./images/index/${item.이미지}`} alt="" />          
                                                            <div className={`over-img${item.변경이미지 === '' ? ' on' : ''}`}>
                                                                <img src={`./images/index/${item.변경이미지}`} alt="" />
                                                            </div>                                       
                                                            <div className="rank">
                                                                <span>{item.랭크}</span>
                                                            </div>
                                                            <div className="hover-btn">
                                                                <button className='heartBtn'></button>
                                                                <button className='cartBtn'></button>
                                                                <button className='buyBtn'></button>
                                                            </div>
                                                        </div>  
                                                        <div className="product-txt-box">
                                                            <div className="name">
                                                                <strong>{item.베스트}</strong> {item.제품명}
                                                            </div>
                                                            <div className="price-box">
                                                                <span className={`price${item.할인율 === 0 ? ' on' : ''}`}>{Math.round(item.정가 * (1 - item.할인율)).toLocaleString('ko-KR')}</span>

                                                                {
                                                                    item.할인율 !== 0 &&                                                
                                                                    <span className='sale'>{Math.round(item.할인율 * 100)}%</span>
                                                                }                                                       
                                                                {                                            
                                                                    item.할인율 !== 0 &&
                                                                    <strong className='cost'>{item.정가.toLocaleString('ko-KR')}</strong>
                                                                }                                         
                                                            </div>
                                                            <div className="sticker-box">
                                                                <span className={item.증정 === '' ? 'off' : ''}>{item.증정}</span>
                                                            </div>
                                                            <div className="hash-box">
                                                                <button className={`tag1${item.태그1 === '' ? ' on' : ''}`}>{'#'+item.태그1}</button>
                                                                <button className={`tag2${item.태그2 === '' ? ' on' : ''}`}>{'#'+item.태그2}</button>
                                                            </div>
                                                            <div className="review">
                                                                <img src="./images/index/ico_star.png" alt="" />
                                                                <p>4.8 (3,531)</p>
                                                            </div>
                                                        </div>                                      
                                                    </a>
                                            </li>
                                        )
                                    })                                
                                }
                            </ul>
                        </div>
                        <div className="slide">
                            <ul className="product-list">
                                {       
                                    state.slide4.map((item, idx)=>{
                                        return (
                                            <li className="swiper-slide" key={item.번호} onClick={(e)=>onClickViewProduct(e, item, './images/index/')}>                                
                                                <a href="!#">
                                                        <div className="img">                                            
                                                            <img src={`./images/index/${item.이미지}`} alt="" />          
                                                            <div className={`over-img${item.변경이미지 === '' ? ' on' : ''}`}>
                                                                <img src={`./images/index/${item.변경이미지}`} alt="" />
                                                            </div>                                       
                                                            <div className="rank">
                                                                <span>{item.랭크}</span>
                                                            </div>
                                                            <div className="hover-btn">
                                                                <button className='heartBtn'></button>
                                                                <button className='cartBtn'></button>
                                                                <button className='buyBtn'></button>
                                                            </div>
                                                        </div>  
                                                        <div className="product-txt-box">
                                                            <div className="name">
                                                                <strong>{item.베스트}</strong> {item.제품명}
                                                            </div>
                                                            <div className="price-box">
                                                                <span className={`price${item.할인율 === 0 ? ' on' : ''}`}>{Math.round(item.정가 * (1 - item.할인율)).toLocaleString('ko-KR')}</span>

                                                                {
                                                                    item.할인율 !== 0 &&                                                
                                                                    <span className='sale'>{Math.round(item.할인율 * 100)}%</span>
                                                                }                                                       
                                                                {                                            
                                                                    item.할인율 !== 0 &&
                                                                    <strong className='cost'>{item.정가.toLocaleString('ko-KR')}</strong>
                                                                }                                         
                                                            </div>
                                                            <div className="sticker-box">
                                                                <span className={item.증정 === '' ? 'off' : ''}>{item.증정}</span>
                                                            </div>
                                                            <div className="hash-box">
                                                                <button className={`tag1${item.태그1 === '' ? ' on' : ''}`}>{'#'+item.태그1}</button>
                                                                <button className={`tag2${item.태그2 === '' ? ' on' : ''}`}>{'#'+item.태그2}</button>
                                                            </div>
                                                            <div className="review">
                                                                <img src="./images/index/ico_star.png" alt="" />
                                                                <p>4.8 (3,531)</p>
                                                            </div>
                                                        </div>                                      
                                                    </a>
                                            </li>
                                        )
                                    })                         
                                }
                            </ul>
                        </div>
                        <div className="slide">
                            <ul className="product-list">
                                {     
                                    state.slide5.map((item, idx)=>{
                                        return (
                                            <li className="swiper-slide" key={item.번호} onClick={(e)=>onClickViewProduct(e, item, './images/index/')}>                                
                                                <a href="!#">
                                                        <div className="img">                                            
                                                            <img src={`./images/index/${item.이미지}`} alt="" />          
                                                            <div className={`over-img${item.변경이미지 === '' ? ' on' : ''}`}>
                                                                <img src={`./images/index/${item.변경이미지}`} alt="" />
                                                            </div>                                       
                                                            <div className="rank">
                                                                <span>{item.랭크}</span>
                                                            </div>
                                                            <div className="hover-btn">
                                                                <button className='heartBtn'></button>
                                                                <button className='cartBtn'></button>
                                                                <button className='buyBtn'></button>
                                                            </div>
                                                        </div>  
                                                        <div className="product-txt-box">
                                                            <div className="name">
                                                                <strong>{item.베스트}</strong> {item.제품명}
                                                            </div>
                                                            <div className="price-box">
                                                                <span className={`price${item.할인율 === 0 ? ' on' : ''}`}>{Math.round(item.정가 * (1 - item.할인율)).toLocaleString('ko-KR')}</span>

                                                                {
                                                                    item.할인율 !== 0 &&                                                
                                                                    <span className='sale'>{Math.round(item.할인율 * 100)}%</span>
                                                                }                                                       
                                                                {                                            
                                                                    item.할인율 !== 0 &&
                                                                    <strong className='cost'>{item.정가.toLocaleString('ko-KR')}</strong>
                                                                }                                         
                                                            </div>
                                                            <div className="sticker-box">
                                                                <span className={item.증정 === '' ? 'off' : ''}>{item.증정}</span>
                                                            </div>
                                                            <div className="hash-box">
                                                                <button className={`tag1${item.태그1 === '' ? ' on' : ''}`}>{'#'+item.태그1}</button>
                                                                <button className={`tag2${item.태그2 === '' ? ' on' : ''}`}>{'#'+item.태그2}</button>
                                                            </div>
                                                            <div className="review">
                                                                <img src="./images/index/ico_star.png" alt="" />
                                                                <p>4.8 (3,531)</p>
                                                            </div>
                                                        </div>                                      
                                                    </a>
                                            </li>
                                        )
                                    })                           
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="slide-control">
                        <button type="button" disabled={isArrowPrev?true:false} className={`btn-prev ${isArrowPrev?' disabled':''}`} onClick={onClickPrev}></button>
                        <button type="button" disabled={isArrowNext?true:false} className={`btn-next ${isArrowNext?' disabled':''}`} onClick={onClickNext}></button>
                    </div>
                </div>
            </div>
        </div>
    )
}