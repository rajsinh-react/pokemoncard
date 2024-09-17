import { useEffect, useState } from "react"
import "./index.css"
import { PokemonCard } from "./pokemonCard";


export const Pokemon=()=>{

    const api = "https://pokeapi.co/api/v2/pokemon?limit=124";
    const [pokemon, setPokemon] =useState([]);
    const[loading,isloading]=useState(true)
    const [error, setError] = useState(null);
    const  [search, setSearch] = useState('');


    const fetchPokemon=async ()=>{
        try{
            const responce = await fetch(api)
            const data= await responce.json()

            const pokemondata =data.results.map(async(CurPokemon: any)=>{
               
                const res = await fetch(CurPokemon.url)
                const data = await res.json()  
                return data
             })

             const detailReaponce = await Promise.all(pokemondata)
             console.log(detailReaponce)
            setPokemon(detailReaponce)   
            isloading(false)
            
        }
        catch(error){
            isloading(false)
          setError(error)
        }
    }
    //search functinality  
    const searchData= pokemon.filter((currentPokemon)=>currentPokemon.name.toLowerCase().includes(search.toLowerCase()))

    useEffect(()=>{
        fetchPokemon()
    },[])
    
    if(loading){
        return <div>
            <h1>loading...</h1>
        </div>
    }
    if(error){
        return <h1>
            {error.message}
            
        </h1>
    }

    return <>
    <section className="container">
        <header>
            <h1>Lets Catch Pokemon</h1>
        </header>
        <div className="pokemon-search">
            <input type="text" value={search} placeholder="search pokemon"   onChange={(e)=>setSearch(e.target.value)} />

        </div>
        <div>{ 
        searchData.length>0?(
            <ul className="cards">
                {  searchData.map((CurPokemon: any)=>{
                     return <PokemonCard
                      key={CurPokemon.id} 
                      pokemonData={CurPokemon} />
                }
            )
                 }
            </ul>
        ):<p style={{color:"red"}}>sorry not found</p>
            }
        </div>
    </section>
    </>
}