const header = document.querySelector("header");
const container = document.getElementById("container");

const createHeaderItem =(type, title, id)=>{
    const anc = document.createElement("a");
    anc.href = `#${id}`;
    anc.textContent = title;
    switch(type){
        case "object": anc.classList.add("headMain"); break;
        case "route": anc.classList.add("headSub"); break;
    }
    return anc;
}

const createItem = (data)=>{
    const article = document.createElement("article");
    article.id = data.id;

    const title = document.createElement("h1");
    title.textContent = data.title;
    article.appendChild(title);

    if(data.type === "route"){
        const route = document.createElement("p");
        route.classList.add("url");
        route.textContent = data.url;
        article.appendChild(route);
    }

    if(data.auth){
        const auth = document.createElement("p");
        auth.textContent = "Auth required";
        article.appendChild(auth);
    }

    const description = document.createElement("p");
    description.classList.add("description");
    description.textContent = data.description;
    article.appendChild(description);

    if(data.properties){
        const subTitle = document.createElement("h3");
        subTitle.textContent = "Properties";
        article.appendChild(subTitle);

        for(let i = 0; i < data.properties.length; i++){
            article.appendChild(createProp(data.properties[i]));
        }
    }

    if(data.requestBody){
        const subTitle = document.createElement("h3");
        subTitle.textContent = "Request Body";
        article.appendChild(subTitle);

        for(let i = 0; i < data.requestBody.length; i++){
            article.appendChild(createProp(data.requestBody[i]))
        }
    }

    if(data.responseBody){
        const subTitle = document.createElement("h3");
        subTitle.textContent = "Response Body";
        article.appendChild(subTitle);

        for(let i = 0; i < data.responseBody.length; i++){
            article.appendChild(createProp(data.responseBody[i]))
        }
    }

    if(data.queries){
        const subTitle = document.createElement("h3");
        subTitle.textContent = "Query Parameters";
        article.appendChild(subTitle);

        for(let i = 0; i < data.queries.length; i++){
            article.appendChild(createProp(data.queries[i]))
        }
    }

    return article;
}

const createProp = (propData)=>{
    const propContainer = document.createElement("div");
    propContainer.classList.add("prop");

    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = propData.name;
    propContainer.appendChild(name);

    const type = document.createElement("p");
    type.classList.add("type");
    type.textContent = propData.type;
    propContainer.appendChild(type);

    const desc = document.createElement("p");
    desc.classList.add("propDesc");
    desc.textContent = propData.desc;
    propContainer.appendChild(desc);

    if(propData.options){
        const ul = document.createElement("ul");
        propContainer.appendChild(ul);

        const title = document.createElement("li");
        title.textContent = "Options";
        title.classList.add("ulTitle");
        ul.appendChild(title)

        for(let i = 0; i < propData.options.length; i++){
            const li = document.createElement("li");
            li.textContent = propData.options[i];
            ul.appendChild(li);
        }
    }

    return propContainer;
}

for(let i = 0; i < data.length; i++){
    header.appendChild(createHeaderItem(data[i].type, data[i].title, data[i].id));
    container.appendChild(createItem(data[i]));
}
