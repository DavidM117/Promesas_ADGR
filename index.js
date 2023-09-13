// Ejercicio 1: Promesas Encadenadas
const generateRandomNumber = () => {
  const getRandomNumber = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        const randomValue = Math.floor(Math.random() * 100);
        console.log("El número aleatorio es: " + randomValue);
        resolve(randomValue);
      }, 2000);
    });

  const calculateSquare = (value) =>
    new Promise((resolve) => {
      setTimeout(() => {
        const square = value ** 2;
        console.log("El número al cuadrado es: " + square);
        resolve(square);
      }, 3000);
    });

  const calculateSquareRoot = (value) =>
    new Promise((resolve) => {
      setTimeout(() => {
        const squareRoot = Math.sqrt(value);
        console.log("La raíz cuadrada es: " + squareRoot);
        resolve(squareRoot);
      }, 4000);
    });

  return getRandomNumber()
    .then((randomValue) => calculateSquare(randomValue))
    .then((square) => calculateSquareRoot(square));
};

generateRandomNumber().then(console.log);

// Ejercicio 2: Promesa de Múltiples Solicitudes -------------------------------------------------------

const newAPIEndpoints = [
  'https://jsonplaceholder.typicode.com/users/1',
  'https://jsonplaceholder.typicode.com/users/2',
  'https://jsonplaceholder.typicode.com/users/3'
];

const fetchDataFromAPI = (endpoints) => {
  const promisesArray = [];
  endpoints.forEach((url) => {
    promisesArray.push(
      fetch(url)
        .then((res) => res.json())
        .then((data) => data.name)
    );
  });
  return promisesArray;
};

Promise.all(fetchDataFromAPI(newAPIEndpoints)).then((values) => {
  console.log(values);
});


// Ejercicio 3: Promesas Paralelas

const nestedFunction1 = ()=>{return new Promise((resolve,reject)=>resolve("Promesa resuelta 1"))}
const nestedFunction2 = ()=>{return new Promise((resolve,reject)=>resolve("Promesa resuelta 2"))}
const nestedFunction3 = ()=>{return new Promise((resolve,reject)=>resolve("Promesa resuelta 3"))}
const arrayFunctions = [nestedFunction1,nestedFunction2,nestedFunction3];

const parallelPromises = (arrrayFunciones)=>{
  return Promise.all(arrrayFunciones.map(e=>e()));
}
parallelPromises(arrayFunctions).then(values=>console.log(values))

// Ejercicio 4: Promesas en Cadena con Retraso ---------------------------------------------------------

console.log("Inicio de la función promesasConRetardo");

function promesasConRetardo(n) {
return new Promise((resolve, reject) => {
  if (n <= 0) {
    reject("El número debe ser mayor que cero.");
  } else {
    const promesas = [];

    for (let i = 1; i <= n; i++) {
      const promesa = new Promise((innerResolve) => {
        setTimeout(() => {
          console.log(i); // Imprime el número actual
          innerResolve();
        }, i * 1000); // Resuelve la promesa después de i segundos
      });

      promesas.push(promesa);
      console.log(i); // Imprime el número actual
    }

    Promise.all(promesas).then(() => {
      setTimeout(() => {
        resolve("Todas las promesas se resolvieron");
      }, n * 1000); // Resuelve la promesa principal después de n segundos
    });
  }
});
}

// Ejemplo de uso:
promesasConRetardo(5)
.then((mensaje) => {
  console.log(mensaje);
})
.catch((error) => {
  console.error("Error:", error);
});


// Ejercicio 5: Promesa con Cancelación ----------------------------------------------------------------

let cancelPromiseCalled;

const doPromise = ()=>{
  setTimeout(()=>{
      if(cancelPromiseCalled){
          cancelPromise().then(res=>console.log(res))
      }else{
          new Promise((resolve,reject)=>{
              resolve(console.log(`Resolved succesfull`));
          })
      }
  },5000);
}   

const cancelPromise = ()=>{
  cancelPromiseCalled = true;
  new Promise((resolve,reject)=>{
      reject(`Canceled promise`);
  })
}   

doPromise();cancelPromise();