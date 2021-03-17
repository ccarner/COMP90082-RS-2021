import React, { Component } from 'react';
import '../../styles/main.css';
import { Row, Container, Card, Button, Table, Modal } from 'react-bootstrap';
import './EditingSection.css'
import request from "../../utils/request"

class EditingSubject extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      sections: [],
      showDelete: false,
      sectionDelete: null
    }
  }

  componentDidMount() {
    request.get(`/subject/`+this.props.match.params.code).then((response) => {
      this.setState({
        sections: response.data.subject.sections,
        loading: false
      })
    })
  }

  clickedDelete(section) {
    console.log(section)
    request.delete(`/section/delete`, { data:{
      _id: section._id,
      subject_code: section.subject_code,
      type: section.type,
      description: section.description
    }
    }).then((response) => {
      var array = [...this.state.sections]; 
      var index = array.indexOf(section)
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({sections: array});
      }
    })
    this.closeDialog()
  }

  clickedAddSection(){
    this.props.history.push(`/subject/${this.props.match.params.code}/addSection`)
  }

  setShow(section){
    this.setState({showDelete: true, sectionDelete: section})
  }

  closeDialog(){
    this.setState({showDelete: false, sectionDelete: null})
  }

  DeleteModal(){
    return (
      <Modal show={this.state.showDelete} onHide={() => this.closeDialog()} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Delete the Seletected Section</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.closeDialog()}>
            Close
          </Button>
          <Button variant="danger" onClick={() => this.clickedDelete(this.state.sectionDelete)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  articleSection = () => {
      return (
        <Modal show={this.state.showDelete} onHide={this.andleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )
  }

  render() {
    return (
      <div className="subject-section">
        <Container>
          <Row>
            <h1>Edit Section</h1>
          </Row>
          <hr />

          <section className="Subj">
            <Row>
              <Card>
                <Card.Header as="h5">
                  <Button onClick={() => this.clickedAddSection()} variant="outline-primary">Add new Section</Button>
                </Card.Header>
                <Card.Body>

                  <Table responsive="sm">
                    <thead>
                      <tr>
                        <th>Section Name</th>
                        <th>Type</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.sections.map(section => (
                        <tr>
                          <td>{section.name}</td>
                          <td>{section.type}</td>
                          <td> 
                            <Button variant="danger" 
                              onClick={() => this.setShow(section)}
                              // onClick={() => this.clickedDelete(section)}
                            >
                                Delete
                            </Button>
                            {/* {this.DeleteModal()} */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    {this.DeleteModal()}
                  </Table>
                </Card.Body>
              </Card>
            </Row>
          </section>
        </Container>
      </div>
    );
  }

}

export default EditingSubject;
