
import axios from "axios";
import URLService from "./URLService";
import ConfigService from "./ConfigService";

class ForumService {

    async getForum(data) {

        const response = await axios({
            method: 'get',
            url: URLService.myForumURL(),
            headers: { Authorization: ConfigService.authenticationToken() },
            params: data,
        });

        if (!response.data.error) {
            return response.data;
        } else {
            alert("Error");
        }

    }

    async getSinglePost(id) {

        const response = await axios.get(URLService.singlePostURL() + id, ConfigService.authentication());

        if (!response.data.error) {
            return response.data;
        } else {
            alert("Error");
        }

    }

    async addPost(data) {

        const response = await axios.post(URLService.addPostURL(), data, ConfigService.authentication());

        if (!response.data.error) {
            return true;
        } else {
            return false;
        }

    }

    async deletePost(data) {

        const response = await axios.post(URLService.deletePostURL(), data, ConfigService.authentication());

        if (!response.data.error) {
            return true;
        } else {
            return false;
        }

    }

    async approveOrReject(data) {

        const response = await axios.post(URLService.approveOrReject(), data, ConfigService.authentication());

        if (!response.data.error) {
            return true;
        } else {
            return false;
        }

    }

    async postComment(data) {

        const response = await axios.post(URLService.postCommentURL(), data, ConfigService.authentication());

        if (!response.data.error) {
            return response.data;
        } else {
            alert("Error");
        }

    }



}

export default new ForumService();