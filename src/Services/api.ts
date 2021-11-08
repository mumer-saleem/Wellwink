import {Header} from '../Type/index'
import axios from 'axios';

const headers = {
  'X-Custom-Header': 'foobar'
}
 

const create = (  baseURL = 'https://reqres.in') => {

// live code 
  // const create = (headers = headers, baseURL = 'https://salesdoor.com') => {
    var instance = axios.create({
      baseURL: 'https://some-domain.com/api/',
      timeout: 1000,
      headers: {'X-Custom-Header': 'foobar'}
    });

    const userLogin = (  ) => {
      return instance.get('https://httpbin.org/get?hello=world');
    }
 
   
    return {
      userLogin, 
    }
  }
  
  // let's return back our create method as the default.
  export default {
    create
  }
  