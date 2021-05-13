import axios from "axios"

const accessTokenKey = "accessToken"
const userRoleKey = "userRole"
const accessUserId = "accessUserId"
const adminRoleKey = "adminRole"

class AuthService {
  // eslint-disable-next-line class-methods-use-this
  login(username, pass) {
    // eslint-disable-next-line no-shadow
    const request = axios.create({
      baseURL: "http://localhost:4000/",
      timeout: 10000,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    return request
      .post(`/login`, {
        account: username,
        password: pass,
      })
      .then((response) => {
        console.log(response.data)
        if (!response.data.success && response.data.error) {
          return false
        } else {
          const accessToken = response.data.token
          const role = response.data.is_moderator
          const isAdmin = response.data.is_admin
          const userID = response.data.id
          
          localStorage.setItem(accessTokenKey, accessToken)
          localStorage.setItem(userRoleKey, role)
          localStorage.setItem(accessUserId, userID)
          localStorage.setItem(adminRoleKey, isAdmin)
          return true
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  // eslint-disable-next-line class-methods-use-this
  logout() {
    localStorage.removeItem(accessTokenKey)
    localStorage.removeItem(userRoleKey)
    localStorage.removeItem(accessUserId)
    localStorage.removeItem(adminRoleKey)
    return true
  }

  userIsAuthenticated() {
    const accessToken = localStorage.getItem(accessTokenKey)

    if (accessToken) {
      return true
    }
    return false
  }

  userIsModerator() {
    const userRole = localStorage.getItem(userRoleKey)
    const adminRole = localStorage.getItem(adminRoleKey)
    if (userRole === "true" || adminRole === "true") {
      return true
    }
    return false
  }

  userIsAdmin() {
    const userRole = localStorage.getItem(adminRoleKey)
    if (userRole === "true") {
      return true
    }
    return false
  }

}
export default new AuthService()
