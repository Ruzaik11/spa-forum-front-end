import React, { Component } from 'react';
import './forum.css';
import ForumService from '../../Services/ForumService';
import moment from 'moment';
import swal from 'sweetalert';
import AuthService from '../../Services/AuthService';
class Forum extends Component {

    state = { post: {}, search: '', filter: '', show: true }

    async componentDidMount() {
        this.forumPosts();
        console.log('is_admin', AuthService.isAdmin())
    }

    async forumPosts() {
        const data = { search: this.state.search, filter: this.state.filter }
        const post = await ForumService.getForum(data);
        this.setState({ post: post.data });
    }

    setFilter(e) {
        this.setState({ filter: e.target.value }, () => {
            this.forumPosts();
        })
    }

    setSearch(e) {
        this.setState({ search: e.target.value }, () => {
            this.forumPosts()
        })
    }

    async deletePost(id) {
        await swal({
            title: "Are you sure?",
            text: "Do you want to delete this post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const response = ForumService.deletePost({ id: id });
                    if (response) {
                        swal("Post has been deleted!", {
                            icon: "success",
                        }).then(() => {
                            this.forumPosts();
                        });
                    }
                } 
            });
    }

    async approveOrReject(id, status) {
        await swal({
            title: "Are you sure?",
            text: "Do you want to " + status + " this post!",
            icon: "info",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const response = ForumService.approveOrReject({ id: id, status: status });
                    if (response) {
                        swal("Post has been approved!", {
                            icon: "success",
                        }).then(() => {
                            this.forumPosts();
                        });
                    }
                }
            });
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css" integrity="sha256-46r060N2LrChLLb5zowXQ72/iKKNiw/lAmygmHExk/o=" crossOrigin="anonymous" />
                    <div className="container">
                        <div className="main-body p-0">
                            <div className="inner-wrapper">
                                {/* Inner sidebar */}
                                <div className="inner-sidebar">
                                    {/* Inner sidebar header */}
                                    <div className="inner-sidebar-header justify-content-center">
                                        <a href="/post" >
                                            <button style={{ width: '100%' }} className="btn btn-primary has-icon btn-block" type="button" data-toggle="modal" data-target="#threadModal">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus mr-2">
                                                    <line x1={12} y1={5} x2={12} y2={19} />
                                                    <line x1={5} y1={12} x2={19} y2={12} />
                                                </svg>
                                                NEW DISCUSSION
                                            </button>
                                        </a>
                                    </div>
                                    {/* /Inner sidebar header */}
                                    {/* Inner sidebar body */}

                                </div>

                                <div className="inner-main">

                                    <div className="inner-main-header">
                                        {
                                            (AuthService.isAdmin()) ? (
                                                <select defaultValue={this.state.filter} onChange={event => this.setFilter(event)} className="custom-select custom-select-sm w-auto mr-1 form-control">
                                                    <option value={0} >All</option>
                                                    <option value={'approval-pending'}>Approval Pending</option>
                                                    <option value={'approved'}>Approved</option>
                                                </select>
                                            ) : ('')
                                        }

                                        <span className="input-icon input-icon-sm ml-auto w-auto">
                                            <input type="text" value={this.state.search} onChange={event => this.setSearch(event)} className="form-control" style={{ marginLeft: '10px' }} placeholder="Search forum" />
                                        </span>
                                    </div>

                                    <div className="inner-main-body p-2 p-sm-3 collapse forum-content show">

                                        {
                                            (this.state.post && this.state.post.length > 0) ? (
                                                this.state.post.map((item, index) => {
                                                    return (

                                                        <div className="card mb-2">
                                                            <div key={index} className="card-body p-2 p-sm-3">

                                                                <div className="media forum-item">

                                                                    <a href={'/view/' + item.id} data-toggle="collapse" data-target=".forum-content"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="mr-3 rounded-circle" width="50" alt="User" />  </a>
                                                                    <div className="media-body">

                                                                        <p>{item.name}  </p>

                                                                        <h6><a href={'/view/' + item.id} data-toggle="collapse" data-target=".forum-content" className="text-body">{item.title}</a>   (<b style={{textTransform:'uppercase'}} >{item.status}</b>)    </h6>


                                                                        <p className="text-secondary">
                                                                            {item.description}
                                                                        </p>

                                                                        <p className="text-muted">  <span className="text-secondary font-weight-bold">  {moment(new Date(item.created_at).toDateString()).fromNow()} </span>
                                                                            <span><i className="far fa-comment ml-2"></i> {(item.comments) ? item.comments.length : 0} </span>
                                                                        </p>


                                                                    </div>

                                                                    {
                                                                        (AuthService.isAdmin() && item.status == 'approval-pending') ? (
                                                                            <React.Fragment>
                                                                                <button onClick={() => this.approveOrReject(item.id, 'approved')} className="btn btn-sm btn-primary"  > Approve </button>
                                                                                <button onClick={() => this.approveOrReject(item.id, 'rejected')}  style={{ float: 'left', marginLeft: '4px' }} className="btn btn-sm btn-danger"  > Reject </button>
                                                                            </React.Fragment>
                                                                        ) : (
                                                                            ''
                                                                        )
                                                                    }


                                                                    <button onClick={() => this.deletePost(item.id)} style={{ float: 'left', marginLeft: '4px' }} className="btn btn-sm btn-danger" >Delete</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            ) : (
                                                <p style={{ padding: '20px' }} >Not post found</p>
                                            )
                                        }

                                        <ul className="pagination pagination-sm pagination-circle justify-content-center mb-0">

                                        </ul>
                                    </div>

                                    <div className="inner-main-body p-2 p-sm-3 collapse forum-content">
                                        <a href="/" className="btn btn-light btn-sm mb-3 has-icon" data-toggle="collapse" data-target=".forum-content"><i className="fa fa-arrow-left mr-2" />Back</a>
                                        <div className="forum-card mb-2">
                                            <div className="card-body">
                                                <div className="media forum-item">
                                                    <a href="/" className="card-link">
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle" width={50} alt="User" />
                                                        <small className="d-block text-center text-muted">Newbie</small>
                                                    </a>
                                                    <div className="media-body ml-3">
                                                        <a href="/" className="text-secondary">Mokrani</a>
                                                        <small className="text-muted ml-2">1 hour ago</small>
                                                        <h5 className="mt-1">Realtime fetching data</h5>
                                                        <div className="mt-3 font-size-sm">
                                                            <p>Hellooo :)</p>
                                                            <p>
                                                                I'm newbie with laravel and i want to fetch data from database in realtime for my dashboard anaytics and i found a solution with ajax but it dosen't work if any one have a simple solution it will be
                                                                helpful
                                                            </p>
                                                            <p>Thank</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-muted small text-center">
                                                        <span className="d-none d-sm-inline-block"><i className="far fa-eye" /> 19</span>
                                                        <span><i className="far fa-comment ml-2" /> 3</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="forum-card mb-2">
                                            <div className="card-body">
                                                <div className="media forum-item">
                                                    <a href="/" className="card-link">
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="rounded-circle" width={50} alt="User" />
                                                        <small className="d-block text-center text-muted">Pro</small>
                                                    </a>
                                                    <div className="media-body ml-3">
                                                        <a href="/" className="text-secondary">drewdan</a>
                                                        <small className="text-muted ml-2">1 hour ago</small>
                                                        <div className="mt-3 font-size-sm">
                                                            <p>What exactly doesn't work with your ajax calls?</p>
                                                            <p>Also, WebSockets are a great solution for realtime data on a dashboard. Laravel offers this out of the box using broadcasting</p>
                                                        </div>
                                                        <button className="btn btn-xs text-muted has-icon"><i className="fa fa-heart" aria-hidden="true" />1</button>
                                                        <a href="/" className="text-muted small">Reply</a>
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
            </React.Fragment>

        );
    }
}



export default Forum;