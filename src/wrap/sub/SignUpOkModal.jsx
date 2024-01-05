import React from 'react';
import './scss/messageModal.scss';
import { useDispatch, useSelector } from 'react-redux';
import { signUpModal } from '../../reducer/signUpModal';
import { signUpData } from '../../reducer/signUpData';
import { messageModal } from '../../reducer/messageModal';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../reducer/signIn';
import { signOutData } from '../../reducer/signOutData';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function SignUpOkModal () {

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    const navigate = useNavigate();
    const location = useLocation();

    // 메세지모달 메소드
    const messageModalMethod=(msg)=>{
        const obj = {
            isMessageModal: true,
            isMsg: msg
        }
        dispatch(messageModal(obj));
    }

    const [state, setState] = React.useState({
        id: '',
        pw: '',
        name: '',
        hp: '',
        address: '',
        email: '',
        birth: '',
        allAgree: [],
    });

    React.useEffect(()=>{
        if( selector.signUpData){
            return (
                setState({
                    ...state,
                    id: selector.signUpData.signUpData.id,
                    pw: selector.signUpData.signUpData.pw,
                    name: selector.signUpData.signUpData.name,
                    hp: selector.signUpData.signUpData.hp,
                    address: selector.signUpData.signUpData.address,
                    email: selector.signUpData.signUpData.email,
                    birth: selector.signUpData.signUpData.birth,
                    allAgree: selector.signUpData.signUpData.allAgree
                })
            )
        }
    },[selector.signUpData.signUpData]);

    const onClickClose=(e)=>{
        e.preventDefault();
        dispatch(signUpModal(false))
    }

    const onSubmitFormOk=(e)=>{
        e.preventDefault();

        let formData = new FormData();
        formData.append('userId', state.id);
        formData.append('userPw', state.pw);
        formData.append('userName', state.name);
        formData.append('userHp', state.hp);
        formData.append('userAddress', state.address);
        formData.append('userEmail', state.email);
        formData.append('userBirth', state.birth);
        formData.append('userService', state.allAgree);

        axios({
            url:'http://sieun.co.kr/innisfree/innisfree_insert.php',
            method:'POST',
            data: formData
        })
        .then((res)=>{
            console.log(res)
            console.log(res.data);
            if( res.status===200 ){
                if( res.data===1 ){
                    dispatch(signUpModal(false));
                    navigate('/signIn');
                }
                else {
                    messageModalMethod('입력하신 정보를 다시 확인해주세요.');
                }
            }
        })
        .catch(( err )=>{
            console.log(err);
        })
    }


    const onSubmitFormDelete=(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('userId', selector.signIn.signInData.id);
        formData.append('userPw', selector.signIn.signInData.pw);

        axios({
            url: 'http://sieun.co.kr/innisfree/innisfree_delete.php',
            method: 'POST',
            data: formData
        })
        .then(( res )=>{

            if( res.status === 200 ){
                console.log(res);
                console.log(res.data);
                messageModalMethod('회원탈퇴가 완료되었습니다.');
                localStorage.removeItem('INNISFREE_SIGNIN_DATA');
                dispatch(signIn(null));
                dispatch(messageModal(false));
                dispatch(signUpModal(false));
                navigate('/index');
            }
            else {
                messageModalMethod('회원정보를 확인하고 다시 시도해 주세요.');
            }
        })
        .catch(( err )=>{
            console.log( err );
        })
    }

    return (
        <div id='message_modal'>
            <div className="container">
                <div className="content">
                    <div className="title">
                        <h2>{selector.signUpModal.isOkMsg}</h2>
                    </div>
                    {
                        localStorage.getItem('INNISFREE_SIGNIN_DATA')===null &&
                        <form onSubmit={onSubmitFormOk}>
                            <div className="button_box ok">
                                <button type='submit' className='ok_btn ok_btn1' >확인</button>
                                <button className='ok_btn ok_btn2' onClick={onClickClose}>닫기</button>
                            </div>
                        </form>
                    }
                    {
                        localStorage.getItem('INNISFREE_SIGNIN_DATA')!==null &&
                        <form onSubmit={onSubmitFormDelete}>
                            <div className="button_box ok">
                                <button type='submit' className='ok_btn ok_btn1' >확인</button>
                                <button className='ok_btn ok_btn2' onClick={onClickClose}>닫기</button>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </div>
    );
};
