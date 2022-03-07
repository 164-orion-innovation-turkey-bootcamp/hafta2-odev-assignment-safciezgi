//Malzeme stok listesini oluşturuyoruz:
let materialList = {
	pickle: 5,
	sauce: 1,
	onion: 5,
	meatball: 5,
	chicken: 5,
	tomato: 5,
	bread: 5,
	fries: 5,
	coke: 5,
};


//Yapılacakları listeledik:
const todos = [
	{ id: 0, description: "Sipariş alındı.." },
	{ id: 1, description: "Stok kontrolü yapiliyor" },
	{ id: 2, description: "Köfte mi, Tavuk mu kontrol ediliyor.." },
	{
		id: 3,
		description: "Köfte seçildi. Az pişmiş köfteniz hazırlanıyor..",
	},
	{
		id: 4,
		description: "Köfte seçildi. Orta pişmiş köfteniz hazırlanıyor..",
	},
	{
		id: 5,
		description: "Köfte seçildi. Çok pişmiş köfteniz hazırlanıyor..",
	},
	{ id: 6, description: "Tavuk seçildi ve pişiriliyor.. " },
	{ id: 7, description: "Patatesler hazırlanıyor.." },
	{ id: 8, description: "İçecekler hazırlanıyor.." },
	{ id: 9, description: "Soslar ve ürünler servis tepsisine yerleştirildi.." },
	{ id: 10, description: "Siparişiniz hazır afiyet olsun !!!" },
];


//Malzeme listesinin kontrolünü yapan methodumuz:
function checkMaterialList(materialList) {
	// Object values methodu objenin icinde bulunan degerleri array olarak return eder.
	// [5,5,5,5,5,5,5,5,5]
	// every methodu dizinin tum elemanlarini kosula gore kontrol eder. return true or false
	return Object.values(materialList).every((element) => element > 0);
}


//İlgili adımın süresine göre yapılacakları döndüren methodumuz ==> Yapılacaklar ve süreyi parametre olarak alır, o sürede o/p basar:
function newTodo(todo, timeout) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {

			resolve(console.log(todo.description));
		}, timeout);

    });
}


//Köfteye özel olarak "az"-"orta"-"çok" sürelerini organize eden methodumuz:
async function cookingTime(time) {
	switch (time) {
		case "az":
			await newTodo(todos[5], 4000);
			break;
		case "çok":
			await newTodo(todos[4], 3000);

			break;
		case "orta":
			await newTodo(todos[3], 2000);

			break;
		default:
			break;
	}
}


//et tipini ve malzeme listesini alarak ilgili malzemelerde stok azalttığımız method:
function stockDecrease(meatType, list) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			Object.entries(list).map((element) => {
				if (meatType == "meatball") {
					list[element[0]] -= 1;
					if (element[0] === "chicken") {
						list[element[0]]++;
					}
				} else {
					if (element[0] === "meatball") {
						list[element[0]]++;
					}
					list[element[0]] -= 1;
				}
			});
			resolve(console.log("Hamburger hazırlandı.."));
		}, 1000);
	});
}


//Eğer burger köfte ise ilgili fonksiyona yönlendiren değilse ilgili yapılacaklar yazısını bastıran methoda yönlendiren ve sonrasında et seçimine göre stok kontrolünü çağıran method:
async function burger(order, list) {
	await newTodo(todos[2], 1000);
	if (order.meat === "meatball") {
		await cookingTime(order.cookTime);
	} else {
		await newTodo(todos[6], 3000);
	}
	await stockDecrease(order.meat, list);
}

//3-4-5 beraber başlayacağı için sonraki adımlar ile ayırdığımız method:
async function layer(order, list) {
	return new Promise((resolve, reject) => {
		resolve(
			burger(order, list),
			newTodo(todos[7], 5000),
			newTodo(todos[8], 2000)
		);
	});
}


//Belirli adımları bu method üzerinden çağırdık:
async function meal(order, list) {
	await newTodo(todos[0], 1000);
	await newTodo(todos[1], 3000);
	if (checkMaterialList(list)) {
		console.log("Stok var..");
		await layer(order, list);
		await newTodo(todos[9], 1000);
		await newTodo(todos[10], 1000);
	} else {
        throw new Error('Stok bitti, siparişinizi oluşturamıyoruz :(');
	}

	console.log(materialList);
}


//sipariş örnekleri:
let order1 = {
	meat: "meatball",
	cookTime: "çok",
};
let order2 = {
	meat: "chicken",
};

meal(order1, materialList);
// meal(order2, materialList);

