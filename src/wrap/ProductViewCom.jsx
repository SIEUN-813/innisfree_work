import React from 'react';
import './scss/productView.scss'
import { useSelector, useDispatch } from 'react-redux';
import { viewProduct } from '../reducer/viewProduct';
import { useNavigate } from 'react-router-dom';
import { cartMethod } from '../reducer/cartReducer';

export default function ProductViewCom(){

    const selector = useSelector((state)=>state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        isSelect: false,
        cnt: 1,
        totalPay: selector.viewProduct.current.판매가,
        cart: []
    })
    
    React.useEffect(()=>{
        if(localStorage.getItem('INNISFREE_VIEWPRODUCT') !== null){
            const obj = JSON.parse(localStorage.getItem('INNISFREE_VIEWPRODUCT'));
            dispatch(viewProduct(obj));
        }
    },[])

    React.useEffect(()=>{
        setState({
            ...state,
            totalPay: state.cnt * Number(selector.viewProduct.current.판매가)
        })
    },[state.cnt])

    const onClickPlus=(e)=>{
        e.preventDefault();
        setState({
            cnt: state.cnt + 1
        })
    }
    const onClickMinus=(e)=>{
        e.preventDefault();
        if(state.cnt < 2){
            setState({
                ...state,
                cnt: state.cnt
            })
        }
        else{
            setState({
                cnt: state.cnt - 1
            })
        }
    }

    const onClickCart=(e)=>{
        e.preventDefault();
        let cart = {
            제품코드: selector.viewProduct.current.번호,
            장바구니상품명: selector.viewProduct.current.제품명,
            이미지: selector.viewProduct.current.이미지,
            정가: selector.viewProduct.current.정가,
            할인율: selector.viewProduct.current.할인율,
            수량: state.cnt
        };

        let arr = [];
        if(localStorage.getItem('INNISFREE_CART_PRODUCT') !== null){            
            arr = JSON.parse(localStorage.getItem('INNISFREE_CART_PRODUCT'));
        }

        let imsi = arr.map((item)=>item.제품코드 === cart.제품코드)
        if(imsi.includes(true)){
            arr = arr.map((item)=>item.제품코드 === cart.제품코드 ? {...item, 수량:item.수량 + cart.수량} : item);
        }
        else{
            arr = [...arr, cart];
        }

        localStorage.setItem('INNISFREE_CART_PRODUCT', JSON.stringify(arr));
        setState({
            ...state,
            cart: arr
        })
        dispatch(cartMethod(arr));
        navigate('/cart');
        console.log(arr);
    }
    
    React.useEffect(()=>{
        let arr = [];
        if(localStorage.getItem('INNISFREE_CART_PRODUCT') !== null){            
            arr = JSON.parse(localStorage.getItem('INNISFREE_CART_PRODUCT'));
        }
        setState({
            ...state,
            cart: arr
        });
        dispatch(cartMethod(arr));
        return;
    },[])

    return (
        <main id='productView'>
            <section id='section1'>
                <div className="container">
                    <div className="content">
                        <div className="left">
                            <img src={selector.viewProduct.current.이미지} alt="" />
                        </div>
                        <div className="right">
                            <ul>
                                <li>
                                    <h2>
                                        <em className={selector.viewProduct.current.베스트 === "" ? 'on' : ''}>{selector.viewProduct.current.베스트}</em>
                                        <span className={selector.viewProduct.current.베스트 === "" ? 'on' : ''}>{selector.viewProduct.current.제품명}</span>
                                    </h2>
                                </li>
                                <li><em>{selector.viewProduct.current.제품특징}</em></li>
                                <li>
                                    <h3>                                        
                                        <strong className={selector.viewProduct.current.할인율 === 0 ? 'on' : ''}>{Math.round(selector.viewProduct.current.정가 * (1 - selector.viewProduct.current.할인율)).toLocaleString('ko-KR')}</strong>
                                        {
                                            selector.viewProduct.current.할인율 !== 0 &&    
                                            <h6>{Math.round(selector.viewProduct.current.할인율 * 100)}%</h6>
                                        }
                                        <p className={selector.viewProduct.current.할인율 === 0 ? 'on' : ''}>{Math.round(selector.viewProduct.current.정가).toLocaleString('ko-KR')}</p>
                                    </h3>
                                </li>
                            </ul>
                            <ul className='table'>
                                <li>
                                    <div className="col1">뷰티포인트</div>
                                    <div className="col2">
                                        <em>{selector.viewProduct.current.배송}</em>
                                        <p>결제 금액의 1% 적립</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="col1">배송비</div>
                                    <div className="col2">
                                        <em>무료배송</em>
                                    </div>
                                </li>     
                                <li>                                    
                                    <div className="count-left">
                                        <ul>
                                            <li><button className='dec-btn' onClick={onClickMinus}></button></li>
                                            <li><span>{state.cnt}</span></li>
                                            <li><button className='inc-btn' onClick={onClickPlus}></button></li>
                                        </ul> 
                                        <p className={selector.viewProduct.current.할인율 === 0 ? 'on' : ''}>{Math.round(selector.viewProduct.current.정가 * (1 - selector.viewProduct.current.할인율)).toLocaleString('ko-KR')}원</p>
                                    </div>
                                </li>
                            </ul>
                            <div className='sum-payment'>
                                <em>합계</em>
                                <strong>{Number(state.totalPay).toLocaleString('ko-KR')}</strong>
                                <i>원</i>
                            </div>
                            <div className="button-box">
                                <button></button>
                                <button></button>
                                <button onClick={onClickCart}>장바구니</button>
                                <button>바로구매</button>
                            </div>
                        </div>
                    </div>
                </div>                 
            </section>           
        </main>
    );
};

