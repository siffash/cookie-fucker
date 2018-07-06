var
	stop = false,
	position = ['fixed', 'sticky'],
	id_class = ['cookie', 'gdpr', 'notice'],
	specific = ['div#cnsh', 'div#taw',						// google
				'div#ticker',								// youtube
				'div[data-testid="cookie-policy-banner"]',	// facebook
				'div#global-alert-queue',					// linkedin
				'div#j-aliexpress-notice'					// aliexpress
				],
	txtinside = ['cookie', 'privacy settings',  			// en
				'бисквитки', 'приемам', 'съгласен',	    	// bg
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
		setTimeout(main, 500, 3);
	}
};

function removeEl(el) {
	console.log('>>> COOKIE FUCKER >>> REMOVED THE ELEMENT:');
	console.log(el);
	el.parentNode.removeChild(el);
	document.body.style.overflow = 'auto';
	return true;
}

function main (inp) {
	console.log('>>> COOKIE FUCKER >>> RUN MAIN CHECK # ' + inp);
	if (!stop) {
		~window.location.href.indexOf('oath.com/collectConsent') && document.body.querySelector('form[action="/consent"]').submit();
		specific.some( el => document.body.querySelector(el) && removeEl(document.body.querySelector(el)) ) && (stop = true);
		if (!stop)
			(function iterateNodes(current) {
				if (current) {
					const children = current.children;
					for (let i = 0, len = children.length; i < len; i++) {
						let child = children[i];
						chkEl(child) ? i-- : iterateNodes(child);
					}
				}
			})(document.body);
	}
}

function chkEl (el) {
	if (el instanceof Element) {
		var el_css = window.getComputedStyle(el);
		var rgba = /(?:[\d.]+, ){3}([\d.]+)/; // take opacity
		// return true if the element has been found & removed, otherwise return false
		return (
			// check the text inside
			txtinside.some( chk => find(el.innerText, chk) ) && (
				// check the id and the class
				id_class.some( chk => el.id && find(el.id, chk) || el.className && find(el.className, chk) )
				// check the position
				|| ~position.indexOf(el_css['position'])
			) // click the warning's button if it's instagram
				&& (~window.location.href.indexOf('instagram.com') ? el.querySelector('button').click() : true) // click returns false
			|| (
				// check whether it overlaps the whole page
				~position.indexOf(el_css['position'])
					&& parseFloat(el_css['width']) >= document.body.clientWidth
					&& parseFloat(el_css['height']) >= window.innerHeight
					&& el_css['z-index'] > 100
					&& el_css['top'] === '0px'
					&& el_css['left'] === '0px'
					&& el_css['display'] !== 'none'
					&& el_css['visibility'] !== 'hidden'
					&& (el_css['opacity'] < 1
						|| el_css['background-color'].match(rgba)
						&& el_css['background-color'].match(rgba)[1] < 1
						)
				// for trustarc.com & websites which use its code
				|| el.className && find(el.className, 'truste_')
			)
		) && removeEl(el);
	}
	else return false;
}

function find (inp, chk) {
	return inp && typeof inp === 'string' && ~inp.toLowerCase().indexOf(chk);
}
