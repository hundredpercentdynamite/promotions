import {Select} from "./Select";
import styled from "styled-components";
import {BrandSelector} from "./BrandSelector"
import {ajaxHeaders, createStreamUrl} from "../productList/model/user_intent";
import {dataLayerBuilder} from "../dataLayer";

const PromoContainer = styled.div`
    max-width: 1170px;
    background-color: #fcfcfc;
`;

const ItemsContainer = styled.div`
    padding: 30px 25px 50px 25px;
    text-align: center;
    & .promo-item {
        overflow: hidden;
        margin-bottom: 20px;
    }
    @media screen and (max-width: 480px) {
        padding: 30px 0 30px 0;
    }
`;

const Banner = styled.img`
        width: 100%;
`;

const PromoHeading = styled.h2`
    font-size: 24px;
    font-weight: 400;
`;

const ItemCount = styled.span`
    color: #6a6a6a;
    @media screen and (max-width: 900px) {
        font-size: 15px;
    }
`;

const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const HeadingFlexContainer = FlexContainer.extend`
    padding: 15px;
    align-items: baseline;
`;

const FilterFlexContainer = FlexContainer.extend`
    @media screen and (max-width: 480px) {
        background-color: #eee;
        padding: 5px 15px;
        flex-direction: column;
    }
`;

const FilterWrapper = styled.div`
    border-bottom: 1px solid #e4e4e4;
`;

const TogglesFlexContainer = FlexContainer.extend`
    & div {
        flex-shrink: 0;
    }
    @media screen and (max-width: 900px) {
        flex-direction: column;
    }
    @media screen and (max-width: 380px) {
        width: 100%;
    }
`;

const FilterButton = styled.div`
    padding: 5px 0;
    margin-right: 20px;
    position: relative;
    bottom: -1px;
    display: inline-block;
    box-sizing: border-box;
    cursor: pointer;
    color: #6a6a6a;
    user-select: none;
    border-bottom: 1px solid transparent;
    ${props => props.isRadioActive && 'border-bottom-color: #03b4ee; color: #000;'}
    
    @media screen and (max-width: 900px) {
        margin-bottom: 10px;
        font-size: 15px;
    }
`;

const ShowMoreButton = styled.button`
    width: 100%;
    cursor: pointer;
    text-align: center;
    padding: 15px 0;
    position: relative;
    border: 1px solid #dadada;
    border-radius: 2px;
    background-color: #fff;
    transition: all 0.2s ease;
    &:hover {
        border-color: #b2b2b2;
        box-shadow: 0 2px 4px rgba(174, 174, 174, 0.15);
    }
    & .product__more_text {
        font-size: 18px;
        font-weight: 400;
    }
`;

//-мобильный фильтр
const BoxTitleInner = styled.div`
    //padding-left: 17px;
    display: inline-block;
    position: relative;
    &::after {
        position: absolute;
        top: 10px;
        left: 105px;
        content: "";
        display: block;
        width: 7px;
        height: 7px;
        border-bottom: 1px solid #6a6a6a;
        border-right: 1px solid #6a6a6a;
        transform: rotate(45deg);
        transition: all 0.5 ease-out;
        ${props => props.opened && 'border-top: 1px solid #6a6a6a;' +
    'border-left: 1px solid #6a6a6a;' +
    'border-bottom: none;' +
    'border-right: none;' +
    'top: 14px'
        }
    }
    &:active {
        color: #03b4ee;
    }
`;

const BoxTitle = styled.div`
    ${window.innerWidth > 480 ? `display: none;` : `display: block;`}
    padding-left: 15px;
    padding-bottom: 5px;
    text-align: left;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    user-select: none;
    position: relative;
    :hover {
        background-color: #fbfbfb;
    }
    
`;

const ToggleBox = styled.div`
    position: relative;
    z-index: 2;
        padding: 0 15px;
    @media screen and (max-width: 480px) {
        padding: 0;
    }
`;


const subjectPromo$ = new Rx.Subject();


function createPromotionsUrl(data) {
    const {variant, brand, location, currentPage, pageSize} = data;
    const variantParam = R.isEmpty(variant) ? "" : `&variant=${variant}`;
    const brandParam = R.isEmpty(brand) ? "" : `&brand=${brand}`;

    const url = `https://json-server-api.localhost/promotions?_page=${currentPage}&_limit=${pageSize}&location=${location}${variantParam}${brandParam}`;

    console.log('url ===>', url);

    return Rx.Observable.of(url);
}

//Legacy, json model
// const promotions = [
//     {
//         url: "prom_darphin1",
//         name: "darphinNEW_ADIDAS",
//         imgUrl: `${location.origin}${contextPath}/_ui/desktop/theme-responsive/images/promotions/darphine.png`,
//         variant: "gift",
//         brand: "adidas",
//         place: "в розничной сети",
//         gift: true
//     },
//     {
//         url: "prom_orthia1",
//         name: "orthiaNEW",
//         imgUrl: `${location.origin}${contextPath}/_ui/desktop/theme-responsive/images/promotions/orthia.png`,
//         variant: "gift",
//         brand: "adidas",
//         place: "в интернет-магазине",
//         gift: true
//     },
//     {
//         url: "prom_clinique1",
//         name: "cliniqueCLIENT",
//         imgUrl: `${location.origin}${contextPath}/_ui/desktop/theme-responsive/images/promotions/clinique.png`,
//         variant: "client",
//         brand: "dior",
//         place: "в интернет-магазине"
//     },
//     {
//         url: "prom_darphin2",
//         name: "darphinCLIENT",
//         imgUrl: `${location.origin}${contextPath}/_ui/desktop/theme-responsive/images/promotions/darphine.png`,
//         variant: "client",
//         brand: "adidas",
//         place: "в интернет-магазине"
//     },
//     {
//         url: "prom_orthia2",
//         name: "orthiaNEW",
//         imgUrl: `${location.origin}${contextPath}/_ui/desktop/theme-responsive/images/promotions/orthia.png`,
//         variant: "gift",
//         brand: "guerlan",
//         place: "в интернет-магазине",
//         gift: true
//     },
//     {
//         url: "prom_clinique2",
//         name: "cliniqueCLIENT",
//         imgUrl: `${location.origin}${contextPath}/_ui/desktop/theme-responsive/images/promotions/clinique.png`,
//         variant: "client",
//         brand: "guerlan",
//         place: "в интернет-магазине"
//     },
//     {
//         url: "prom_client1",
//         name: "darphinNEW",
//         imgUrl: `${location.origin}${contextPath}/_ui/desktop/theme-responsive/images/promotions/darphine.png`,
//         variant: "gift",
//         brand: "mac",
//         place: "в интернет-магазине"
//     },
//     {
//         url: "prom_orthia3",
//         name: "orthia",
//         imgUrl: `${location.origin}${contextPath}/_ui/desktop/theme-responsive/images/promotions/orthia.png`,
//         brand: "mac",
//         place: "в интернет-магазине"
//     },
//     {
//         url: "prom_clinique3",
//         name: "clinique",
//         imgUrl: `${location.origin}${contextPath}/_ui/desktop/theme-responsive/images/promotions/clinique.png`,
//         brand: "mac",
//         place: "в розничной сети"
//     },
//     {
//         url: "prom_darphin3",
//         name: "darphin",
//         imgUrl: `${location.origin}${contextPath}/_ui/desktop/theme-responsive/images/promotions/darphine.png`,
//         variant: "client",
//         brand: "adidas",
//         place: "в розничной сети"
//     },
//     {
//         url: "prom_darphin4",
//         name: "darphin",
//         imgUrl: `${location.origin}${contextPath}/_ui/desktop/theme-responsive/images/promotions/darphine.png`,
//         brand: "gosh",
//         place: "в розничной сети"
//     },
//     {
//         url: "prom_client2",
//         name: "orthia",
//         imgUrl: `${location.origin}${contextPath}/_ui/desktop/theme-responsive/images/promotions/orthia.png`,
//         brand: "gosh",
//         place: "в розничной сети"
//     },
//     {
//         url: "prom_client3",
//         name: "clinique",
//         imgUrl: `${location.origin}${contextPath}/_ui/desktop/theme-responsive/images/promotions/clinique.png`,
//         brand: "gosh",
//         place: "в розничной сети"
//     },
//     {
//         url: "prom_darphin5",
//         name: "darphin",
//         imgUrl: `${location.origin}${contextPath}/_ui/desktop/theme-responsive/images/promotions/darphine.png`,
//         variant: "client",
//         brand: "adidas",
//         place: "в розничной сети"
//     }
// ];

const selectData2 = [
    {code: 1, name: 'В интернет-магазине', selected: true},
    {code: 2, name: 'В розничной сети', selected: false},
];

const Promotion = ({url, name, imgUrl}) => (
    <div className="promo-item">
        <a href={`${location.origin}${contextPath}/promotionslist/${url}`}>
            <Banner src={imgUrl} alt={name}/>
        </a>
    </div>
);

const SortRadio = ({clickHandler, isRadioActive, content}) => (
    <FilterButton onClick={clickHandler} isRadioActive={isRadioActive}>{content}</FilterButton>
);

class Sorting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: window.innerWidth > 480
        };
        this.updateState = props.updateState;
        this.selectPromoClick = this.selectPromoClick.bind(this);
        this.selectAllPromo = this.selectAllPromo.bind(this);
        this.selectWithGift = this.selectWithGift.bind(this);
        this.selectClientDays = this.selectClientDays.bind(this);
        this.clickBoxTitle = this.clickBoxTitle.bind(this);
    }

    selectPromoClick(name) {
        switch (name) {
            case "allPromo":
                this.updateState({
                    allPromos: true,
                    withGift: false,
                    clientDays: false
                });
                break;
            case "withGift":
                this.updateState({
                    allPromos: false,
                    withGift: true,
                    clientDays: false
                });
                break;
            case "clientDays":
                this.updateState({
                    allPromos: false,
                    withGift: false,
                    clientDays: true
                });
                break;
        }
    }

    selectAllPromo() {
        this.selectPromoClick("allPromo");
        subjectPromo$.next({data: {variant: "", currentPage: 1}});
    }

    selectWithGift() {
        this.selectPromoClick('withGift');
        subjectPromo$.next({data: {variant: "gift", currentPage: 1}});
    }

    selectClientDays() {
        this.selectPromoClick("clientDays");
        subjectPromo$.next({data: {variant: "client", currentPage: 1}});
    }

    clickBoxTitle() {
        this.setState({opened: !this.state.opened})
    }


    render() {
        const {opened} = this.state;
        const {allPromos, withGift, clientDays} = this.props;

        return (
            <FilterWrapper>

                <BoxTitle onClick={this.clickBoxTitle} opened={opened}>
                    <BoxTitleInner opened={opened}>Фильтрация</BoxTitleInner>
                </BoxTitle>
                {opened &&
                <ToggleBox className="animated fadeInUp" default={true}>
                    <FilterFlexContainer>
                        <TogglesFlexContainer>
                            <SortRadio clickHandler={this.selectAllPromo} isRadioActive={allPromos}
                                       content="Все акции"/>
                            <SortRadio clickHandler={this.selectWithGift} isRadioActive={withGift}
                                       content="Подарок с покупкой"/>
                            <SortRadio clickHandler={this.selectClientDays} isRadioActive={clientDays}
                                       content="Клиентские дни"/>
                        </TogglesFlexContainer>

                        <TogglesFlexContainer>
                            <BrandSelector subjectPromo={subjectPromo$}/>
                            <Select subjectPromo={subjectPromo$} items={selectData2}/>
                        </TogglesFlexContainer>
                    </FilterFlexContainer>
                </ToggleBox>}
            </FilterWrapper>
        )
    }
}


export class Promotions extends React.Component {
    constructor() {
        super();

        this.state = {
            promotions: [],
            allPromos: true,
            withGift: false,
            clientDays: false,
            params: {
                variant: "",
                brand: "",
                location: "online",
                currentPage: 1,
                pageSize: 5
            }
        };
        this.updateState = this.updateState.bind(this);
        this.showMore = this.showMore.bind(this);
    }

    updateState(obj) {
        this.setState(obj);
    }

    showMore() {
        subjectPromo$.next({data: {currentPage: this.state.params.currentPage + 1}});
    }

    componentDidMount() {
        console.log("ajax response", Rx.Observable.ajax(ajaxHeaders("https://json-server-api.localhost/promotions?_page=5&_limit=5&place=online")));
        const firstRequest$ = createPromotionsUrl({
            variant: "",
            brand: "",
            location: "online",
            currentPage: 1,
            pageSize: 5
        })
            .flatMap(url => Rx.Observable.ajax(ajaxHeaders(url)))
            .pluck("response")
            .subscribe(promotions => {
                console.log("data from first request", promotions);
                this.setState({promotions});
            });


        subjectPromo$.subscribe(data => {
            const mergedData = {...this.state.params, ...data.data};
            this.setState({params: {...this.state.params, ...data.data}});
            createPromotionsUrl(mergedData)
                .flatMap(url => Rx.Observable.ajax(ajaxHeaders(url)))
                .pluck("response")
                .catch(error => alert('Произошла ошибка при запросе. Пожалуйста, сбросьте фильтр или обновите страницу.'))
                .subscribe(dataFromServer => {
                    console.log("dataFromServer", dataFromServer);
                    if (this.state.params.currentPage === 1) {
                        this.setState({promotions: []})
                    }
                    this.setState({
                        promotions: this.state.promotions.concat(dataFromServer)
                    });
                });
        })
    }


    render() {
        const {promotions, allPromos, withGift, clientDays} = this.state;
        const promotionsHtml = promotions.map((promo, i) => <Promotion key={i} url={promo.url}
                                                                       name={promo.name}
                                                                       imgUrl={promo.imgUrl}
                                                                       subject$={subjectPromo$}
                                                                       getPromoData={this.getPromoData}/>);
        return (
            <PromoContainer>
                <HeadingFlexContainer>
                    <PromoHeading>
                        Акции
                    </PromoHeading>
                    <ItemCount>Найдено: {promotions.length}</ItemCount>
                </HeadingFlexContainer>
                <Sorting updateState={this.updateState} allPromos={allPromos} withGift={withGift}
                         clientDays={clientDays}/>
                <ItemsContainer>
                    {promotionsHtml}

                    <ShowMoreButton onClick={this.showMore}>
                        <div className="product__more_icon"/>
                        <div className="product__more_text">Показать ещё</div>
                    </ShowMoreButton>

                </ItemsContainer>
            </PromoContainer>
        );
    }
}