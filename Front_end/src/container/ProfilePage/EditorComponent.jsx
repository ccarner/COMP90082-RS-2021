import React, {useState, useRef, useMemo } from 'react';
import JoditEditor from "jodit-react";
import { faSave } from "@fortawesome/free-solid-svg-icons"

import '../../styles/main.css';
import NavBar from '../../components/NavBar';
import { Jumbotron, Col, Row, Container, Card, Button } from 'react-bootstrap';
import 'jodit';
import 'jodit/build/jodit.min.css';
import UnimelbFooterLogo from '../../resources/RS-UnimelbLogo.svg'
import ReactQuill from 'react-quill';
import cardImage from './images/logo512.png'

const Editor = ({value, onChange}) => {
	const editor = useRef(null)
	const [content, setContent] = useState(value)
	
	const config = {
		readonly: true, // all options from https://xdsoft.net/jodit/play.html
                toolbar: false,
                toolbarAdaptive: false,
                "showCharsCounter": false,
                "showWordsCounter": false,
                "showXPathInStatusbar": false
	}

	return useMemo(() => ( 
            <JoditEditor
            	ref={editor}
                value={content} 
                config={config}
				tabIndex={1} // tabIndex of textarea
				//onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={content => {
        			setContent(content)
        			onChange(content)
      			}}
            />
        ), [])
}

export default Editor