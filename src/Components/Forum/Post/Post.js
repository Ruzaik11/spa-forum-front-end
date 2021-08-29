
import React, { Component } from 'react';
import ForumService from '../../../Services/ForumService';
import swal from 'sweetalert';

class Post extends Component {


    state = { title: '', description: '' }

    async addPost(event) {
        event.preventDefault()
        const data = {
            'title': this.state.title,
            'description': this.state.description
        }

        const response = await ForumService.addPost(data);

        if (response) {
            swal({
                title: "Success !",
                text: "New post added successfully!",
                icon: "success",
                button: "Ok",
            }).then(() => {
                window.location.href = "/forum";
            });
        }

    }
    

    render() {
        return (
            <div className="container w-50" >
                <div className="row" >
                    <div className="col-md-12" >
                        <form onSubmit={event => this.addPost(event)} >
                            <h4>Add New Post</h4>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" value={this.state.title} onChange={event => this.setState({ title: event.target.value })} className="form-control" id="title" placeholder="" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Description</label>
                                <textarea onChange={event => this.setState({ description: event.target.value })} className="form-control"  >{this.state.description}</textarea>
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;