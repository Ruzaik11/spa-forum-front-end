import React, { Component } from 'react';
import ForumService from '../../../Services/ForumService';
import './single.css';

import moment from 'moment';

class Single extends Component {

    state = { post: {}, comment: '', id: 0 }

    async componentDidMount() {
        this.getSinglePost();
    }

    async getSinglePost() {
        const post = await ForumService.getSinglePost(this.props.match.params.postID);
        this.setState({ post: post.data, id:this.props.match.params.postID});
    }

    async addComment(e) {
        e.preventDefault();
        const data = {id:this.state.id,comment:this.state.comment}
        const comment = await ForumService.postComment(data);
        this.getSinglePost();
    }

    render() {

        const { post } = this.state;

        return (
            <div className="container w-50" >
                <div className="row" >
                    <div className="col-md-12" >
                        <div className="inner-main-body p-2 p-sm-3  forum-content">
                            <a href="/forum" className="btn btn-light btn-sm mb-3 has-icon" data-target=".forum-content"><i className="fa fa-arrow-left mr-2" />Back</a>
                            <div className="card mb-2">
                                <div className="card-body">
                                    <div className="media forum-item">
                                        <a href="/" className="card-link">
                                            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle" width={50} alt="User" />
                                            <small className="d-block text-center text-muted">Newbie</small>
                                        </a>
                                        <div className="media-body ml-3">
                                            <a href="/" className="text-secondary">{post.name}</a>
                                            <small className="text-muted ml-2">{moment(new Date(post.created_at).toDateString()).fromNow()}</small>
                                            <h5 className="mt-1"> {post.title} </h5>
                                            <div className="mt-3 font-size-sm">
                                                <p>Hellooo :)</p>
                                                <p>
                                                    {post.description}
                                                </p>
                                                <p></p>
                                            </div>
                                        </div>
                                        <div className="text-muted small text-center">
                                            <span><i className="far fa-comment ml-2" /> {(post.comments) ? post.comments.length : 0}</span>
                                        </div>
                                    </div>
                                </div>


                                <div>
                                    <div className="container bootdey">
                                        <div className="col-md-12 bootstrap snippets">
                                            <div className="panel">
                                                <div className="panel-body">
                                                    <form onSubmit={event => this.addComment(event)} >
                                                        <textarea required value={this.state.comment.comment} onChange={event => this.setState({ comment: event.target.value })} className="form-control" rows={2} placeholder="What are you thinking?" defaultValue={""} />
                                                        <div className="mar-top clearfix">
                                                            <button className="btn btn-sm btn-primary pull-right" type="submit"><i className="fa fa-pencil fa-fw" /> Post</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className="panel">
                                                <div className="panel-body">
                                                    {
                                                        (post.comments) ? (
                                                            post.comments.map((item, index) => {
                                                                return (
                                                                    <div key={index} className="media-block">
                                                                        <a className="media-left" href="#"><img className="img-circle img-sm" alt="Profile Picture" src="https://bootdey.com/img/Content/avatar/avatar1.png" /></a>
                                                                        <div className="media-body">
                                                                            <div className="mar-btm">
                                                                                <a href="#" className="btn-link text-semibold media-heading box-inline"> {item.name} </a>
                                                                                <p className="text-muted text-sm"><i className="fa fa-mobile fa-lg" /> - {moment(new Date(item.created_at).toDateString()).fromNow()}</p>
                                                                            </div>
                                                                            <p> {item.comment} </p>

                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        ) : (
                                                            <p>No comments found</p>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Single;

