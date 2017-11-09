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
`;


class SortRadio extends React.Component {
    constructor(props) {
        super(props);
        this.toggleRadio = this.toggleRadio.bind(this);
        this.updateState = this.updateState.bind(this);
        this.state = {
            isRadioActive: !!props.default
        };
    }


    toggleRadio() {
        this.updateState({isRadioActive: !this.state.isRadioActive});
        console.log("isRadioActive sosi", this.state.isRadioActive);
    }

    updateState(obj) {
        this.setState(obj);
    }

    render() {
        return (
            <SortingRadioButton isRadioActive={this.state.isRadioActive}
                                onClick={this.toggleRadio}>{this.props.content}</SortingRadioButton>
        )
    }
}

class SortingContainer extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {isRadioActive} = this.props;
        return (
            <SortFlexContainer>
                <div>
                    <SortRadio isRadioActive={isRadioActive} content="Все акции" default={true}/>
                    <SortRadio isRadioActive={isRadioActive} content="Подарок с покупкой"/>
                    <SortRadio isRadioActive={isRadioActive} content="Клиентские дни"/>
                </div>
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
