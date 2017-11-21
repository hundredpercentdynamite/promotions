import {Select} from "./filter/Select";
import {Switch} from "react-router-dom";
// import {PromoPage} from "./PromoPage";
import styled from "styled-components";
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

const PromoContainer = styled.div`
    background-color: #fcfcfc;
`;

const ItemsContainer = styled.div`
    padding: 30px 25px 50px 25px;
    text-align: center;
    & div {
        overflow: hidden;
        margin-bottom: 20px;
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

const Label = styled.span`
    padding-top: 6px;
    padding-bottom: 4px;
    color: #6a6a6a;
    @media screen and (max-width: 900px) {
        font-size: 15px;
    }
    @media screen and (max-width: 480px) {
        margin-top: 20px;
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
    padding: 0 15px;
    border-bottom: 1px solid #e4e4e4;
    @media screen and (max-width: 480px) {
        flex-direction: column;
    }
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
        margin-top: 10px;
        font-size: 15px;
        &:first-child {
           margin-top: 0;
        }
    }
    @media screen and (max-width: 480px) {
        &:first-child {
           margin-top: 0;
        }
    }
`;

//PromoPage ----------------------------
const PromPageContainer = ItemsContainer.extend`
    text-align: left;
    & div {
        overflow: auto;
        margin-bottom: 0;
    }
`;

const DescriptionContainer = styled.div`
    padding: 50px 130px 95px 130px;
    border-bottom: 1px solid #e4e4e4;
    @media screen and (max-width: 768px) {
        padding-left: 0;
        padding-right: 0;
    }
`;

const Back = PromoHeading.extend`
    padding-left: 50px;
    color: #000;
    background: url("./img/back.svg") no-repeat left;
    background-size: 25px;
`;

const Heading = styled.h2`
    margin-bottom: 30px;
    font-size: 25px;
    font-weight: 400;
`;

const Parag = styled.p`
    font-size: 16px;
    color: #4a4a4a;
`;

const Description = Parag.extend`
    margin-bottom: 70px;
`;

const Include = Parag.extend`
    margin-bottom: 65px;
    font-size: 22px;
    font-weight: 300;
    color: #5e0e8a;
`;
//------------------------------------------

const promotions = [
    {
        url: "prom_darphin1",
        name: "darphin",
        imgUrl: "./img/darphine.png",
        heading: "Окунитесь в атмосферу прованса! gift: true",
        description: "Изысканная мягкость средств ухода с экстрактом грейпфрута и маслом лаванды дарит коже интенсивное увлажнение, питание, защиту и гладкость.",
        include: "гель для душа 250мл, крем для рук и ногтей 75мл, молочко для тела 75мл.",
        effect: "Благодаря своей лёгкой текстуре молочко быстро впитывается и не оставляет следов. Прекрасно увлажняет, тонизирует и освежает кожу, делает её мягкой и гладкой.",
        gift: true
    },
    {
        url: "prom_orthia2",
        name: "orthia",
        imgUrl: "./img/orthia.png",
        heading: "SMASHBOX DRAWN IN. DECKED OUT. gift: true",
        description: "Две полноразмерные палетки для глаз Cover Shot (Ablaze, Sultry) с семью яркими оттенками теней и палетка для стробинга Spotlight (Pearl) travel-формата для создания сияющего макияжа в любой ситуации.",
        include: "Shadow + Highlight",
        effect: "Срок годности указан на товаре. Мы поставляем товар с надлежащим сроком годности",
        gift: true
    },
    {
        url: "prom_clinique",
        name: "clinique",
        imgUrl: "./img/clinique.png",
        heading: "Окунитесь в атмосферу прованса!",
        description: "Изысканная мягкость средств ухода с экстрактом грейпфрута и маслом лаванды дарит коже интенсивное увлажнение, питание, защиту и гладкость.",
        include: "гель для душа 250мл, крем для рук и ногтей 75мл, молочко для тела 75мл.",
        effect: "Благодаря своей лёгкой текстуре молочко быстро впитывается и не оставляет следов. Прекрасно увлажняет, тонизирует и освежает кожу, делает её мягкой и гладкой."
    },
    {
        url: "prom_darphin",
        name: "darphin",
        imgUrl: "./img/darphine.png",
        heading: "Окунитесь в атмосферу прованса!",
        description: "Изысканная мягкость средств ухода с экстрактом грейпфрута и маслом лаванды дарит коже интенсивное увлажнение, питание, защиту и гладкость.",
        include: "гель для душа 250мл, крем для рук и ногтей 75мл, молочко для тела 75мл.",
        effect: "Благодаря своей лёгкой текстуре молочко быстро впитывается и не оставляет следов. Прекрасно увлажняет, тонизирует и освежает кожу, делает её мягкой и гладкой."
    },
    {
        url: "prom_orthia3",
        name: "orthia",
        imgUrl: "./img/orthia.png",
        heading: "Окунитесь в атмосферу прованса! gift: true",
        description: "Изысканная мягкость средств ухода с экстрактом грейпфрута и маслом лаванды дарит коже интенсивное увлажнение, питание, защиту и гладкость.",
        include: "гель для душа 250мл, крем для рук и ногтей 75мл, молочко для тела 75мл.",
        effect: "Благодаря своей лёгкой текстуре молочко быстро впитывается и не оставляет следов. Прекрасно увлажняет, тонизирует и освежает кожу, делает её мягкой и гладкой.",
        gift: true
    },
    {
        url: "prom_clinique",
        name: "clinique",
        imgUrl: "./img/clinique.png",
        heading: "Окунитесь в атмосферу прованса!",
        description: "Изысканная мягкость средств ухода с экстрактом грейпфрута и маслом лаванды дарит коже интенсивное увлажнение, питание, защиту и гладкость.",
        include: "гель для душа 250мл, крем для рук и ногтей 75мл, молочко для тела 75мл.",
        effect: "Благодаря своей лёгкой текстуре молочко быстро впитывается и не оставляет следов. Прекрасно увлажняет, тонизирует и освежает кожу, делает её мягкой и гладкой."
    },
    {
        url: "prom_client1",
        name: "darphin",
        imgUrl: "./img/darphine.png",
        heading: "clientDay: true",
        clientDay: true
    },
    {
        url: "prom_orthia",
        name: "orthia",
        imgUrl: "./img/orthia.png"
    },
    {
        url: "prom_clinique",
        name: "clinique",
        imgUrl: "./img/clinique.png"
    },
    {
        url: "prom_darphin",
        name: "darphin",
        imgUrl: "./img/darphine.png"
    },
    {
        url: "prom_darphin",
        name: "darphin",
        imgUrl: "./img/darphine.png"
    },
    {
        url: "prom_client2",
        name: "orthia",
        imgUrl: "./img/orthia.png",
        heading: "clientDay: true",
        clientDay: true
    },
    {
        url: "prom_client3",
        name: "clinique",
        imgUrl: "./img/clinique.png",
        heading: "clientDay: true",
        clientDay: true
    },
    {
        url: "prom_darphin",
        name: "darphin",
        imgUrl: "./img/darphine.png"
    }
];

const selectData1 = [
    {code: 1, name: 'Все бренды', selected: true},
    {code: 2, name: 'Adidas', selected: false},
    {code: 3, name: 'Dior', selected: false},
    {code: 4, name: 'Guerlan', selected: false}
];
const selectData2 = [
    {code: 1, name: 'В интернет-магазине', selected: true},
    {code: 2, name: 'В розничной сети', selected: false},
];

let filteredContent = promotions;

const Promotion = ({url, name, imgUrl}) => (
    <div>
        <Link to={`/promotions/${url}`}>
            <Banner src={imgUrl} alt={name}/>
        </Link>
    </div>
);


const SortRadio = ({clickHandler, isRadioActive, content}) => (
    <FilterButton onClick={clickHandler} isRadioActive={isRadioActive}>{content}</FilterButton>
);

class Sorting extends React.Component {
    constructor(props) {
        super(props);
        this.updateState = props.updateState;
        this.selectPromoClick = this.selectPromoClick.bind(this);
        this.selectAllPromo = this.selectAllPromo.bind(this);
        this.selectWithGift = this.selectWithGift.bind(this);
        this.selectClientDays = this.selectClientDays.bind(this);
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
        filteredContent = promotions;
    }

    selectWithGift() {
        this.selectPromoClick('withGift');
        filteredContent = promotions.filter(function(element) {
            return (element.gift === true)
        });
    }

    selectClientDays() {
        this.selectPromoClick("clientDays");
        filteredContent = promotions.filter(function(element) {
            return (element.clientDay === true)
        });
    }


    render() {
        const {allPromos, withGift, clientDays} = this.props;

        return (
            <FilterFlexContainer>
                <TogglesFlexContainer>
                    <SortRadio clickHandler={this.selectAllPromo} isRadioActive={allPromos} content="Все акции"/>
                    <SortRadio clickHandler={this.selectWithGift} isRadioActive={withGift}
                               content="Подарок с покупкой"/>
                    <SortRadio clickHandler={this.selectClientDays} isRadioActive={clientDays}
                               content="Клиентские дни"/>
                </TogglesFlexContainer>

                <TogglesFlexContainer>
                    <Label>Сортировка:</Label>
                    <Select items={selectData1}/>
                    <Select items={selectData2}/>
                </TogglesFlexContainer>
            </FilterFlexContainer>
        )
    }
}


class PromoHome extends React.Component {
    render() {
        const {updateState, allPromos, withGift, clientDays} = this.props;
        const promotionsHtml = filteredContent.map((promo, i) => <Promotion key={i} url={promo.url} name={promo.name}
                                                                       imgUrl={promo.imgUrl}/>);
        return (
            <div>
                <HeadingFlexContainer>
                    <PromoHeading>
                        Акции
                    </PromoHeading>
                    <ItemCount>Найдено {filteredContent.length}</ItemCount>
                </HeadingFlexContainer>
                <Sorting updateState={updateState} allPromos={allPromos} withGift={withGift}
                         clientDays={clientDays}/>
                <ItemsContainer>
                    {promotionsHtml}
                </ItemsContainer>
            </div>
        )
    }
}



const PromoPage = ({imgUrl, name, heading, description, include, effect}) => (

    <div>
        <HeadingFlexContainer>
            <Link to={`/promotions/promotions.html`}><Back>{name}</Back></Link>
        </HeadingFlexContainer>
        <FilterFlexContainer/>
        <PromPageContainer>
            <Banner src={imgUrl} alt={name}/>
            <DescriptionContainer>
                <Heading>{heading}</Heading>
                <Description>{description}</Description>
                <Include>В наборе: {include}</Include>
                <Parag>{effect}</Parag>
            </DescriptionContainer>
        </PromPageContainer>
    </div>
);


export class Promotions extends React.Component {
    constructor() {
        super();

        this.state = {
            allPromos: true,
            withGift: false,
            clientDays: false
        };
        this.updateState = this.updateState.bind(this);
    }

    updateState(obj) {
        this.setState(obj);
    }


    render() {
        const {allPromos, withGift, clientDays} = this.state;

        return (
            <Router>
                <PromoContainer>
                    <Switch>
                        <Route path="/promotions/promotions.html"
                               render={() => <PromoHome updateState={this.updateState}
                                                        allPromos={allPromos}
                                                        withGift={withGift}
                                                        clientDays={clientDays}/>}/>
                        {promotions.map((route, index) => (
                            <Route key={index}
                                   path={`/promotions/${route.url}`}
                                   render={() => <PromoPage {...route}/>}
                            />
                        ))}
                    </Switch>
                </PromoContainer>
            </Router>
        );
    }
}
