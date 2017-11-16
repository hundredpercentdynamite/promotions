import styled from "styled-components";

const Box = styled.div`
    position: relative;
    bottom: -1px;
    margin-left: 20px;
    padding: 5px 0;   
    width: 180px;
    // box-sizing: border-box;
    border-bottom: 1px solid #03b4ee;
    user-select: none;
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
        ${props => props.showSort && 'border-top: 1px solid #6a6a6a;' +
                                     'border-left: 1px solid #6a6a6a;' +
                                     'border-bottom: none;' +
                                     'border-right: none;' +
                                     'top: 10px'
        }
    }
    
    @media screen and (max-width: 900px) {
        margin-left: 0;
        margin-top: 10px;
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
    top: 27px;
    box-sizing: border-box;
    background-color: #fcfcfc;
    width: 100%;
    z-index: 100;
    @media screen and (max-width: 900px) {
        top: 34px;    
    }
    @media screen and (max-width: 480px) {
        top: 40px;    
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
            currentItem: {...currentItem[0]}
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

    clickItem(event) {
        this.setState({
            currentItem: {...event.target.dataset},
            showList: false
        });
        this.div.classList.remove('active');
        //window.utils.sort = event.target.dataset.code;
        //this.props.onChangeSortHandler(event.target.dataset.code);
    }

    render() {
        const {showList, currentItem} = this.state;
        const {items} = this.props;
        const options = items.map((item, i) => <Item key={i}
                                                     data-code={item.code}
                                                     data-name={item.name}
                                                     onClick={this.clickItem}>
                                                     {item.name}
                                                  </Item>);
        return (
            <Box onClick={this.listToggle} showList={showList}>
                <div className="current-name" ref={div => this.div = div}>
                    {currentItem.name}
                </div>
                {showList && <List className="animated fadeInUp">{options}</List>}
            </Box>
        );
    }
}
