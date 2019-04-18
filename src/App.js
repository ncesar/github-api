import React, { Component } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Modal from "react-modal";

class App extends Component {
  constructor() {
    super();
    this.state = {
      githubData: [],
      isActive: false,
      githubRepo: []
    };
  }
  componentDidMount() {
    axios
      .get(
        "https://api.github.com/search/repositories?q=language:Java&sort=stars&page=1"
      )
      .then((res) => {
        console.log("res", res);
        this.setState({ githubData: res.data.items });
      });

    Modal.setAppElement("body");
  }

  toggleModal = (user, nomeDoRepo) => {
    axios
      .get("https://api.github.com/repos/" + user + "/" + nomeDoRepo + "/pulls")
      .then((repo) => {
        console.log("repo", repo);
        this.setState({ githubRepo: repo.data });
      });

    this.setState({
      isActive: !this.state.isActive
    });
  };

  render() {
    const { githubData } = this.state;
    const { githubRepo } = this.state;
    return (
      <div className="container">
        <Navbar />
        <div className="row">
          {githubData.map((name, index) => (
            <div className="col-md-12" key={name.id}>
              <img src={name.owner.avatar_url} alt="Imagem do projeto" />
              <h1>
                Projeto:&nbsp;
                {name.name}
              </h1>
              <h1>
                Autor:&nbsp;
                {name.owner.login}
              </h1>
              <h1>
                Descrição:&nbsp;
                {name.description}
              </h1>
              <h1>
                Link:&nbsp;
                <a href={name.homepage}>{name.homepage}</a>
              </h1>
              <h1>
                Stars:&nbsp;
                {name.stargazers_count}
              </h1>
              <button
                onClick={this.toggleModal.bind(
                  this,
                  name.owner.login,
                  name.name
                )}
              >
                Open pull request for this repository
              </button>
              <Modal
                isOpen={this.state.isActive}
                onRequestClose={this.toggleModal}
              >
                {githubRepo.map((name, index) => (
                  <div key={index}>{name.title}</div>
                ))}
              </Modal>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
