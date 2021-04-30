import React, {Component} from "react";
import { Accordion, Card} from "react-bootstrap";


const titleStyle = {
    textAlign: "center",
    padding: "30px"
};

const accordionStyle = {
    maxWidth: "65%",
    margin: "auto",
    justifyContent: "center", 
    alignItems: "center"
    
};

class Faq extends Component {

    render() {
        return(
            <div>
                <h1 style={titleStyle}>Frequently Asked Questions (FAQ)</h1>
                <Accordion style={accordionStyle}>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            Q: How to add a new article?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                After successfully logging in, select the subject you want to add an article to in the main interface. <br></br>Click the subject introduction. After the redirection, enter the articles overview list. Click the "Add New Article" button, enter the title of the article, and click the "publish" button to enter the article editing interface. In this interface, you can add and modify the content of the article. Also you can add tags at the end of the text. <br></br>After finishing editing, click the "Save article" button in the upper right corner. You can successfully publish the article and redirect to the view interface.
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            Q: How to modify the profile?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                After successfully logging in, there is a default profile picture in the upper right corner of the blue navigation bar. <br></br>After clicking, enter the profile interface. Find any part that you want to modify and click the "Edit" button at the back to modify it.
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="2">
                            Q: How to add comments to other people's articles?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                After browsing the article, you can directly post comments in the "Discussion Board" area below the article. 
                                <br></br> After entering a comment in the text box, click the blue button "POST" at the back to successfully post the comment and you can browse them at the end of the article.
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        ) 
    }
}


export default Faq