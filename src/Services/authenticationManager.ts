import SInfo from 'react-native-sensitive-info'

export const sharedPreference = {
    sharedPreferencesName: 'mySharedPrefs',
    keychainService: 'myKeychain'
}

interface am {
    _accessToken: null|string,
    _uid : null|string,
    _client: null|string, 

}
export class AuthenticationManager {

    private static _instance:AuthenticationManager;
    _am:am = {
        _accessToken: null,
        _uid : null,
        _client: null, 
    }

    
    public static getInstance()
    {
        if (this._instance == null)
        {
            this._instance = new AuthenticationManager();
        }
        return this._instance;
    }
    constructor()
    {
        if(AuthenticationManager._instance)
        {
            throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
        }
    }
    
    _restoreToken = async () => {
        try {
            this._am._accessToken = await SInfo.getItem('accessToken', sharedPreference)
            this._am._uid = await SInfo.getItem('uId', sharedPreference)
            this._am._client = await SInfo.getItem('client', sharedPreference) 
        } catch (error) {
            console.warn("Error in restore Token",error)
        }
    }

    // isAuthorized = () => {
    //     let v = (this._token && this._uid && this._client)
    //     return v !== undefined && v !== null
    // }

    getAuthHeaders = () => {
      return {
        'Cache-Control': 'no-cache',
          'carrier': 'Mobile',
          'access-token': this._am._accessToken,
          'uid': this._am._uid,
          'client': this._am._client, 
          'token-type': 'Bearer'
      }
    }

    getTokens = async () => {
        await this._restoreToken()
        try {
            this._am._accessToken = await SInfo.getItem('accessToken', sharedPreference)
            this._am._uid = await SInfo.getItem('uId', sharedPreference)
            this._am._client = await SInfo.getItem('client', sharedPreference) 
            return this._am
        } catch (error) {
            console.warn('error in get token',error)
        }
        return this._am
    }

    setTokenResponse = async (tokenResponse:any) => { 
        const responseHeaders = tokenResponse.headers
        const responseData = tokenResponse.data
        this._am._accessToken = await SInfo.setItem('accessToken', responseHeaders['access-token'], sharedPreference)
        this._am._uid = await SInfo.setItem('uId', responseHeaders['uid'], sharedPreference)
        this._am._client = await SInfo.setItem('client', responseHeaders['client'], sharedPreference)
     
        return this._am
    }

    revokeToken = async() => {
        this._am = {
            _accessToken: null,
            _uid: null,
            _client: null,
       
        }
        try {
            await SInfo.deleteItem('accessToken', sharedPreference)
            await SInfo.deleteItem('uId', sharedPreference)
            await SInfo.deleteItem('client', sharedPreference) 
        } catch(error) {
            console.warn('error in revoke token',error)
                       }
    }
}

const AuthManager = AuthenticationManager.getInstance()
export default AuthManager

 