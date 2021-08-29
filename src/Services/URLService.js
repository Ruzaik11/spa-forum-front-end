
let domain = 'http://xz-company.local';

class URLService {

    static loginURL() { return domain + '/api/login'; }

    static logoutURL() { return domain + '/api/logout'; }

    static registerURL() { return domain + '/api/register'; }

    static myForumURL() { return domain + '/api/post/get-all' }

    static addPostURL() { return domain + '/api/post/store' }

    static deletePostURL() { return domain + '/api/post/delete' }

    static singlePostURL() { return domain + '/api/post/get/' }

    static postCommentURL() { return domain + '/api/post/comment' }

    static approveOrReject() { return domain + '/api/admin/post/approve-or-reject' }
}

export default URLService;