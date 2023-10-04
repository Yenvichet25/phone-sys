import React, { Component } from "react";
import PhoneDataService from "../services/phone.service";
import { Link } from "react-router-dom";

export default class PhonesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrievePhones = this.retrievePhones.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePhone = this.setActivePhone.bind(this);
    this.removeAllPhones = this.removeAllPhones.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      Phones: [],
      currentPhone: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrievePhones();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrievePhones() {
    PhoneDataService.getAll()
      .then(response => {
        this.setState({
          Phones: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePhones();
    this.setState({
      currentPhone: null,
      currentIndex: -1
    });
  }

  setActivePhone(Phone, index) {
    this.setState({
      currentPhone: Phone,
      currentIndex: index
    });
  }

  removeAllPhones() {
    PhoneDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentPhone: null,
      currentIndex: -1
    });

    PhoneDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          Phones: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, Phones, currentPhone, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Phones List</h4>

          <ul className="list-group">
            {Phones &&
              Phones.map((Phone, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePhone(Phone, index)}
                  key={index}
                >
                  {Phone.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllPhones}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentPhone ? (
            <div>
              <h4>Phone</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentPhone.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentPhone.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentPhone.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/Phones/" + currentPhone.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Phone...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
