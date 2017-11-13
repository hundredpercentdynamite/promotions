import {Sort} from "./filter/selectbox";
import styled from "styled-components";

const PromoContainer = styled.div`
    background-color: #fcfcfc;
    border-bottom: 1px solid #e4e4e4;
`;

const PromoHeading = styled.h2`
    font-size: 24px;
    font-weight: 400;
`;

const ItemCountStyled = styled.span`
    color: #6a6a6a;
`;

const StyledSpan = styled.span`
    padding-top: 6px;
    padding-bottom: 4px;
    color: #6a6a6a;
`;

const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const HeadingFlexContainer = FlexContainer.extend`
    padding: 15px;
    align-items: flex-end;
`;

const SortFlexContainer = FlexContainer.extend`
    padding: 15px;
    padding-bottom: 0;
`;

const SelectBoxContainer = FlexContainer.extend`
    & div {
        flex-shrink: 0;
    }
    @media screen and (max-width: 900px) {
        flex-direction: column;
    }
`;

const SortingRadioButton = styled.div`
    padding: 5px 0;
    margin-right: 20px;
    position: relative;
    bottom: -1px;
    display: inline-block;
    box-sizing: border-box;
    cursor: pointer;
    color: #6a6a6a;
    ${props => props.isRadioActive && 'border-bottom: 1px solid #03b4ee; color: #000;'}
    
    @media screen and (max-width: 900px) {
        margin-top: 10px;
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
            <SortingRadioButton onClick={this.props.onClick}
                                isRadioActive={this.props.isRadioActive}>{this.props.content}</SortingRadioButton>
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

        this.allPromosClick = this.allPromosClick.bind(this);
        this.withGiftClick = this.withGiftClick.bind(this);
        this.clientDaysClick = this.clientDaysClick.bind(this);
    }


    allPromosClick() {
        this.setState(prevState => ({
            allPromos: true,
            withGift: false,
            clientDays: false
        }));
    }

    withGiftClick() {
        this.setState(prevState => ({
            allPromos: false,
            withGift: !prevState.withGift
        }));
    }

    clientDaysClick() {
        this.setState(prevState => ({
            allPromos: false,
            clientDays: !prevState.clientDays
        }));
    }


    render() {
        const {allPromos} = this.state;
        const {withGift} = this.state;
        const {clientDays} = this.state;
        return (
            <SortFlexContainer>
                <SelectBoxContainer>
                    <SortRadio onClick={this.allPromosClick} isRadioActive={allPromos} content="Все акции"/>
                    <SortRadio onClick={this.withGiftClick} isRadioActive={withGift} content="Подарок с покупкой"/>
                    <SortRadio onClick={this.clientDaysClick} isRadioActive={clientDays} content="Клиентские дни"/>
                </SelectBoxContainer>

                <SelectBoxContainer>
                    <StyledSpan>Сортировка:</StyledSpan>
                    <Sort/>
                    <Sort/>
                </SelectBoxContainer>
            </SortFlexContainer>
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
                    <ItemCountStyled>Найдено 13</ItemCountStyled>
                </HeadingFlexContainer>
                <SortingContainer/>
            </PromoContainer>
        );
    }
}
