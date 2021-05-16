import React, { useState, useRef } from 'react';
import '../../styles/main.css';
//import './Article.css'
//import 'react-quill/dist/quill.snow.css'; // ES6
import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";

const Example = ({}) => {
	const editor = useRef(null)
	const [content, setContent] = useState('<p><img style="float:right; margin: 10px;" src="https://xdsoft.net/jodit/files/download.jpg" alt="Itaque nostrum est-quod nostrum dico, artis est-ad ea principia, quae accepimus."></p><h1>Itaque nostrum est-quod nostrum dico, artis est-ad ea principia, quae accepimus.</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <i>Quonam, inquit, modo?</i> <mark>Illum mallem levares, quo optimum atque humanissimum virum, Cn.</mark> Quae quidem vel cum periculo est quaerenda vobis; Amicitiam autem adhibendam esse censent,quia sit ex eo genere, quae prosunt. <a href="http://loripsum.net/" target="_blank">Duo Reges: constructio interrete.</a> Illud quaero, quid ei, qui in voluptate summum bonum ponat, consentaneum sit dicere. At vero illa, quae Peripatetici, quae Stoicidicunt, semper tibi in ore sunt in iudiciis, in senatu. Dic in quovis conventu te omnia facere, ne doleas. Nummus in Croesi divitiis obscuratur, pars est tamen divitiarum. Isto modo ne improbos quidem, si essent boni viri. Luxuriam non reprehendit,modo sit vacua infinita cupiditate et timore. Sit ista in Graecorum levitate perversitas, qui maledictis insectantur eos, a quibus de veritate dissentiunt. </p> <blockquote cite="http://loripsum.net">    Nec enim absolvi beata vita sapientis neque ad exitum perduci poterit, si prima quaeque bene ab eo consulta atque facta ipsius oblivione obruentur. </blockquote> <pre>Tum ille: Tu autem cum ipse tantum librorum habeas, quos hic tandem requiris? Possumusne ergo in vita summum bonum dicere, cum id ne in cena quidem posse videamur? </pre> <ul>    <li>Possumusne ergo in vita summum bonum dicere, cum id ne in cena quidem posse videamur?</li>    <li>Quodsi vultum tibi, si incessum fingeres, quo gravior viderere, non esses tui similis;</li></ul> <ol>     <li>Qui autem diffidet perpetuitati bonorum suorum, timeat necesse est, ne aliquando amissis illis sit miser.</li>     <li>Nulla profecto est, quin suam vim retineat a primo ad extremum.</li> </ol>   <dl>     <dt><dfn>Falli igitur possumus.</dfn></dt>     <dd>Quid enim ab antiquis ex eo genere, quod ad disserendum valet, praetermissum est?</dd>      <dt><dfn>Scrupulum, inquam, abeunti;</dfn></dt>     <dd>Scio enim esse quosdam, qui quavis lingua philosophari possint;</dd><dt><dfn>Poterat autem inpune;</dfn></dt><dd>Tum ille: Tu autem cum ipse tantum librorum habeas, quos hic tandem requiris?</dd><dt><dfn>Beatum, inquit.</dfn></dt><dd>Respondeat totidem verbis.</dd></dl>')
	
	const config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
	}
	
	return (
            <JoditEditor
            	ref={editor}
                value={content}
                config={config}
				tabIndex={1} // tabIndex of textarea
				onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => {}}
            />
        );
}

export default Example;
