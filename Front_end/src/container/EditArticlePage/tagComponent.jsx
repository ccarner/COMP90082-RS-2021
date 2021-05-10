import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class App extends React.Component {
    constructor(props) {
        super(props);
        console.log("test2 " + this.props.tagsIn)

        this.state = {
            tags: props.tagsIn,
            suggestions: [
                { id: 'USA', text: 'USA' },
                { id: 'Germany', text: 'Germany' },
                { id: 'Austria', text: 'Austria' },
                { id: 'Costa Rica', text: 'Costa Rica' },
                { id: 'Sri Lanka', text: 'Sri Lanka' },
                { id: 'Thailand', text: 'Thailand' }
             ]
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    handleDelete(i) {
        const { tags } = this.state;
        let temp = tags.filter((tag, index) => index !== i)
        this.setState({
         tags: temp,
        });
        console.log(temp)
        this.props.updateTags(temp)
    }

    handleAddition(tag) {
        let temp = [...this.state.tags, tag]
        this.setState({tags: temp});
        console.log(temp)
        this.props.updateTags(temp)

    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
        this.props.updateTags(this.state.tags)

    }

    render() {
        console.log("test: "+ this.state.tags)
        const { tags, suggestions } = this.state;
        return (
            <div>
                <ReactTags tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters} 
                    allowUnique={true}
                    inputFieldPosition="inline"
                />
            </div>
        )
    }
};

export default App;