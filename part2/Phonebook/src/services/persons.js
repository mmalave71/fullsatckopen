// Servicio encargado de enviar y recibir data del servidor JSONServer
import axios from 'axios';

const baseUrl='http://localhost:3001/persons';
const getAll=()=>{
        const request=axios.get(baseUrl);
        return (request.then (response=>response.data));
};

const create =(objPerson)=>{
        const request=axios.post(baseUrl,objPerson);
        return (request.then(response=>response.data));
};

const deletePerson =(id)=>{
        const request=axios.delete(`${baseUrl}/${id}`)
        return (request.then (response=> response.status));
}
const update=(id,objPersonUpDated)=>{
    const request=axios.put(`${baseUrl}/${id}`,objPersonUpDated)
    return (request.then(response=> response.data));
};

const personService={getAll,create,deletePerson,update};
export default personService;