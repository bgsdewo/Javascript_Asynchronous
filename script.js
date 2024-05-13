//Mengenal Call Stack Function
// Mekanisme memory di javascript
// Call stack:mekanisme untuk intepreter (seperti intepreter di JS di broswer web)
// untuk melacak lokasi skrip yang memanggil banyak fungsi" yg sedang dijalankan dan fungsi
// apa yg dipanggil dari dalam fungsi InputDeviceInfo,dll

//CATATAN PENTING!//
// dalam konteks asynchronus ini,jika suatu program yang kita buat itu mempunyai step
// yang sangat sedikit maka itu sangat bagus untuk aplikasi web kita

//Faktanya Javascript Itu Single Thread
// Single thread:sebuah program yg hanya dapat menjalankan satu proses dalam satu waktu
//contoh dalam kehidupan nyata: bangun -> mandi -> bikin sarapan -> makan hasil sarapan yg dibuat = 3 tahap

// alasan JS bisa menggunakan multi thread
// 1.broswer dibuat dengan API yg bisa menjalankan tugas dibalik layar(kaya bikin setTimeout)
// 2.JS callstack memahami fungsi" API sehingga bisa memanfaatkan kerjaan broswer
// 3.Pada saat broswer selesai menjalankan tugas,hasilnya akan dimasukan ke dalam stack sebagai callback

//Callback Hell Di Javascript Bikin Serem Dibacanya
    // setTimeout(function()  {
    //     document.body.style.backgroundColor = 'red'
    //     setTimeout(function()  {
    //         document.body.style.backgroundColor = 'yellow'
    //         setTimeout(function()  {
    //             document.body.style.backgroundColor = 'green'
    //             setTimeout(function()  {
    //                 document.body.style.backgroundColor = 'blue'
                    
    //             }, 1000);
            
    //         }, 1000);
        
    //     }, 1000);
    
    // }, 1000);

//ada cara cepat untuk mengatasi itu dengan promise
//promise: object yg dijanjikan asynchronus

//Latihan Request Pakai Callback Function
// callback version
// const requestCallback = (url, success, failure) => {
// 	const delay = Math.floor(Math.random() * 4500) + 500;
// 	setTimeout(() => {
// 		if (delay > 4000) {
// 			failure('Error: Connection Timeout');
// 		} else {
// 			success(`Success: ${url} (${delay}ms)`);
// 		}
// 	}, delay);
// };

// // Promise version
// const requestPromise = (url) => {
// 	return new Promise((resolve, reject) => {
// 		const delay = Math.floor(Math.random() * 4500) + 500;
// 		setTimeout(() => {
// 			if (delay > 2000) {
// 				reject('Error: Connection Timeout');
// 			} else {
// 				resolve(`Success: ${url} (${delay}ms)`);
// 			}
// 		}, delay);
// 	});
// };

//Menggunkan callback

// requestCallback(
// 	'movie.com',
// 	function (response) {
// 		console.log('success', response);
// 		requestCallback(
// 			'movie.com',
// 			function (response) {
// 				console.log('success', response);
// 				requestCallback(
// 					'movie.com',
// 					function (response) {
// 						console.log('success', response);
// 						requestCallback(
// 							'movie.com',
// 							function (response) {
// 								console.log('success', response);
// 								requestCallback(
// 									'movie.com',
// 									function (response) {
// 										console.log('success', response);
// 									},
// 									function (error) {
// 										console.log('error', error);
// 									}
// 								);
// 							},
// 							function (error) {
// 								console.log('error', error);
// 							}
// 						);
// 					},
// 					function (error) {
// 						console.log('error', error);
// 					}
// 				);
// 			},
// 			function (error) {
// 				console.log('error', error);
// 			}
// 		);
// 	},
// 	function (error) {
// 		console.log('error', error);
// 	}
// );

//Latihan Request Pakai Promise

// requestPromise('movie.com')
// .then((response) => {
// 	console.log('success',response)
// })
// .catch((error) =>{
// 	console.log('error',error)
// })

// Cara Benar Menggunakan Fungsi Promise
// requestPromise('movie.com')
// 	.then((result) => {
// 		console.log('page 1');
// 		console.log(result);
// 		return requestPromise('movie.com');
// 	})
// 	.then(() => {
// 		console.log('page 2');
// 		return requestPromise('movie.com');
// 	})
// 	.then(() => {
// 		console.log('page 3');
// 		return requestPromise('movie.com');
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

// Cara Membuat Promise
// const contohPromise =() => {
// 	return new Promise((resolve,reject) =>{
// 		// resolve(()=> {
		
// 		// })//kalau benar dia jalankan apa
// 		// reject(()=> {
			
// 			// })//kalau salah dia jalankan apa
// 		})
// 	};

// 	const req = contohPromise()
// 	console.log(req)

//ada contoh sederhana lagi membuat promise ini
const delayedColorChange = (color,delay) => {
	return new Promise((resolve,reject) => {
		setTimeout(() => {
			document.body.style.backgroundColor = color
			resolve()
		}, delay);
	})
}

// delayedColorChange('red',1000)
// .then(() => delayedColorChange('yellow',1000))
// .then(() => delayedColorChange('blue',1000))
// .then(() => delayedColorChange('orange',1000))
// .then(() => delayedColorChange('green',1000))

//Fungsi Async Keyword
// 1.fungsi async akan otomatis menjadi promise kalo fungsinya punya data,maka resolvenya
// 2.kalo fungsinya punya data,maka resolvenya akan mengirimkan data juga yang bisa diolah
// 3.kalo didalam function ada object throw error,maka akan menjalankan bagian reject

// const hello = async () => {
// 	return 'Hello World'
// }

// hello().then((res) => {
// 	console.log('response',res)
// }) // contoh point 2

// const hello = async () => {
	
// 	throw 'Sorry ye'
// }

// hello().then((res) => {
// 	console.log('response',res)
// })
// .catch((err) => {
// 	console.log('error ,',err)
// })//contoh point 3

//Fungsi Await Keyword
// 1.keyword await hanya bisa kita gunakan didalam function dengan 'async'
// 2.await akan melakukan jeda proses selanjutnya didalamm function,menunggu promise
// yang dijalankan di resolved

// async function changeColor() {
// 	await delayedColorChange('red',1000)
// 	await delayedColorChange('blue',1000)
// 	await delayedColorChange('yellow',1000)
// 	return 'All done'
// }


// //bisa melakukan change method lagi
// async function printRainbow() {
// 	await changeColor()
// 	console.log('Selesai semua')
// }

// printRainbow()

//Mengelola Kondisi Error Dengan Async Await
// // Promise version
const requestPromise = (url) => {
	return new Promise((resolve, reject) => {
		const delay = Math.floor(Math.random() * 4500) + 500;
		setTimeout(() => {
			if (delay > 2000) {
				reject('Error: Connection Timeout');
			} else {
				resolve(`Success: ${url} (${delay}ms)`);
			}
		}, delay);
	});
};

async function requestHandler() {
	try {
		let result = await requestPromise('movie.com')
		console.log(result)

	}
	catch(error) {
		console.log('Error',error)
	}
}
console.log(requestHandler())