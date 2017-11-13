import {Sort} from "./filter/selectbox";
import styled from "styled-components";

const PromoContainer = styled.div`
    background-color: #fcfcfc;
    border-bottom: 1px solid #e4e4e4;
`;

const PromoHeading = styled.h2`
    font-size: 24px;
    font-weight: 400;
    @media screen and (max-width: 900px) {
        font-size: 30px;
    }
    @media screen and (max-width: 480px) {
        font-size: 35px;
    }
`;

const ItemCount = styled.span`
    color: #6a6a6a;
    @media screen and (max-width: 900px) {
        font-size: 20px;
    }
    @media screen and (max-width: 480px) {
        font-size: 25px;
    }

`;

const Label = styled.span`
    padding-top: 6px;
    padding-bottom: 4px;
    color: #6a6a6a;
    @media screen and (max-width: 900px) {
        font-size: 20px;
    }
    @media screen and (max-width: 480px) {
        margin-top: 40px;
        font-size: 25px;
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
    padding: 15px;
    padding-bottom: 0;
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
    ${props => props.isRadioActive && 'border-bottom: 1px solid #03b4ee; color: #000;'}
    
    @media screen and (max-width: 900px) {
        margin-top: 10px;
        font-size: 20px;
        &:first-child {
           margin-top: 0;
        }
    }
    @media screen and (max-width: 480px) {
        margin-top: 20px;
        font-size: 25px;
        &:first-child {
           margin-top: 0;
        }
    }
`;


class SortRadio extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <FilterButton onClick={this.props.clickHandler}
                                isRadioActive={this.props.isRadioActive}>{this.props.content}</FilterButton>
        )
    }
}

class SortingContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            allPromos: true,
            withGift: false,
            clientDays: false
        };

        this.selectPromoClick = this.selectPromoClick.bind(this);
        this.selectAllPromo = this.selectAllPromo.bind(this);
        this.selectWithGift = this.selectWithGift.bind(this);
        this.selectClientDays = this.selectClientDays.bind(this);
    }

    selectPromoClick(name) {
        switch (name) {
            case 'allPromo':
                this.setState({
                    allPromos: true,
                    withGift: false,
                    clientDays: false
                });
                break;
            case 'withGift':
                this.setState({
                    allPromos: false,
                    withGift: true,
                    clientDays: false
                });
                break;
            case 'clientDays':
                this.setState({
                    allPromos: false,
                    withGift: false,
                    clientDays: true
                });
                break;
        }
    }

    selectAllPromo() {
        this.selectPromoClick('allPromo')
    }

    selectWithGift() {
        this.selectPromoClick('withGift')
    }

    selectClientDays() {
        this.selectPromoClick('clientDays')
    }

    render() {
        const {allPromos} = this.state;
        const {withGift} = this.state;
        const {clientDays} = this.state;
        return (
            <FilterFlexContainer>
                <TogglesFlexContainer>
                    <SortRadio clickHandler={this.selectAllPromo} isRadioActive={allPromos} content="Все акции"/>
                    <SortRadio clickHandler={this.selectWithGift} isRadioActive={withGift} content="Подарок с покупкой"/>
                    <SortRadio clickHandler={this.selectClientDays} isRadioActive={clientDays} content="Клиентские дни"/>
                </TogglesFlexContainer>

                <TogglesFlexContainer>
                    <Label>Сортировка:</Label>
                    <Sort/>
                    <Sort/>
                </TogglesFlexContainer>
            </FilterFlexContainer>
        )
    }
}


export class Promotions extends React.Component {
    render() {
        return (
            <PromoContainer>
                <HeadingFlexContainer>
                    <PromoHeading>
                        Акции
                    </PromoHeading>
                    <ItemCount>Найдено 13</ItemCount>
                </HeadingFlexContainer>
                <SortingContainer/>
            </PromoContainer>
        );
    }
}
