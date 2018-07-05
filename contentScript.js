var
	timer,
	completed = false,
	stop = false,
	position = ['fixed', 'sticky'],
	specific = ['div#cnsh',									// google
				'div#ticker',								// youtube
				'div[data-testid="cookie-policy-banner"]',	// facebook
				'div#global-alert-queue',					// linkedin
				'div#j-aliexpress-notice',					// aliexpress
				'div#cmp-container-id'						// express.co.uk
				],
	txtinside = ['cookie', 'privacy', 'agree', 'accept',	// en
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

main();
	
document.onreadystatechange = () => {
	if (document.readyState === 'complete' && !completed && !stop) {
		completed = true;
		main();
		const observer = new MutationObserver(main);
		observer.observe(document.body, {childList: true});
		setTimeout(() => { observer.disconnect(); }, 5000);
	}
}

function findTxt(inp) {
	return txtinside.some( chk => ~inp.indexOf(chk) );
}

function findPos(inp) {
	return ~position.indexOf(inp);
}

function removeEl(el) {console.log(el);
	el.parentNode.removeChild(el);
	return true;
}

function main(inp) {console.log('RUN');console.log(inp);console.log(document.body.querySelectorAll('*'));
	if (!stop) {
		~window.location.href.indexOf('oath.com/collectConsent') && document.body.querySelector('form[action="/consent"]').submit();
		specific.some( el => document.body.querySelector(el) && removeEl(document.body.querySelector(el)) ) && (stop = true);
		if (!stop) {
			document.body.querySelectorAll('[id*="cookie" i], [class*="cookie" i], [id*="gdpr" i], [class*="gdpr" i]').forEach( el => {
				if (findTxt(el.innerText.toLowerCase()))
					removeEl(el);
			});
			document.body.querySelectorAll('*').forEach( el => {
				if (findPos(window.getComputedStyle(el)['position']) && findTxt(el.innerText.toLowerCase()))
					~window.location.href.indexOf('instagram.com') ? el.querySelector('button').click() : removeEl(el);
			});
			document.body.style.overflow = 'auto';
		}
	}
}