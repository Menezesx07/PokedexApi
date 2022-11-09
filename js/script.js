const pokemonName = document.querySelector('.pokemon__name') //se usar o getbyid não rola
const pokemonNumber = document.querySelector('.pokemon__number')

const pokemonImg = document.querySelector('.pokemon__image')

const form = document.querySelector('.form')
const input = document.querySelector('.input__search')

const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1;


//fazendo um fetch na api da PokéApi - pt.2
 const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    //conferindo se o retorno foi validado ou não 
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
    

}

//filtrando e renderizando o que foi recebido pela api e setando os campos - pt.3
const renderPokemon = async (pokemon) => {
    
    //vai ser exibido o loading até terminar a busca
    pokemonName.innerHTML = 'Loading...'

    const data = await fetchPokemon(pokemon);


    //conferindo se o data tem conteudo ou não
    if (data) {
        pokemonImg.style.display = "block"

        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id
    
        //foi ultilizado colchetes para não bugar na hora do generation-V (por causa da barra)
        //caminho para acessar o sprite da animação
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']
        ['animated']['front_default'];
    
        searchPokemon = data.id;
        
        input.value = '';
        
    } else {
        pokemonImg.style.display = "none"
        pokemonName.innerHTML = 'Não encontrado :c'
        pokemonNumber.innerHTML = ''
    }
   

}

//capturando o que foi escrito no input - pt.1
form.addEventListener('submit', (e) => {

    e.preventDefault();
                  
    //passando como parametro o valor digitado no campo
    renderPokemon(input.value.toLowerCase());   //tolowercase para deixar tudo minusculo
    
})

buttonPrev.addEventListener('click', () => {

    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
    
 
})

buttonNext.addEventListener('click', () => {

    searchPokemon += 1;
    renderPokemon(searchPokemon);
   
        
})


renderPokemon(searchPokemon);


