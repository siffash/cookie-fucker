var
	stop = false,
	position = ['fixed', 'sticky'],
	id_class = ['cookie', 'gdpr'],
	specific = ['div#cnsh', 'div#taw',						// google
				'div#ticker',								// youtube
				'div[data-testid="cookie-policy-banner"]',	// facebook
				'div#global-alert-queue',					// linkedin
				'div#j-aliexpress-notice',					// aliexpress
				'div#cmp-container-id'						// express.co.uk
				],
	txtinside = ['cookie', 'agree', 'accept',				// en
				'бисквитки', 'приемам', 'съгласен',			// bg
				'kolačiće',									// bs/hr/sr
				'piškotke',									// sl
				'küpsiseid',								// et
				'evästeitä',								// fi
				'slapukus', 'slapukų',						// lt
				'sīkfailus', 'sīkfaili',					// lv
				'fótspor',									// is
				'kabul'										// tr
				];

main(1);

document.onreadystatechange = () => {
	if (document.readyState === 'complete' && !stop) {
		main(2);
		// if (!stop) {
        //     const observer = new MutationObserver( records => {
        //         records.forEach( record => {
        //             record.addedNodes.forEach( addedNode => {console.log('CHECKING NEW NODE');
        //                 addedNode.nodeName !== '#text' && ( chkEl(addedNode) || addedNode.querySelectorAll('*').forEach(chkEl) );
        //             });
        //         });
        //     });
        //     observer.observe(document.body, {childList: true, subtree: true});
        //     setTimeout(() => { observer.disconnect(); }, 5000);
		// }
	}
};

function removeEl(el) {console.log('>>> COOKIE FUCKER >>> REMOVING THE ELEMENT:');console.log(el);
	document.body.style.overflow = 'auto';
	return el.parentNode.removeChild(el);
}

function main(inp) {console.log('>>> COOKIE FUCKER >>> RUN MAIN CHECK # ' + inp);
	if (!stop) {
		~window.location.href.indexOf('oath.com/collectConsent') && document.body.querySelector('form[action="/consent"]').submit();
		specific.some( el => document.body.querySelector(el) && removeEl(document.body.querySelector(el)) ) && (stop = true);
		if (!stop)
			(function iterateNodes(current) {
				if (current) {
					const children = current.childNodes;
					for (let i = 0, len = children.length; i < len; i++) {
						let child = children[i];
						!chkEl(child) && iterateNodes(child);
					}
				}
			})(document.body);
	}
}

function chkEl (el) {
	// return true if the element has been found & removed, otherwise return false
	return (
		// check the text inside
		el && txtinside.some( chk => find(el.innerText, chk) ) && (
            // check the id and the class
			id_class.some( chk => el.id && find(el.id, chk) || el.className && find(el.className, chk) ) && removeEl(el)
			// check the position
			|| ~position.indexOf(window.getComputedStyle(el)['position'])
				// click the warning's button if it's instagram
				&& (~window.location.href.indexOf('instagram.com') ? !el.querySelector('button').click() : removeEl(el))
		)
	);
}

function find (inp, chk) {
	return inp && ~inp.toLowerCase().indexOf(chk)
}
