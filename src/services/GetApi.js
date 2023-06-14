import axios from 'axios'

 const URL_API = 'https://backend-pizza-production.up.railway.app/pizzas'

export const getPizzas = async () => {
    try{
        const { data } = await axios.get(`${URL_API}`)
        console.log(data)
        return data
    } catch (error){
        console.log(error)
        return [];
    }

}
getPizzas()