import http from "./httpService";

export async function getMyPostList() {
  const response = http.get(`/myFav-list`);
  return response;
}

export async function addPostToList(postId, myComment){
  
    const response = http.post(`/myFav-list`,{ postId, myComment });
    return response;
}

export async function deletePostFromList(postId) {
  const response = http.delete(`/myFav-list/${postId}`);
  return response;
}