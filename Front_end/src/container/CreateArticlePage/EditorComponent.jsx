import React, {useState, useRef, useMemo } from 'react';
import JoditEditor from "jodit-react";

import '../../styles/main.css';
import 'jodit';
import 'jodit/build/jodit.min.css';


const Editor = ({saveFunc, value, onChange}) => {
	const editor = useRef(null)
	const [content, setContent] = useState(value)
	
	const config = {
		readonly: false, // all options from https://xdsoft.net/jodit/doc/
		//need to change function to actually save
		extraButtons:[{
			name: 'Save',
			//iconURL: './images/logo512.png',
			exec: () => saveFunc()
		}]
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