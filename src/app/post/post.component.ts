import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
posts:any[];

  constructor(private service:PostService) {}

  ngOnInit() {
  this.service.getPosts()
    .subscribe(response => {
        this.posts = response.json();
    },(error:Response) =>{
        alert('error occured');
        console.log(error.status);
    })
  }
  createPost(input:HTMLInputElement){
    let post = {title:input.value};
    this.service.createPost(post)
    .subscribe(response=>{
      post['id'] = response.json().id;
      this.posts.splice(0,0,post)
     
    });
  }
  updatePost(post){
     this.service.updatePost(post)
          .subscribe(response =>{
            console.log(response.json());
          })
  }
  deletePost(post){
   this.service.deltePost(post.id)
        .subscribe(respone=>{
            let index = this.posts.indexOf(post);
            this.posts.splice(index,1);
        },
        error =>{
          alert('unexpected error occured');
        }
      )
  }
}
