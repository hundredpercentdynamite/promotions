import Autosuggest from 'react-autosuggest';
import styled from "styled-components";
import {Box, Overlay, Container} from "./Select"


const ListBox = styled.div`
    padding: 10px 10px 15px 10px;
    position: absolute;
    top: 31px;
    max-height: 400px;
    overflow-y: scroll;
    box-sizing: border-box;
    background-color: #fcfcfc;
    box-shadow: 0 5px 10px rgba(0,0,0,0.5);
    width: 100%;
    z-index: 100;
    .react-autosuggest__suggestion--highlighted {
        color: #cd097d;
    }
`;

const Input = styled.input`
    padding-left: 10px;
    margin-bottom: 5px;
    box-sizing: border-box;
    width: 100%;
    height: 28px;
    font-size: 16px;
    color: #000;
    border-radius: 4px;
    border: 1px solid #999;
    transition: all 0.2s ease;
    &:focus {
        border-color: #03b4ee;
    }
    ::-webkit-input-placeholder {color:#6a6a6a; font-size: 14px;}
    ::-moz-placeholder          {color:#6a6a6a; font-size: 14px;}
    :-moz-placeholder           {color:#6a6a6a; font-size: 14px;}
    :-ms-input-placeholder      {color:#6a6a6a; font-size: 14px;}
`;

const Item = styled.div`
    padding: 5px 0;
    cursor: pointer;
    &:hover {
        color: #cd097d;
    }
`;


const brands = [
    {code: 1, name: 'Все бренды', selected: true},
    {code: 2, name: 'Adidas', selected: false},
    {code: 3, name: 'Dior', selected: false},
    {code: 4, name: 'Guerlan', selected: false},
    {code: 5, name: 'Gosh', selected: false},
    {code: 6, name: 'Hask', selected: false},
    {code: 7, name: 'Iceberg', selected: false},
    {code: 8, name: 'Kanebo', selected: false},
    {code: 9, name: 'Mac', selected: false},
    {code: 10, name: 'Orly', selected: false},
    {code: 12, name: 'Adida', selected: false},
    {code: 13, name: 'Dio', selected: false},
    {code: 14, name: 'Guerla', selected: false},
    {code: 15, name: 'Gos', selected: false},
    {code: 16, name: 'Hak', selected: false},
    {code: 17, name: 'Icebrg', selected: false},
    {code: 18, name: 'Kanbo', selected: false},
    {code: 19, name: 'Ma', selected: false},
    {code: 20, name: 'Ory', selected: false},
    {code: 22, name: 'Adas', selected: false},
    {code: 23, name: 'Dr', selected: false},
    {code: 24, name: 'Gulan', selected: false},
    {code: 25, name: 'Gh', selected: false},
    {code: 26, name: 'Hk', selected: false},
    {code: 27, name: 'Icerg', selected: false},
    {code: 28, name: 'Kabo', selected: false},
    {code: 29, name: 'Macfgd', selected: false},
    {code: 30, name: 'Orlydfghj', selected: false},
    {code: 32, name: 'Adibbb', selected: false},
    {code: 33, name: 'Dixc2', selected: false},
    {code: 34, name: 'Guehu', selected: false},
    {code: 35, name: 'Gohssh', selected: false},
    {code: 36, name: 'Hakpoa', selected: false},
    {code: 37, name: 'Icrg', selected: false},
    {code: 38, name: 'Kebo', selected: false},
    {code: 39, name: 'Hac', selected: false},
    {code: 40, name: 'Opcrly', selected: false}
];


export class BrandSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showList: false,
            currentItem: "Все бренды",
            value: "",
            suggestions: brands
        };
        this.listToggle = this.listToggle.bind(this);
        this.renderInputComponent = this.renderInputComponent.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    }

    componentDidMount() {
        console.log("privet", this.props)
    }

    escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    getSuggestions(value) {
        const escapedValue = this.escapeRegexCharacters(value.trim());
        const regex = new RegExp('^' + escapedValue, 'i');


        return brands.filter(brand => regex.test(brand.name));
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    getSuggestionValue(suggestion) {
        return suggestion.name;
    }

    renderSuggestion(suggestion) {
        return (
            <Item>{suggestion.name}</Item>
        );
    }

    renderInputComponent(inputProps) {
        return (
            <div>
                <Input {...inputProps}
                       autoFocus={true}/>
            </div>
        );
    }

    onSuggestionSelected(e, {suggestion}) {
        this.setState({
            currentItem: suggestion.name,
            showList: !this.state.showList
        });
        if (suggestion.name === "Все бренды"){
            this.props.subjectPromo.next({data: {brand: "", currentPage: 1}});
        } else {
            this.props.subjectPromo.next({data: {brand: `${suggestion.name.toLowerCase()}`, currentPage: 1}});
        }
    }

    onChange = (event, { newValue }) => {
        if (newValue === "") {
            this.setState({
                value: "",
                currentItem: `${brands[0].name}`
            })
        } else {
            this.setState({
                value: newValue,
            });
        }
    };

    listToggle() {
        this.setState({
            showList: !this.state.showList,
            value: ""
        });
    }


    render() {
        const { value, suggestions, showList, currentItem } = this.state;
        const inputProps = {
            placeholder: "",
            value,
            onChange: this.onChange
        };

        return(
            <Container>
                <Box onClick={this.listToggle} showList={showList}>
                    {currentItem}
                </Box>
                    {showList && <ListBox className="animated fadeInUp">
                                    <Autosuggest
                                        alwaysRenderSuggestions={true}
                                        focusInputOnSuggestionClick={false}
                                        suggestions={suggestions}
                                        inputProps={inputProps}
                                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                        getSuggestionValue={this.getSuggestionValue}
                                        renderSuggestion={this.renderSuggestion}
                                        renderInputComponent={this.renderInputComponent}
                                        onSuggestionSelected={this.onSuggestionSelected}/>
                                </ListBox>}
                    {showList && <Overlay onClick={this.listToggle}/>}

            </Container>
        )
    }
}