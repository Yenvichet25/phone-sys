import React, { Component } from "react";
import PhoneDataService from "../services/phone.service";
import { withRouter } from '../common/with-router';

class Phone extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getPhone = this.getPhone.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updatePhone = this.updatePhone.bind(this);
    this.deletePhone = this.deletePhone.bind(this);

    this.state = {
      currentPhone: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getPhone(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPhone: {
          ...prevState.currentPhone,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentPhone: {
        ...prevState.currentPhone,
        description: description
      }
    }));
  }

  getPhone(id) {
    PhoneDataService.get(id)
      .then(response => {
        this.setState({
          currentPhone: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentPhone.id,
      title: this.state.currentPhone.title,
      description: this.state.currentPhone.description,
      published: status
    };

    PhoneDataService.update(this.state.currentPhone.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentPhone: {
            ...prevState.currentPhone,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePhone() {
    PhoneDataService.update(
      this.state.currentPhone.id,
      this.state.currentPhone
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Phone was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletePhone() {    
    PhoneDataService.delete(this.state.currentPhone.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/Phones');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentPhone } = this.state;

    return (
      <div>
        {currentPhone ? (
          <div className="edit-form">
            <h4>Phone</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentPhone.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentPhone.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentPhone.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentPhone.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deletePhone}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatePhone}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Phone...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Phone);