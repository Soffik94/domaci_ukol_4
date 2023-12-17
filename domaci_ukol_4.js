const dtoIn = {
  count: 50,
  age: {
    min: 19,
    max: 40,
  },
};

const gender = ["male", "female"];
const workload = [10, 20, 30, 40];

const surnames = [
  "Daněk",
  "Daniel",
  "Danihel",
  "Daniš",
  "Danko",
  "Daňhel",
  "David",
  "Davídek",
  "Demeter",
  "Dědek",
  "Dědič",
  "Denk",
  "Dittrich",
  "Diviš",
  "Dlouhý",
  "Dobeš",
  "Dobiáš",
  "Dobrovolný",
  "Dobrý",
  "Dočekal",
  "Dočkal",
  "Dohnal",
  "Dohnálek",
  "Dokoupil",
  "Dolák",
  "Dolanský",
  "Doleček",
  "Dolejš",
  "Dolejší",
  "Doležal",
  "Doležel",
  "Donát",
  "Dopita",
  "Doseděl",
  "Doskočil",
  "Dosoudil",
  "Dostál",
  "Dostálek",
  "Došek",
  "Doubek",
  "Doubrava",
  "Douda",
  "Douša",
  "Dráb",
  "Drábek",
  "Dragoun",
  "Drahoš",
  "Drápal",
  "Drbal",
  "Drbohlav",
];

const names = [
  "Abadon",
  "Abdon",
  "Ábel",
  "Abelard",
  "Abigail",
  "Abiha",
  "Abraham",
  "Abrahám",
  "Absolon",
  "Absolón",
  "Adalbert",
  "Adam",
  "Adéla",
  "Adin",
  "Adina",
  "Adolf",
  "Adrian",
  "Adrián",
  "Adriana",
  "Adrien",
  "Adriena",
  "Agáta",
  "Agaton",
  "Aglaja",
  "Achil",
  "Achiles",
  "Aida",
  "Alan",
  "Alban",
  "Albert",
  "Albín",
  "Albína",
  "Albrecht",
  "Aldo",
  "Alen",
  "Alena",
  "Aleš",
  "Alex",
  "Alexandr",
  "Alexandra",
  "Alexej",
  "Alfons",
  "Patrik",
  "Bohdan",
  "Libor",
  "Kamil",
  "Petr",
  "Josef",
  "Evelína",
  "Roman",
];

const generateEmployeeData = (dtoIn) => {
  const minAge = dtoIn.age.min;
  const maxAge = dtoIn.age.max;
  const getRandomDate = (minAge, maxAge) => {
    const now = new Date();
    const minDate = new Date(
      now.getFullYear() - maxAge - 1,
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0,
      0,
    );
    const maxDate = new Date(
      now.getFullYear() - minAge,
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0,
    );
    const randomDate =
      minDate.getTime() +
      Math.random() * (maxDate.getTime() - minDate.getTime());
    let date = new Date(randomDate);
    date = new Date(date.toDateString());
    date = date.toISOString();
    return date;
  };

  let listOfEmployees = [];
  let counter = dtoIn.count;

  while (counter > 0) {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];

    listOfEmployees.push({
      gender: gender[Math.floor(Math.random() * gender.length)],
      birthdate: getRandomDate(minAge, maxAge),
      name: randomName,
      surname: randomSurname,
      workload: workload[Math.floor(Math.random() * workload.length)],
    });

    counter -= 1;
  }

  return listOfEmployees;
};
const getEmployeeStatistics = (listOfEmployees) => {
  const listOfEmployeesArray = listOfEmployees;
  let workload10 = 0;
  let workload20 = 0;
  let workload30 = 0;
  let workload40 = 0;
  let averageAge = 0;
  let medianOfAges = 0;
  let medianOfWorkloads = 0;
  const curentDate = new Date();
  let sumOfAge = 0;
  let minimalAge = Infinity;
  let maximalAge = 0;
  let arrayOfAges = [];
  let arrayOfWorkloads = [];
  let averageWomenWorkload = 0;
  let sumOfWomenWorkloads = 0;
  let countOfWomenWorkloads = 0;
  for (let element of listOfEmployeesArray) {
    const birthDate = new Date(element.birthdate);
    sumOfAge += curentDate.getFullYear() - birthDate.getFullYear();
    averageAge = sumOfAge / listOfEmployeesArray.length;
    if (element.workload === 10) {
      workload10++;
    } else if (element.workload === 20) {
      workload20++;
    } else if (element.workload === 30) {
      workload30++;
    } else {
      workload40++;
    }
    const age = new Date().getFullYear() - birthDate.getFullYear();
    if (age < minimalAge) {
      minimalAge = age;
    } else if (age > maximalAge) {
      maximalAge = age;
    }
    arrayOfAges.push(age);
    arrayOfAges.sort((a, b) => a - b);
    const middleIndexOfAges = Math.floor(arrayOfAges.length / 2);
    if (arrayOfAges % 2 === 0) {
      medianOfAges =
        (arrayOfAges[middleIndexOfAges - 1] + arrayOfAges[middleIndexOfAges]) /
        2;
    } else {
      medianOfAges = arrayOfAges[middleIndexOfAges];
    }
    arrayOfWorkloads.push(element.workload);
    arrayOfWorkloads.sort((a, b) => a - b);
    const middleIndexOfWorkloads = Math.floor(arrayOfAges.length / 2);
    if (arrayOfAges % 2 === 0) {
      medianOfWorkloads =
        (arrayOfAges[middleIndexOfWorkloads - 1] +
          arrayOfAges[middleIndexOfWorkloads]) /
        2;
    } else {
      medianOfWorkloads = arrayOfAges[middleIndexOfWorkloads];
    }
    if (element.gender === "female") {
      sumOfWomenWorkloads += element.workload;
      countOfWomenWorkloads++;
    }
    averageWomenWorkload = sumOfWomenWorkloads / countOfWomenWorkloads;
  }
  const dtoOut = {
    total: dtoIn.count,
    workload10: workload10,
    workload20: workload20,
    workload30: workload30,
    workload40: workload40,
    averageAge: averageAge,
    minAge: minimalAge,
    maxAge: maximalAge,
    medianAge: medianOfAges,
    medianWorkload: medianOfWorkloads,
    averageWomenWorkload: averageWomenWorkload,
    sortedByWorkload: listOfEmployeesArray.sort(
      (a, b) => a.workload - b.workload,
    ),
  };
  return dtoOut;
};
const main = (dtoIn) => {
  const dtoOut = getEmployeeStatistics(generateEmployeeData(dtoIn));
  return console.log(dtoOut);
};

main(dtoIn);
