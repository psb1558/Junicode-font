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
trattēd / do fieng er an / vnd ſagt zuͦ ſinen jüngeren zum erſten: Huͤtend üch voꝛ dē ſurteig ꝺ̕ \
phariſeern / welches iſt die heuchley. Es iſt aber nichts verboꝛgens / das nitt offenbar werde: \
noch heimlichs / das man nitt wüſſen werde. Darumb was jr in der finſter nuß geſagt habēd / das \
wirt man am liecht hoͤren: was jr habend geredt ins oꝛ in der kam̄er / das wirt man predigen vff den \
taͤchern. Ich ſag üch aber / minen fründen / Foͤrchtēd üch nit voꝛ denen die den lyb toͤdend / vnd \
darnach nichts habennd das ſy mer thuͤgind.";

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

    var latintext = "Beatꝰ uir qͥ non abiit in ꝯſilio impioꝝ et in uia peccatoꝛum nō ſedit. \
Sed in lege dn̄i uoluntaſ eiꝰ⹎ et in lege eiꝰ meditabitur die ac nocte. Et erit tanquā lignū \
quod plantatum eſt ſecuſ decurſuſ aquarum⹎ quod fructum ſuum dabit in tempoꝛe ſuo. \
Et foliū eiuſ non defluet⹎ et omnia quaecumq: faciet proſperabunt᷑. Non ſic impii non ſic⹎ ſed \
tanquam puluiſ quem ꝓicit uentuſ a faciae terrae. Ideo non reſurgunt peccatoꝛeſ in ꝯſilio \
iuſtoꝛum. Qm̄ nouit dn̄ſ uiam iuſtoꝝ⹎ et iter impioꝛum ꝑibit.";

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

    var middleenglishtext = "Nan ancre, bi mi read, ne schal makien \
professiun—þet is, bihaten ase heast—but þreo þinges: þet beoð obedience, \
chastete, ant stude steaðeluestnesse, þet ha ne schal þet stude neauer \
mare changin bute for nede ane, as strengðe ant deaðes dred, obedience of \
hire bischop oðer of his herre. For hwa se nimeð þing on hond ant bihat hit \
Godd as heast forte don hit, ha bint hire þerto, ant sunegeð deadliche i þe \
bruche, ȝef ha hit brekeð willes. Ȝef ha hit ne bihat nawt, ha hit mei do þah \
ant leauen hwen ha wel wule, as of mete, of drunch, flesch forgan oðer fisch, \
alle oþer swucche þinges, of werunge, of liggunge, of ures, of oþre beoden, \
segge swa monie oðer o swucche wise. Þeos ant þulliche oþre beoð alle i freo \
wil to don oðer to leten hwil me wule ant hwen me wule, bute ha beon bihaten. \
Ah chearite—þet is, luue—ant eadmodnesse ant þolemodnesse, treoweschipe ant \
haldunge of þe alde ten heastes, schrift ant penitence—þeos ant þulliche oþre, \
þe beoð summe of þe alde lahe, summe of þe neowe, ne beoð nawt monnes fundles, ne \
riwle þet mon stalde, ah beoð Godes heastes.";

	$(".textbox").text(modtext);
	$( "input[type='checkbox']" ).prop("checked", false);
	
	function selectElement(id, valueToSelect) {    
    		let element = document.getElementById(id);
    		element.value = valueToSelect;
	}
	
	selectElement("languages","ModEnglish");
	selectElement("faces","Regular");

    $("#languages").change(function() {
	var l = "en";
	var t = modtext;
	switch ( $("#languages option:selected").attr("value") ) {
		case "OldEnglish":
			l = "en";
			t = oldenglishtext;
			break;
	case "MiddleEnglish":
	    l = "en";
	    t = middleenglishtext;
	    break;
	case "Latin":
	    l = "la"
	    t = latintext;
	    break
	case "Gothic":
	    l = "en";
	    t = gothictext;
	    break;
	case "OldIcelandic":
	    l = "is";
	    t = norsetext;
	    break;
	case "German":
	    l = "de";
	    t = germantext;
	}
	$(".textbox").attr("lang",l);
	$(".textbox").text(t);
    });

    $("#faces").change(function() {
	var wght = "400";
	var wdth = "100%";
	switch ( $("#faces option:selected").attr("value") ) {
	case "Light":
	    wght = "200";
	    wdth = "100%";
	    break;
	case "Medium":
	    wght = "500";
	    wdth = "100%";
	    break;
	case "Semibold":
	    wght = "600";
	    wdth = "100%";
	    break;
	case "Bold":
	    wght = "700";
	    wdth = "100%";
	    break;

	case "SemicompressedLight":
	    wght = "200";
	    wdth = "80%";
	    break;
	case "Semicompressed":
	    wght = "400";
	    wdth = "80%";
	    break;
	case "SemicompressedMedium":
	    wght = "500";
	    wdth = "80%";
	    break;
	case "SemicompressedSemibold":
	    wght = "600";
	    wdth = "80%";
	    break;
	case "SemicompressedBold":
	    wght = "700";
	    wdth = "80%";
	    break;

	case "CompressedLight":
	    wght = "200";
	    wdth = "60%";
	    break;
	case "Compressed":
	    wght = "400";
	    wdth = "60%";
	    break;
	case "CompressedMedium":
	    wght = "500";
	    wdth = "60%";
	    break;
	case "CompressedSemibold":
	    wght = "600";
	    wdth = "60%";
	    break;
	case "CompressedBold":
	    wght = "700";
	    wdth = "60%";
	}

	$(".textbox").css("font-weight",wght);
	$(".textbox").css("font-stretch",wdth);
    });

    function featureString (s, tag, v) {
	var ss = s;
	if (ss.length > 0)
	    ss += ", ";
	ss += '"' + tag + '" ' + v;
	return ss;
    }

    $(".check").change(function() {
	var fstring = "";
	$("input").each(function() {
	    if ($( this ).is(":checked")) {
		    var tag = $(this).attr("id");
		    switch ( tag ) {
			    case "cv021":
				    fstring = featureString(fstring, "cv02", "1");
				    break;
			    case "cv022":
				    fstring = featureString(fstring, "cv02", "2");
				    break;
			    default:
				    fstring = featureString(fstring, tag, "on");
		    }
	    }
	});
	$(".textbox").css("font-feature-settings", fstring);
    });
});
