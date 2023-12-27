## 프로젝트제작 발표 인사

## 팀원소개, 역할

## 프로세스

## 제작툴 소개

## 리액트 프레임워크 전체 구조
- package.json     
	"dependencies" 리액트 개발에 사용한 의존성 프로그램
    * "@reduxjs/toolkit": "^1.9.7",         : 리덕스 코어 & 툴킷
    * "axios": "^1.5.0",                    : REST API
    * "react": "^18.2.0",                   : 리액트
    * "react-daum-postcode": "^3.1.3",      : 카카오 주소검색 API
    * "react-dom": "^18.2.0",               : 리액트 돔
    * "react-redux": "^8.1.3",              : 리액트 리덕스
    * "react-router-dom": "^6.17.0",        : 리액트 라우터 돔
    * "sass": "^1.66.1"                     : 리액트 사스 
    * "json": "^11.0.0",                    :
    * "swiper": "^11.0.5",                  :
    * "web-vitals": "^2.1.4",               :

- 정적파일(public) 
    * css
    * data (intro | sub)                    : json 파일 (모델 데이터)
    * fonts                                 : 글꼴
    * images
    * js
    * css
    * scss
    * index.html

- 동적파일(src)
    * reducer  : 최상위 상태관리 리덕스 구현
        * address.js                        : 주소 상태관리 
        * addressSearch.js                  : 주소검색 상태관리
        * adminsignIn.js                    : 관리자로그인 상태관리
        * bindingData.js                    :
        * cartReducer.js                    : 장바구니 데이터 상태관리
        * confirmModal.js                   :
        * hpUpdateNumber.js                 : 
        * mainModal.js                      : 메인 모달 상태관리
        * moreViewModal.js                  : 더보기 모달 상태관리
        * messageModal.js                   : 
        * quickMenuViewProduct.js           : 퀵메뉴 모달 상태관리
        * searchModal.js                    : 검색 모달 상태관리
        * shoppingBasketModal.js            : 장바구니 모달 상태관리
        * shoppingModal.js                  : 쇼핑로그 모달 상태관리
        * signIn.js                         : 로그인 상태관리
        * topModal.js                       : 탑모달 상태관리
        * viewProduct.js                    : 쇼핑로그 데이터 상태관리
        * viewProductIsFlag.js              : 쇼핑로그 상태관리

    * wrap                                  : 전체 컨포넌트 폴더
        * main                              : INTRO & MAIN
        * scss                              : 리액트 사스
        * sub                               : SUB
    * index.js
    * WrapComponent.jsx

## 포트폴리오 웹사이트 전체 구조
// 웹사이트 전체 화면 캡쳐
- INTRO & MAIN
- 장바구니
- 상세페이지
- SUB (특가, 이벤트, 베스트, 쇼케이스, 라이브, FOR ME, ABOUT)
- 로그인
- 회원가입
- 공지사항
- 쇼핑로그

## 포트폴리오 웹사이트 디테일 설명
### INTRO
- 탑모달
    * TopModalCom.jsx
    개발구현 : 오늘 하루동안 열리기 않음 (닫기: 만료기한설정)
    기술구현 : 브라우저 저장소 (로컬스토레이지)

- 메인모달
    * MainModal.jsx
    개발구현 : 상점 행사 이미지 띄우고, 닫기 버튼 클릭 시 7일동안 열리지 않음 (닫기 : 만료기한설정)
    기술구현 : 브라우저 저장소 (로컬스토레이지)

- 헤더영역
    * HeaderCom.jsx
    1단 => 홈버튼 : 로고 클릭 시 홈으로 이동하는 라우터 구현
           검색창
           로그인 : 일반회원 로그인 폼으로 이동하는 라우터 구현
           장바구니 : 상세페이지에서 장바구니 상품 목록 보관
           관리자로그인 : 관리자 로그인 폼으로 이동하는 라우터 구현
    2단 => 카테고리
           특가 & 이벤트 & 베스트 & 쇼케이스 & 라이브 & FOR ME : 서브 페이지로 이동하는 라우터 구현
           ABOUT : 서브 페이지로 이동하는 라우터 구현

- 메인
    > main

- 푸터영역
    * FooterCom.jsx
    서비스이용약관
    개인정보처리방침
    영상정보처리기기 운영/관리 방침
    위치기반서비스
    공지사항
    임직원서비스

- 퀵메뉴
    * QuickMenuCom.ksx
    개발구현 :
    기술구현 : 

- 검색창모달
    * SearchModalCom.jsx

- 장바구니모달
    * ShoppingBasketModalCom.jsx
    개발구현 : 장바구니 모달창 클릭 시 장바구니페이지에 저장된 상품 목록 (상품이미지, 상품명, 상품수량, 결제예정금액) 보관
    기술구현 : 리덕스 툴킷 사용, 'INNISFREE_CART_PRODUCT' 로컬스토레이지에 저장

- 쇼핑로그모달
    * ShoppingLogModalCom.jsx
    개발구현 : 상품 클릭 시 상품데이터(이미지, 상품명, 정가, 할인율, 태그1, 태그2) 보관
    기술구현 : 리덕스 툴킷 사용, 'INNISFREE_SHOPPING_LOG_PRODUCT' 로컬스토레이지에 저장

### 메인페이지 소개 및 기술구현
- 상품상세설명
- 상세페이지
    [프론트앤드 & 백앤드] ProductViewCom.jsx
    - 최상위 컴포넌트 안에 있어야 함
    - 상태관리 리덕스 (viewProduct.js)로 관리
    - 구현방법 및 순서
        1. INTRO & 서브(SUB1, SUB3, SUB6) 상품을 클릭하면 쇼핑로그에 저장
        2. 쇼팡로그의 상품 상세내용이 페이지에 보이게 구현 => 바인딩
        3. 상품 수량 선택 조건부 연산자 => 상품의 수량 카운트(state.cnt) = state => cnt=1 => cnt : state.cnt+1
        4. 상품판매가 = Math.round(정가 * (1 - 할인율)) => hap
        5. 총상품금액(state.totalPay) = 상품 수량(state.cnt) * 상품 가격(Number(selector.viewProduct.current.판매가))
        6. 상품 수량 카운트 바구니에 넣기 전 최종 수량과 금액 계산
        7. 상품 수량을 선택하여 장바구니에 넣기    
        8. 장바구니 버튼 클릭
            - 기존 장바구니 내용에 속성 추가
            - 장바구니 목록 로컬스토레이지 저장소에서 가져오기
            - 동일한 상품은 이전의 상품목록에 현재 상품이 있는지 비교하고 결과를 trun & false 로 반환
                => 동일한 상품이 있는 경우 => 장바구니 수량에 입력한 수량만 추가
            -   => 동일한 상품이 없는 경우 => 장바구니에 추가
            - 'INNISFREE_CART_PRODUCT' 로컬스토레이지에 상품정보 저장
        9. React.useEffect() 사용
            - 새로고침해도 'INNISFREE_VIEWPRODUCT' 로컬스토레이지에서 데이터 가져와서 보이게 구현
            - state.cnt (상품수량) 값이 들어오면 총상품금액 저장
            - 'INNISFREE_CART_PRODUCT' 로컬스토레이지에 저장된 데이터가 있으면 해당 데이터를 가져와서 리덕스에 전달
- 장바구니
    [프론트앤드 & 백앤드] CartProduct.jsx
    - 최상위 컴포넌트 안에 있어야 함
    - 상태관리 리덕스 (cartReducer.js)로 관리
    - 구현방법 및 순서
        1. 상품수량 카운트 증감하고 장바구니담기 클릭하면 장바구니에 항목과 상세내용이 추가됨 => QUE 구조로 FIFO
            항목 내용 : 이미지, 제품명, 제품상세설명, 수량, 정가, 할인율 
        2. 새로고침해도 장바구니 항목과 내용 유지 => 'INNISFREE_CART_PRODUCT' 로컬스토레이지 저장 + 리덕스(cartReducer.js) 스토어 저장
        3. 장바구니 페이지
            - 동일한 상품인 경우 이전에 저장된 내용에 상품수량을 합산하여 현재 중복된 상품은 추가되지않도록 구현
            - 상품금액 = 장바구니 상품금액 = (원가 * 수량) + 모든 상품 정가 합산
        4. 헤더영역 카트 아이콘 우측상단 원형 #00BC70 배경에 장바구니에 담긴 상품 카운트 
        5. 장바구니 세부 구현
            - 수량 증감 상태변수 이벤트
            - 주문금액, 배송비 적용
        6. 배송비 무료                   
        7. 장바구니 상품 삭제
            - 우측 X 버튼 클릭 시 장바구니 상품 삭제 구현
            - 체크박스 체크 시 선택한 장바구니 상품 삭제 구현
            - 모든 체크박스 체크 시 장바구니 상품 전체 삭제 구현
        8. 로그인 버튼 클릭 시 로그인 페이지로 이동 (useNavigator)
        ***
        9. 장바구니에 저장된 상품이미지 & 상품명 클릭 시 상세페이지로 이동
            - 이동한 상세페이지에서 상품 수량 추가하면, 추가한 상품 수량만큼한 카운트 증가
        ***


    -----------------------------------------------------------------------------------------------------------------------
    (마켓컬리 메인 예시)
    - 섹션1
        개발구현 : 메인캐리셀배너이미지 우측에서 좌측으로 부드럽게 이동하는 애니메이션 구현
        기술구현 : 다음슬라이드, 이전슬라이드 구현하는 화살버튼 클릭 이벤트 구현
                   터치스와이프, 드래그앤드롭 이벤트 구현
                   태블릿, 모바일에 반응하는 터치스와이프 구현
        MVC패턴구현 : 업데이트 클라이언트가 json 데이터 추가, 삭제, 수정
                     M 배너이미지 추가, 삭제 등 언제든지 반응하는 슬라이드 구현하도록 json 데이터 구현
                     M 슬라이드 갯수에 반응하는 자동화 슬라이드 (슬라이드번호 자동넘버링)
                     V jsx 뷰탬플릿 제작, 반복 재사용 구현
                     C REST API AXIOS 구현, 상태관리, 프롭스 구현
    - 섹션2 ~ 섹션10
        개발구현 : 상품목록 이미지, 제품특징, 제조사, 제조일시, 판매처, 보관방법, 배송, 상품설명, 제품명, 정가, 할인율 상품 진열 구현
        기술구현 : 클릭 시 최근 본 상품 등록
                  클릭 시 상세페이지 구현
                  상세페이지에서 장바구니에 등록하도록 구현
                  상품 목록 페이지네이션 구현
        MVC패턴구현 : 업데이트 클라이언트가 json 데이터 추가, 삭제, 수정
                     M 상품이미지 & 상품정보 (데이터 추가, 수정, 삭제) 상품 목록 구현하도록 json 데이터 구현
                     V jsx 뷰탬플릿 제작, 반복 재사용 구현
                     C REST API AXIOS 구현, 상태관리, 프롭스 구현
    -------------------------------------------------------------------------------------------------------------------------

### 서브페이지 소개 및 기술구현
    - 특가 & 이벤트 & 베스트 & 쇼케이스 & 라이브 & FOR ME의 상품상세설명, 상세페이지, 쇼핑로그, 장바구니                              
    * Sub1Com.jsx : 
    * Sub2Com.jsx : 
    * Sub3Com.jsx : 
    * Sub4Com.jsx : 
    * Sub5Com.jsx : 
    * Sub6Com.jsx : for me 리스트 컴포넌트, MVC패턴, 반응형 즉시 데이터 번경
        개발구현 : 유지보수를 위해서 스와이프 슬라이드 & 쇼핑로그 & 탭메뉴 리스트를 나눠서 컴포넌트로 저장
        기술구현 - 리액트 swiper.js 사용해 스와이프 시 상품 목록 한 칸씩 이동해서 보임 & 이동한만큼 pagenation 색상 채워지는 이벤트 구현
                - 쇼핑로그 컴포넌트, main & 특가 & 베스트 & for me에서 상품 클릭 시 상품데이터 저장
                - React.useState({}) 사용으로 연령대(전체, 10대, 20대, 30대, 40대, 50대) 탭메뉴 클릭 시 보이는 상품 검색 데이터 컴포넌트
        MVC패턴구현 : 업데이트 클라이언트가 json 데이터 추가, 삭제, 수정
                    M 상품 추가, 삭제 등 언제든지 반응하는 슬라이드 구현하도록 json 데이터 구현
                    V jsx 뷰탬플릿 제작, 반복 재사용 구현
                    C REST API AXIOS 구현, 상태관리, 프롭스 구현
        * Sub6ComChild.jsx      
        * Sub6ComChildSwipe.jsx  
        * Sub6ShoppingLogCom.jsx        
        >sub6ComChild : 유지보수를 위해서 하위컴포넌트로 나눔
            * ProductAgeList.jsx                
            * ProductAgeListChild.jsx           
            * ProductAgeListChild2.jsx          
            * ProductAgeListChild3.jsx          
            * ProductAgeListChild4.jsx          
            * ProductAgeListChild5.jsx          
            * ProductAgeListChild6.jsx          
            * ProductAgeListChildSubTab.jsx    
            * ProductList.jsx                   
            * ProductListChild.jsx
    * Sub7Component.jsx : 


### 일반회원관리
    - 회원가입, 로그인 구현 => 회원 목록 구현 => 가입된 회원 보여주기, 로그인, 아이디 & 비밀번호 찾기, 회원정보수정, 회원탈퇴

### 관리자회원관리
    - 관리자회원가입, 관리자로그인 구현 => 회원 목록 구현 => 가입된 회원 보여주기, 로그인, 아이디 & 비밀번호 찾기, 회원정보수정, 회원탈퇴

### 관리자게시판관리
    - 공지사항(글쓰기, 글수정, 글삭제, 글목록)

## 데이터베이스

## 배포 아키텍쳐
    - 깃허브                                         => https 프로토콜(SSL인증서 필요), 리눅스 운영체제, git pages
    - 네트리파이                                     => https 프로토콜(SSL인증서 필요), mode.js 계열 호스팅, 정적 사이트 제공
    - 닷홈                                           => http 프로토콜, 리눅스 운영체제, 아파치 웹서버, PHP, MYSQL
    - Node.js(Express)                               => http 프로토콜, Node.js 자바스크립트 운영체제, Express 서버

## 수정 및 보완

## 유지보수
    - 향후 데이터 업데이트