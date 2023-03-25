const arrayTest = [
  {
    title: "Développer",
    description: "Je suis un développeur web react js",
    avantage: ["transport", "ticket restaurant", "congé", "prime"],
  },
  {
    title: "Développer",
    description: "Je suis un développeur web 3.0",
    avantage: ["congé"],
  },
  {
    title: "Développer",
    description: "Je suis un développeur web symfony",
    avantage: ["ticket restaurant", "prime"],
  },
  {
    title: "Boulanger",
    description: "Je suis un boulanger",
    avantage: ["ticket restaurant", "congé"],
  },
];

const arrayAvantage = ["transport", "ticket restaurant"];

const newArray = arrayAvantage.map((item) => {
  return arrayTest.filter(
    (element) =>
      element.title == "Développer" && element.avantage.includes(item)
  );
});

const arrayFusion = newArray.flat().filter((item, index, self) => {
  return (
    index ===
    self.findIndex(
      (t) =>
        t.title === item.title &&
        t.description === item.description &&
        t.avantage === item.avantage
    )
  );
});

console.log(arrayFusion);
