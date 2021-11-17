 import axios from 'axios';

const headers = {
  'X-Custom-Header': 'foobar'
}
// baseURL: "http://192.168.4.169:3000/",
//  hjasasn 
// baseURL: "http://192.168.5.84:3000/",
// own


const create = (baseURL = 'http://192.168.4.92:3000/') => { 

     var instance = axios.create({
      baseURL: "http://192.168.5.84:3000/",
      timeout: 3000,
      headers: {
        'X-Custom-Header': 'foobar'
      }
    });

    const userLogin = ( email:string,password:string ) => {
      return instance.post('api/v1/auth/sign_in',{email:email,password:password});
    }
 
   
    return {
      userLogin, 
    }
  }
  
  // let's return back our create method as the default.
  export default {
    create
  }
  