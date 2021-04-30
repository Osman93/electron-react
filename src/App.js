import React from "react";
import axios from "axios";
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = {
    data:[],
    vl:"",
    personel:[]
  }
  componentWillMount(){
      axios.get('http://localhost/SosyalIsler/public/api/yemek')
      .then((res) => {
        console.log(res);
        this.setState({data:res.data});
      })
      .catch((err) => {
        console.log(err);
      })
  }

  postYemek(){
     axios.get('http://localhost/SosyalIsler/public/api/yemekhanePost?kart_id='+this.state.vl)
      .then((res) => {
        console.log(res);
        this.setState({personel:res.data});
      })
      .catch((err) => {
        console.log(err);
      })
  }
  renderData(){
    
        return (
          <div>
            <input value={this.state.vl} autoFocus onChange={(e) => {
              //alert(e.target.value.length);
              if((e.target.value != this.state.vl)){
                this.setState({vl:e.target.value},
                  () => {
                   if(this.state.vl.length == 10){ 

                      this.postYemek();
                      setTimeout(() => {
                          this.setState({
                            vl:"",
                            personel:[]
                          })
                      },3000);
                    }
                });

              }else{
                //alert("burada");
              }
            }} />
            <div>
              {this.state.data.cesit1}
            </div>
            <div>
              {this.state.data.cesit2}
            </div>
            <div>
              {this.state.data.cesit3}
            </div>
            <div>
              {this.state.data.cesit4}
            </div>
            <div>
              {this.state.data.cesit5}
            </div>
          </div>
        );
   
  }
  renderPersonel(){
      return(
        <div>
          <div>
            <b>İsim : </b>{this.state.personel.name}
          </div>
          <div>
            <b>Bakiye : </b>{this.state.personel.AylıkBorc} tl
          </div>
        </div>
      );
  }
  render(){

      return (
        <div className="App">
          <header className="App-header">
            <img src={"https://anayasa.gov.tr/media/5007/anayasa-mahkemesi-logo.png"} className="logo" alt="logo" />
            
          </header>
          {this.renderPersonel()}
          {this.renderData()}

        </div>
      );
  }
}

export default App;
