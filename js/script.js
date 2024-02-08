import Pockemon from "./Pockemon.js";

function addElement(domEl, className, textContent = ''){
    const el = document.createElement(domEl);
    el.classList.add(className);
    if (textContent != '') {
        el.innerHTML = textContent;
    }
    return el;
}

function addElementImg(src, className, alt = ''){
    const el = document.createElement('img');
    el.classList.add(className);
    el.setAttribute('src', src);
    if (alt != '') {
        el.setAttribute('alt', alt);
    }
    return el;
}
const container = document.querySelector('.container');
const staticProp = [
    'id',
    'order',
    'base_experience',
    'height',
    'is_default',
    'weight'
];
const responsePockemons = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
const jsonPockemons = await responsePockemons.json();
const objectPocemon = jsonPockemons.results;

objectPocemon.sort(function (a, b) {
    const first = a.url.split('/').filter(function(el) {
        return el != '';
      });
    const second = a.url.split('/').filter(function(el) {
        return el != '';
      });
    return second.slice(-1) - first.slice(-1);  
});
// console.log(objectPocemon);
if (objectPocemon.length > 0) {
    const title = addElement('h1', 'title', 'Pockemons');
    container.appendChild(title);
    const wrap = addElement('div', 'wrap');
    container.appendChild(wrap);

    Promise.all(objectPocemon.map(x =>
        fetch(x.url).then(response => response.json())
     )).then(data => {
        data.forEach((element) => {
            const pockemon = new Pockemon(element);
                const item = addElement('div', 'pockemon');
                wrap.appendChild(item);
        
                const leftItem = addElement('div', 'pockemon__left');
                item.appendChild(leftItem);
        
                const rightItem = addElement('div', 'pockemon__right');
                item.appendChild(rightItem);
        
                const name = addElement('h2', 'pockemon__name', element.name);
                rightItem.appendChild(name);
        
                const imgFront = addElementImg(element.sprites.other.showdown.front_default, 'pockemon__img');
                const imgBack = addElementImg(element.sprites.other.showdown.back_default, 'pockemon__img');
                leftItem.appendChild(imgFront);
                leftItem.appendChild(imgBack);
        
                const list = addElement('ul', 'pockemon__props');
                rightItem.appendChild(list);
                staticProp.forEach((el) => {
                    const prop = addElement('li', 'pockemon__item', `<span class="pockemon__light">${el}</span> - ${pockemon[el]}`);
                    list.appendChild(prop);
                });


                // add generations for Pockemon

                const titleGeneration = addElement('h2', 'pockemon__title', 'generations');
                rightItem.appendChild(titleGeneration);
                const wrapGeneration = addElement('div', 'pockemon__generation');
                rightItem.appendChild(wrapGeneration);

                const titlesGen = addElement('ul', 'pockemon__title-gen');
                wrapGeneration.appendChild(titlesGen);
                const containerGen = addElement('div', 'pockemon__gen-colors');
                wrapGeneration.appendChild(containerGen);
                let itemCount = 0;
                const generations = pockemon.sprites.versions;
                Object.keys(generations).forEach((key) => {
                    const nameGen = key.split('-').slice(-1);
                    const elTitleGen = addElement('li', 'pockemon__name-gen', nameGen);
                    titlesGen.appendChild(elTitleGen);
                    elTitleGen.setAttribute('data-gen', nameGen);
                    
                    const colorsItem = addElement('div', 'pockemon__color-item');
                    colorsItem.setAttribute('data-gen', nameGen);
                    if (itemCount) {
                        colorsItem.classList.add('unvisible');
                    } else {
                        elTitleGen.classList.add('active');
                        ++itemCount;
                    }
                    containerGen.appendChild(colorsItem);
                    const colors = Object.keys(generations[key]);
                    const active = 0;
                    colors.forEach((color) => {
                        const colorTitle = addElement('p', 'pockemon__color-name', color);
                        colorsItem.appendChild(colorTitle);
                        const colorImages = Object.keys(generations[key][color]);
                        colorImages.forEach((url) => {
                            const urlGen = generations[key][color][url];
                            if (urlGen) {
                                const imagGen = addElementImg(urlGen, 'pockemon__color-img');
                                colorsItem.appendChild(imagGen);
                            }
                        });
                    });

                    elTitleGen.addEventListener('click', (event) => {
                        const el = event.target;
                        if (!el.classList.contains('active')) {
                            const active = titlesGen.querySelector('.active');
                            el.classList.add('active');
                            active.classList.remove('active');
                            
                            const dataGenActive = active.dataset.gen;
                            const dataGen = el.dataset.gen;
                            const itemVisible = containerGen.querySelector(`.pockemon__color-item[data-gen=${dataGenActive}]`);
                            const item = containerGen.querySelector(`.pockemon__color-item[data-gen=${dataGen}]`);
                            itemVisible.classList.add('unvisible');
                            item.classList.remove('unvisible');
                        }
                        console.log(event.target);
                    });
                });
            });

    });

 

    // arrPockemons.forEach((elPockemon) => {
    //     const item = addElement('div', 'pockemon');
    //     wrap.appendChild(item);

    //     const leftItem = addElement('div', 'pockemon__left');
    //     item.appendChild(leftItem);

    //     const rightItem = addElement('div', 'pockemon__right');
    //     item.appendChild(rightItem);

    //     const name = addElement('div', 'pockemon__name', elPockemon.name);
    //     rightItem.appendChild(name);

    //     const imgFront = addElementImg(elPockemon.sprites.other.showdown.front_default, 'pockemon__img');
    //     const imgBack = addElementImg(elPockemon.sprites.other.showdown.back_default, 'pockemon__img');
    //     leftItem.appendChild(imgFront);
    //     leftItem.appendChild(imgBack);

    //     const list = addElement('ul', 'pockemon__props');
    //     rightItem.appendChild(list);
    //     staticProp.forEach((el) => {
    //         const prop = addElement('li', 'pockemon__item', `<span class="pockemon__light">${el}</span> - ${pockemon[el]}`);
    //         list.appendChild(prop);
    //     });
    // });
}

