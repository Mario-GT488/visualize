const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export async function getPosts(page = 1, limit = 10){
    const response = await fetch(`${API_BASE_URL}/v1/posts/?page=${page}&limit=${limit}`);

    if(!response.ok){
        throw new Error("Error al obtener los posts");
    }

    return response.json();
}

export async function createPost(postData, currentUser){
    const response = await fetch(`${API_BASE_URL}/v1/posts/`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-User": currentUser
        },
        body: JSON.stringify(postData),
    });

    if(!response.ok){
        throw new Error("Error al crear post");
    };

    return response.json();
}

export async function updatePost(postId, postData, currentUser){
    const response = await fetch(`${API_BASE_URL}/v1/posts/${postId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "X-User": currentUser,
        },
        body: JSON.stringify(postData)
    });

    if(!response.ok){
        throw new Error("Error al editar el post");
    }

    return response.json();
}

export async function deletePost(postId, currentUser){
    const response = await fetch(`${API_BASE_URL}/v1/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "X-User": currentUser
        },
    });

    if(!response.ok){
        throw new Error("Error al eliminar el post");
    }

    return response.json();
}

export async function getDiscoveryImages(query = "inspiration", perPage = 6){
    const response = await fetch(`${API_BASE_URL}/v1/discovery/?query=${query}&per_page=${perPage}`);

    if(!response.ok){
        throw new Error("Error al buscar las imágenes");
    }

    return response.json();
}