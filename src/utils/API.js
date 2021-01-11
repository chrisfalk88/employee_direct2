import axios from "axios";

const BASEURL = "https://randomuser.me/api/?results=100&nat=us";

const obj = {
  getUsers: function () {
    return axios.get(BASEURL);
  },
};

export default obj;