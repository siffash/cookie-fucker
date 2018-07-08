var
	stop = false,                                                               // stop checkings
	alpha = /(?:\d+, ){3}([\d.]+)/,                                             // find alpha channel in rgba
	instagram = Boolean(~window.location.href.indexOf('instagram.com')),        // returns true if it's instagram
	oath = Boolean(~window.location.href.indexOf('oath.com/collectConsent')),   // returns true if it's oath
	position = ['fixed', 'sticky'],
	specific = ['div#cnsh', 'div#taw',						                    // google
				'div#ticker',								                    // youtube
				'div[data-testid="cookie-policy-banner"]',  	                // facebook
				'div#global-alert-queue',					                    // linkedin
				'div#j-aliexpress-notice'					                    // aliexpress
				],
	keywords = ['cookie', 'gdpr', 'notice', 'privacy settings',                 // en
				'бисквитки', 'приемам', 'съгласен',	    	                    // bg
				'kolačiće',									                    // bs/hr/sr
				'piškotke',								    	                // sl
				'küpsiseid',							    	                // et
				'evästeitä',							    	                // fi
				'slapukus', 'slapukų',					    	                // lt
				'sīkfailus', 'sīkfaili',				    	                // lv
				'fótspor',								    	                // is
				'kabul'									    	                // tr
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
	console.log('>>> COOKIE FUCKER >>> RUN MAIN CHECKING # ' + inp);
	if (!stop) {
		oath && document.body.querySelector('form[action="/consent"]').submit();
		specific.some( el => {
			const el_qs = document.body.querySelector(el);
			return el_qs && removeEl(el_qs);
		}) && (stop = true);
		!stop && (function iterateNodes(current) {
			if (current) {
				const children = current.children;
				for (let i = 0, len = children.length; i < len; i++) {
					var el = children[i];
					if (el instanceof Element) {
						var el_css = window.getComputedStyle(el);
						// check the element's position
						( ~position.indexOf(el_css['position'])
							// check the element's outerHTML
							&& ( keywords.some(chk => find(el.outerHTML, chk))
								// click the warning's button if it's instagram, otherwise true -> will remove it
								// (click returns false)
								&& ( instagram ? (stop = true) && el.querySelector('button').click() : true )
								// check whether the element overlaps the whole page
								|| ( el_css['z-index'] > 100
									&& el_css['top'] === '0px'
									&& el_css['left'] === '0px'
									&& el_css['bottom'] === '0px'
									&& el_css['right'] === '0px'
									&& el_css['display'] !== 'none'
									&& el_css['visibility'] !== 'hidden'
									&& ( el_css['opacity'] < 1
										|| el_css['background-color'].match(alpha)
											&& el_css['background-color'].match(alpha)[1] < 1
										|| el_css['background-color'] === 'rgb(0, 0, 0)'
									)
								)
							)
							// for trustarc.com & websites which use its code
							|| find(el.className, 'truste_')
						// if the element was removed / wasn't removed
						) && removeEl(el) ? i-- && len-- : iterateNodes(el);
					}
				}
			}
		})(document.body);
	}
}

function find (inp, chk) {
	return inp && typeof inp === 'string' && ~inp.toLowerCase().indexOf(chk);
}
