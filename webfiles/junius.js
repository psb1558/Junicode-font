$(document).ready(function(){

	var modtext = "When the right vertuous E.W. and I were at the Emperours Court togither, \
wee gave our selves to learne horsemanship of Jon Pietro Pugliano, one that with great commendation \
had the place of an Esquire in his stable: and hee according to the fertilnes of the Italian wit, did \
not onely affoord us the demonstration of his practise, but sought to enrich our mindes with the \
contemplations therein, which he thought most precious. But with none I remember mine eares were at \
any time more loaden, then when (either angred with slow paiment, or mooved with our learnerlike \
admiration) hee exercised his speech in the praise of his facultie. He said souldiers were the \
noblest estate of mankind, and horsemen the noblest of souldiers. He said they were the maisters \
of warre, and ornaments of peace, speedie goers, and strong abiders, triumphers both in Camps and \
Courts: nay to so unbleeved a point he proceeded, as that no earthly thing bred such wonder to a \
Prince, as to be a good horseman. Skill of government was but a Pedenteria in comparison, then \
would he adde certaine praises by telling us what a peerless beast the horse was, the one \
serviceable Courtier without flattery, the beast of most bewtie, faithfulnesse, courage, and such \
more, that if I had not beene a peece of a Logician before I came to him, I thinke he would have \
perswaded me to have wished myselfe a horse. But thus much at least, with his no few words he drave \
into me, that selflove is better than any guilding, to make that seem gorgious wherein ourselves be \
parties.";

	var germantext = "Es hat ſich vil volcks geſamlet / alſo / das ſy ſich vnder einandern \
trattēd / do fieng er an / vnd ſagt zuͦ ſinen jüngeren zum erſten: Huͤtend üch vor dē ſurteig ꝺ̕ \
phariſeern / welches iſt die heuchley. Es iſt aber nichts verborgens / das nitt offenbar werde: \
noch heimlichs / das man nitt wüſſen werde. Darumb was jr in der finſter nuß geſagt habēd / das \
wirt man am liecht hoͤren: was jr habend geredt ins or in der kam̄er / das wirt man predigen vff den \
taͤchern. Ich ſag üch aber / minen fründen / Foͤrchtēd üch nit vor denen die den lyb toͤdend / vnd \
darnach nichts habennd das ſy mer thuͤgind. Ich wil üch aber zeigē vor welchem jr üch frchten \
ſollend. Foͤrchtend üch vor dem / der / nach dem er toͤdet hat / ouch macht hat zewerffen inn die \
hell: ja ich sag üch / vor dem ſelben foͤrchtēd üch."

    var gothictext = "Warþ þan in dagans jainans, urrann gagrefts fram kaisara Agustau, \
gameljan allana midjungard. soh þan gilstrameleins frumista warþ at wisandin kindina Swriais \
raginondin Saurim Kwreinaiau. jah iddjedun allai, ei melidai weseina, ƕarjizuh in seinai baurg. \
Urrann þan jah Iosef us Galeilaia, us baurg Nazaraiþ, in Iudaian, in baurg Daweidis sei haitada \
Beþlaihaim, duþe ei was us garda fadreinais Daweidis, anameljan miþ Mariin sei in fragiftim \
was imma qeins, wisandein inkilþon. warþ þan, miþþanei þo wesun jainar, usfullnodedun dagos \
du bairan izai. jah gabar sunu seinana þana frumabaur jah biwand ina jah galagida ina in uzetin, \
unte ni was im rumis in stada þamma. jah hairdjos wesun in þamma samin landa, þairhwakandans \
jah witandans wahtwom nahts ufaro hairdai seinai. iþ aggilus fraujins anaqam ins jah wulþus \
fraujins biskain ins, jah ohtedun agisa mikilamma. jah qaþ du im sa aggilus: ni ogeiþ, \
unte sai, spillo izwis faheid mikila, sei wairþiþ allai managein, þatei gabaurans ist izwis \
himma daga nasjands, saei ist Xristus frauja, in baurg Daweidis.";

    var norsetext = "Þá mælti Hárr: Þá er þeir gengu með sævarstrǫndu Borssynir, fundu þeir \
    tré tvau ok tóku upp trén ok skǫpuðu af menn. Gaf inn fyrsti ǫnd ok líf, annarr vit ok \
hræring, þriði ásjónu, mál ok heyrn ok sjón, gáfu þeim klæði ok nǫfn. Hét karlmaðrinn Askr, \
en konan Embla, ok ólst þaðan af mannkindin, sú er byggðin var gefinn undir Miðgarði. Þar \
næst gerðu þeir sér borg í miðjum heimi, er kǫlluð er Ásgarðr. Þat kǫllum vér Trója. Þar byggðu \
goðin ok ættir þeira, ok gerðust þaðan af mǫrg tíðendi ok greinir bæði á jǫrðu ok í lofti. Þar \
er einn staðr, er Hliðskjálf heitir, ok þá er Óðinn settist þar í hásæti, þá sá hann of alla \
heima ok hvers manns athæfi ok vissi alla hluti, þá er hann sá. Kona hans hét Frigg Fjǫrgvinsdóttir, \
ok af þeira ætt er sú kynslóð komin, er vér kǫllum ása ættir, er byggt hafa Ásgarð inn forna ok þau \
ríki, er þar liggja til, ok er þat allt goðkunnug ætt. Ok fyrir því má hann heita Alfǫðr, at hann er \
faðir allra goðanna ok manna ok alls þess, er af honum ok hans krafti var fullgert.";

    var latintext = "Humanas laudes et mortalium \
ınsulas uıdımus aut ére ıncıso \
conscrıptas· aut auro radıantıb: \
lıtterıs· ad posterıtatıs memorıam cōmendatas· Et ısta \
attendentes mıror quare non erubescımꝰ \
mılıtum xpı uıctorıas sılentıo tégere & n̄ \
ad laudem ımperatorıs eoꝝ qualıt̄ \
pugnauerınt contra hostes & uıcerınt· sedulıs \
saltım uılıbus tradere & ad ıncıtandos \
anımos bellatoꝝ dılıgentıus explıcare· \
Multa bona talıū narratıonū scrıpta conuertant; \
Laus deı est cum ısta leguntur· \
memorıa scōꝝ excolıtur⹎ aedıfıcacıo m̄tıb: \
tradıtur. honor martırıbus exhıb&ur· \
Hınc ınfıdelıbus nascıtur meror. ıncredulıs \
lıuor⹎ ındıscıplınatıs angustıa· & scı̄s om̅ıb: \
cum xpō gaudentıb: solus dıabolus \
ıngemıscıt. quı uıd& pugnā suā eo usq: armıs \
celestıbus debellatā· ut ex ıpsa pugna ılle \
melıus uıctor exıster& quı putatꝰ ÷ uıctꝰ; \
Denıq: putabat se tunc hostıs scōs deı \
occıdendo uıncere· ıllı autē melıus occısı \
uıncebant· Int̄rogatı ılıco confıtebantur· \
dānatı grās referebant; Sıc denıq: legımus \
antıquas dn̄ı uıctorıas celebratas· qᷓndo \
dıx̄ ınımıcus ꝑsequens comp̄hendā· \
partıbor spolıa· replebo anımā meā· Int̄fıcıā \
gladıo meo· domınabıt᷑ manꝰ mea· Sed \
extendıt dexterā suā & deuorauıt eos  t̄ra· \
& popꝉm suum sanguınıs suı pr&ıo lıƀerauıt;";

var greektext = "Ὃ ἦν ἀπ’ ἀρχῆς, ὃ ἀκηκόαμεν, ὃ ἑωράκαμεν τοῖς ὀφθαλμοῖς ἡμῶν, ὃ ἐθεασάμεθα καὶ αἱ χεῖρες \
ἡμῶν ἐψηλάφησαν, περὶ τοῦ λόγου τῆς ζωῆς καὶ ἡ ζωὴ ἐφανερώθη, καὶ ἑωράκαμεν καὶ μαρτυροῦμεν καὶ ἀπαγγέλλομεν \
ὑμῖν τὴν ζωὴν τὴν αἰώνιον ἥτις ἦν πρὸς τὸν πατέρα καὶ ἐφανερώθη ἡμῖν ὃ ἑωράκαμεν καὶ ἀκηκόαμεν ἀπαγγέλλομεν \
καὶ ὑμῖν, ἵνα καὶ ὑμεῖς κοινωνίαν ἔχητε μεθ’ ἡμῶν. καὶ ἡ κοινωνία δὲ ἡ ἡμετέρα μετὰ τοῦ πατρὸς καὶ μετὰ τοῦ υἱοῦ \
αὐτοῦ Ἰησοῦ Χριστοῦ. καὶ ταῦτα γράφομεν ἡμεῖς ἵνα ἡ χαρὰ ἡμῶν ᾖ πεπληρωμένη. Καὶ ἔστιν αὕτη ἡ ἀγγελία ἣν \
ἀκηκόαμεν ἀπ’ αὐτοῦ καὶ ἀναγγέλλομεν ὑμῖν, ὅτι ὁ θεὸς φῶς ἐστιν καὶ σκοτία ἐν αὐτῷ οὐκ ἔστιν οὐδεμία. Ἐὰν \
εἴπωμεν ὅτι κοινωνίαν ἔχομεν μετ’ αὐτοῦ καὶ ἐν τῷ σκότει περιπατῶμεν, ψευδόμεθα καὶ οὐ ποιοῦμεν τὴν ἀλήθειαν: \
ἐὰν δὲ ἐν τῷ φωτὶ περιπατῶμεν ὡς αὐτός ἐστιν ἐν τῷ φωτί, κοινωνίαν ἔχομεν μετ’ ἀλλήλων καὶ τὸ αἷμα Ἰησοῦ τοῦ \
υἱοῦ αὐτοῦ καθαρίζει ἡμᾶς ἀπὸ πάσης ἁμαρτίας. ἐὰν εἴπωμεν ὅτι ἁμαρτίαν οὐκ ἔχομεν, ἑαυτοὺς πλανῶμεν καὶ ἡ \
ἀλήθεια οὐκ ἔστιν ἐν ἡμῖν. ἐὰν ὁμολογῶμεν τὰς ἁμαρτίας ἡμῶν, πιστός ἐστιν καὶ δίκαιος ἵνα ἀφῇ ἡμῖν τὰς ἁμαρτίας \
καὶ καθαρίσῃ ἡμᾶς ἀπὸ πάσης ἀδικίας. ἐὰν εἴπωμεν ὅτι οὐχ ἡμαρτήκαμεν, ψεύστην ποιοῦμεν αὐτὸν καὶ ὁ λόγος αὐτοῦ \
οὐκ ἔστιν ἐν ἡμῖν.";

    var oldenglishtext = "Her on ðisum geare forðferde \
      Ælfgiue Ymma Eadwardes cynges modor ⁊ Hardacnutes cynges. ⁊ on \
      þam sylfan geare gerædde se cyng ⁊ his witan þæt mann sceolde \
      forðian ut to Sandwic scipu. ⁊ setton Raulf eorl ⁊ Oddan eorl to \
      heafodmannum þærto. Ða gewende Godwine eorl ut fram Brycge mid \
      his scypum to Yseran. and let ut ane dæge ær midsumeres \
      mæsseæfene þæt he com to Næsse. þe is besuðan Rumenea. Þa com \
      hit to witenne þam eorlum ut to Sandwic. ⁊ hi þa gewendon ut \
      æfter þam oðrum scipum. ⁊ bead man landfyrde ut ongean þa \
      scipu. Þa amang þison þa wearð Godwine eorl gewarnod. ⁊ gewende \
      him þa into Pefenesea. ⁊ wearð þæt wæder swiðe strang. þæt þa \
      eorlas ne mihton gewitan hwet Godwine eorl gefaren hæfde. ⁊ \
      gewende þa Godwine eorl ut agean þæt he com eft to Brycge. ⁊ ða \
      oðra scipu gewenden heom eft ongean to Sandwic. ⁊ gerædde man þa \
      þæt þa scipu gewendan eft ongean to Lundene. ⁊ sceolde man \
      setton oðre eorlas ⁊ oðre hasæton to þam scipum.";

    var middleenglishtext = "Nan ancre bi mi read ne schal makien \
ꝓfessiun. ꝥ is bihaten ase heast⹎ but þreo þinges. ꝥ beoð obedience. \
chastete. ⁊ stude steaðeluestnesse. ꝥ ha ne schal ꝥ stude neau͛ \
mare changin bute for nede ane. as strengðe ⁊ deaðes dred. obedience of \
hire bischop oðer of his herre. for hƿa se nimeð þing on hond ⁊ bihat hit \
Godd as heast forte don hit⹎ ha bint hire þerto. ⁊ sunegeð deadliche i þe \
bruche. ȝef ha hit brekeð ƿilles. ȝef ha hit ne bihat naƿt. ha hit mei do þah \
⁊ leauen hƿen ha ƿel ƿule. as of mete. of drunch. flesch forgan oðer fisch. \
alle oþer sƿucche þinges. of ƿerunge. of liggunge. of ures. of oþre beoden. \
segge sƿa monie oðer o sƿucche ƿise. þeos ⁊ þulliche oþre beoð alle i freo \
ƿil to don oðer to leten hƿil me ƿule ant hƿen me ƿule bute ha beon bihaten. \
ah chearite ꝥ is luue. ⁊ eadmodnesse ⁊ þolemodnesse. treoƿeschipe ⁊ \
haldunge of þe alde ten heastes. Schrift ⁊ penitence. þeos ⁊ þulliche oþre \
þe beoð summe of þe alde lahe summe of þe neoƿe⹎ ne beoð naƿt monnes fundles ne \
riƿle ꝥ mon stalde⹎ ah beoð Godes heastes. ant for þi euch mon mot ham nede \
	halden.";

	var oldsaxontext = "Thuo uuard that heƀancuningas bodon   harm an is muode,\n\
that hie is giuuerkes so   uundran scolda\n\
endi that ni uuelda gihuggean,   that ina mahti helag god\n\
so alaiungan   so hie fan erist uuas\n\
selƀo giuuirkean,   ef hie so uueldi.\n\
Scerida im thuo te uuitie   that hie ni mohta enig uuord gisprekean,\n\
gimahlean mid is muđu,   ‘er than thu magu uuirđit\n\
fan thinero aldero idis   erl afuodit,\n\
kindiung giboran   kunneas guodes,\n\
uuanom te thesaro uueroldi.   Than skalt thu eft uuord sprekan,\n\
hebbean thinera stemna giuuald:   ni tharft thu stum uuesan\n\
langron huila.’   Thuo uuarth it san gilestid so,\n\
giuuorđan te uuaron   so thar on them uuihe gisprak\n\
engil thes alouualdon:  uuart ald gumo\n\
spraka bilosid,   thuo hie spahan hugi\n\
bari an is briostun.";

var oldirishtext = "Longuis Aedh adhaigh domhnaidh & an rigraidh: & cia ro \
loing Aed, ni sib digh, uair ní bai corn lais, \
or do baitheadh a cuirnn & a cuaich ac Ath Enaigh uas Eas Ruaidh, oc tiachtain don t-sluadh thairis. As amlaid imorro \
robai Aed cona sibh digh a leastur aile o ra dealuigh re cich a mathar acht a curn namha. Ba bron tra do righ Corca \
Tri & dia seithid, each ic ol & righ Erenn gin ol. Togbuis Angal a lamha fri Dia, & feicis gin codladh gin tomailt \
co madain, gu n-eabert a bean fris ara barach, ‘Eirg,’ ar si, ‘co Dirlus Guaire mic Colmain, uair ba tealach feile & \
naire o aimsir Dathi anall, dus an fuigbithea corn tria firta na feile ann.’ Cechaing Angal righ Corca Tri tar dorus na \
ratha amach, & tuisleas a cois deas, co ra tuisil cloch leis isin lis .i. an cloch do bai ar belaib an t-suirn a rabudar \
na tri cuirn as deach robai a n-Eirinn .i. an Cam-corn & an Litan & an Easgung. Cuirn sin tucad do Cormac u Cuinn dar \
muir, & ro folaig Niamh mac Lugna Firtri an dara comalta do Cormac u Cuinn, iar n-dith Cormuic, co toracht Coirpri \
Lifeachuir dar muir & cia ro fritha na cuirn aile la Cairpri, ni fritha na cuirn-siu co h-aimsir na næmh & Aeda Oirdnidi \
mic Neill, or tucad cealtar tairsib o Dia, co ru-s-foillsid do righ Corca Tri tria firta na feile.";

	// Clear the menus and boxes (in case the page is being reloaded) and
	// display the default (modern English) text.

	var fstring = "\"ss08\" on, \"dlig\" on";
	$("#textbox").css("font-feature-settings", fstring).text(modtext);
	$( "input[type='checkbox']" ).not("#italbutton, #ss08, #dlig").prop("checked", false);
	$( "#ss08, #dlig" ).prop("checked", true);

	function selectElement(id, valueToSelect) {
    		let element = document.getElementById(id);
    		element.value = valueToSelect;
	}

	selectElement("languages","ModEnglish");
	selectElement("faces","Regular");

	// The "languages" dropdown menu selects a text and also
	// sets the "lang" attribute for the text box.

	$("#languages").change(function() {

		var l = "en";
		var t = modtext;
		var whitespace = "normal";
		var currentfstring = fstring;

		switch ( $("#languages option:selected").attr("value") ) {
			case "ModEnglish":
				$( "input[type='checkbox']" ).not("#italbutton, #ss08, #dlig").prop("checked", false);
				$("#ss08, #dlig").prop("checked",true).change();
				break;
			case "OldEnglish":
				// lang code is ang, but we use en to trigger English thorn and eth.
				t = oldenglishtext;
				$( "input[type='checkbox']" ).not("#italbutton").prop("checked", false).first().change();
				break;
			case "OldIrish":
				t = oldirishtext;
				l = "ga";
				$( "input[type='checkbox']" ).not("#italbutton").prop("checked", false).first().change();
				$("#ss02").prop("checked",true).change();
				break;
			case "MiddleEnglish":
				t = middleenglishtext;
				// r rotunda with rules; always long s; crossed Ti.ronian nota
				$( "input[type='checkbox']" ).not("#italbutton, #cv383, #ss16, #cv691").prop("checked", false);
				$("#cv383, #ss16, #cv691").prop("checked",true).change();
				break;
			case "Greek":
				l = "el"
				t = greektext;
				$( "input[type='checkbox']" ).not("#italbutton").prop("checked", false).first().change();
				break;
			case "Latin":
				l = "la"
				t = latintext;
				$( "input[type='checkbox']" ).not("#italbutton, #cv383").prop("checked", false);
				$("#cv383").prop("checked",true).change();
				break;
			case "Gothic":
				// lang code for Gothic is got. Here it simply means "not English."
				t = gothictext;
				l = "got";
				$( "input[type='checkbox']" ).not("#italbutton").prop("checked", false).first().change();
				break;
			case "OldIcelandic":
				l = "is";
				t = norsetext;
				$( "input[type='checkbox']" ).not("#italbutton").prop("checked", false).first().change();
				break;
			case "OldSaxon":
				// lang code is osx.
				l = "osx";
				t = oldsaxontext;
				whitespace = "pre-wrap";
				$( "input[type='checkbox']" ).not("#italbutton").prop("checked", false).first().change();
				break;
			case "German":
				l = "de";
				t = germantext;
				// Long s is done manually for German. Use r rotunda with rules.
				$( "input[type='checkbox']" ).not("#italbutton, #ss16").prop("checked", false);
				$("#ss16").prop("checked",true).change();

		}

		font_style = "normal"
		if ($("#italbutton").is(":checked")) {
			font_style = "italic"
		}
		$("#textbox").attr("lang",l)
			.css({"white-space": whitespace, "font-style": font_style})
			.text(t);

	});

	$("#fontsizes").change(function() {
		var sz = $("#fontsizes option:selected").attr("value");
		$("#textbox").css({"font-size": sz});
	});

	// For the "faces" box, select one of the fonts by setting
	// the weight and stretch attributes for the textbox.

	$("#faces").change(function() {

		var wght = "400";
		var wdth = "100%";
		var newClass = "tbc-regular";

		switch ( $("#faces option:selected").attr("value") ) {
			case "Light":
				newClass = "tbc-light";
				break;
			case "Medium":
				newClass = "tbc-medium";
				break;
			case "Semibold":
				newClass = "tbc-semibold";
				break;
			case "Bold":
				newClass = "tbc-bold";
				break;
			case "SemicompressedLight":
				newClass = "tbc-light-semicompressed";
				break;
			case "Semicompressed":
				newClass = "tbc-regular-semicompressed";
				break;
			case "SemicompressedMedium":
				newClass = "tbc-medium-semicompressed";
				break;
			case "CompressedLight":
				newClass = "tbc-light-compressed";
				break;
			case "Compressed":
				newClass = "tbc-regular-compressed";
				break;
			case "CompressedMedium":
				newClass = "tbc-medium-compressed";
				break;
			case  "SmExp":
				newClass = "tbc-smexp";
				break
			case  "SmExpMedium":
				newClass = "tbc-smexp-medium";
				break
			case  "SmExpSmBold":
				newClass = "tbc-smexp-smbold";
				break
			case  "SmExpBold":
				newClass = "tbc-smexp-bold";
				break
			case  "Exp":
				newClass = "tbc-exp";
				break
			case  "ExpMedium":
				newClass = "tbc-exp-medium";
				break
			case  "ExpSmBold":
				newClass = "tbc-exp-smbold";
				break
			case  "ExpBold":
				newClass = "tbc-exp-bold";
				break
																														}

    $("#textbox").removeClass().addClass(newClass);

	});

	// Adds one tag/value pair to the feature string, adding punctuation
	// as needed.

	function featureString (s, tag, v) {
		var ss = s;
		if (ss.length > 0)
			ss += ", ";
		ss += '"' + tag + '" ' + v;
		return ss;
	}

	// Cycle through all the checkboxes, building the feature string. This is necessary
	// because in CSS all features besides the ones you set explicitly are set to their
	// default values. So we specify everything we want every time a box is checked or
	// unchecked.

	$(".check").change(function() {

		fstring = "";
		font_style = "normal"

		$("input").each(function() {
			var tag = $(this).attr("id");
			if ($( this ).is(":checked")) {
				if ( tag === "morefeat" ) {
					$(".hid").css("display", "inline");
				}
				else if (tag === "italbutton") {
					font_style = "italic"
				}
				else if ( tag.length == 5 ) {
					var basetag = tag.substring(0,4);
					var tagindex = tag.substring(4);
					fstring = featureString(fstring, basetag, tagindex);
				}
				else {
					fstring = featureString(fstring, tag, "on");
				}
			}
			else if ( tag === "morefeat" ) {
				$(".hid").css("display", "none");
			}
		});

		if (fstring.length == 0)
			fstring = "normal";

		$("#textbox").css({"font-feature-settings": fstring, "font-style": font_style});

	});
});
