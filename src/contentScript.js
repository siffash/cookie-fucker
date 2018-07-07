var
	stop = false,                                                       // stop checkings
	alpha = /(?:\d+, ){3}([\d.]+)/,                                     // find alpha channel in rgba
	instagram = Boolean(~window.location.href.indexOf('instagram.com')),// returns true if it's instagram
	doc_width = document.body.clientWidth,
	doc_height = window.innerHeight,
	position = ['fixed', 'sticky'],
	specific = ['div#cnsh', 'div#taw',						            // google
				'div#ticker',								            // youtube
				'div[data-testid="cookie-policy-banner"]',  	        // facebook
				'div#global-alert-queue',					            // linkedin
				'div#j-aliexpress-notice'					            // aliexpress
				],
	txt_insd = ['cookie', 'gdpr', 'notice', 'privacy settings',         // en
				'бисквитки', 'приемам', 'съгласен',	    	            // bg
				'kolačiće',									            // bs/hr/sr
				'piškotke',								    	        // sl
				'küpsiseid',							    	        // et
				'evästeitä',							    	        // fi
				'slapukus', 'slapukų',					    	        // lt
				'sīkfailus', 'sīkfaili',				    	        // lv
				'fótspor',								    	        // is
				'kabul'									    	        // tr
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
		~window.location.href.indexOf('oath.com/collectConsent')
			&& document.body.querySelector('form[action="/consent"]').submit();
		specific.some( el => document.body.querySelector(el) && removeEl(document.body.querySelector(el)) )
			&& (stop = true);
		!stop && (function iterateNodes(current) {
			if (current) {
				const children = current.children;
				for (let i = 0, len = children.length; i < len; i++) {
					var el = children[i];
					if (el instanceof Element) {
						var el_css = window.getComputedStyle(el);
						// check the element's position & its outerHTML
						( ~position.indexOf(el_css['position']) && txt_insd.some( chk => find(el.outerHTML, chk) )
							// click the warning's button if it's instagram, otherwise true -> will remove it
							// (click returns false)
							&& (instagram ? el.querySelector('button').click() : true)
							|| (
								// check whether the element overlaps the whole page
								~position.indexOf(el_css['position'])
									&& parseFloat(el_css['width']) >= doc_width
									&& parseFloat(el_css['height']) >= doc_height
									&& el_css['z-index'] > 100
									&& el_css['top'] === '0px'
									&& el_css['left'] === '0px'
									&& el_css['display'] !== 'none'
									&& el_css['visibility'] !== 'hidden'
									&& (el_css['opacity'] < 1
										|| el_css['background-color'].match(alpha)
										&& el_css['background-color'].match(alpha)[1] < 1
										)
								// for trustarc.com & websites which use its code
								|| find(el.className, 'truste_')
							)
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
