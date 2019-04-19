import React, { Component } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Modal from "react-modal";
import InfiniteScroll from "react-infinite-scroller";
import ApiItem from "./components/ApiItem";
import ApiComment from "./components/ApiComment";
import ApiTitle from "./components/ApiTitle";
import "./App.scss";
import "./sass/Repositorio.scss";
import "./sass/PullRequest.scss";
import "./styles/Global.css";
import "./styles/Reboot.css";

const api = {
  baseUrl: "https://api.github.com",
  client_id: "a2a58519bc365d25a8ce",
  client_secret: "8ef87d05b2aee0e1d1ad712d4f3d9008a84feff3"
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      githubData: [],
      count: 5,
      isActive: false,
      githubRepo: [],
      hasMoreItems: true
    };
  }

  componentDidMount() {
    Modal.setAppElement("body");
  }

  toggleModal = (user, nomeDoRepo) => {
    axios
      .get(api.baseUrl + "/repos/" + user + "/" + nomeDoRepo + "/pulls")
      .then((repo) => {
        console.log("repo", repo);
        this.setState({ githubRepo: repo.data });
      });

    this.setState({
      isActive: !this.state.isActive
    });
  };

  loadMore = (count) => {
    axios
      .get(
        api.baseUrl +
          "/search/repositories?q=language:Java&sort=stars&page=1&per_page=" +
          count +
          "&client_id=" +
          api.client_id +
          "&client_secret=" +
          api.client_secret
      )
      .then((res) => {
        console.log("res", res);
        this.setState({ githubData: res.data.items });
      });
  };

  render() {
    const { githubData } = this.state;
    const { githubRepo } = this.state;
    const loader = <div className="loader">Loading...</div>;

    return (
      <div className="container App">
        <Navbar />
        <InfiniteScroll
          pageStart={1}
          loadMore={this.loadMore.bind(this)}
          hasMore={this.state.hasMoreItems}
          loader={loader}
        >
          <div className="row bg-row">
            {githubData.map((name, index) => (
              <div
                className="col-sm-6 col-md-4 col-lg-3 repositorios"
                key={name.id}
              >
                <img
                  src={name.owner.avatar_url}
                  className="repo-image"
                  alt="Imagem do projeto"
                />
                <div className="repo-content">
                  <ApiItem itemName="Projeto: " item={name.name} />
                  <ApiItem itemName="Autor: " item={name.owner.login} />
                  <ApiItem
                    itemName="Descrição: "
                    item={name.description}
                    classe="read-more"
                  />
                  <ApiItem itemName="Stars: " item={name.stargazers_count} />
                  <ApiItem itemName="Forks: " item={name.forks_count} />
                  <div className="btn-container">
                    <button
                      onClick={this.toggleModal.bind(
                        this,
                        name.owner.login,
                        name.name
                      )}
                      className="myButton"
                    >
                      Pull Request List
                    </button>
                  </div>
                </div>
                <Modal
                  isOpen={this.state.isActive}
                  onRequestClose={this.toggleModal}
                >
                  <div className="close" onClick={this.toggleModal} />
                  <div className="container">
                    <div className="row">
                      {githubRepo.map((name, index) => (
                        <div key={name.id} className="col-md-12 pull-request">
                          <a
                            href={name.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className="row">
                              <div className="col-sm-2 col-md-2">
                                <img
                                  src={name.user.avatar_url}
                                  className="pull-image"
                                  alt="Avatar do usuário"
                                />
                              </div>
                              <div className="col-sm-10 col-md-10">
                                <div className="pull-content">
                                  <ApiTitle
                                    titulo={name.title}
                                    numero={name.number}
                                    classe="pull-title"
                                  />
                                  <ApiComment
                                    classe="repo-user"
                                    usuario={name.user.login}
                                    data={name.created_at}
                                  />
                                  <ApiItem
                                    item={name.body}
                                    classe="pull-body"
                                  />
                                </div>
                              </div>
                            </div>
                          </a>
                          <hr />
                        </div>
                      ))}
                    </div>
                  </div>
                </Modal>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default App;
