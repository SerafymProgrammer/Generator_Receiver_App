
export const get_random_int = (min, max)=>{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export const check_existed_id = (id)=>{
    let is_existed = document.getElementById(id);
    return is_existed;
}

export const check_is_dom_node = (element)=>{
    let is_dom_node = element instanceof Element;
    return is_dom_node;
}

export const create_unique_id = (modifier, custom_id='', )=>{
    let new_unique_id =`${custom_id}_${modifier}_${Math.random}`;
    return new_unique_id;
}