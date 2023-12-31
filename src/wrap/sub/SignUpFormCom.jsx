import React, { useState } from 'react';
import './scss/signUpForm.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { messageModal } from '../../reducer/messageModal';
import { addressSearch } from '../../reducer/addressSearch';
import { signUpModal }  from '../../reducer/signUpModal';
import { signUpData} from '../../reducer/signUpData';
import axios from 'axios';


export default function SignUpFormCom () {

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

    const okModalMethod=(msg)=>{
        const obj = {
            isOkModal: true,
            isOkMsg:msg,
        }
        dispatch(signUpModal(obj));
    }
    
    const [state, setState] = useState({

        id: '',
        idGuideText: null,
        isDuplicationIdBtn: false,
        idDuplicationCheck: false,  
        
        pw: '',
        pwGuideText1: null, 
        pwGuideText2: null, 
        pwGuideText3: null, 
        pwGuideText4: null, 
        pwGuideText5: null, 
        pwCheck: '',
        pwCheckGuideText1: null,
        pwCheckGuideText2: null,
        
        email: '',
        emailGuideText: null,
        isDuplicationEmailBtn: false,
        isDuplicationEmailCheck: false,

        isAddress:'',
        isRemainingAddress:'',
        showAddress: false,

        // 체크박스
        allAgree: [],
        eachAgree: [
            '[필수] 뷰티포인트 서비스 이용 약관',
            '[필수] 개인정보 이용 및 수집에 대한 동의',
            '[필수] 개인정보 제3자 제공 동의 (이니스프리)',
            '[선택] 개인정보 제 3자 제공 동의',
            '[선택] 국외 이전 동의',
            '[선택] 개인정보 수집 및 이용 동의 (마케팅)',
            '[선택] 뷰티포인트 문자 수신 동의',
            '[선택] 온라인 사이트 문자 수신 동의',
            '[필수] 이니스프리 서비스 이용약관',
            '[필수] 개인정보 수집 및 이용 동의 (이니스프리)',
            '[선택] 개인정보 수집 및 이용동의 (마케팅)(이니스프리)',
            '[선택] 이니스프리  문자 수신 동의'
        ],
        agreeBox: true,

        isInfoBox: false,
        isInfoBox1: false,

        submitBtn: true,
        

        name : '',
        hp : '',
        birth: '',
        birthYear : '',
        birthMonth : '',
        birthDate : ''

    });

    // 주소 바인딩하기
    React.useEffect(()=>{
        setTimeout(()=>{
            if(selector.address.isAddress!=='' && selector.address.isRemainingAddress!=='' ){
                return (
                    setState({
                        ...state,
                        isAddress: selector.address.isAddress,
                        isRemainingAddress: selector.address.isRemainingAddress,
                        showAddress: true
                    })    
                )
            }
        }, 10);
    },[selector.address.isAddress, selector.address.isRemainingAddress]);

    // 네비게이트 = 버튼클릭 시 로그인 폼으로 이동
    const onClickIndexBtn=(e)=>{
        e.preventDefault();
        navigate('/');
    }

    // 아이디 입력상자 = 정규표현식
    const onChangeId=(e)=>{
        const {value} = e.target;
        let id = '';
        let idGuideText = '';
        let isDuplicationIdBtn = false;
        const regexp1 = /([`~!@#$%^&*()\-_=+[{\]}\\/|;:'",<.>?])|([가-힣ㄱ-ㅎㅏ-ㅣ])/g; 
        const regexp2 = /^(.){4,12}$/g;
        const regexp3 = /\s/g;
        id = value.replace(regexp1, '' );
        if( value.length > 12 || regexp2.test(value)===false || regexp3.test(value)===true ){
            idGuideText = true; // '4자이상 12자 이하의 영문과 숫자(공백제외)만 입력해 주세요.'
            isDuplicationIdBtn = false;
        }
        else {
            idGuideText = false;
            isDuplicationIdBtn = true;
        }
        setState({
            ...state,
            id: id,
            idGuideText: idGuideText,
            isDuplicationIdBtn: isDuplicationIdBtn
        })
    }

    // 아이디 중복확인
    const onClickDuplicationId=(e)=>{
        const value = state.id;
        let idGuideText = '';
        let idDuplicationCheck = false;
        const regexp1 = /^(.){4,12}$/g;
        const regexp2 = /\s/g;
        if( value.length > 12 || regexp1.test(value)===false || regexp2.test(value)===true ){
            idGuideText = '4자이상 12자 이하의 영문과 숫자(공백제외)만 입력해 주세요.'; 
            idDuplicationCheck = false;
            messageModalMethod(idGuideText);
            setState({
                ...state,
                idDuplicationCheck: idDuplicationCheck
            })
        }
        else {
            let formData = new FormData();
            formData.append('userId', state.id);

            axios({
                url: 'http://sieun.co.kr/innisfree/innisfree_id_duplication.php',
                method: 'POST',
                data: formData
            })
            .then(( res )=>{
                if( res.status===200 ){
                    if( res.data===0 ){
                        idGuideText = '사용 할 수 있는 아이디 입니다.';
                        idDuplicationCheck = true;
                    }
                    else if( res.data===1 ){
                        idGuideText = '이미 사용중인 아이디 입니다.';
                        idDuplicationCheck = false;
                    }
                    messageModalMethod(idGuideText);
                    setState({
                        ...state,
                        idDuplicationCheck: idDuplicationCheck
                    })
                }
            })
            .catch(( err )=>{
                console.log( err );
            })
        }
    }

    // 비밀번호 입력상자 = 정규표현식
    const onChangePw=(e)=>{
        const {value} = e.target;
        let pw = '';
        let pwGuideText1 = null;
        let pwGuideText2 = null;
        let pwGuideText3 = null;
        let pwGuideText4 = null;
        let pwGuideText5 = null;

        const regexp1 = /((?=.*[A-Za-z])+(?=.*[0-9])+)|((?=.*[A-Za-z])+(?=.*[`~!@#$%^&*()\-_=+[{\]}\\/|;:'",<.>?])+)|(?=.*[0-9])+(?=.*[`~!@#$%^&*()\-_=+[{\]}\\/|;:'",<.>?])+/g;
        const regexp2 = /(.)\1\1\1/g;
        const regexp3 = /^(.){8,16}$/g;
        const regexp4 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        const regexp5 = /\s/g;
        pw = value.replace(regexp4,'');
        if( regexp3.test(value)===false ){
            pwGuideText1 = true;    // '8자 이상 16자 이하로 입력해 주세요.'
        }
        else {
            pwGuideText1 = false;
        }

        if( regexp1.test(value)===false || regexp4.test(value)===true || regexp5.test(value)===true ){
            pwGuideText2 = true;    // '영문(소문자), 숫자, 특수문자(공백제외) 중 최소 2가지 이상조합  '
        }
        else {
            pwGuideText2 = false
        }
        if( regexp2.test(value)===true ){
            pwGuideText3 = true;    // '동일한 문자 4자리 이상 입력은 불가합니다.'
        }
        else {
            pwGuideText3 = false;
        }
        if( value.length===8 || value.length===9 ){
            pwGuideText4 = false;    // '사용 가능한 비밀번호 입니다.(보통)'
        }
        else if( value.length > 9){
            pwGuideText5 = false;    // '사용 가능한 비밀번호 입니다.(안전)'
        }
        setState({
            ...state,
            pw: pw,
            pwGuideText1: pwGuideText1,
            pwGuideText2: pwGuideText2,
            pwGuideText3: pwGuideText3,
            pwGuideText4: pwGuideText4,
            pwGuideText5: pwGuideText5
        })
    }
    // 비밀번호 확인 입력상자 = 정규표현식
    const onChangePwCheck=(e)=>{
        const {value} = e.target;
        let pwCheck = '';
        let pwCheckGuideText1 = null;
        let pwCheckGuideText2 = null;
        const regexp1 = /\s/g;
        const regexp2 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        pwCheck = value.replace(regexp2,''); 
        if( regexp1.test(value)===true || value==='' || regexp2.test(value)===true ){
            pwCheckGuideText1 = true;   //'비밀번호를 한번 더 입력해 주세요'
        }
        else if( value!==state.pw ){
            pwCheckGuideText2 = true;   // '동일한 비밀번호를 입력해 주세요'
        }
        else {
            pwCheckGuideText1 = false;
            pwCheckGuideText2 = false;
        }
        
        setState({
            ...state,
            pwCheck: pwCheck,
            pwCheckGuideText1: pwCheckGuideText1,
            pwCheckGuideText2: pwCheckGuideText2,
        })
    }

    // 이메일 입력상자 = 정규표현식
    const onChangeEmail=(e)=>{
        const {value} = e.target;
        let emailGuideText = '';
        let isDuplicationEmailBtn = false;
        const regexp = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'?]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+)*@[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+)*\.[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+$/g;
        
        if( value==='' ){
            emailGuideText = true; 
            isDuplicationEmailBtn = false;
        }
        else if( regexp.test(value)===false ){
            emailGuideText = true;
            isDuplicationEmailBtn = false;
        }
        else {
            emailGuideText = false;
            isDuplicationEmailBtn = true;
        }
        setState({
            ...state,
            email: value,
            emailGuideText: emailGuideText,
            isDuplicationEmailBtn: isDuplicationEmailBtn
        })
    }

    // 이메일 중복확인
    const onClickDuplicationEmail=(e)=>{
        const value = state.email;
        let emailGuideText = '';
        let isDuplicationEmailCheck = false;
        const regexp = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'?]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+)*@[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+)*\.[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+$/g;
        if( value==='' ){
            emailGuideText = '이메일을 입력해 주세요.'; 
            isDuplicationEmailCheck = false;
            messageModalMethod(emailGuideText);
            setState({
                ...state,
                isDuplicationEmailCheck: isDuplicationEmailCheck
            })
        }
        else if( regexp.test(value)===false ){
            emailGuideText = '이메일 형식으로 입력해 주세요.'; 
            isDuplicationEmailCheck = false;
            messageModalMethod(emailGuideText);
            setState({
                ...state,
                isDuplicationEmailCheck: isDuplicationEmailCheck
            })
        }
        else {
            let formData = new FormData();
            formData.append('userEmail', state.email);

            axios({
                url: 'http://sieun.co.kr/innisfree/innisfree_email_duplication.php',
                method: 'POST',
                data: formData
            })
            .then(( res )=>{
                if(res.status===200 ){
                    if( res.data===-1 ){
                        messageModalMethod('사용 할 수 있는 이메일 입니다.');
                        isDuplicationEmailCheck = true;
                    }
                    else if( res.data===2 ){
                        messageModalMethod('이미 사용중인 이메일 입니다.');
                        isDuplicationEmailCheck = false;
                    }
                    setState({
                        ...state,
                        isDuplicationEmailCheck: isDuplicationEmailCheck
                    })
                }
            })
            .catch(( err )=>{
                console.log( err );
            })
        }
    }

    // 주소검색 API 열기
    const onClickPostcode=(e)=>{
        e.preventDefault();
        dispatch(addressSearch(true));
    }

    // 주소 입력받기
    const onChangeAddress=(e)=>{
        setState({
            ...state,
            isAddress: e.target.value
        });
    }
    // 나머지 주소 입력받기
    const onChangeRemainingAddress=(e)=>{
        setState({
            ...state,
            isRemainingAddress: e.target.value
        });
    }

    

    // 개별 체크박스 이벤트
    const onChangeCheckBox=(e)=>{
        let allAgree = state.allAgree;
        if(e.target.checked===true){  
            if( e.target.value==='[선택] 개인정보 수집 및 이용 동의 (마케팅)' ){ 
                if( allAgree.includes('[선택] 온라인 사이트 문자 수신 동의')===false && allAgree.includes('[선택] 뷰티포인트 문자 수신 동의')===false ){   
                    allAgree = [ ...allAgree, e.target.value, '[선택] 온라인 사이트 문자 수신 동의', '[선택] 뷰티포인트 문자 수신 동의']; 
                }
                else if( allAgree.includes('[선택] 온라인 사이트 문자 수신 동의')===true && allAgree.includes('[선택] 뷰티포인트 문자 수신 동의')===false ){  
                    allAgree = [ ...allAgree, e.target.value, '[선택] 뷰티포인트 문자 수신 동의'];                           
                }
                else if( allAgree.includes('[선택] 온라인 사이트 문자 수신 동의')===false && allAgree.includes('[선택] 뷰티포인트 문자 수신 동의')===true ){     
                    allAgree = [ ...allAgree, e.target.value, '[선택] 온라인 사이트 문자 수신 동의'];                                
                }
            }
            else if( e.target.value==='[선택] 온라인 사이트 문자 수신 동의' ){ 
                if( allAgree.includes('[선택] 뷰티포인트 문자 수신 동의')===true ){  
                    allAgree = [ ...allAgree, e.target.value, '[선택] 개인정보 수집 및 이용 동의 (마케팅)'];  
                }
                else {
                    allAgree = [ ...allAgree, e.target.value];
                }
            }
            else if( e.target.value==='[선택] 뷰티포인트 문자 수신 동의' ){ 
                if( allAgree.includes('[선택] 온라인 사이트 문자 수신 동의')===true ){  
                    allAgree = [ ...allAgree, e.target.value, '[선택] 개인정보 수집 및 이용 동의 (마케팅)']; 
                }
                else {
                    allAgree = [ ...allAgree, e.target.value];
                }
            }
            else {
                allAgree = [...allAgree, e.target.value]
            }
        }
        else {   
            let arr =  state.allAgree;
            if( e.target.value==='[선택] 개인정보 수집 및 이용 동의 (마케팅)' ){
                arr = arr.filter((item) => item !== e.target.value ); 
                arr = arr.filter((item) => item !== '[선택] 온라인 사이트 문자 수신 동의' );
                arr = arr.filter((item) => item !== '[선택] 뷰티포인트 문자 수신 동의' );
                allAgree = arr;
            }
            else if( e.target.value==='[선택] 온라인 사이트 문자 수신 동의' ){
                arr = arr.filter((item) => item !== e.target.value ); 
                arr = arr.filter((item) => item !== '[선택] 개인정보 수집 및 이용 동의 (마케팅)' );
                allAgree = arr; 
            }
            else if( e.target.value==='[선택] 뷰티포인트 문자 수신 동의' ){
                arr = arr.filter((item) => item !== e.target.value ); 
                arr = arr.filter((item) => item !== '[선택] 개인정보 수집 및 이용 동의 (마케팅)' ); 
                allAgree = arr; 
            }
            else {
                allAgree = allAgree.filter((item)=>item !== e.target.value);
            }
        }
        setState({
            ...state,
            allAgree: allAgree
        })
    }

    // 전체 체크박스 이벤트 
    const onChangeAllCheck=(e)=>{
        let allAgree = state.allAgree;
    
        if( e.target.checked===true ){
            allAgree = state.eachAgree;
        }
        else {
            allAgree = [];
            allAgree = '';
        }
        setState({
            ...state,
            allAgree: allAgree,
        })
    }

    // 전송버튼 활성화하기
    React.useEffect(()=>{
        if( state.idGuideText===false && state.pwCheckGuideText2===false){
            setState({
                ...state,
                submitBtn: false
            })
        }
        else {
            setState({
                ...state,
                submitBtn: true
            })
        }
    },[state.idGuideText, state.pwCheckGuideText2]);

    // location 데이터 받기
    React.useEffect(()=>{
        if(location.state.name!==''){
            setState({
                ...state,
                name: location.state.name,
                hp: location.state.hp,
                birthYear: location.state.birthYear,
                birthMonth: location.state.birthMonth,
                birthDate: location.state.birthDate
            });
        }
    },[location.state]);

    // 재검색 : 비동기식 방식
    const onClickReSearch=(e)=>{
        e.preventDefault();
        dispatch(addressSearch(false));
            setTimeout(()=>{
                dispatch(addressSearch(true));
            },100);      
    }

    // console.log(state.id)
    // console.log(state.pw)
    // console.log(state.name)
    // console.log(state.hp)
    // console.log(state.email)
    // console.log(state)

    // REST API 폼데이터 전송
    const onsubmitForm=(e)=>{
        e.preventDefault();
        let cnt = 0;
        state.allAgree.map((item)=>{
            if(item.includes('필수')){
                cnt++;
            }
        });

        if( state.id===''){
            messageModalMethod('아이디를 입력해 주세요.');
        }
        else if( state.pw==='' ){
            messageModalMethod('비밀번호를 입력해 주세요.');
        }
        else if( state.pwCheck==='' ){
            messageModalMethod('비밀번호를 다시 확인해 주세요.');
        }
        else if( state.email==='' ){
            messageModalMethod('이메일을 다시 확인해 주세요.');
        }
        else if( state.isAddress==='' ){
            messageModalMethod('주소를 확인해 주세요.');
        }
        else if( cnt < 5 ) {
            messageModalMethod('필수항목을 모두 동의해 주세요.');
        }
        else {
            const regExp = /^(\d{3})(\d{3,4})(\d{4})$/g;
            const obj = {
                id: state.id,
                pw: state.pw,
                name: location.state.name,
                hp: location.state.hp.replace(regExp, '$1-$2-$3'),
                address: `${state.isAddress} ${state.isRemainingAddress}`,
                email: state.email,
                birth: `${location.state.birthYear}.${location.state.birthMonth}.${location.state.birthDate}`,
                allAgree: state.allAgree
            }
            okModalMethod('이니스프리 회원가입을 하시겠습니까?');
            dispatch(signUpData(obj));
        }
    }
    const onClickInfo=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isInfoBox: true
        })
    }
    const onClickInfoClose=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isInfoBox: false
        })
    }
    const onClickInfo1=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isInfoBox1: true
        })
    }
    const onClickInfoClose1=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isInfoBox1: false
        })
    }

    return (
        <div id='signup_form'>
            <div className="container">
                <div className="header_box">
                    <h2>정보입력 및 약관동의</h2>
                    <button onClick={onClickIndexBtn}>
                        <img src="./images/signIn/icon_bigClose.png" alt="" />
                    </button>
                </div> 
                <div className="binding_box">
                    <div className="title">
                        <h1>기본정보(필수)</h1>
                        <ul>
                            <li><em>이름</em><h2>{location.state.name}</h2></li>
                            <li><em>휴대폰번호</em><h2>{location.state.hp}</h2></li>
                            <li><em>생년월일</em><h2>{location.state.birthYear}.{location.state.birthMonth}.{location.state.birthDate}</h2></li>
                        </ul>
                    </div>
                </div>
                <div className="content">
                    <form onSubmit={onsubmitForm} >
                        <ul className="form_box">
                            <li>
                                <div className="input_box">
                                    <input 
                                        type="text" 
                                        name='userId'
                                        id='userId'
                                        placeholder='아이디 (영문 또는 숫자 4-12자)'
                                        value={state.id}
                                        onChange={onChangeId}
                                        maxLength={12}
                                        className='input_obj'
                                    />
                                    <div className="duplicationButton_box">
                                        <button 
                                            disabled={!state.isDuplicationIdBtn}
                                            className={`duplication_btn${state.isDuplicationIdBtn ? '' : ' off'}`}
                                            onClick={onClickDuplicationId} 
                                        >중복확인</button>
                                    </div>
                                </div>
                                <div className="hide_text_box">
                                    <p className={`hide_text ${state.idGuideText===null ? '' : state.idGuideText===true ? 'red' : 'green'}`}>4자이상 12자 이하의 영문과 숫자(공백제외)만 입력해 주세요.</p>
                                </div>
                            </li>
                            <li>
                                <div className="input_box">
                                    <input 
                                        type="password" 
                                        name='userPw'
                                        id='userPw'
                                        placeholder='비밀번호 (영문 소문자, 숫자, 특수문자 조합 8-16자)'
                                        value={state.pw}
                                        maxLength={16}
                                        onChange={onChangePw}
                                    />
                                </div>
                                <div className="hide_text_box">
                                    <p className={`hide_text ${state.pwGuideText1===null ? '' : state.pwGuideText1===true ? 'red' : 'green'}`}>8자 이상 16자 이하로 입력해 주세요.</p>
                                    <p className={`hide_text ${state.pwGuideText2===null ? '' : state.pwGuideText2===true ? 'red' : 'green'}`}>영문(소문자), 숫자, 특수문자(공백제외) 중 최소 2가지 이상조합</p>
                                    <p className={`hide_text ${state.pwGuideText3===null ? '' : state.pwGuideText3===true ? 'red' : 'green'}`}>동일한 문자 4자리 이상 입력은 불가합니다.</p>
                                    <p className={`hide_text ${state.pwGuideText4===null ? '' : state.pwGuideText4===true ? 'red' : 'green'}`}>사용 가능한 비밀번호 입니다.(보통)</p>
                                    <p className={`hide_text ${state.pwGuideText5===null ? '' : state.pwGuideText5===true ? 'red' : 'green'}`}>사용 가능한 비밀번호 입니다.(안전)</p>
                                </div>
                            </li>
                            <li>
                                <div className="input_box">
                                    <input 
                                        type="password" 
                                        name='userPwCheck'
                                        id='userPwCheck'
                                        placeholder='비밀번호 확인'
                                        value={state.pwCheck}
                                        maxLength={16}
                                        onChange={onChangePwCheck}
                                    />
                                </div>
                                <div className="hide_text_box">
                                    <p className={`hide_text ${state.pwCheckGuideText1===null ? '' : state.pwCheckGuideText1===true ? 'red' : 'green'}`}>비밀번호를 한번 더 입력해 주세요.</p>
                                    <p className={`hide_text ${state.pwCheckGuideText2===null ? '' : state.pwCheckGuideText2===true ? 'red' : 'green'}`}>동일한 비밀번호를 입력해 주세요.</p>
                                </div>
                            </li>
                            <li>
                                <div className="input_box">
                                    <input 
                                        type="text" 
                                        name='userEmail'
                                        id='userEmail'
                                        placeholder='이메일을 입력해주세요'
                                        value={state.email}
                                        onChange={onChangeEmail}
                                        className='input_obj'
                                    />
                                    <div className="duplicationButton_box">
                                        <button 
                                            disabled={!state.isDuplicationEmailBtn}
                                            className={`duplication_btn${state.isDuplicationEmailBtn ? '' : ' off'}`}
                                            onClick={onClickDuplicationEmail} 
                                        >중복확인</button>
                                    </div>
                                </div>
                                <div className="hide_text_box">
                                    <p className={`hide_text ${state.emailGuideText===null ? '' : state.emailGuideText===true ? 'red' : 'green'}`}>이메일 형식으로 입력해주세요.</p>
                                </div>
                            </li>
                            <li>
                                {
                                    state.showAddress && (
                                        <div className="input_box">
                                            <input 
                                                type="text" name='userAddress' id='userAddress' placeholder='검색주소'
                                                value={state.isAddress}
                                                onChange={onChangeAddress}
                                                disabled={true}
                                                className='input_obj'
                                            />
                                            <div className="duplicationButton_box">
                                                <button className='duplication_btn fix' onClick={onClickReSearch}>재검색</button>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    !state.showAddress && (
                                        <button onClick={onClickPostcode} className='address' >주소검색</button>
                                    )
                                }
                            </li>
                            {
                                state.showAddress && (
                                <li>
                                    <div className="input_box">
                                        <input 
                                            type="text" name='userAddressSearch' id='userAddressSearch' placeholder='나머지 주소를 입력해주세요'
                                            value={state.isRemainingAddress}
                                            onChange={onChangeRemainingAddress}
                                        />
                                    </div>
                                </li>
                                )
                            }
                            <li>
                                <a href='!#' className="info_box" onClick={onClickInfo}>
                                    <img src="./images/Icon_info.png" alt="" />
                                    <span>비밀번호 입력 시 유의사항</span>
                                </a>
                                {
                                    state.isInfoBox && (
                                        <ul className="info_sub_box">
                                            <li><h2>비밀번호 입력 시 유의사항</h2><button onClick={onClickInfoClose} className='blind'>닫기</button></li>
                                            <li><h3>영어 소문자, 숫자, 특수문자 중 최소 2가지 조합으로 8~16자 까지 생성가능합니다.</h3></li>
                                            <li><h3>공백은 사용할 수 없으며, 특수문자는 다음과 같이 사용가능합니다.</h3><p>`~!@#$%^&*()_+`-=[]{}\|;':",./?`</p></li>
                                            <li><h3>비밀번호는 아이디와 동일하게 사용할 수 없습니다.</h3></li>
                                        </ul>
                                    )
                                }
                            </li>
                            <div className="agree_box">
                                <div className="all_agree_box">
                                    <label htmlFor="beautyAgreeAll">
                                        <input 
                                            type="checkbox" name='beautyAgreeAll' id='beautyAgreeAll' value={'모든 약관 및 정보 수신 동의'}
                                            onChange={onChangeAllCheck}
                                            // checked = {state.allAgree.length === 11 || state.agree.includes('모든 약관 및 정보 수신 동의')}
                                            checked = {state.allAgree.length === 12 }
                                            className={`agree_show${state.agreeBox ? '' : ' on'}`}
                                        />
                                        <h1>모든 약관 및 정보 수신 동의</h1>
                                        <button className='blind show_btn'>버튼</button>
                                    </label>
                                </div>
                                <div className="check_box">
                                    <strong>뷰티포인트 통합회원 약관</strong>
                                    <ul>
                                        <li>
                                            <label htmlFor="beautyAgree1">
                                                <input 
                                                    type="checkbox" name='beautyAgree' id='beautyAgree1' value={'[필수] 뷰티포인트 서비스 이용 약관'}
                                                    onChange = {onChangeCheckBox}
                                                    checked = {state.allAgree.includes('[필수] 뷰티포인트 서비스 이용 약관')}
                                                />
                                                <span>[필수] 뷰티포인트 서비스 이용 약관</span>
                                                <button className='blind'>버튼</button>
                                            </label>
                                        </li>
                                        <li>
                                            <label htmlFor="beautyAgree2">
                                                <input 
                                                    type="checkbox" name='beautyAgree' id='beautyAgree2' value={'[필수] 개인정보 이용 및 수집에 대한 동의'}
                                                    onChange = {onChangeCheckBox}
                                                    checked = {state.allAgree.includes('[필수] 개인정보 이용 및 수집에 대한 동의')}
                                                />
                                                <span>[필수] 개인정보 이용 및 수집에 대한 동의</span>
                                                <button className='blind'>버튼</button>
                                            </label>
                                        </li>
                                        <li>
                                            <label htmlFor="beautyAgree3">
                                                <input 
                                                    type="checkbox" name='beautyAgree' id='beautyAgree3' value={'[필수] 개인정보 제3자 제공 동의 (이니스프리)'}
                                                    onChange = {onChangeCheckBox}
                                                    checked = {state.allAgree.includes('[필수] 개인정보 제3자 제공 동의 (이니스프리)')}
                                                />
                                                <span>[필수] 개인정보 제3자 제공 동의 (이니스프리)</span>
                                                <button className='blind'>버튼</button>
                                            </label>
                                        </li>
                                        <li>
                                            <label htmlFor="beautyAgree4">
                                                <input 
                                                    type="checkbox" name='beautyAgree' id='beautyAgree4' value={'[선택] 개인정보 제 3자 제공 동의'}
                                                    onChange = {onChangeCheckBox}
                                                    checked = {state.allAgree.includes('[선택] 개인정보 제 3자 제공 동의')}
                                                />
                                                <span>[선택] 개인정보 제 3자 제공 동의</span>
                                                <button className='blind'>버튼</button>
                                            </label>
                                            <p>*외부 컨텐츠 마케팅 활용</p>
                                        </li>
                                        <li>
                                            <label htmlFor="beautyAgree5">
                                                <input 
                                                    type="checkbox" name='beautyAgree' id='beautyAgree5' value={'[선택] 국외 이전 동의'}
                                                    onChange = {onChangeCheckBox}
                                                    checked = {state.allAgree.includes('[선택] 국외 이전 동의')}
                                                />
                                                <span>[선택] 국외 이전 동의</span>
                                                <button className='blind'>버튼</button>
                                            </label>
                                        </li>
                                    </ul>
                                    <strong>뷰티포인트 광고성 정보 수신 동의</strong>
                                    <ul>
                                        <li>
                                            <label htmlFor="beautyAgree6">
                                                <input 
                                                    type="checkbox" name='beautyAgree' id='beautyAgree6' value={'[선택] 개인정보 수집 및 이용 동의 (마케팅)'}
                                                    onChange = {onChangeCheckBox}
                                                    checked = {state.allAgree.includes('[선택] 개인정보 수집 및 이용 동의 (마케팅)')}
                                                />
                                                <span>[선택] 개인정보 수집 및 이용 동의 (마케팅)</span>
                                                <button className='blind'>버튼</button>
                                            </label>
                                            <p>*개인정보 수집 및 이용(마케팅)에 동의 하셔야 문자 수신 동의가 가능합니다.</p>
                                        </li>
                                        <li>
                                            <label htmlFor="beautyAgree7">
                                                <input 
                                                    type="checkbox" name='beautyAgree' id='beautyAgree7' value={'[선택] 뷰티포인트 문자 수신 동의'}
                                                    onChange = {onChangeCheckBox}
                                                    checked = {state.allAgree.includes('[선택] 뷰티포인트 문자 수신 동의')}
                                                    className='each_select_non'
                                                />
                                                <span>[선택] 뷰티포인트 문자 수신 동의</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label htmlFor="beautyAgree8">
                                                <input 
                                                    type="checkbox" name='beautyAgree' id='beautyAgree8' value={'[선택] 온라인 사이트 문자 수신 동의'}
                                                    onChange = {onChangeCheckBox}
                                                    checked = {state.allAgree.includes('[선택] 온라인 사이트 문자 수신 동의')}
                                                    className='each_select_non'
                                                />
                                                <span>[선택] 온라인 사이트 문자 수신 동의</span>
                                            </label>
                                        </li>
                                        <li className='info_text'>
                                            <a href="!#">
                                                <img src="./images/Icon_info.png" alt="" />
                                                <h3>개인정보 처리 위탁에 대한 안내</h3>
                                            </a>
                                        </li>
                                    </ul>
                                    <strong>이니스프리 회원 약관</strong>
                                    <ul>
                                        <li>
                                            <label htmlFor="beautyAgree9">
                                                <input 
                                                    type="checkbox" name='beautyAgree' id='beautyAgree9' value={'[필수] 이니스프리 서비스 이용약관'}
                                                    onChange = {onChangeCheckBox}
                                                    checked = {state.allAgree.includes('[필수] 이니스프리 서비스 이용약관')}
                                                />
                                                <span>[필수] 이니스프리 서비스 이용약관</span>
                                                <button className='blind'>버튼</button>
                                            </label>
                                        </li>
                                        <li>
                                            <label htmlFor="beautyAgree10">
                                                <input 
                                                    type="checkbox" name='beautyAgree' id='beautyAgree10' value={'[필수] 개인정보 수집 및 이용 동의 (이니스프리)'}
                                                    onChange = {onChangeCheckBox}
                                                    checked = {state.allAgree.includes('[필수] 개인정보 수집 및 이용 동의 (이니스프리)')}
                                                />
                                                <span>[필수] 개인정보 수집 및 이용 동의 (이니스프리)</span>
                                                <button className='blind'>버튼</button>
                                            </label>
                                        </li>
                                    </ul>
                                    <strong>이니스프리 광고성 정보 수신 동의</strong>
                                    <ul>
                                        <li>
                                            <label htmlFor="beautyAgree11">
                                                <input 
                                                    type="checkbox" name='beautyAgree' id='beautyAgree11' value={'[선택] 개인정보 수집 및 이용동의 (마케팅)(이니스프리)'}
                                                    onChange = {onChangeCheckBox}
                                                    checked = {state.allAgree.includes('[선택] 개인정보 수집 및 이용동의 (마케팅)(이니스프리)')}
                                                />
                                                <span>[선택] 개인정보 수집 및 이용동의 (마케팅)(이니스프리)</span>
                                                <button className='blind'>버튼</button>
                                            </label>
                                            <p>*개인정보 수집 및 이용(마케팅)에 동의 하셔야 문자 수신 동의가 가능합니다.</p>
                                        </li>
                                        <li>
                                            <label htmlFor="beautyAgree12">
                                                <input 
                                                    type="checkbox" name='beautyAgree' id='beautyAgree12' value={'[선택] 이니스프리  문자 수신 동의'}
                                                    onChange = {onChangeCheckBox}
                                                    checked = {state.allAgree.includes('[선택] 이니스프리  문자 수신 동의')}
                                                />
                                                <span>[선택] 이니스프리  문자 수신 동의</span>
                                            </label>
                                            <p>*외부 컨텐츠 마케팅 활용</p>
                                        </li>
                                        <li className='info_text'>
                                            <a href="!#" onClick={onClickInfo1}>
                                                <img src="./images/Icon_info.png" alt="" />
                                                <h3>개인정보 처리 위탁에 대한 안내</h3>
                                            </a>
                                            {
                                                state.isInfoBox1 && (
                                                <ul className="info_sub_box">
                                                    <li><h2>개인정보 처리 위탁에 대한 안내</h2><button onClick={onClickInfoClose1} className='blind'>버튼</button></li>
                                                    <li><h3>이니스프리는 서비스 향상 및 원활한 전산 처리 등을 위하여 이용자의 개인정보 관리를 외부 전문 업체에 위탁하고 있습니다.</h3></li>
                                                    <li><h3>이니프스리의 업무를 위탁 받는 자 및 업무의 내용은 이니스프리 홈페이지 개인정보처리 방침에서 확인하실 수 있습니다.</h3></li>
                                                </ul>
                                                )
                                            }
                                        </li>
                                    </ul>
                                </div> 
                            </div>
                            <div className='button_box'>
                                <button 
                                    type='submit' 
                                    disabled={state.submitBtn}
                                    className={state.submitBtn===true ? '' : 'on'}
                                    >
                                    <span>동의하고 가입</span>
                                </button>
                            </div>
                            <li><em>가입필수 정보 및 약관을 모두 확인해주세요.</em></li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
    );
};

