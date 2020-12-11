import { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state= {
        items: [],
        category1: [],
        category2: [],
        category3: [],
        category4: []
    }
  }

  componentDidMount() {
    console.log("componentDidMount")
    fetch('https://bonsai-hiring.azurewebsites.net/api/document', {
    method: 'GET',
    headers: {
        'Accept':'application/json',
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'bonsai-key': 'ef00736003cb40f5800aaa14ebf16a62'
    }
    }).then(res=> {
        if(!res.ok){
          throw new Error("Response not OK"); 
        }
        return res.json();
      })
      .then((data)=>{    
        console.log(data);
        this.setState({
            items: data.document.pages
        })     
        this.prepareData()  
        }).catch((error) => {
          console.log(error);
        });        
  }

  prepareData() {
    console.log("prepareData")
    let items = this.state.items;
    let _category1 = [];
    let _category2 = [];
    let _category3 = [];
    let _category4 = [];
    items.forEach(item => {
      switch(item.category_id){
        case 1:
          _category1.push(item)
          break;
        case 2:
          _category2.push(item)
          break;
        case 3:
          _category3.push(item)
          break;
        case 4:
          _category4.push(item)
          break;
        default:
          break;
      }
    });
    this.setState({
      category1: _category1,
      category2: _category2,
      category3: _category3,
      category4: _category4
    })
  }  

  onPageClick(id, category){
    console.log(id)
    category.splice(id, 1)
    this.forceUpdate()
  }

  render() {
    console.log("render")
    let rend = (
      <div>
        <div className="categoryLabel">
          <p>Category 1</p>
        </div>
        <div className="category">
        {
        this.state.category1.map((item, id) => 
          {
            let ret;
            ret = (
              <div key={id} className="box">
                <div className= "page" style={{border : "2px solid", borderColor: item.color}} onClick={this.onPageClick.bind(this, id, this.state.category1)}>
                <img src={item.link} className="pic" alt="x"></img>
                <p>{id+1}</p>
                </div>
              </div>
              );        
            return ret;
        }
        )}
        </div>
        <div className="categoryLabel">
          <p>Category 2</p>
        </div>
        <div className="category">
        {
          this.state.category2.map((item, id) => 
          {
            let ret;
            ret = (
              <div key={id} className="box">
                <div className= "page" style={{border : "2px solid", borderColor: item.color}} onClick={this.onPageClick.bind(this, id, this.state.category2)}>
                <img src={item.link} className="pic" alt="x"></img>
                <p>{id+1}</p>
                </div>
              </div>
              );        
            return ret;
          }
        )}
        </div>
        <div className="categoryLabel">
          <p>Category 3</p>
        </div>
        <div className="category">
        {
          this.state.category3.map((item, id) => 
          {
            let ret;
            ret = (
              <div key={id} className="box">
                <div className= "page" style={{border : "2px solid", borderColor: item.color}} onClick={this.onPageClick.bind(this, id, this.state.category3)}>
                <img src={item.link} className="pic" alt="x"></img>
                <p>{id+1}</p>
                </div>
              </div>
              );       
            return ret;
          }
        )}
        </div>
        <div className="categoryLabel">
          <p>Category 4</p>
        </div>
        <div className="category">
        {
          this.state.category4.map((item, id) => 
          {
            let ret;
            ret = (
              <div key={id} className="box">
                <div className= "page" style={{border : "2px solid", borderColor: item.color}} onClick={this.onPageClick.bind(this, id, this.state.category4)}>
                  <img src={item.link} className="pic" alt="x"></img>
                  <p>{id+1}</p>
                </div>
              </div>
              );      
            return ret;
          }
        )}
        </div>
      </div>    
    );
 
    return rend
 }
}

export default App;