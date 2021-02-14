var whatTags = {"airport":"(@amenity:airport + @aeroway:aerodrome)","alpine hut":"(@tourism:alpine_hut)","ambulance station":"(@emergency:ambulance_station)","amenity":"(@amenity)","anchors":"(@bicycle_parking:anchors)","arabic restaurant":"(@amenity:restaurant @cuisine:Arabic)","archaeological site":"(@historic:archaeological_site)","arena":"(@leisure:arena)","arts centre":"(@amenity:arts_centre)","artwork":"(@tourism:artwork)","asian restaurant":"(@amenity:restaurant @cuisine:Asian)","athletics":"(@sport:athletics)","atm":"(@amenity:atm)","attraction":"(@tourism:attraction)","attractions":"(@historic:castle + @historic:ruins + @religion:christian + @religion:jewish + @religion:muslim + @ruins_v_yes + @tourism:attraction)","bahai":"(@religion:bahai)","bakery":"(@shop:bakery)","bank":"(@amenity:bank)","bar":"(@amenity:bar)","baseball":"(@sport:baseball)","basketball":"(@sport:basketball)","bay":"(@natural:bay)","beach":"(@natural:beach)","beauty":"(@shop:beauty)","bench":"(@amenity:bench)","beverages":"(@shop:beverages)","bicycle":"(@shop:bicycle)","bicycle parking":"(@amenity:bicycle_parking)","bicycle rental":"(@amenity:bicycle_rental)","biergarten":"(@amenity:biergarten)","books":"(@shop:books)","boundary stone":"(@historic:boundary_stone)","bowls":"(@sport:bowls)","bridleway":"(@highway:bridleway)","buddhist":"(@religion:buddhist)","building":"(@bicycle_parking:building)","bureau de change":"(@amenity:bureau_de_change)","bus station":"(@amenity:bus_station)","bus stop":"(@highway:bus_stop)","butcher":"(@shop:butcher)","cafe":"(@amenity:cafe)","camp site":"(@tourism:camp_site)","car":"(@shop:car)","car rental":"(@amenity:car_rental)","car repair":"(@shop:car_repair)","car sharing":"(@amenity:car_sharing)","car wash":"(@amenity:car_wash)","caravan site":"(@tourism:caravan_site)","casino":"(@amenity:casino)","castle":"(@historic:castle)","cave entrance":"(@natural:cave_entrance)","chalet":"(@tourism:chalet)","charging station":"(@amenity:charging_station + @power_source:renewable)","chemist":"(@shop:chemist)","chinese restaurant":"(@amenity:restaurant @cuisine:Chinese)","christian":"(@religion:christian)","cinema":"(@amenity:cinema)","cliff":"(@natural:cliff)","climbing":"(@sport:climbing)","clothes":"(@shop:clothes)","coastline":"(@natural:coastline)","college":"(@amenity:college)","common":"(@leisure:common)","community centre":"(@amenity:community_centre)","computer":"(@shop:computer)","convenience":"(@shop:convenience)","courthouse":"(@amenity:courthouse)","cycleway":"(@highway:cycleway)","dance":"(@leisure:dance)","deli":"(@shop:deli)","dentist":"(@amenity:dentist)","department store":"(@shop:department_store)","doctors":"(@amenity:doctors)","dog park":"(@leisure:dog_park)","doityourself":"(@shop:doityourself)","drinking water":"(@amenity:drinking_water)","dry cleaning":"(@shop:dry_cleaning)","education":"(@amenity:school + @amenity:university)","electricity v yes":"(@amenity:restaurant @cuisine:electri)","electronics":"(@shop:electronics)","emergency":"(@emergency + @emergency_v_no + @emergency_v_yes)","emergency phone":"(@amenity:emergency_phone)","emergency v no":"(@emergency_v_no)","emergency v yes":"(@emergency_v_yes)","equestrian":"(@sport:equestrian)","fast food":"(@amenity:fast_food)","fell":"(@natural:fell)","ferry terminal":"(@amenity:ferry_terminal)","finances":"(@amenity:atm + @amenity:bank + @amenity:bureau_de_change)","fire hydrant":"(@emergency:fire_hydrant)","fire station":"(@amenity:fire_station)","fishing":"(@leisure:fishing)","fitness":"(@amenity:swimming_pool + @sport)","fitness station":"(@leisure:fitness_station)","florist":"(@shop:florist)","food court":"(@amenity:food_court)","football":"(@sport:football)","footway":"(@highway:footway)","forest":"(@landuse:forest + @natural:wood)","fountain":"(@amenity:fountain)","free time places":"(@amenity:cinema + @amenity:theatre + @tourism:museum)","french restaurant":"(@amenity:restaurant @cuisine:French)","fuel":"(@amenity:fuel)","furniture":"(@shop:furniture)","garden":"(@leisure:garden)","garden centre":"(@shop:garden_centre)","german restaurant":"(@amenity:restaurant @cuisine:German)","glacier":"(@natural:glacier)","golf":"(@sport:golf)","golf course":"(@leisure:golf_course)","grassland":"(@natural:grassland)","grave yard":"(@amenity:grave_yard)","greek restaurant":"(@amenity:restaurant @cuisine:Greek)","groceries":"(@shop:bakery + @shop:beverages + @shop:butcher + @shop:convenience + @shop:deli + @shop:organic + @shop:seafood + @shop:supermarket)","ground slots":"(@bicycle_parking:ground_slots)","guest house":"(@tourism:guest_house)","gymnastics":"(@sport:gymnastics)","hairdresser":"(@shop:hairdresser)","hardware":"(@shop:hardware)","health":"(@amenity:dentist + @amenity:doctors + @amenity:hospital + @amenity:pharmacy)","heath":"(@natural:heath)","highway":"(@highway)","hindu":"(@religion:hindu)","historic":"(@historic)","hockey":"(@sport:hockey)","hospital":"(@amenity:hospital)","hostel":"(@tourism:hostel)","hotel":"(@tourism:hotel)","ice rink":"(@leisure:ice_rink)","indian restaurant":"(@amenity:restaurant @cuisine:Indian)","informal":"(@bicycle_parking:informal)","information":"(@tourism:information)","italian restaurant":"(@amenity:restaurant @cuisine:Italian)","jain":"(@religion:jain)","jewelry":"(@shop:jewelry)","jewish":"(@religion:jewish)","kindergarten":"(@amenity:kindergarten)","kiosk":"(@shop:kiosk)","land":"(@natural:land)","landscape":"(@landuse:forest + @natural:beach + @natural:peak + @natural:valley + @natural:water + @natural:wood + @waterway:river)","landuse":"(@landuse)","laundry":"(@shop:laundry)","leisure":"(@amenity:cinema + @amenity:sauna + @amenity:swimming_pool + @amenity:theatre + @leisure + @shop:massage + @sport:climbing + @tourism:museum)","library":"(@amenity:library)","living street":"(@highway:living_street)","lockers":"(@bicycle_parking:lockers)","mall":"(@shop:mall)","marina":"(@leisure:marina)","marketplace":"(@amenity:marketplace)","marsh":"(@natural:marsh)","massage":"(@shop:massage)","memorial":"(@historic:memorial)","miniature golf":"(@leisure:miniature_golf)","monument":"(@historic:monument)","motel":"(@tourism:motel)","motorway":"(@highway:motorway)","motorway link":"(@highway:motorway_link)","mud":"(@natural:mud)","multi":"(@sport:multi)","multifaith":"(@religion:multifaith)","museum":"(@tourism:museum)","muslim":"(@religion:muslim)","natural":"(@natural)","nature reserve":"(@leisure:nature_reserve)","nightclub":"(@amenity:nightclub)","opera":"(@theatre:genre:opera)","optician":"(@shop:optician)","organic":"(@shop:organic)","outdoor":"(@shop:outdoor)","pagan":"(@religion:pagan)","park":"(@leisure:park)","parking":"(@amenity:parking)","pastafarian":"(@religion:pastafarian)","path":"(@highway:path)","peak":"(@natural:peak)","pedestrian":"(@highway:pedestrian)","pet":"(@shop:pet)","pharmacy":"(@amenity:pharmacy)","phone":"(@emergency:phone)","picnic site":"(@tourism:picnic_site)","picnic table":"(@leisure:picnic_table)","pitch":"(@leisure:pitch)","place of worship":"(@amenity:place_of_worship)","places to eat":"(@amenity:bar + @amenity:biergarten + @amenity:cafe + @amenity:fast_food + @amenity:pub + @amenity:restaurant)","playground":"(@leisure:playground)","police":"(@amenity:police)","post box":"(@amenity:post_box)","post office":"(@amenity:post_office)","primary":"(@highway:primary)","primary link":"(@highway:primary_link)","pub":"(@amenity:pub)","public service":"(@amenity:library + @amenity:police + @amenity:post_office + @tourism:information)","public transport":"(@amenity:bicycle_rental + @amenity:car_sharing + @highway:bus_stop + @railway:station + @railway:tram_stop + @station:subway)","raceway":"(@highway:raceway)","recreation ground":"(@leisure:recreation_ground)","recycling":"(@amenity:recycling)","reef":"(@natural:reef)","religion":"(@religion)","renewable":"(@power_source:renewable)","residential":"(@highway:residential)","restaurant":"(@amenity:restaurant)","river":"(@waterway:river)","rock":"(@natural:rock)","rocks":"(@natural:rocks)","ruins":"(@historic:ruins + @ruins:yes)","sand":"(@natural:sand)","sauna":"(@amenity:sauna)","school":"(@amenity:school)","scientologist":"(@religion:scientologist)","scrub":"(@natural:scrub)","seafood":"(@shop:seafood)","secondary":"(@highway:secondary)","secondary link":"(@highway:secondary_link)","service":"(@highway:service)","services":"(@highway:services)","shed":"(@bicycle_parking:shed)","shelter":"(@amenity:shelter)","shinto":"(@religion:shinto)","shoes":"(@shop:shoes)","shop":"(@shop)","sikh":"(@religion:sikh)","skateboard":"(@sport:skateboard)","skating":"(@sport:skating)","skiing":"(@sport:skiing)","slipway":"(@leisure:slipway)","soccer":"(@sport:soccer)","spanish restaurant":"(@amenity:restaurant @cuisine:Spanish)","spiritualist":"(@religion:spiritualist)","sport":"(@sport)","sport and fitness":"(@leisure:sports_centre + @sport:climbing)","sports":"(@shop:sports)","sports centre":"(@leisure:sports_centre)","spring":"(@natural:spring)","stadium":"(@leisure:stadium)","stands":"(@bicycle_parking:stands)","station":"(@railway:station)","stationery":"(@shop:stationery)","steps":"(@highway:steps)","subway":"(@station:subway)","supermarket":"(@shop:supermarket)","swimming":"(@sport:swimming)","swimming pool":"(@amenity:swimming_pool + @leisure:swimming_pool + @leisure:water_park)","table tennis":"(@sport:table_tennis)","taoist":"(@religion:taoist)","taxi":"(@amenity:taxi)","telephone":"(@amenity:telephone)","tennis":"(@sport:tennis)","tertiary":"(@highway:tertiary)","thai restaurant":"(@amenity:restaurant @cuisine:Thai)","theatre":"(@amenity:theatre)","theme park":"(@tourism:theme_park)","toilets":"(@amenity:toilets)","tourism":"(@tourism)","town hall":"(@amenity:town_hall)","toys":"(@shop:toys)","track":"(@leisure:track + @highway:track)","travel agency":"(@shop:travel_agency)","tree":"(@natural:tree)","trunk":"(@highway:trunk)","trunk link":"(@highway:trunk_link)","unclassified":"(@highway:unclassified)","unitarian":"(@religion:unitarian)","university":"(@amenity:university)","valley":"(@natural:valley)","veterinary":"(@amenity:veterinary)","video":"(@shop:video)","viewpoint":"(@tourism:viewpoint)","volcano":"(@natural:volcano)","wall loops":"(@bicycle_parking:wall_loops)","waste basket":"(@amenity:waste_basket)","water":"(@natural:water)","water park":"(@leisure:water_park)","wayside cross":"(@historic:wayside_cross)","wayside shrine":"(@historic:wayside_shrine)","wellness":"(@amenity:sauna + @shop:massage)","wetland":"(@natural:wetland)","wood":"(@natural:wood)","zoo":"(@tourism:zoo)","zoroastrian":"(@religion:zoroastrian)"};
var transToLocalsTags = {"in":"","close to":"%","near":"near","north of":":north-of","east of":":east-of","south of":":south-of","west of":":west-of","within a radius of 10 km from":"%10%"};
var conjTags = {"and":"/","or":"+"};
var extraTags = {"but no":"-", "with nearby":"%1%%"};

var what = ["airport", "alpine hut", "ambulance station", "amenity", "anchors", "arabic restaurant", "archaeological site", "arena", "arts centre", "artwork", "asian restaurant", "athletics", "atm", "attraction", "attractions", "bahai", "bakery", "bank", "bar", "baseball", "basketball", "bay", "beach", "beauty", "bench", "beverages", "bicycle parking", "bicycle rental", "bicycle", "biergarten", "books", "boundary stone", "bowls", "bridleway", "buddhist", "building", "bureau de change", "bus station", "bus stop", "butcher", "cafe", "camp site", "car rental", "car repair", "car sharing", "car wash", "car", "caravan site", "casino", "castle", "cave entrance", "chalet", "charging station", "chemist", "chinese restaurant", "christian", "cinema", "cliff", "climbing", "clothes", "coastline", "college", "common", "community centre", "computer", "convenience", "courthouse", "cycleway", "dance", "deli", "dentist", "department store", "doctors", "dog park", "doityourself", "drinking water", "dry cleaning", "education", "electricity v yes", "electronics", "emergency phone", "emergency v no", "emergency v yes", "emergency", "equestrian", "fast food", "fell", "ferry terminal", "finances", "fire hydrant", "fire station", "fishing", "fitness station", "fitness", "florist", "food court", "football", "footway", "forest", "fountain", "free time places", "french restaurant", "fuel", "furniture", "garden centre", "garden", "german restaurant", "glacier", "golf course", "golf", "grassland", "grave yard", "greek restaurant", "groceries", "ground slots", "guest house", "gymnastics", "hairdresser", "hardware", "health", "heath", "highway", "hindu", "historic", "hockey", "hospital", "hostel", "hotel", "ice rink", "indian restaurant", "informal", "information", "italian restaurant", "jain", "jewelry", "jewish", "kindergarten", "kiosk", "land", "landscape", "landuse", "laundry", "leisure", "library", "living street", "lockers", "mall", "marina", "marketplace", "marsh", "massage", "memorial", "miniature golf", "monument", "motel", "motorway link", "motorway", "mud", "multi", "multifaith", "museum", "muslim", "natural", "nature reserve", "nightclub", "opera", "optician", "organic", "outdoor", "pagan", "park", "parking", "pastafarian", "path", "peak", "pedestrian", "pet", "pharmacy", "phone", "picnic site", "picnic table", "pitch", "place of worship", "places to eat", "playground", "police", "post box", "post office", "primary link", "primary", "pub", "public service", "public transport", "raceway", "recreation ground", "recycling", "reef", "religion", "renewable", "residential", "restaurant", "river", "rock", "rocks", "ruins", "sand", "sauna", "school", "scientologist", "scrub", "seafood", "secondary link", "secondary", "service", "services", "shed", "shelter", "shinto", "shoes", "shop", "sikh", "skateboard", "skating", "skiing", "slipway", "soccer", "spanish restaurant", "spiritualist", "sport and fitness", "sport", "sports centre", "sports", "spring", "stadium", "stands", "station", "stationery", "steps", "subway", "supermarket", "swimming pool", "swimming", "table tennis", "taoist", "taxi", "telephone", "tennis", "tertiary", "thai restaurant", "theatre", "theme park", "toilets", "tourism", "town hall", "toys", "track", "travel agency", "tree", "trunk link", "trunk", "unclassified", "unitarian", "university", "valley", "veterinary", "video", "viewpoint", "volcano", "wall loops", "waste basket", "water park", "water", "wayside cross", "wayside shrine", "wellness", "wetland", "wood", "zoo", "zoroastrian"];
/*
var locals = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
*/
var transToLocals = ["in","close to","near","north of","east of","south of","west of","within a radius of 10 km from"];
var conj = ["and","or"];
var extra = ["but no", "with nearby"];
var between = ["between"];

var state = [1];
var oscarQuery = [];
var actualList = [];
var colorArray = [];
var helpString = "";
var color = "#D30000";

var startIndex = 0;
var endIndex = 0;
var middleIndex = 0;
var inFreeText = false;

var compareState = 1;



function autoFillSuggestions(input) {
	var suggestions = [];
	var bol = false;
	var hit = false;
	var radius = false;
	
	var prefix = "";
	var currentWord = "";
	var nextWord = "";
	var inputArray = input.split(" ");
	state = [1];
	inFreeText = false;

	
	for (i = 0; i < inputArray.length - 1; i++) {
		if (inputArray[i].charAt(0) == '"' && ((state[state.length - 1] == 1) || (state[state.length - 1] == 3) || (state[state.length - 1] == 5) || (state[state.length - 1] == 7) || (state[state.length - 1] == 9))) {
			inFreeText = true;
		}

		if (bol) {
			currentWord = nextWord;
			bol = false;
		} else {
			currentWord = inputArray[i];
			nextWord = "";
		}
		checkState();
		
		/* if: wir befinden uns gerade in einer Free Text eingabe
		   else: reguläre Eingabe */
		if (inFreeText) {
			if (currentWord.charAt(currentWord.length-1) == '"') {
				stateTransition(currentWord);
				inFreeText = false;
			} else {
				nextWord = currentWord + " " + inputArray[i + 1];
				bol = true;
			}
		} else {
		
			if (!((state[state.length - 1] == 5) || (state[state.length - 1] == 7) || (state[state.length - 1] == 9))) {
				for (j = 0; j < actualList.length; j++) {
					if (actualList[j].substr(0, currentWord.length).toLowerCase() == currentWord.toLowerCase()) {
						hit = true;
						nextWord = currentWord + " " + inputArray[i + 1];
						if (actualList[j].substr(0, nextWord.length).toLowerCase() == nextWord.toLowerCase()) {
							bol = true;
						}
					}
				}
			} else {
				if (binarySubstringSearch(currentWord)) {
					hit = true;
					nextWord = currentWord + " " + inputArray[i + 1];
					if (binarySubstringSearch(nextWord)) {
						bol = true;
					}
				}
			}
		
			if (!bol) {
				stateTransition(currentWord);
			}
		}
	}
	
	if (bol) {
		currentWord = nextWord;
		bol = false;
	} else {
		currentWord = inputArray[inputArray.length - 1];
	}
	checkState();

	prefix = input.substring(0, input.length - currentWord.length);
	
	/* Free Text Input erlauben: */
	if ((state[state.length - 1] == 1) || (state[state.length - 1] == 3) || (state[state.length - 1] == 5) || (state[state.length - 1] == 7) || (state[state.length - 1] == 9)) {
		if ((currentWord == "") || (currentWord.charAt(0) == '"')) {
			suggestions.push({"prefix":prefix, "suggestion":'"free Text"'});
		}

	}
	
	
	for (j = 0; j < actualList.length; j++) {
		if (suggestions.length > 199 || inFreeText) {
			break;
		}
		if (actualList[j].substr(0, currentWord.length).toLowerCase() == currentWord.toLowerCase()) {
			suggestions.push({"prefix":prefix, "suggestion":actualList[j]});
		}
	}
	
	if (radius) {
		suggestions.push({"prefix":prefix, "suggestion":"within a radius of n km from"});
	}
	
	if (currentWord.charAt(currentWord.length - 1) == " ") {
		currentWord = currentWord.substring(0, currentWord.length - 1);
	}
	compareState = state[state.length - 1];
	if (currentWord.charAt(currentWord.length-1) == '"' && currentWord.charAt(0) == '"') {
		inFreeText = true;
	}
	stateTransition(currentWord);
	if ((compareState != state[state.length -1]) && ((compareState == 5) || (compareState == 7) || (compareState == 9))) {
		prefix = prefix + currentWord + " ";
		suggestions.unshift({"prefix":prefix, "suggestion":"or"});
		suggestions.unshift({"prefix":prefix, "suggestion":"and"});
	}
		
	return suggestions;
}

function getOscarQuery(input) {
	oscarQuery = [];
	autoFillSuggestions(input);
	if(state[state.length - 1] > 4) {
		helpString = oscarQuery[oscarQuery.length - 1].tags + ")";
		oscarQuery[oscarQuery.length - 1] = {"tags":helpString, "color":color};
	}
	return oscarQuery;
}

function coloredInput(input) {
	colorArray = [];
	autoFillSuggestions(input + " ");
	return colorArray;
}

function checkState() {
	/*compute the proposed autocomplete values denpendent of the actual state*/
	switch(state[state.length - 1]) {
		case 1:
			actualList = what;
		break;
		case 2:
			actualList = transToLocals.concat(conj).concat(extra).concat(between);
		break;
		case 3:
			actualList = what;
		break;
		case 4:
			actualList = conj.concat(transToLocals).concat(between);
		break;
		case 5:
			actualList = locals;
		break;
		case 6:
			actualList = conj;
		break;
		case 7:
			actualList = locals;
		break;
		case 8:
			actualList = conj;
		break;
		case 9:
			actualList = locals;
		break;
		case 10:
			actualList = conj;
		break;
		case 11:
			actualList = transToLocals.concat(between);
		break;
		default:	
	}
	if(actualList.length < 50) {
		actualList.sort();
	}
	return actualList;
}


function stateTransition(inputString) {
	var currentState = state[state.length - 1];
	if (!inFreeText) {
		inputString = inputString.toLowerCase();
	}
	switch(state[state.length - 1]) {
		case 1:
			if (what.includes(inputString)) {
				oscarQuery.push({"tags":whatTags[inputString], "color":color});
				state.push(2);
			} else if (inFreeText) {
				helpString = "?" + inputString + "?";
				oscarQuery.push({"tags":helpString, "color":color});
				state.push(2);
			}
			
		break;
		case 2:
			if (between.includes(inputString)) {
				oscarQuery.push({"tags":"(", "color":color});
				helpString = "(" + oscarQuery[0].tags;
				oscarQuery[0] = {"tags":helpString, "color":color};
				helpString = oscarQuery[oscarQuery.length - 2].tags + ")";
				oscarQuery[oscarQuery.length - 2] = {"tags":helpString, "color":color};
				state.push(7);
			} else if (extra.includes(inputString)) {
				oscarQuery.push({"tags":extraTags[inputString], "color":color});
				state.push(3);
			} else if (transToLocals.includes(inputString)) {
				helpString = "(" + transToLocalsTags[inputString];
				oscarQuery.push({"tags":helpString, "color":color});
				helpString = "(" + oscarQuery[0].tags;
				oscarQuery[0] = {"tags":helpString, "color":color};
				helpString = oscarQuery[oscarQuery.length - 2].tags + ")";
				oscarQuery[oscarQuery.length - 2] = {"tags":helpString, "color":color};
				state.push(5);
			} else if (conj.includes(inputString)) {
				oscarQuery.push({"tags":conjTags[inputString], "color":color});
				state.push(1);
			}
		break;
		case 3:
			if (what.includes(inputString)) {
				oscarQuery.push({"tags":whatTags[inputString], "color":color});
				state.push(4);
			} else if (inFreeText) {
				helpString = "?" + inputString + "?";
				oscarQuery.push({"tags":helpString, "color":color});
				state.push(4);
			}
			
		break;
		case 4:
			if (between.includes(inputString)) {
				oscarQuery.push({"tags":"(", "color":color});
				helpString = "(" + oscarQuery[0].tags;
				oscarQuery[0] = {"tags":helpString, "color":color};
				helpString = oscarQuery[oscarQuery.length - 2].tags + ")";
				oscarQuery[oscarQuery.length - 2] = {"tags":helpString, "color":color};
				state.push(7);
			} else if (conj.includes(inputString)) {
				oscarQuery.push({"tags":conjTags[inputString], "color":color});
				state.push(3);
			} else if (transToLocals.includes(inputString)) {
				helpString = "(" + transToLocalsTags[inputString];
				oscarQuery.push({"tags":helpString, "color":color});
				helpString = "(" + oscarQuery[0].tags;
				oscarQuery[0] = {"tags":helpString, "color":color};
				helpString = oscarQuery[oscarQuery.length - 2].tags + ")";
				oscarQuery[oscarQuery.length - 2] = {"tags":helpString, "color":color};
				state.push(5);
			}
		break;
		case 5:
			if (inFreeText) {
				oscarQuery.push({"tags":inputString, "color":color});
				state.push(6);
			} else if (binarySearch(inputString)) {
				helpString = "#\"" + inputString + "\"";
				oscarQuery.push({"tags":helpString, "color":color});
				state.push(6);
			}
		break;
		case 6:
			if (conj.includes(inputString)) {
				oscarQuery.push({"tags":conjTags[inputString], "color":color});
				state.push(11);
			}
		break;
		case 7:
			if (inFreeText) {
				oscarQuery.push({"tags":inputString, "color":color});
				state.push(8);
			} else if (binarySearch(inputString)) {
				helpString = "#\"" + inputString + "\"";
				oscarQuery.push({"tags":helpString, "color":color});
				state.push(8);
			}
		break;
		case 8:
			if (conj.includes(inputString)) {
				oscarQuery.push({"tags":"<->", "color":color});
				state.push(9);
			}
		break;
		case 9:
			if (inFreeText) {
				oscarQuery.push({"tags":inputString, "color":color});
				state.push(10);
			} else if (binarySearch(inputString)) {
				helpString = "#\"" + inputString + "\"";
				oscarQuery.push({"tags":helpString, "color":color});
				state.push(10);
			}
		break;
		case 10:
			if (conj.includes(inputString)) {
				oscarQuery.push({"tags":conjTags[inputString], "color":color});
				state.push(11);
			}
		break;
		case 11:
			if (between.includes(inputString)) {
				state.push(7);
			} else if (transToLocals.includes(inputString)) {
				oscarQuery.push({"tags":transToLocalsTags[inputString], "color":color});
				state.push(5);
			}
		break;
		default:
	}
	if (!(currentState == state[state.length - 1])) {
		colorArray.push({"tags":inputString, "color":color});
	}

}

function binarySearch (word) {
	startIndex = 0;
	endIndex = locals.length - 1;
	word = word.toLowerCase();
	
	while(startIndex <= endIndex) {
		middleIndex = Math.floor((startIndex + endIndex) / 2);
		/*var conString = "start: " + startIndex + ", middle: " + middleIndex + ", end: " + endIndex;
		console.log(conString);
		console.log(locals[middleIndex]);*/
		if(word == locals[middleIndex].toLowerCase()) {
			return true;
		}
		
		/*rechte Seite der Mitte durchsuchen*/
		if (word > locals[middleIndex].toLowerCase()) {
			startIndex = middleIndex + 1;
		}
		/*linke Seite der Mitte durchsuchen*/
		if (word < locals[middleIndex].toLowerCase()) {
			endIndex = middleIndex - 1;
		}
	}
	/*word wurde nicht gefunden*/
	return false;
}


function binarySubstringSearch (word) {
	startIndex = 0;
	endIndex = locals.length - 1;
	word = word.toLowerCase();
	
	while(startIndex <= endIndex) {
		middleIndex = Math.floor((startIndex + endIndex) / 2);
		if(locals[middleIndex].substr(0, word.length).toLowerCase() == word.toLowerCase()) {
			return true;
		}
		
		/*rechte Seite der Mitte durchsuchen*/
		if (word > locals[middleIndex].toLowerCase()) {
			startIndex = middleIndex + 1;
		}
		/*linke Seite der Mitte durchsuchen*/
		if (word < locals[middleIndex].toLowerCase()) {
			endIndex = middleIndex - 1;
		}
	}
	/*word wurde nicht gefunden*/
	return false;
}