import styled from "styled-components";

const SortBox = styled.div`
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
        font-size: 20px;
        width: 250px;
    }
    
    @media screen and (max-width: 480px) {
        margin-top: 20px;
        font-size: 25px;
        width: 250px;
    }
    
    @media screen and (max-width: 380px) {
        margin-top: 20px;
        font-size: 25px;
        width: 100%;
    }
    
`;

const SortList = styled.ul`
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

const SortListItem = styled.li`
    padding: 5px 0;
    &:hover {
        color: #cd097d;
    }
`;

// Компонент сортировки в виде select box
export class Sort extends React.Component {

    constructor(props) {
        super(props);

        this.sorts = [
            {code: 1, name: 'Все бренды', selected: false},
            {code: 2, name: 'Не все бренды', selected: false},
            {code: 3, name: 'В интернет-магазине', selected: false},
            {code: 4, name: 'Что-то ещё', selected: true}
        ];

        const currentSort = this.sorts.filter(sortItem => sortItem.selected);
        this.state = {
            showSort: false,
            currentSort: {...currentSort[0]}
        }
    }

    sortToggle() {
        this.setState({
            showSort: !this.state.showSort
        });
        this.div.classList.toggle('active');
    }

    clickSortItem(event) {
        this.setState({
            currentSort: {...event.target.dataset},
            showSort: false
        });
        this.div.classList.remove('active');
        //window.utils.sort = event.target.dataset.code;
        //this.props.onChangeSortHandler(event.target.dataset.code);
    }

    render() {
        //let {sorts} = this.props;
        const options = this.sorts.map((sortItem, i) => <SortListItem key={i}
                                                     data-code={sortItem.code}
                                                     data-name={sortItem.name}
                                                     onClick={this.clickSortItem.bind(this)}>
                                                     {sortItem.name}
                                                  </SortListItem>);
        return (
            <SortBox className="sort"
                        onClick={this.sortToggle.bind(this)}
                        showSort={this.state.showSort}>
                <div className="current-name"
                     ref={div => this.div = div}>
                        {this.state.currentSort.name}
                </div>
                {this.state.showSort && <SortList className="options animated fadeInUp">{options}</SortList>}
            </SortBox>
        );
    }
}
