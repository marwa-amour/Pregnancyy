import http from "./httpService";

export async function getAllPosts() {
  const response = http.get('/posts');
  return response;
}

export async function getPostById(postId) {
  const response = http.get(`/posts/${postId}`);
  return response;
}

export async function createPost(title, explaintite, image, body, catagories, likes){
  
  const response = http.post(`/posts`,{ title, explaintite, image, body, catagories, likes });
  return response;
}

export async function updatePost(postId,title, explaintite, image, body, catagories, likes){
  
  const response = http.put(`/posts/${postId}`,{ title, explaintite, image, body, catagories, likes });
  return response;
}

export async function deletePost(postId) {
  const response = http.delete(`/posts/${postId}`);
  return response;
}

export async function searchPost(titleSearch){
  const response = http.get('/posts/search',{params:{title:titleSearch}});
  return response;
}