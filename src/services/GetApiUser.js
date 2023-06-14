import axios from 'axios'

 const URL_API_USER = 'https://backend-pizza-production.up.railway.app/usuarios'

export const getUsuarios = async () => {
    try{
        const { data } = await axios.get(`${URL_API_USER}`)
        console.log(data)
        return data
    } catch (error){
        console.log(error)
        return [];
    }

}
getUsuarios()