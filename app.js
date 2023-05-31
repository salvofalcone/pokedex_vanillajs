export const createEl = (type, content, ...attrs) => {
  const element = document.createElement(type);

  element.textContent = content;
  attrs.forEach((attr) => element.setAttribute(attr?.name, attr?.value));
  return element;
};

/***************** *****************/

const container = document.querySelector("#container");

const createCard = (pokemon) => {
  /* main */
  const wrapperEl = createEl("div", "", { name: "class", value: "wrapperEl" });

  /* top */
  const topWrapper = createEl("div", "", {
    name: "class",
    value: "topWrapper",
  });
  const nameEl = createEl("p", pokemon.name, {
    name: "class",
    value: "pokeName",
  });

  const expEl = createEl("p", pokemon.exp, { name: "class", value: "pokeExp" });

  /* img */
  const pokeImg = createEl(
    "img",
    "",
    { name: "class", value: "pokeImg" },
    { name: "src", value: `${pokemon.image}` }
  );

  /* mid */
  const midWrapper = createEl("div", "", {
    name: "class",
    value: "midWrapper",
  });

  const typeEl = createEl("p", pokemon.type, {
    name: "class",
    value: "pokeType",
  });

  const weightEl = createEl("p", pokemon.weight + "kg", {
    name: "class",
    value: "pokeWeight",
  });

  /* bottom */
  const bottomWrapper = createEl("div", "", {
    name: "class",
    value: "bottomWrapper",
  });

  const abilitiesEl = createEl("p", "Abilities: " + pokemon.ability, {
    name: "class",
    value: "pokeAbilities",
  });

  topWrapper.append(nameEl, expEl);
  midWrapper.append(typeEl, weightEl);
  bottomWrapper.append(abilitiesEl);
  wrapperEl.append(topWrapper, pokeImg, midWrapper, bottomWrapper);
  container.append(wrapperEl);
};

const GET = () => {
  const promises = [];

  for (let id = 1; id <= 800; id++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    promises.push(fetch(url).then((res) => res.json()));
  }

  //risolvo tutto insieme
  Promise.all(promises).then((results) => {
    // console.log(results);
    const pokemons = results.map((result) => ({
      id: result.id,
      name: result.name,
      exp: result.base_experience,
      image: result.sprites["front_default"],
      type: result.types.map((type) => type.type.name).join(", "), //per avere tutti i type
      weight: result.weight,
      ability: result.abilities
        .map((ability) => ability.ability.name)
        .join(", "),
    }));
    console.table(pokemons);

    //stampo per ogni elemento
    pokemons.forEach((pokemon) => {
      createCard(pokemon);
    });
  });
};

GET();
