import styled from "styled-components";
import {selectData1} from "./Promotions";


export const Overlay = styled.div`
    position: fixed;
    z-index: 50;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
`;

export const Container = styled.div`
    position: relative;
    margin-left: 20px;
    @media screen and (max-width: 900px) {
        margin-left: 0;
    }
    
    @media screen and (max-width: 480px) {
        width: 200px;
    }

    @media screen and (max-width: 380px) {
        width: 100%;
    }
`;

export const Box = styled.div`
    position: relative;
    bottom: -1px;
    margin-left: 0;
    padding: 5px 0;   
    width: 180px;
    height: 19px;
    border-bottom: 1px solid #03b4ee;
    user-select: none;
    cursor: pointer;
    &::after {
        position: absolute;
        top: 5px;
        right: 5px;
        content: "";
        display: block;
        width: 7px;
        height: 7px;
        border-bottom: 1px solid #6a6a6a;
        border-right: 1px solid #6a6a6a;
        transform: rotate(45deg);
        transition: all 0.5 ease-out;
        ${props => props.showList && 'border-top: 1px solid #6a6a6a;' +
                                     'border-left: 1px solid #6a6a6a;' +
                                     'border-bottom: none;' +
                                     'border-right: none;' +
                                     'top: 10px'
        }
    }
    
    @media screen and (max-width: 900px) {
        margin-left: 0;
        margin-bottom: 10px;
        font-size: 15px;
        width: 250px;
    }
    
    @media screen and (max-width: 480px) {
        width: 200px;
    }
    
    @media screen and (max-width: 380px) {
        width: 100%;
    }
    
`;

const List = styled.ul`
    padding: 10px 10px 15px 10px;
    position: absolute;
    top: 31px;
    box-sizing: border-box;
    background-color: #fcfcfc;
    box-shadow: 0 5px 10px rgba(0,0,0,0.5);
    width: 100%;
    z-index: 100;
    @media screen and (max-width: 900px) {
        top: 31px;    
    }
    @media screen and (max-width: 480px) {
        top: 31px;    
    }
`;

const Item = styled.li`
    padding: 5px 0;
    cursor: pointer;
    &:hover {
        color: #cd097d;
    }
`;

// Компонент сортировки в виде select box
export class Select extends React.Component {

    constructor(props) {
        super(props);
        const currentItem = props.items.filter(item => item.selected);
        this.state = {
            showList: false,
            currentItem: `${currentItem[0].name}`
        };

        this.listToggle = this.listToggle.bind(this);
        this.clickItem = this.clickItem.bind(this);
    }


    listToggle() {
        this.setState({
            showList: !this.state.showList
        });
        this.div.classList.toggle('active');
    }

    clickItem(event, item) {
        this.setState({
            currentItem: `${item}`,
            showList: false
        });
        this.div.classList.remove('active');
        if (item === "В интернет-магазине") {
            this.props.subjectPromo.next({data: {location: "online", currentPage: 1}});
        } else if (item === "В розничной сети") {
            this.props.subjectPromo.next({data: {location: "offline", currentPage: 1}});
        }
    }

    render() {
        const {showList, currentItem} = this.state;
        const {items} = this.props;
        const options = items.map((item, i) => <Item key={i}
                                                     data-code={item.code}
                                                     data-name={item.name}
                                                     onClick={() => this.clickItem(event, `${item.name}`)}>
                                                     {item.name}
                                                  </Item>);
        return (
            <Container>
                <Box onClick={this.listToggle} showList={showList}>
                    <div className="current-name" ref={div => this.div = div}>
                        {currentItem}
                    </div>
                </Box>
                {showList && <List className="animated fadeInUp">{options}</List>}
                {showList && <Overlay onClick={this.listToggle}/>}
            </Container>
        );
    }
}
