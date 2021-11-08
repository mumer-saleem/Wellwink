import SInfo from 'react-native-sensitive-info'

export const sharedPreference = {
    sharedPreferencesName: 'mySharedPrefs',
    keychainService: 'myKeychain'
}

export class AuthenticationManager {

    static myInstance = null
    _am = {
        _accessToken: null,
        _uid: null,
        _client: null,
        _userId: null,
        _firstName: null
    }

    static getInstance() {
        if (this.myInstance == null) {
            this.myInstance = new AuthenticationManager();
        }
        return this.myInstance;
    }

    constructor() {}

    _restoreToken = async () => {
        try {
            this._am._accessToken = await SInfo.getItem('accessToken', sharedPreference)
            this._am._uid = await SInfo.getItem('uId', sharedPreference)
            this._am._client = await SInfo.getItem('client', sharedPreference)
            this._am._userId = await SInfo.getItem('userId', sharedPreference)
            this._am._firstName = await SInfo.getItem('firstName', sharedPreference)
        } catch (error) {
            console.warn("Error in restore Token",error)
        }
    }

    isAuthorized = () => {
        let v = (this._token && this._uid && this._client)
        return v !== undefined && v !== null
    }

    getAuthHeaders = () => {
      return {
        'Cache-Control': 'no-cache',
          'carrier': 'Mobile',
          'access-token': this._am._accessToken,
          'uid': this._am._uid,
          'client': this._am._client,
          'userId': this._am._userId,
          'firstName': this._am._firstName,
          'token-type': 'Bearer'
      }
    }

    getTokens = async () => {
        await this._restoreToken()
        try {
            this._am._accessToken = await SInfo.getItem('accessToken', sharedPreference)
            this._am._uid = await SInfo.getItem('uId', sharedPreference)
            this._am._client = await SInfo.getItem('client', sharedPreference)
            this._am._userId = await SInfo.getItem('userId', sharedPreference)
            this._am._firstName = await SInfo.getItem('firstName', sharedPreference)
            return this._am
        } catch (error) {
            console.warn('error in get token',error)
        }
        return this._am
    }

    setTokenResponse = async (tokenResponse) => {
        let now = new Date().getTime()/1000
        // let expirationDate = now + tokenResponse.expires_in
        const responseHeaders = tokenResponse.headers
        const responseData = tokenResponse.data
        this._am._accessToken = await SInfo.setItem('accessToken', responseHeaders['access-token'], sharedPreference)
        this._am._uid = await SInfo.setItem('uId', responseHeaders['uid'], sharedPreference)
        this._am._client = await SInfo.setItem('client', responseHeaders['client'], sharedPreference)
        this._am._userId = await SInfo.setItem('userId', responseData['id'].toString(), sharedPreference)
        this._am._firstName = await SInfo.setItem('firstName', responseData['first_name'], sharedPreference)
        return this._am
    }

    revokeToken = async() => {
        this._am = {
            _accessToken: null,
            _uid: null,
            _client: null,
            _userId: null,
            _firstName: null
        }
        try {
            await SInfo.deleteItem('accessToken', sharedPreference)
            await SInfo.deleteItem('uId', sharedPreference)
            await SInfo.deleteItem('client', sharedPreference)
            await SInfo.deleteItem('userId', sharedPreference)
            await SInfo.deleteItem('firstName', sharedPreference)
        } catch(error) {
            console.warn('error in revoke token',error)
        }
    }
}

const AuthManager = AuthenticationManager.getInstance()
export default AuthManager
